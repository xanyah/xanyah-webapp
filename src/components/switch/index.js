import React from 'react'
import { get } from 'lodash'

import './style.css'

export default ({ checked, labels, onChange }) => (
  <div className="switch-container">
    <label className="unselected-label">{get(labels, 0)}</label>
    <label className="selected-label">{get(labels, 1)}</label>
    <input type="checkbox" id="switch" onChange={onChange} checked={checked} />
    <label className="switch" htmlFor="switch"></label>
  </div>)
