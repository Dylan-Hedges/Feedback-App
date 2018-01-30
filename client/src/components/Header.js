//We are making it class based and not functional is not because it needs to manage component level state its just to make organising code easier
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Remember when dealing with React components we ned to change "class" to "className"
class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			//Finding out if the user is logged in
			case null:
				//returns nothing as we dont know if user is logged in
				return;
			//User is not logged in
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			//All other cases - user must be logged in - <a href="/api/logout"> redirect the user to the logout route on our backend Express API (this route then redirects them back to the default page)
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}
	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
						<a className="left brand-logo">Emaily</a>
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
