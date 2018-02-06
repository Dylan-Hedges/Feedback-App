//Contains logic to render a single label and text input (this will be duplicated for title, subject line, body and recipient list - we will create each using props)
import React from 'react';

//Takes event handelers from Redux Form - Redux Form can be used to display HTML elements but its strength is in wiring up event the handlers for watching changes to the input, "props" - a number of props (e.g event handelers) are automatically being generated and passed in from Redux Form, these event handelers watch for any changes to the <input>, "({ input })" looks for the event handlers in "props.input" and assigns it to a variable called "input", ({ ,label}) - takes the label from SurveyForm.js and saves it into a variable called label
export default ({ input, label }) => {
	//Display a HTML input element on screen - "{...input}" passes the event handlers to our <input>
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
		</div>
	);
};
