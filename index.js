//On the back end we use a module system called common JS modules (a system in node js that allows code to be shared between files), on the front end (React) we use "import" a different module system called ES2015 modules (node JS does not have support for this hence the different syntax)
const express = require('express');
//We dont assign the require statement to a variable because nothing is returned, we just want the code inside to be executed
require('./services/passport');

//Creates a new express app (object) - defines config that listens to incoming requests from Node and send them to different route handlers
const app = express();

//When we import authRoutes it returns a function (as defined in authRoutes), "(app)" - we then immediately call this function and pass in the "app" object
require('./routes/authRoutes')(app);

//"const PORT = process.env.PORT" - Allows Heroku (AWS etc.) to dynamically define which port number Node listens to when we deploy our app, looks in the underlying runtime below node and finds the correct port to listen on, "|| 5000" - Development port, if we are on our local machine we hard code the port we want node to listen
const PORT = process.env.PORT || 5000;
//Tells Express to tell Node to listen to traffic on the number assigned in the PORT variable
app.listen(PORT);
