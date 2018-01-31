const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
//Require login middleware - only executed when someone makes a request for credits (i.e someone makes a post request to our '/api/stripe' backend route)
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	//Billing route handler - posts to the back end, exchanges token for charge with Stripe API, watches for post requests made to '/api/stripe', takes the route and a request handler (an arrow function that takes the token, reaches out to the stripe API, finalizes the charge and update the users number of credits), "(req, res) =>{}" = the function that has the asynchronous request inside of it therefore we put "async" in front
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//Chargers the user - Takes Stripe token, creates charge and bills card -  "stripe.charges.create({})" = the call that returns the promise therefore we put "await" in front of it, "const charge = " whatever the promise resolves with (the object that is returned) is passed to the variable "charge"
		const charge = await stripe.charges.create({
			//We specify charge amount for a 2nd time (1st time was on the front-end) on the back end (we want to charge $5) (returns a promise)
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			//Specify the credit card we want to bill (we do this by specifying the id from the token)
			source: req.body.id
		});
		//Updates number of credits - Adds 5 credits to the user (current only in memory) - "req.user" - references logged in user (managed up by passport)
		req.user.credits += 5;
		//Saves the user model (currently only in memory) back to the DB (with the new amount of credits) - this is an asynchronous request so we use the "await" syntax, "const user =" - takes the result of save and assigns it to the variable user
		const user = await req.user.save();
		//Sends user model back to whoever made the request (back to the browser) - Respondes to the request (using the "res" object)
		res.send(user);
	});
};
