import React, { Component } from 'react';

import formUtils from './formUtils';

export class Newsletter extends Component {
	state = { mail: '', display: 'block' }

	componentDidMount() {
		this.pubsub_token = PubSub.subscribe('modifyHomeState', function(topic, display) {
			this.setState({display: display});
		}.bind(this));
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token);
    }

	handleChange = (e, field) => {
	    this.setState({
	    	[field]: e.target.value
	    });
	}

	handleSubmit = (e) => {
	    e.preventDefault();
	    alert(`Thanks for subscribing`);
	}

	render() {
		var disableSubmit = !this.state.mail;

		return (
			<div id="newsletter" style={{display: this.state.display}}>
				<p>LA NEWSLETTER</p>
				<p>L'actu et les bonnes affaires à ne pas manquer</p>

				<form id="subscribeForm" onSubmit={this.handleSubmit}>
					{formUtils.getInput({type: "text", placeholder: "Votre adresse e-mail", onChange: (e) => this.handleChange(e, "mail"), value: this.state.mail})}
					{formUtils.getButton({type: "submit", disabled: disableSubmit}, "Ok")}
			     </form>
			</div>
		);
	}
}

export default Newsletter;