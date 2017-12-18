//On the back end we use a module system common JS modules (a system in node js that allows code to be shared between files), on the front end (React) we use "import" a different module system called ES2015 modules (node JS does not have support for this hence the different syntax)
const express = require('express');
//Creates a new express app (object) - defines config that listens to incoming requests from Node and send them to different route handlers
const app = express();

//"app" object - represents the underlying express server which has route handlers associated with it, ".get" - creates new route handler using the HTTP GET method (could also be .POST, .PUT, .DELETE, .PATCH), '/' - route portion of handler express sends request to route specified here, "req" - a JS object that represents the incoming request (data about who is making the request), "res" - a JS object that represents the data being sent back
//"res.send({hi: "there"})" - arrow function is called by express every time a request comes into this route, the body of this function tells express to send back some JSON to whoever made the request
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

//"const PORT = process.env.PORT" - Allows Heroku (AWS etc.) to dynamically define which port number Node listens to when we deploy our app, looks in the underlying runtime below node and finds the correct port to listen on, "|| 5000" - Development port, if we are on our local machine we hard code the port we want node to listen
const PORT = process.env.PORT || 5000;
//Tells Express to tell Node to listen to traffic on the number assigned in the PORT variable
app.listen(PORT);
