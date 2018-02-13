//SurveyForm shows a form for a user to add input
//Assists in iterating over the FIELDS object (contains the .map function)
import _ from 'lodash';
import React, { Component } from 'react';
//"Field" - a ReduxForm component that can render any HTML form element (e.g text area, checkboxes, radio buttons etc.), "reduxForm" - a ReduxForm helper that allows our Component/Redux Form to commuicate with our Redux Store (<provider> tag) (reduxForm is similar to the "connect" helper)
import { reduxForm, Field } from 'redux-form';
//Allows the app to use <link> tags so user can navigate between pages
import { Link } from 'react-router-dom';
//Imports the SurveyField component
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
//Imports the different fields (e.g name, title, body, emails) into our form - we seperated this out because we also want to access this on our form review page
import formFields from './formFields';

//By using "component={SurveyField}" we delegate rendering the HTML content for the fields to the SurveyField component, "label="Survey Title" - Redux Form will automatically forward it to the "{SurveyField}" component
class SurveyForm extends Component {
	//._map(FIELDS) iterates over the list of fields. "({ label, name})" executes the function for every object in the array and saves "field.label" to a variable called "label" and "field.name" to a variable called "name",  "label={label}" make label equal to what is stored in our variable label (this is then passed to our SurveyField component for rendering on screen - same for "name"), key={name} React needs a unique each for each entry (we use name because it will always be unique)
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	render() {
		// "onSubmit={}" - when the user submits the form we execute the "onSurveySubmit" function, which changes the state of our show review form (located in "SurveyNew.js"), we dont include "()" for "onSurveySubmit" otherwise the JS interpreter will execute the function as soon as it has been read, when we only want it called after the user has submitted the form
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="blue btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

//Field validation function - "values" = an object that contains the name of each field and the value (get title: my title, see "const FIELDS=[]")
function validate(values) {
	//Defines errors object - If the errors object is empty when returned it means there are no errors
	const errors = {};
	//Checks for invalid emails - Passes our emails into our "validateEmails" function, if there are any invalid emails it will reutrn a string stating the invalid emails, otherwise we will return "undefined", || '' - "validateEmails" executes when the page loads which causes an error, to fix this we use an OR statement which will pass an empty string to the function if no emails have been typed yet
	errors.recipients = validateEmails(values.recipients || '');
	//Iterates over each field - Uses lodash ("_.") to iterate over the FIELDS object and execute a function for each element (works similarly to ".map")
	_.each(formFields, ({ name }) => {
		//If there is no value in the field - To reference "values" -> "name" at runtime so we need to use [] (we dont use "values.name")
		if (!values[name]) {
			//Return an error message - this is a generic message but can be customised (see 154)
			errors[name] = 'You must provide a value.';
		}
	});

	//If applicable return errors
	return errors;
}

//Redux Form helper - Initalises and configures the survey form, Unlike "connect" our redux form takes only 1 argument called "form:", "destroyOnUnmount: false" keeps the values in our fields when going back to the survey form from our review form, doesn't destory the form when not on screen (default = true)
export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
