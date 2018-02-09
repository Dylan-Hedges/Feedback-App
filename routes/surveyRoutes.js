//Used for iteration (contains _.map)
const _ = require('lodash');
//Used to extract parts of a URL
const Path = require('path-parser');
//A helper used to parse URLs - 'url' is a default/integrated module in Node.js, URL is a specific helper inside of 'url'
const { URL } = require('url');
const mongoose = require('mongoose');
//Middleware that checks the user is logged in - we dont want users that are not logged in to be able to make surveys
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
//Imports the template that produces the html body
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');
//Imports the mongoose model class surveys - we can use this to create a new instance of a survey (not yet persisted in our MongoDB)
const Survey = mongoose.model('surveys');

module.exports = app => {
	//Route user is taken to after responding to survey - we include the ":surveyId" and ":choice" wildcards (variables for change depending on the survey and choice submitted)
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		//Creates a matcher - Tells path that want to extract the survey id and choice from "pathname",":surveyId" and ":choice" refers to variables
		const p = new Path('/api/surveys/:surveyId/:choice');

		//Executes multiple lodash helpers in order - ".map" over the list/array of all the events in "req.body" ,".map()" -> ".compact()" -> ".uniqBy()" -> ".value()", "req.body" is a list of all the events when the elements in this list are altered it is automatically passed to the next helper in the chain, we do not have to manually pass on the value, "_" is removed from the start of each helper, "const = events" - we can remove this variable because it is no logner reference with our chain statement, instead we directly pass in "req.body"
		_.chain(req.body)
			//Iterates over the list/array send by SendGrid - "req.body" = the list of events from SendGrid, "({ email, url }) =>{}" for every element in the array (req.body) extract the email and url then execute a function
			.map(({ email, url }) => {
				//Identifies and returns matches - "p.test()" will return an object containing the successful matches or null (needs to extract both the survey id AND choice), takes the parsed URL and runs it agaisnt the matcher("p"), it then returns an object containing the results (in this case "surveyID" and "choice"), "new URL(url).pathname" - Extracts the route portion of the URL
				const match = p.test(new URL(url).pathname);
				//If a match is found
				if (match) {
					//Returns an object containing the users email and the match results (surveyId, users choice)("email" is a destructured version of "email: email" we can do this when the K/V is the same)
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			//Removes undefined elements - lodash helper, takes an array, goes through all the elements, removes undefined elements (e.g elements we didnt want)
			.compact()
			//Removes duplicate elements - lodash helper, checks using the 'email' AND 'surveyId' properties, if there are any duplicates then it removes them
			.uniqBy('email', 'surveyId')
			//Updates our MongoDB - ".each()" iterates over event event/element in the array and executes our MongoDB query, "{ surveyId, email, choice }" passes in the survey id, user email and there choice (yes/no), we dont need "async/await" because we are not sending any responses back to SendGrid, once we recieve the data from SendGrid we just process it, we dont send anything back
			.each(({ surveyId, email, choice }) => {
				//Find and update one record in a survey  - look at the 'Survey' collection and find and update exactly one record, (this is a query we execute on our MongoDB, no exchange between the Express server <-> MongoDB, we are just sending an instruction to MongoDB to make an update)
				Survey.updateOne(
					{
						//Find the survey we care about - finds a survey with this given id, "_id" when passing a query to MongoDB we must include the "_" in front of "id"
						_id: surveyId,
						recipients: {
							//Find the recipient we care about (in the subdocument collection) - finds the recipient with a specific email and has not responded to the survey
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						//Increment 'yes' or 'no' by +1 - Change "[choice]" to 'yes' or 'no' depending on the response and increment it by +1 ("$inc"),  mongo operator (lets us put intelligent logic inside of a query that we issue to our MongoDB)
						$inc: { [choice]: 1 },
						//Update the recipient's responded property to be true - user has now responded to our survey, inside of the survey that was found, look inside 'recipients' -> 'responded' -> set to true, '$' references the recipient we care about ('$' references the result of the '$eleMatch' query which returned a specific recipient/specific index value in the array)
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
					//Executes the query to MongoDB
				).exec();
			})
			//Returns the values - after executing all helpers return the final values as a new array, this is then saved to the "events" variable
			.value();

		res.send({});
	});

	//If a user tries to make a new survey (i.e for post requests that come into '/api/surveys') check the user is logged in (execute requireLogin middleware), check the user has enough credits (execute requireCredits middleware), execute callback/create survey, "req" = object that represents the incoming request (contains title, subject, body, recipients(array, "," seperated string of addresses)), creates a new instance of the survey using the model, "async" see "await"
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		//Creates a  new instance of the survey - title is a shortened version of title: title, we can do this because the Key and Value is the same, recipients - the boolean is set to false by default (not clicked) so doesnt need to be altered, recipients.spilt(',') spilts the string on the "," character, each indivial spilt is a specific email which is storred in an array, ".map()" takes the array of strings and creates a new array of objects (loops through the array of strings and executes a function for each element in the array), "(email => ({ email }))" short for "(email => { return { email: email}})" - for every email address return an object with the property email + the email, "req.user.id" - id generated by mongoose/mongo, "dateSent: Date.now()" - saves when the survey was sent
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		//Creates a new Mailer instance - "(survey)" passes in an object that contains the "subject" and "recipients" properties, "surveyTemplate(survey)" content of the email (html) - calls the function inside of surveyTemplate.js and passes in the "survey" object/model (defined above), "new" - creates a new instance of a class,
		const mailer = new Mailer(survey, surveyTemplate(survey));

		//Catches any errors when sending mails, saving surveys, minus credits etc.
		try {
			//".send()" is an async function (we have to wait for API request inside of it to complete (i.e mailer sent to SendGrid) before we send the survey), "await" refers to "app.post()"
			await mailer.send();
			//Saves the survey to the DB (after sending to SendGate API), "await" - wait until the ".send();" request to the SendGrid API is complete before saving to the DB
			await survey.save();
			//Minus 1 credit from users account
			req.user.credits -= 1;
			//Save the updated user
			const user = await req.user.save();
			//Send back user model with updated number of credits
			res.send(user);
		} catch (err) {
			//Sends a response code with the error if any issues
			res.status(422).send(err);
		}
	});
};
