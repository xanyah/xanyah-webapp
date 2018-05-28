import React from 'react';

import './style.css';

import logo from '../../images/logo.svg';
import { xanyahApi } from '../../utils/xanyah-api';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: false,
      password: ''
    };
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();

    this.setState({ error: false });

    xanyahApi
      .post('auth/sign_in', { email, password })
      .then(() => (window.location = '/'))
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const { email, error, password } = this.state;
    return (
      <div className="sign-in">
        <img src={logo} alt="logo" />
        <form onSubmit={e => this.handleSubmit(e)}>
          {error && <p>Error</p>}
          <input
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Email address"
            value={email}
          />
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password"
            value={password}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
