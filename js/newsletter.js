import React, { Component } from 'react';

export class Newsletter extends Component {
	state = { mail: '', hidden: '' }

	componentDidMount() {
		// un article se display en grand format, on hide la zone de newsletter
	    this.pubsub_token_hide = PubSub.subscribe('articleViewShow', function(topic, id) {
	      this.setState({ hidden: 'hidden' });
	  	}.bind(this));

	    // on redisplay la zone de newsletter
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

	render() {
		return (
			<div id="newsletter" className={this.state.hidden}>
				LA NEWSLETTER<br />
				L'actu et les bonnes affaires à ne pas manquer<br />

				<form id="subscribeForm" onSubmit={this.handleSubmit}>
					<input type="text" onChange={(e) => this.handleChange(e, 'mail')} placeholder="Votre adresse e-mail" value={this.state.mail} />

					<button type="submit" disabled={!this.state.username || !this.state.password} className="primary button float-right">
						Ok
					</button>
			     </form>
			</div>
		);
	}
}

export default Newsletter;