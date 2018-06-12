import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { i18nReducer as i18n } from 'react-redux-i18n'

import plans from './plans'
import stores from './stores'

export default combineReducers({
  i18n,
  plans,
  router,
  stores,
})
