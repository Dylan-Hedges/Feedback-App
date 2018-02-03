//Middleware that checks the user is logged in - we dont want users that are not logged in to be able to make surveys
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	//If any post requests come into '/api/surveys' then execute the arrow function
	app.post('/api/surveys', requireLogin, (req, res) => {});
};
