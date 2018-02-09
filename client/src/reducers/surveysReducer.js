import { FETCH_SURVEYS } from '../actions/types';

//Reducer that returns the list of surveys created by the user - "state = []" - when the app boots up we want the default state to start as a blank array because later will we are returning an array of surveys a user has created
export default function(state = [], action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}
