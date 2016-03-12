import React, { Component } from 'react';

export class Newsletter extends Component {
	state = { 
		name: '',
		firstName: '',
		mail: '',
		object: '',
		message: '',
		validation: '',
		send: false,
		hidden:''
	}

	componentDidMount() {
	    this.pubsub_token_hide = PubSub.subscribe('articleViewShow', function(topic, id) {
	      this.setState({ hidden: 'hidden' });
	  	}.bind(this));

	  	this.pubsub_token_show = PubSub.subscribe('articleViewHide', function(topic, id) {
	      this.setState({ hidden: '' });
	  	}.bind(this));
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token_hide);
    	PubSub.unsubscribe(this.pubsub_token_show);
    }

	handleChange = (e, field) => {
	    this.setState({
	      	[field]: e.target.value
	    });
	}

	handleSubmit = (e) => {
		e.preventDefault()

		if (this.state.name.length < 3) this.setState({validation: "name must have 3 characters at least"})
		else if (this.state.firstname.length < 3) this.setState({validation: "firstname must have 3 characters at least"})
		else if (!/^.+@.+\..+$/.test(this.state.mail)) this.setState({validation: "the e-mail isn't valid"})
		else this.setState({validation: '', send: true})

		return false;
	}

	render() {
		return (
			<div id="contact" className={this.state.hidden}>
				CONTACTEZ NOUS PAR TÉLÉPHONE OU PAR E-MAIL<br />
				Contrary to popular belief. Lorem ipsum is not simply random text.<br />

				<div className="num">03 28 330 830</div>

				<form id="contactForm" onSubmit={this.handleSubmit} style={!this.state.send ? {display:"block"} : {display:"none"}}>
					<label>Nom : *
						<input type="text" onChange={(e) => this.handleChange(e, 'name')} value={this.state.name} />
					</label><br />

					<label>Prénom : *
						<input type="text" onChange={(e) => this.handleChange(e, 'firstname')} value={this.state.firstname} />
					</label><br />

					<label>Addresse e-mail : *
						<input type="text" className="obligatoire"onChange={(e) => this.handleChange(e, 'mail')} value={this.state.mail} />
					</label><br />

					<label>Objet du message : *
						<input type="text" onChange={(e) => this.handleChange(e, 'object')} value={this.state.object} />
					</label><br />

					<label>Message : *
						<textarea onChange={(e) => this.handleChange(e, 'message')} value={this.state.message} />
					</label>

					<div className="mandatory">* Champs obligatoires</div>
					<div className="validation" style={this.state.validation != '' ? {display:"block"} : {display:"none"}}>{this.state.validation}</div>

					<button type="submit" disabled={!this.state.name || 
												!this.state.firstname || 
												!this.state.mail || 
												!this.state.object || 
												!this.state.message}> 
						Envoyer
					</button>
				</form>

				<div className="send" style={this.state.send ? {display:"block"} : {display:"none"}}>Thanks</div>
			</div>
		);
	}
}

export default Newsletter;