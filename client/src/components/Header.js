//We are making it class based and not functional is not because it needs to manage component level state its just to make organising code easier
import React, { Component } from 'react';
import { connect } from 'react-redux';
//A type of react router that works inside of the browser
import { Link } from 'react-router-dom';

//Remember when dealing with React components we ned to change "class" to "className"
class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			//Identifying if user is logged in
			case null:
				//returns nothing as we dont know if user is logged in
				return;
			//User is not logged in
			case false:
				return (
					//Displays log in button that links to our Google OAuth flow
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			//User is logged in (all other possibilites) - <a href="/api/logout"> redirect the user to the logout route on our backend Express API (this route then redirects them back to the default page)
			default:
				return (
					//Displays logout button that links to our back end Express API
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}
	//Link to={} - Navigate to the react route inside of the {}, this.props.user ? '/surveys' : '/' - if a user exists (is logged in/true) go to the surveys page, if a user does not exist (logged out/false) go to the root page
	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
						<Link
							to={this.props.auth ? '/surveys' : '/'}
							className="left brand-logo"
						>
							Emaily
						</Link>
						<ul className="right">{this.renderContent()}</ul>
					</div>
				</nav>
			</div>
		);
	}
}

//Calls state.auth out of the redux store (defined in index.js)
function mapStateToProps({ auth }) {
	//Passes object to the header component as "this.props.auth"
	return { auth: auth };
}

export default connect(mapStateToProps)(Header);

//Hook up component to the redux store - 1. import { connect } from 'react-redux' 2. "mapStateToProps" 3. extract specific pieces of state
