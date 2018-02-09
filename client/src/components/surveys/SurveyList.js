import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
	//Lifecycle method that makes sure when the component is rendered to screen we call the "fetchSurveys" action creator
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {
			// "key={survey._id}" - by deafult we need a key as we are rendering a list (React requirement), ".id" - only mongoose recognises, "_.id" - the browser, mongo queries etc. recognises, "{new Date(survey.dateSent).toLocaleDateString()}" - takes the computer looking "survey.dateSent" and returns a nice human read-able date
			return (
				<div className="card darken-1" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
						<div className="card-action">
							<a>Yes: {survey.yes}</a>
							<a>No: {survey.no}</a>
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

//Pulls in the list of surveys - "({surveys})" takes the surveys property from the global/app level state
function mapStateToProps({ surveys }) {
	//Returns an object containing a list of user created surveys - "{ surveys }" is a destructured version of "{ surveys: surveys }" as the K/V is the same
	return { surveys };
}
//Exports this component - passes in the result of "mapStateToProps" + our fetch surveys action creator to this component then exports
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
