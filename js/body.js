import React, { Component } from 'react';

import Newsletter from './newsletter';
import Contact from './contact';
import Articles from './articles';
import Carousel from './carousel';

class Body extends Component {
	render() {
		return (
			<div>
				<h1>TEST D'INTÉGRATION</h1>
				<Newsletter />
				<Contact />
				<Articles />
				<Carousel />
			</div>
		);
	}
};

export default Body;