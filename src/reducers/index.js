import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import stores from './stores'

export default combineReducers({
  router,
  stores,
})
