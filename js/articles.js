import React, { Component } from 'react';

var articles = require('json!./../api/articles.json');

class Article extends Component {
	state = {
		view: false,
		hidden: ''
	}

	componentWillMount() {
		this.setState({view: this.props.data.view})
	}	

	componentDidMount() {
	    this.pubsub_token_hide = PubSub.subscribe('articleViewShow', function(topic, id) {
	      	if (this.props.data.id != id) this.setState({ hidden: 'hidden' });
	      	else this.setState({ hidden: '', view: true });
	  	}.bind(this));

	  	this.pubsub_token_show = PubSub.subscribe('articleViewHide', function(topic, id) {
	      	this.setState({ hidden: '', view: false });
	  	}.bind(this));
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token_hide);
    	PubSub.unsubscribe(this.pubsub_token_show);
    }

	handleClick = (e) => {
		if (this.state.view) return;

		this.setState({ hidden: '', view: true });
		PubSub.publish("articleViewShow", this.props.data.id);
	}

	handleClickNext = (e) => {
		PubSub.publish("articleViewShow", this.props.data.next);
		this.setState({ hidden: 'hidden', view: false });
	}

	handleClickPrev = (e) => {
		PubSub.publish("articleViewShow", this.props.data.prev);
		this.setState({ hidden: 'hidden', view: false });
	}

	render() {
		var className = "article "+this.state.hidden

		return (
			<div className={className}>
				<div className="thumbs"><img src={this.props.data.thumbnail} /></div>
				<div className="title" onClick={this.handleClick}>{this.props.data.title}</div>
				<div className="date">{this.props.data.date}</div>
				
					{(() => {
						if (!this.state.view) {
							return (
								<div>
									<div className="content">{this.props.data.intro.substr(0, 100)}...</div>
									<div className="plus">En savoir plus</div>
								</div>
							)
						}
						else {
							return (
								<div>
									<div className="content" dangerouslySetInnerHTML={{__html: this.props.data.content}}></div>
									<div className="prev" style={this.props.data.prev != -1 ? {display: "block"} : {display: "none"}} onClick={this.handleClickPrev}>PRÉCÉDENT</div>
									<div className="next" style={this.props.data.next != -1 ? {display: "block"} : {display: "none"}} onClick={this.handleClickNext}>SUIVANT</div>
								</div>
							)
						}
					})()}
			</div>
		);
	}
}

export class ArticleList extends Component {
	state = {
		className: ''
	}

	componentDidMount() {
	    this.pubsub_token_hide = PubSub.subscribe('articleViewShow', function(topic, id) {
	      	this.setState({ className: 'big' });
	  	}.bind(this));

	  	this.pubsub_token_show = PubSub.subscribe('articleViewHide', function(topic, id) {
	      	this.setState({ className: '' });
	  	}.bind(this));

	  	var hash = document.location.hash;
	  	hash = hash.substring(hash.indexOf('{')+1, hash.indexOf('}'));
	  	if (Number.isInteger(hash) && hash > -1 && hash < articles.length) { PubSub.publish("articleViewShow", hash)}
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token_hide);
    	PubSub.unsubscribe(this.pubsub_token_show);
    }

	render() {
		var rows = [];
		for (var l = articles.length, i = 0; i < l ; i++) {
			articles[i].id = i;
			articles[i].prev = i > 0 ? i-1 : -1;
			articles[i].next = i < l-1 ? i+1 : -1;
			articles[i].view = false;

			rows.push(<Article key={i} data={articles[i]} />);
		}

		return (
			<div id="articleList" className={this.state.className}>{rows}</div>
		);
	}
}

export default ArticleList;
