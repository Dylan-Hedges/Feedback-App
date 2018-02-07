//SurveyNEw shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	//Creates and initalises component level state - sets the state to false by default (we do not yet want to show the review form component yet), instead of writing out the constructor manually we can just write "state = { formReview: false}" which will use the "create-react-app" -> "babble" plugin to automatically create and initalise state
	state = { showReview: false };

	renderContent() {
		//If showFormReview is equal to true
		if (this.state.showFormReview === true) {
			//Return the SurveyFormReview component - onCancel={} (a prop, needs wiring to a button) when the user submits the form we change the state of "SurveyNew" ("showFormReview") to be false so that the survey form is displayed and the user can make changes
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}
		//Else return the survey form to be filled out -  onSurveySubmit={} when the user submits the form we change the state of "SurveyNew" ("showFormReview") to be true so that the review form is displayed
		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}
	//Render the outcome of "renderContent()" - will render whichever component is returned from "renderContent()"
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

//We wire up our Redux Form helper and use the default settings which destorys what the user has typed when navigating away (i.e user clicks cancel) unlike in SurveyForm.js where we keep what the user has typed when moving between the Survey Form <-> Review Form
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);
