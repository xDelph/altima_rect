import React, { Component } from 'react';

import LoginForm from './login';
import Menu from './menu';

class Header extends Component {
	render() {
		return (
			<div>
				<div id="logo" />
				<LoginForm />
				<Menu />
			</div>
		);
	}
};

export default Header;