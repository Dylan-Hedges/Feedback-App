const passport = require('passport');
//Save only the "Strategy" property from 'passport-google-oauth20' into the "GoogleStrategy" variable
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

//Pulls the model class from Mongoose (model class is used to create instances in a collection in MongoDB, 1 argument = pull, 2 arguments = push)
const User = mongoose.model('users');

//User model instance -> Token (inserts a token and into the cookie (in this case we are using the MongoDB auto generated id))
passport.serializeUser((user, done) => {
	//A callback that we have to call to make passport move to the next step, null = there were no errors, "user.id" = the auto generated id by Mongo DB (we use this and not the Google id because if they signed in with FB or Twitter they wont have a Google id) we dont have to put the full "_id:"."$oid:" for this id
	done(null, user.id);
});

//Token -> User model instance (takes the token inside the cookie and turns it back into the user model)
passport.deserializeUser((id, done) => {
	//Search the DB for an id (id refers to the auto generated MongoDB id, this is stored in the token we generated when excuting "serializeUser()", "User" because we want to search over the whole collection we use the model class (same as below), "user" refers to whatever we just found/pulled out of the DB, "done(null, user);" finish and pass on the user we just found/pulled out of the db
	User.findById(id).then(user => {
		done(null, user);
	});
});

//"passport.use()" - makes Passport aware of whatever is inside the () in this case the Google strategy,"new GoogleStrategy()" - Creates a new instance of the Google Passport strategy i.e a user wants to authenticate with Google, requires client ID, client Secret, callbackURL (route user is sent to after granting permission)
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			//Redirects user after granting permission - In the Google developer console, set "Authorized redirect URIs" to "http://localhost:5000/auth/google/callback"
			callbackURL: '/auth/google/callback',
			//Tells GoogleStrategy to trust routing through proxies (in this case Herokus proxy) otherwise there will be a Google "redirect_uri_mismatch" error
			proxy: true
		},
		//Callback function called automatically when redirected back from Google - Takes information about user e.g profile information, access token, refresh token etc.
		(accessToken, refreshToken, profile, done) => {
			//This query returns a promise (a tool we use with JS for handeling asynchronous code), ".then(exisitingUser => {})" If match is found "existingUser" = will be a monoogse/model instance/record with the google id, if a match is not found then "existingUser" = NULL
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//User has logged in before (id exists in DB), "done" = callback function that tells passport we are done and to continue with authentication, "null" = tells passport there was no error, "exisitingUser" here is the exisiting user we found
					done(null, existingUser);
				} else {
					//User hasn't logged in before (id not in DB) - Creates a new mongoose model instance (a single record inside of our collection, i.e a new user) with the google id (profile.id), ".save()" saves the new user to the MongoDB, ".then(user => done(null, user)" retrives the new user saved in the DB (this is a new mongoose model instance from the promise callback, its not "User", best practice to use this instance as other people may have made changes to the db, execute done (see above) this "user" is what gets passed up to "passport.serializeUser()"
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
