import React, { Component } from 'react';

import Newsletter from './newsletter';
import Contact from './contact';
import ArticleList from './articleList';
import Carousel from './carousel';

class Body extends Component {
	state = {display: 'block'}

	componentDidMount() {
	    this.pubsub_token = PubSub.subscribe('modifyArticleState', function(topic, id) {
	    	if (id == -1) this.setState({display: 'block'});
	    	else this.setState({display: 'none'});
	  	}.bind(this));
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token);
    }

	render() {
		return (
			<div>
				<h1 style={{display: this.state.display}} className="title">Test d'intégration</h1>
				<Newsletter />
				<Contact />
				<ArticleList />
				<Carousel />
			</div>
		);
	}
};

export default Body;