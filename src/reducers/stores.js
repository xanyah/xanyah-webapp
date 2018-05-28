import { ADD_STORE, UPDATE_STORES_FIELD } from '../constants/actions'

const initialState = {
  loading: false,
  stores: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_STORE:
    return {
      ...state,
      stores: [...state.stores, action.store],
    }
  case UPDATE_STORES_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
