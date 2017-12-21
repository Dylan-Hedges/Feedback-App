const passport = require('passport');
//Save only the "Strategy" property from 'passport-google-oauth20' into the "GoogleStrategy" variable
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');

//"passport.use()" - makes Passport aware of whatever is inside the () in this case the Google strategy,"new GoogleStrategy()" - Creates a new instance of the Google Passport strategy i.e a user wants to authenticate with Google, requires client ID, client Secret, callbackURL (route user is sent to after granting permission)
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			//Redirects user after granting permission - In the Google developer console, set "Authorized redirect URIs" to "http://localhost:5000/auth/google/callback"
			callbackURL: '/auth/google/callback'
		},
		//Takes information about user e.g profile information, access token, refresh token etc.
		(accessToken, refreshToken, profile, done) => {
			console.log(accessToken);
			console.log(refreshToken);
			console.log(profile);
		}
	)
);
