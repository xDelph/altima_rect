import React, { Component } from 'react';

class Menu extends Component {
	state = {
		displayContact: "none",
		displayActu: "none",
		displayAbout: "none",
		displayHome: "block",
	}

	componentDidMount() {
		this.pubsub_token = PubSub.subscribe('modifyArticleState', function(topic, id) {
			if (id == -1) this.setState({displayHome: "block", displayActu: "none"})
			else this.setState({displayHome: "none", displayActu: "block"})
		}.bind(this));
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token);
    }

	handleClickHome = (e) => {
		PubSub.publish("modifyArticleState", -1);
		PubSub.publish("modifyHomeState", "block");

		if (history.pushState) history.pushState(null, null, '#');
		else document.location.hash = '#';
	}

	handleClickActu = (e) => {
		PubSub.publish("modifyArticleState", 0);
		PubSub.publish("modifyHomeState", "none");

		if (history.pushState) history.pushState(null, null, '#{0}');
		else document.location.hash = '#{0}';
	}

	render() {
		return (
			<div id="menu">
				<div className="menuItem"><a disabled>CONTACT</a><span style={{display: this.state.displayContact}}className="shape"></span></div>
				<div className="menuItem"><a disabled>QUI SOMMES NOUS ?</a><span style={{display: this.state.displayAbout}}className="shape"></span></div>
				<div className="menuItem" onClick={this.handleClickActu}><a>ACTUALITÉS</a><span style={{display: this.state.displayActu}}className="shape"></span></div>
				<div className="menuItem" onClick={this.handleClickHome}><a>ACCUEIL</a><span style={{display: this.state.displayHome}}className="shape"></span></div>
				<div id="menuSeparator"></div>
				<div id="menuBar" />
			</div>
		);
	}
};

export default Menu;