//Action creator that uses Redux-Thunk and Axios
import axios from 'axios';
import { FETCH_USER } from './types';

//Checks if user is logged in on app launch - When Action Creator is called it will return a function - Requests user profile id - makes a request to our Express back end API to retrive the cached profile.id for the user, if no id = not logged in
const fetchUser = () => {
	//Redux-thunk sees we returned a function and will automatically call it,  "(dispatch)" - we want to dispatch the Action only after the API request has been completed (i.e we got back the profile id or null), "axios.get('/api/current_user')" - Asynchronous code, ".then" the profile id is returned as a promise, "(res => ({ type: FETCH_USER, payload: res }))" - when we get the response back from the API then we dispatch the action 'FETCH_USER' with the res (profile id or null)
	return function(dispatch) {
		axios
			.get('/api/current_user')
			.then(res => ({ type: FETCH_USER, payload: res }));
	};
};
