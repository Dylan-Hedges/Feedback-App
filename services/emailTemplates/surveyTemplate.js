const keys = require('../../config/keys');

module.exports = survey => {
	//Takes the body text and returns a string with <div> tags for use on the .html page, `` - backticks/string templates, allows for multiple lines of HTML and the use of JS variables
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your input</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
