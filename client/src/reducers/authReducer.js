import { FETCH_USER } from '../actions/types';
//Reducer that identifies if the user is logged in - "state=null" we dont know if the user is logged in, "action.payload" - the user is logged in, "false" - the user is not logged in
export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			//Returns the user model - "action.payload" = return the user model object, "|| false" or return the value false
			return action.payload || false;
		default:
			return state;
	}
}
