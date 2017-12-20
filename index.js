//On the back end we use a module system called common JS modules (a system in node js that allows code to be shared between files), on the front end (React) we use "import" a different module system called ES2015 modules (node JS does not have support for this hence the different syntax)
const express = require('express');
const passport = require('passport');
//Save only the "Strategy" property from 'passport-google-oauth20' into the "GoogleStrategy" variable
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Creates a new express app (object) - defines config that listens to incoming requests from Node and send them to different route handlers
const app = express();

//"passport.use()" - makes Passport aware of whatever is inside the () in this case the Google strategy,"new GoogleStrategy()" - Creates a new instance of the Google Passport strategy i.e a new user wants to authenticate with Google
passport.use(new GoogleStrategy());

//"const PORT = process.env.PORT" - Allows Heroku (AWS etc.) to dynamically define which port number Node listens to when we deploy our app, looks in the underlying runtime below node and finds the correct port to listen on, "|| 5000" - Development port, if we are on our local machine we hard code the port we want node to listen
const PORT = process.env.PORT || 5000;
//Tells Express to tell Node to listen to traffic on the number assigned in the PORT variable
app.listen(PORT);
