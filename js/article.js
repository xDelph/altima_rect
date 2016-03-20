import React, { Component } from 'react';

class Article extends Component {
	state = {
		view: false,
		display: 'block',
		bigFormat: false
	}

	componentWillMount() {
		this.setState({view: this.props.data.view})
	}	

	componentDidMount() {
	    this.pubsub_token = PubSub.subscribe('modifyArticleState', function(topic, id) {
	    	var articleId = this.props.data.id;

	    	if (id == -1) this.setState({display: "block", bigFormat: false });
	    	else if (id == articleId) {
	    		this.setState({display: "block", bigFormat: true });

	    		if (history.pushState) history.pushState(null, null, '#{'+articleId+'}');
				else document.location.hash = '#{'+articleId+'}';
	    	}
	    	else this.setState({display: "none", bigFormat: false });
	  	}.bind(this));
    }

    componentWillUnmount() {
    	PubSub.unsubscribe(this.pubsub_token);
    }

	handleClick = (e) => {
		PubSub.publish("modifyHomeState", "none");
		PubSub.publish("modifyArticleState", this.props.data.id);
	}

	handleClickNext = (e) => {
		PubSub.publish("modifyArticleState", this.props.data.next);
	}

	handleClickPrev = (e) => {
		PubSub.publish("modifyArticleState", this.props.data.prev);
	}

	render() {
		return (
			<div className="article" style={{display: this.state.display}}>
				<div className="thumbs"><img src={!this.state.bigFormat ? this.props.data.thumbnail : this.props.data.picture} /></div>
				<a className="title" onClick={this.handleClick}>{this.props.data.title.toUpperCase()}</a>
				<div className="date">{this.props.data.date}</div>
				
					{(() => {
						// petit format
						if (!this.state.bigFormat) {
							return (
								<div className="data">
									<div className="content">{this.props.data.intro.substr(0, 100)}...</div>
									<a className="plus" onClick={this.handleClick}>En savoir plus >></a>
								</div>
							)
						}
						// grand format
						else {
							var prevDisplay = this.props.data.prev != -1 ? {display: "block"} : {display: "none"};
							var nextDisplay = this.props.data.next != -1 ? {display: "block"} : {display: "none"};

							return (
								<div className="data">
									<div className="content" dangerouslySetInnerHTML={{__html: this.props.data.content}}></div>
									<a className="prev" style={prevDisplay} onClick={this.handleClickPrev}>PRÉCÉDENT</a>
									<a className="next" style={nextDisplay} onClick={this.handleClickNext}>SUIVANT</a>
								</div>
							)
						}
					})()}
			</div>
		);
	}
}



export default Article;
