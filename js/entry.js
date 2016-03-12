// Library
import React from 'react'
import ReactDOM from 'react-dom'
import PubSub from 'pubsub-js'

// CSS
import './../css/main.css';

// JS
import Header from './header';
import Body from './body';
import Footer from './footer';

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

ReactDOM.render(
  <Body />,
  document.getElementById('body')
);

ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
);

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

/*

// On importe les librairies nécessaires et le composant React
import React from 'react'
import ReactDOM from 'react-dom'

var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});    

ReactDOM.render(
  <LikeButton />,
  document.getElementById("root")
);

*/