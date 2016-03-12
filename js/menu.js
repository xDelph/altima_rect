import React, { Component } from 'react';

class Menu extends Component {
	state: {}

	handleClick = (e) => {
		// on retourne a l'acceuil standard
		PubSub.publish('articleViewHide', -1);
	}

	render() {
		return (
			<div id="menu">
				<div className="menuItem"><a>CONTACT</a></div>
				<div className="menuItem"><a>QUI SOMMES NOUS ?</a></div>
				<div className="menuItem"><a>ACTUALITÉS</a></div>
				<div className="menuItem" onClick={this.handleClick}><a>ACCUEIL</a></div>
				
				<div id="menuBar" />
			</div>
		);
	}
};

export default Menu;