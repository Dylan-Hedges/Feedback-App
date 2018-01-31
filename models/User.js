const mongoose = require('mongoose');
//Condensed/Destructured version of "const Schema = mongoose.Schema;", the "mongoose" object has a property called "Schema", take this property and assign it to the variable "Schema"
const { Schema } = mongoose;

//Creates the Schema - describes the properties of our records (i.e the information we will store about our users logging in via Google)(can easily add or remove properties), "credits: { type: Number, default: 0}" - when we have more than one property we assign it as an object (user starts with 0 credits)
const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

//Creates the Model - pushes the schema (userSchema) into Mongoose and creates a new collection (called users), each record will have the properties defined in the Schema
mongoose.model('users', userSchema);
