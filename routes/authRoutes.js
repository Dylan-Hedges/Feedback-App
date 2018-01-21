//Note - this is the passport npm module, not the passport.js file
const passport = require('passport');

//The app object is defined in index.js, we get this object into these routes by exporting the routes as a function and having app object passed in from the index.js file
module.exports = app => {
	//Sends user to grant permission page and authenticates (uses passport and the 'google' strategy, note - we never defined the string'google', this is an identifier that is internal to "GoogleStrategy" that passport uses), "scope:['profile', 'email']" tells Google servers to give access to the users 'profile' information and their 'email', these strings are defined by google
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	//Exchanges code provided by google for profile information (uses passport + the 'google' strategy to automatically exchange code for profile information)
	app.get('/auth/google/callback', passport.authenticate('google'));

	// req = incoming request, res = outgoing response
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
