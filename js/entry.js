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
