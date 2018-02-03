//Recipient subdocument model - records if user has already clicked on a response
const mongoose = require('mongoose');
const { Schema } = mongoose;

//responded: { type: Boolean, default false} - tracks if the user has clicked "Yes" or "No" already, we default it to "false" as the user has not yet clicked on anything
const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

//Instead of registering the Schema with mongoose we are going to export the schema
module.exports = recipientSchema;
