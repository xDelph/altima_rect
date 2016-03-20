import React, { Component } from 'react';
import Article from './article';

var articles = require('json!./../api/articles.json');

class ArticleList extends Component {
	state = {
		className: ''
	}

	rows = []

	componentWillMount() {
		for (var l = articles.length, i = 0; i < l ; i++) {
			articles[i].id = i;
			articles[i].prev = i > 0 ? i-1 : -1;
			articles[i].next = i < l-1 ? i+1 : -1;
			articles[i].view = false;

			this.rows.push(<Article key={i} data={articles[i]} />);
		}
	}

	componentDidMount() {
		this.pubsub_token = PubSub.subscribe('modifyArticleState', function(topic, id) {
			this.setState({className: id == -1 ? '' : 'bigFormat'});
		}.bind(this));	

		var hash = document.location.hash;
	  	hash = parseInt(hash.substring(hash.indexOf('{')+1, hash.indexOf('}')));

	  	if (Number.isInteger(hash) && hash > -1 && hash < articles.length) { 
	  		PubSub.publish("modifyArticleState", hash);
	  		PubSub.publish("modifyHomeState", "none");
	  	}
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token);
    }

	render() {
		return (
			<div id="articleList" className={this.state.className}>{this.rows}</div>
		);
	}
}

export default ArticleList;