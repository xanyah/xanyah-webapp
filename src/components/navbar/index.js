import React from 'react'
import { NavLink } from 'react-router-dom'
import { I18n } from 'react-redux-i18n'

import './style.css'

import logo from '../../images/logo.svg'

export default () => (
  <div className="navbar">
    <img src={logo} alt="logo" />
    <NavLink to="/" activeClassName="active">
      {I18n.t('pages.dashboard.title')}
    </NavLink>
  </div>
)
