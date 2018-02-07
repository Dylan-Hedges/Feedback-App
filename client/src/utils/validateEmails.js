//Regular expression that checks if email is invalid - HTML5 regular expression taken from "http://emailregex.com/" (we use HTML5 regex because the JS one produces a warning)
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
	const invalidEmails = emails
		//Split the emails at each comma - this will take the long string of emails, make a spilt each time there is a "," and store in an Array
		.split(',')
		//Removes spaces on each side of the email - ".map" iterates over the values in the "email" array and executes the ".trim()" function, this removes spaces on each side of the email (".map" takes the email out of the array, executes "email.trim()" and the results will be added to a new array, this new array gets passed from ".map" to emailsArray)
		.map(email => email.trim())
		//the ".filter()" function works similiarly to map, we pass it each individual email and we check to see if its valid, valid = false, invalid = true, if true is returned inside of the filter function then that value (the invalid email) will be kept inside the array otherwise the value (valid email) will be dumped, "re.test(email) === false" - takes the email, validates it agaisnt our regular expression (if the email matches the regular expression (is valid) then it will return true, otherwise returns false (email is invalid), we only want to return the emails that fail the test (invalid emails) so we include "=== false"
		.filter(email => re.test(email) === false);

	//If there are any invalid emails  - if "invalidEmails" has any length this means there were some invalid emails
	if (invalidEmails.length) {
		//return an error message
		return `These emails are invalid: ${invalidEmails}`;
	}

	//If there are no invalid emails return NULL
	return null;
};
