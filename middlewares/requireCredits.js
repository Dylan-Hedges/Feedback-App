//Middleware - Checks that the user has enough credits
module.exports = (req, res, next) => {
	//If the number of credits is less than 1
	if (req.user.credits < 1) {
		//Return/exit out and send a response back to the user, "res.status(401)" - set the status code of the response, ".send()" - send back message to the browser //We can use 403 instead of 401 as this code is closer to the type of error - 400-499 codes are mainly for user error
		return res
			.status(403)
			.send({ error: 'You need to purchase more credits to do that.' });
	}
	//Continues to the next part
	next();
};
