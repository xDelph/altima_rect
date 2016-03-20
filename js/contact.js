import React, { Component } from 'react';

import formUtils from './formUtils';

function  getInputLabeled(labelText, inputType, handleChange, inputChange, inputValue) {
	return (
		<label>{labelText}
			<input type={inputType} onChange={(e) => handleChange(e, inputChange)} value={inputValue} />
		</label>
	)
}

export class Newsletter extends Component {
	state = { 
		name: '',
		firstName: '',
		mail: '',
		object: '',
		message: '',
		validation: '',
		send: false,
		display: 'block'
	}

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
		e.preventDefault()

		// une validation avec model serait plus judicieux, like backbone.js par example
		if (this.state.name.length < 3) this.setState({validation: "name must have 3 characters at least"})
		else if (this.state.firstname.length < 3) this.setState({validation: "firstname must have 3 characters at least"})
		else if (!/^.+@.+\..+$/.test(this.state.mail)) this.setState({validation: "the e-mail isn't valid"})
		else this.setState({validation: '', send: true})

		return false;
	}

	render() {
		var disableSubmit = !this.state.name || 
							!this.state.firstname || 
							!this.state.mail || 
							!this.state.object ||
							!this.state.message;
		var showErrorMessage = this.state.validation != '' ? {display:"block"} : {display:"none"};
		var showFormSend = this.state.send ? {display:"block"} : {display:"none"};

		return (
			<div id="contact" style={{display: this.state.display}}>
				<p>CONTACTEZ NOUS PAR TÉLÉPHONE OU PAR E-MAIL</p>
				<p>Contrary to popular belief. Lorem ipsum is not simply random text.</p>

				<div className="num">03 28 330 830</div>

				<form id="contactForm" onSubmit={this.handleSubmit} style={!this.state.send ? {display:"block"} : {display:"none"}}>
					{formUtils.getInputLabeled("Nom : *", {type: "text", onChange: (e) => this.handleChange(e, "name"), value: this.state.name})}
					{formUtils.getInputLabeled("Prénom : *", {type: "text", onChange: (e) => this.handleChange(e, "firstname"), value: this.state.firstname})}
					{formUtils.getInputLabeled("Adresse e-mail : *", {type: "text", onChange: (e) => this.handleChange(e, "mail"), value: this.state.mail})}
					{formUtils.getSelectLabeled("Objet du message : *", {type: "text", onChange: (e) => this.handleChange(e, "object")}, ['', 'Plus d\'information', 'Problème'])}
					{formUtils.getTextAreaLabeled("Message : *", {onChange: (e) => this.handleChange(e, "message"), value: this.state.message})}

					<div className="mandatory">* Champs obligatoires</div>
					<div className="validation" style={showErrorMessage}>{this.state.validation}</div>

					{formUtils.getButton({type: "submit", disabled: disableSubmit, className: ""}, "Envoyer")}
				</form>

				<div className="send" style={showFormSend}>Thanks</div>
			</div>
		);
	}
}

export default Newsletter;