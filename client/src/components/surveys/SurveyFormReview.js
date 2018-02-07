//Shows users their form inputs for for review
import _ from 'lodash';
import React from 'react';
//Imports connect helper
import { connect } from 'react-redux';
//Imports the different fields (e.g name, title, body, emails) into our form - we seperated this out because we also want to access this on our form review page
import formFields from './formFields';

//Returns survey field values on screen - "({ onCancel })" - takes the prop from "SurveyForm.js", "onClick={onCancel}" - executes the function onCancel when the user clicks the button, "SurveyFormReview" - this name only needs to line up with the "export default" statement at the bottom, doesnt affect the rest of our app, "{ , formValues}" - pulls in the output of the "mapStateToProps" function which returns values from the Redux store to be displayed on screen for review
const SurveyFormReview = ({ onCancel, formValues }) => {
	//Iterate over the fields and for each field execute a function that returns html, this is then placed into a new array called "reviewFields", "({name, label})" - we are only extracting the name and label properties
	const reviewFields = _.map(formFields, ({ name, label }) => {
		//Returns html for each of our survey fields - "{formvalues[field.name]}" remember "formValues" is the new array and we want to access only the name for EACH entry, "<div key={name}>" when we produce a list of elements React wants us to have a unique key, hence why we are using the individual "name" as a key
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
		</div>
	);
};

//Pulls values out of our Redux store -"mapStateToProps" the name is not important, this is the conventional name, takes our Redux/App state and transforming them to props to be used by this component, "(state)" - we call the entire state object in our Redux store (you can see it contains the top level keys in our "combineReducers" call "index.js", you will also see alot of the properties under 'surveyForm' as set in our Redux form helper in "SurveyForm.js"(see 160)), this function will return a value that will be added as props to this component as defined below "(mapStateToProps)(SurveyFormReview)", "{formValues: state.form.surveyForm.values}" returns the values to be displayed on the review form screen
function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

//Wire up connect helper to our component
export default connect(mapStateToProps)(SurveyFormReview);
