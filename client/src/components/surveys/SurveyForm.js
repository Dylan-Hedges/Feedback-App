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

//Array of objects containing the fields labels and names that will be passed into SurveyField
const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipent List', name: 'emails' }
];

//By using "component={SurveyField}" we delegate rendering the HTML content for the fields to the SurveyField component, "label="Survey Title" - Redux Form will automatically forward it to the "{SurveyField}" component
class SurveyForm extends Component {
	//._map(FIELDS) iterates over the list of fields. "({ label, name})" executes the function for every object in the array and saves "field.label" to a variable called "label" and "field.name" to a variable called "name",  "label={label}" make label equal to what is stored in our variable label (this is then passed to our SurveyField component for rendering on screen - same for "name"), key={name} React needs a unique each for each entry (we use name because it will always be unique)
	renderFields() {
		return _.map(FIELDS, ({ label, name }) => {
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
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

//Unlike "connect" our redux form takes only 1 argument called "form:"
export default reduxForm({
	form: 'surveyForm'
})(SurveyForm);
