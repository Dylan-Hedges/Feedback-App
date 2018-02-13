import React from 'react';

const Landing = () => {
	const headerstyle = {
		fontSize: '40px',
		textAlign: 'center',
		marginBottom: '5px'
	};
	const iconstyling = {
		fontSize: '400%',
		float: 'left'
	};
	const textstyling = {
		fontSize: '120%',
		float: 'left',
		paddingLeft: '15px'
	};

	//{{}} - one set of {} is to say we are passing in JS the other {} is the actual object we are passing in
	return [
		<div className="row">
			<h1 style={headerstyle}>Feedback App</h1>
		</div>,
		<div className="row">
			<p>
				Create surveys, collect feedback, make decisions, to get started just
				follow the steps below:
			</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_1
			</i>
			<p style={textstyling}>Login using Google</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_2
			</i>
			<p style={textstyling}>Add credits to your account</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_3
			</i>
			<p style={textstyling}>Create your survey</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_4
			</i>
			<p style={textstyling}>Add participants emails</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_5
			</i>
			<p style={textstyling}>Review and send!</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_6
			</i>
			<p style={textstyling}>View response metrics</p>
		</div>,
		<div className="row">
			<i
				style={iconstyling}
				className="medium material-icons blue-text text-accent-2"
			>
				filter_7
			</i>
			<p style={textstyling}>Use feedback to make decisions</p>
		</div>
	];
};

export default Landing;
