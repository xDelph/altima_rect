import React, { Component } from 'react';

import LoginForm from './login';
import Menu from './menu';

class Header extends Component {
	render() {
		return (
			<div>
				<div id="logo">altima<span className="dot">°</span></div>
				<LoginForm />
				<Menu />
			</div>
		);
	}
};

export default Header;