//Imports our CSS styling file - We write the whole path as we only want the css file and not the whole npm module, When importing non JS files we have to add the exension ".css" (.js files we dont need to specify), we dont need the variable name "materializeCSS" or "from" because we are not saving anything in a variable
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers';

//Creates Redux store - takes reducers, the inital state of app, middleware (our app has 2 reducers, an authReducer (checks if user is logged in) and a surveysReducer)
const store = createStore(reducers, {}, applyMiddleware());

//Renders root component in DOM - Takes root component (< /> are jsx tags - these tags create an instance of the component which ReactDOM expects), and where we want to render it to inside of our DOM (we refrence id="root" inside of our public->index.html file as this is where everything is rendered to)
ReactDOM.render(
	//Links Redux (store) <-> React (view) side of our app using the <Provider> tags (this is a react component that knows how to read changes from our Redux store, Provider will inform all of its children components of new states/state changes in the Redux store)
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
