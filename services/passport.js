const passport = require('passport');
//Save only the "Strategy" property from 'passport-google-oauth20' into the "GoogleStrategy" variable
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

//Pulls the model class from Mongoose (model class is used to create instances in a collection in MongoDB, 1 argument = pull, 2 arguments = push)
const User = mongoose.model('users');

//"passport.use()" - makes Passport aware of whatever is inside the () in this case the Google strategy,"new GoogleStrategy()" - Creates a new instance of the Google Passport strategy i.e a user wants to authenticate with Google, requires client ID, client Secret, callbackURL (route user is sent to after granting permission)
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			//Redirects user after granting permission - In the Google developer console, set "Authorized redirect URIs" to "http://localhost:5000/auth/google/callback"
			callbackURL: '/auth/google/callback'
		},
		//Callback function called automatically when redirected back from Google - Takes information about user e.g profile information, access token, refresh token etc.
		(accessToken, refreshToken, profile, done) => {
			//This query returns a promise (a tool we use with JS for handeling asynchronous code), ".then(exisitingUser => {})" A model instance that represents a user who was found, if a match is not found then "existingUser" = NULL
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//record with that google id already exists in DB
				} else {
					//Record with that google id does not exist - Creates a new instance/record that takes the id provide by google (profile.id), ".save()" saves the model to the MongoDB
					new User({ googleId: profile.id }).save();
				}
			});
		}
	)
);
