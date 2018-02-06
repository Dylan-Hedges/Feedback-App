//Note - there is alot of configuration here that is required by SendGrid, hence it may be slightly different than normal
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//"helper.Mail" - an object that takes alot of configuration and spits out a mailer (contains functions etc. from helper.Mail)
class Mailer extends helper.Mail {
	//Inital set up for any new instance of Mailer that we create (surveyRoutes.js) - "recipients" property is an Array of objects (subdocument collection {email: 'email@email.com'})
	constructor({ subject, recipients }, content) {
		super();
		//Sets API object that lets us communicate with SendGrid API using our keys
		this.sgApi = sendgrid(keys.sendGridKey);
		//Sets the 'from' email address -"helper.Email" helper function from SendGrid library, formats 'from' to work correctly inside of an email (sent by SendGrid)
		this.from_email = new helper.Email('no-reply@emaily.com');
		//Sets the subject of the email
		this.subject = subject;
		//Sets the body of the email (the HTML)-"helper.Content" helper function from SendGrid library, formats the body to work correctly inside of an email (sent by SendGrid)
		this.body = new helper.Content('text/html', content);
		//Sets the list of recipients (who the email will be sent to)
		this.recipients = this.formatAddresses(recipients);

		//Adds the content to the body of the mail - just setting "helper.Content" is not enough you also have to manually specify the content you want to appear in the body, ".addContent" is a built in function from "helper.Mail"
		this.addContent(this.body);
		//Adds clicktracking - sets the custom hyperlinks "Yes" "No" options so SendGate can gather data about what users have clicked on
		this.addClickTracking();
		//Adds recipients that will be mailed (SendGrid config)
		this.addRecipients();
	}

	//Adds recipients that will be mailed (SendGrid config)
	addRecipients() {
		//Define personalize variable
		const personalize = new helper.Personalization();
		//Iterated/looped over the list of recipients (helper.Email objects)
		this.recipients.forEach(recipient => {
			//Add each recipient to the personalize object
			personalize.addTo(recipient);
		});
		//Execute the "addPersonalization" function on the entire "personalize" object
		this.addPersonalization(personalize);
	}

	//Turns recipient list into helper.Email objects (SendGrid config)
	formatAddresses(recipients) {
		//Loops over the "recipients" array and executes a function for each entry - "map" over the "recipients" array, for every recipient in the array pull off the email property (remember this is a subdocument collection)
		return recipients.map(({ email }) => {
			//Format the emails with "helper.Email" and return it (creates helper email objects) - turns "this.recipients" into an array of formatted emails
			return new helper.Email(email);
		});
	}

	//SendGrid settings for custom hyperlinks/metrics gathering
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);
		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	//Sends to SendGrid
	async send() {
		//Configuration for sending to SendGrid
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			//Converts body to JSON - Takes different properties (subject, recipients, body, from) and convert them to JSON data
			body: this.toJSON()
		});
		//Sends to SendGrid - takes our API key, calls the ".API" function defined by SendGrid and passes it our "request" variable
		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
