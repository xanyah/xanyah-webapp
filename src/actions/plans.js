import { UPDATE_PLANS_FIELD } from '../constants/actions'
import { xanyahApi } from '../utils/xanyah-api'

export const updatePlansField = (field, value) => ({
  field,
  type: UPDATE_PLANS_FIELD,
  value,
})

export const getPlans = () => dispatch => {
  dispatch(updatePlansField('loading', true))
  xanyahApi.get('plans').then(({ data }) => {
    dispatch(updatePlansField('plans', data))
    dispatch(updatePlansField('loading', false))
  })
}
