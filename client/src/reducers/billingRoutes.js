const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
	//Billing route handler - exchanges token for charge with Stripe API, watches for post requests made to '/api/stripe', takes the route and a request handler (an arrow function that takes the token, reaches out to the stripe API, finalizes the charge and update the users number of credits)
	app.post('/api/stripe', (req, res) => {});
};
