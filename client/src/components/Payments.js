import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
	//Adds pay now button/form to our app - "token={}"- callback function that gets called with the stripe authorisation token representing the amount to charge the user, auth"amount={500}" - By default stripe uses USD (in cents, 500 = $5), you need to change it to your countries currency, {process.env.REACT_APP_STRIPE_KEY} - the key in ".env.development" replaces this variable when our app is being built by create-react-app, name="" - title for enter card form, description="" text,
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={token => console.log(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add credits</button>
			</StripeCheckout>
		);
	}
}

export default Payments;
