const mongoose = require('mongoose');
const { Schema } = mongoose;
//Tracks if user has responded already (tracks if the user has already clicked on a response, prevents the user submitting multiple responses for a question)
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	//Title of the survey
	title: String,
	//Content
	body: String,
	//Email subject
	subject: String,
	//Tracks if user has responded or not - prevents multiple submissions, array of recipient schma, When a record is saved to the surveys collection it makes an array of recipient schemas (every object in the array must obey the schema)
	recipients: [RecipientSchema],
	//Number of yes responses
	yes: { type: Number, default: 0 },
	//Number of no responses
	no: { type: Number, default: 0 },
	//References which user responded to the survey - sets up relaitonship between schema and user, every survey belongs to a particular user, "Schema.Types.ObjectId" - refers to the unique id for the user, ref: 'User' - refers to the user collection, _user - indicates this is a reference field and that there is a relationship between this model and another one (this is naming convention, not a requirement)
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	//Records when survey was sent
	dateSent: Date,
	//Records when last response was recieved (used to know when to close surveys)
	lastResponded: Date
});

//Creates the model - Load our schema into the Mongoose library, makes a new collection inside of our MongoDB (that stores a list of surveys, surveys collection)
mongoose.model('surveys', surveySchema);
