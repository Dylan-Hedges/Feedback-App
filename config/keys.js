//Checks to see if we are on the heroku server (heroku set up an environment variable called production, if we are on heroku this will be true)
if (process.env.NODE_ENV === 'production') {
	//If we are on Heroku pull in and immediately exports the production keys (all files can still "require" as normal)
	module.exports = require('./prod');
} else {
	//If we are on anything else (e.g our local machine) pull in and immediately exports the dev keys (all files can still "require" as normal)
	module.exports = require('./dev');
}
