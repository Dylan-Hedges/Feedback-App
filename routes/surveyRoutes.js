//Middleware that checks the user is logged in - we dont want users that are not logged in to be able to make surveys
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

module.exports = app => {
	//If a user tries to make a new survey (i.e for post requests that come into '/api/surveys') check the user is logged in (execute requireLogin middleware), check the user has enough credits (execute requireCredits middleware), execute callback/create survey
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {});
};
