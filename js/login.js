import React, { Component } from 'react';

import formUtils from './formUtils';

class LoginForm extends Component {

  state = { username: '', password: ''}

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    alert(`Should login user ${this.state.username} with pass ${this.state.password}`);
  }

  render() { 
  	var disableSubmit = !this.state.username || !this.state.password;

    return (
	    <form id="loginForm" className="columns small-12 medium-3" onSubmit={this.handleSubmit}>
			{formUtils.getInput({type: "text", placeholder: "Votre login", onChange: (e) => this.handleChange(e, "username"), value: this.state.username})}
			{formUtils.getInput({type: "password", placeholder: "Votre mot de passe", onChange: (e) => this.handleChange(e, "password"), value: this.state.password})}

			{formUtils.getButton({type: "submit", disabled: disableSubmit}, "Ok")}
	    </form>
    )
  }

};

export default LoginForm;