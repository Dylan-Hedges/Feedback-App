//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
//"Field" - a ReduxForm component that can render any HTML form element (e.g text area, checkboxes, radio buttons etc.), "reduxForm" - a ReduxForm helper that allows our Component/Redux Form to commuicate with our Redux Store (<provider> tag) (reduxForm is similar to the "connect" helper)
import { reduxForm, Field } from 'redux-form';
//Renders our indiv
import SurveyField from './SurveyField';

//By using "component={SurveyField}" we delegate rendering the HTML content for the fields to the SurveyField component
class SurveyForm extends Component {
	renderFields() {
		return (
			<div>
				<Field type="text" name="title" component={SurveyField} />
			</div>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

//Unlike "connect" our redux form takes only 1 argument called "form:"
export default reduxForm({
	form: 'surveyForm'
})(SurveyForm);
