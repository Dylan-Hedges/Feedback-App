//Action creator that uses Redux-Thunk and Axios
import axios from 'axios';
import { FETCH_USER } from './types';

//Checks if user is logged in on app launch - When Action Creator is called it will return a function that requests the Google profile info, makes a request to our Express back end API to retrive the cached profile.id for the user, if no id = not logged in //Redux-thunk sees we returned a function and will automatically call it,  "(dispatch)" - we want to dispatch the Action only after the API request has been completed (i.e we got back the id or null), "axios.get('/api/current_user')" - Makes AJAX request to back end express for id (returned as a promise),  "dispatch ({ type: FETCH_USER, payload: res }));" - after we get a response back from the backend Express API then we dispatch the action 'FETCH_USER' with the payload "res" (id or null)
export const fetchUser = () => async dispatch => {
	//Makes AJAX request for user id and saves it to "res" (note this is an Axios output)
	const res = await axios.get('/api/current_user');
	//Once request is completed, dispatches the action to reducers with the payload of res (id, if found)
	dispatch({ type: FETCH_USER, payload: res });
};
