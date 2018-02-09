//Action creator that uses Redux-Thunk and Axios
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//Checks if user is logged in on app launch - When Action Creator is called it will return a function that requests the Google profile info, makes a request to our Express back end API to retrive the cached profile.id for the user, if no id = not logged in //Redux-thunk sees we returned a function and will automatically call it,  "(dispatch)" - we want to dispatch the Action only after the API request has been completed (i.e we got back the id or null), "axios.get('/api/current_user')" - Makes AJAX request to back end express for id (returned as a promise),  "dispatch ({ type: FETCH_USER, payload: res }));" - after we get a response back from the backend Express API then we dispatch the action 'FETCH_USER' with the payload "res" (id or null)
export const fetchUser = () => async dispatch => {
	//Sends request for logged in user info - Makes AJAX request for user id and saves it to "res" (note this is the output from Axios)
	const res = await axios.get('/api/current_user');
	//Returns user data - Once request is completed, dispatches the action to reducers with the payload of res (id, if found), ".data" contains the id's which is the only thing we care about (the rest is not needed data)
	dispatch({ type: FETCH_USER, payload: res.data });
};

//Posts Stripe token to back end server
export const handleToken = token => async dispatch => {
	//Sends Stripe payment authorisation token to our back end - Makes a post request to our back end server (using Axios) with the token
	const res = await axios.post('/api/stripe', token);
	//Return amount of credits user has - We reuse/dispatch the same action type as for fetch user because all we need back is the amount of credits the user has (which is already returned in fetch user)
	dispatch({ type: FETCH_USER, payload: res.data });
};

//Submits the form to our backend API - sends a post request of "values" to our backend route 'api/surveys', then fetches our user, ", history" includes history which is used to redirect users after submitting a survey to the back end
export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	//Requests/saves user data - Makes request to back end for the logged in users data and saves the response it in a variable called "res"
	const res = await axios.get('/api/surveys');
	//Sends list of surveys to reducer - "payload: res.data" - after the response is saved in the variable "res" we extract the list of surveys from "res.data" and assign it as the payload (this is an array of all the different surveys the logged in user has created)
	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
