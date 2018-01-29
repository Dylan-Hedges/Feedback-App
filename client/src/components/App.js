import React from 'react';
//BrowserRouter - manages what components are on screen, Route - sets up rules between components and routes - Helpers that allow you to navigate around the DOM (similar libraries available for react-native and the core react router library)
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

//Renders our App - "{exact}"(JSX syntax for "exact={true}") React Router will only return the components for the EXACT path e.g "localhost:3000/surveys" will only return one component (otherwise it would also return the component for "/"), by default React Router will greedily return the search results  e.g "/" and "/surveys" will both be returned/shown on screen because they both contain "/" - <BrowserRouter> can only have 1 child, our routes need to go inside this child component, "<Route path="/" component={Landing} />" - takes the path our user will visist and the component to be displayed, <Header /> - displays header for every path it will always render the header first then the components (depending on the path)
const App = () => {
	return (
		<div className="container">
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/surveys" component={Dashboard} />
					<Route path="/surveys/new" component={SurveyNew} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
