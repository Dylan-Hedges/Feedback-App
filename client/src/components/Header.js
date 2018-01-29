//We are making it class based and not functional is not because it needs to manage component level state its just to make organising code easier
import React, { Component } from 'react';

//Remember when dealing with React components we ned to change "class" to "className"
class Header extends Component {
	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
						<a className="left brand-logo">Emaily</a>
						<ul className="right">
							<li>
								<a>Login With Google</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
