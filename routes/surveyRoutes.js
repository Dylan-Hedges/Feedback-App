const mongoose = require('mongoose');
//Middleware that checks the user is logged in - we dont want users that are not logged in to be able to make surveys
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
//Imports the mongoose model class surveys - we can use this to create a new instance of a survey (not yet persisted in our MongoDB)
const Survey = mongoose.model('surveys');

module.exports = app => {
	//If a user tries to make a new survey (i.e for post requests that come into '/api/surveys') check the user is logged in (execute requireLogin middleware), check the user has enough credits (execute requireCredits middleware), execute callback/create survey, "req" = object that represents the incoming request (contains title, subject, body, recipients(array, "," seperated string of addresses)),used to create a new instance of the survey using the mongoose model
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;
		//Creates a new instance of the survey - title is a shortened version of title: title, we can do this because the Key and Value is the same, recipients - the boolean is set to false by default (not clicked) so doesnt need to be altered, recipients.spilt(',') spilts the string on the "," character, each indivial spilt is a specific email which is storred in an array, ".map()" takes the array of strings and creates a new array of objects (loops through the array of strings and executes a function for each element in the array), "(email => ({ email }))" short for "(email => { return { email: email}})" - for every email address return an object with the property email + the email, "req.user.id" - id generated by mongoose/mongo, "dateSent: Date.now()" - saves when the survey was sent
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});
	});
};