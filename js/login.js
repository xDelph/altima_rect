import React, { Component } from 'react';

class LoginForm extends Component {

  state = { username: '', password: '' }

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
    return (
      <form id="loginForm" className="columns small-12 medium-3" onSubmit={this.handleSubmit}>
        <label>Username
          <input type="text" onChange={(e) => this.handleChange(e, 'username')} value={this.state.username} />
        </label>

        <label>Password
          <input type="password" onChange={(e) => this.handleChange(e, 'password')} value={this.state.password} />
        </label>

          <button type="submit" disabled={!this.state.username || !this.state.password} className="primary button float-right">
            Log in
          </button>
      </form>
    )
  }

};

export default LoginForm;