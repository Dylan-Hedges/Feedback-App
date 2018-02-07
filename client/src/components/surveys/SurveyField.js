//Contains logic to render a single label and text input (this will be duplicated for title, subject line, body and recipient list - we will create each using props)
import React from 'react';

//Takes event handelers from Redux Form - Redux Form can be used to display HTML elements but its strength is in wiring up event the handlers for watching changes to the input, "props" - a number of props (e.g event handelers) are automatically being generated and passed in from Redux Form, these event handelers watch for any changes to the <input>, "({ input })" looks for the event handlers in "props.input" and assigns it to a variable called "input", ({ ,label}) - takes the label from SurveyForm.js and saves it into a variable called label, "meta: { error, touched }" - go into the "meta" property and take out the "error" and "touched" values (ES6 destructuring)
export default ({ input, label, meta: { error, touched } }) => {
	//Display a HTML input element on screen - "{...input}" passes the event handlers to our <input>, "{ touched && error }" - if the user has clicked in the field (tocuhed = true) and there is an error (e.g error="Plese enter title") then display the error message on screen (note if the user has not clicked in then touched=false and the boolean statement will exit)
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
