//Middleware - Checks that the user is logged in before making charges or adding credits (e.g a user manually send a request to '/api/stripe') if the user is not logged in ("req.user" doesnt exist) then respond with an error message, "next" - called when this particular middleware is finished (like "done") the reason why we have next is because there might be anoher middleware after this one
module.exports = (req, res, next) => {
	//If there is no user,
	if (!req.user) {
		//Return/exit out and send a response back to the user, "res.status(401)" - set the status code of the response, ".send()" - send back message to the browser
		return res
			.status(401)
			.send({ error: 'You need to be logged in to do that.' });
	}
	//Continues to the next part
	next();
};
