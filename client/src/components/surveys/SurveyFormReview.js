//Shows users their form inputs for for review
import _ from 'lodash';
import React from 'react';
//Imports connect helper
import { connect } from 'react-redux';
//Imports the different fields (e.g name, title, body, emails) into our form - we seperated this out because we also want to access this on our form review page
import formFields from './formFields';
//Teaches unaware components about react-router - "withRouer" is a helper function provided by React Router DOM to teach components in our application about react-router and how to use it (used when redirecting between front and back end)
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//Returns survey field values on screen - "({ onCancel })" - takes the prop from "SurveyForm.js", "onClick={onCancel}" - executes the function onCancel when the user clicks the button, "SurveyFormReview" - this name only needs to line up with the "export default" statement at the bottom, doesnt affect the rest of our app, "{ , formValues}" - pulls in the output of the "mapStateToProps" function which returns values from the Redux store to be displayed on screen for review, ", submitSurvey " - our form recieves the action creator as a prop (passed in from connect), ", "history }" - includes the history object (passed in when we export the component) which will be passed to the action creator on our submit button ("submitSurvey")
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
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

	//"onClick={submitSurvey(formValues))}" - submits the survey with the form values (under the prop "formValues") when the user clicks (executes our action creator in "index.js")
	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="green btn-flat right white-text"
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

//Pulls values out of our Redux store -"mapStateToProps" the name is not important, this is the conventional name, takes our Redux/App state and transforming them to props to be used by this component, "(state)" - we call the entire state object in our Redux store (you can see it contains the top level keys in our "combineReducers" call "index.js", you will also see alot of the properties under 'surveyForm' as set in our Redux form helper in "SurveyForm.js"(see 160)), this function will return a value that will be added as props to this component as defined below "(mapStateToProps)(SurveyFormReview)", "{formValues: state.form.surveyForm.values}" returns the values to be displayed on the review form screen
function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

//Wire up connect helper to our component - "mapStateToProps" passes in the result of this function, ", actions" passes in our action creators imported from above, "(withRouter(SurveyFormReview)" - we wrap the component we want to export with "withRouter", this will pass the "history" object to the "SurveyFormReview" component under props, we then pass this to our action creator
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
