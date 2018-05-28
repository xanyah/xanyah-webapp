import React from 'react'

import './style.css'

import logo from '../../images/logo.svg'
import { xanyahApi } from '../../utils/xanyah-api'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      error: false,
      firstname: '',
      lastname: '',
      locale: 'en',
      password: '',
      passwordConfirmation: '',
    }
  }

  handleSubmit(e) {
    const { email, firstname, lastname, locale, password, passwordConfirmation } = this.state
    e.preventDefault()

    this.setState({ error: false })

    xanyahApi
      .post(
        'auth',
        {
          confirmSuccessUrl: `${window.location.origin}/sign-in`,
          email,
          firstname,
          lastname,
          locale,
          password,
          passwordConfirmation,
        }
      )
      .then(() => (alert('Check your email')))
      .catch(() => this.setState({ error: true }))
  }

  render() {
    const { email, error, firstname, lastname, password, passwordConfirmation } = this.state
    return (
      <div className="sign-up">
        <img src={logo} alt="logo" />
        <form onSubmit={e => this.handleSubmit(e)}>
          {error && <p>Error</p>}
          <input
            type="text"
            onChange={e => this.setState({ firstname: e.target.value })}
            placeholder="Firstname"
            value={firstname}
          />
          <input
            type="text"
            onChange={e => this.setState({ lastname: e.target.value })}
            placeholder="Lastname"
            value={lastname}
          />
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
          <input
            type="password"
            onChange={e => this.setState({ passwordConfirmation: e.target.value })}
            placeholder="Password confirmation"
            value={passwordConfirmation}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
