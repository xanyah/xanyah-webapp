import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { syncTranslationWithStore } from 'react-redux-i18n'
import 'sanitize.css/sanitize.css'

import store, { history } from './store'
import App from './containers/app'

import './index.css'

const target = document.querySelector('#root')

require('dotenv').config()

syncTranslationWithStore(store)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
