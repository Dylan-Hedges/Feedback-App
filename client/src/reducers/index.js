//Combines individual reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';

//Create and export  combineReducers call
export default combineReducers({
	auth: authReducer
});
