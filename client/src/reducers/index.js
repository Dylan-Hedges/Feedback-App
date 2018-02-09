//Combines individual reducers
import { combineReducers } from 'redux';
//Imports the reducer created by Redux Form - allows us to use all of its features in our app, the name of the function is 'reducer' which isnt very descriptive, es2015 module imports allow us to rename imported variable to be called "reduxForm" by adding in "as"
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//Create and export combineReducers call
export default combineReducers({
	//Assigns the the output of "authReducer" to the "auth" key (every reducer has to have a key, the output of the reducer will be in the Redux store under this K/V pair)
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer
});
