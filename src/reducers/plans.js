import { UPDATE_PLANS_FIELD } from '../constants/actions'

const initialState = {
  loading: false,
  plans: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_PLANS_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}
