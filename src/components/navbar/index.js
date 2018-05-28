import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.css'

import logo from '../../images/logo.svg'

export default () => (
  <div className="navbar">
    <img src={logo} alt="logo" />
    <NavLink to="/" activeClassName="active">
      Dashboard
    </NavLink>
  </div>
)
