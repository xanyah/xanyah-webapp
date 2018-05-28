import { ADD_STORE, UPDATE_STORES_FIELD } from '../constants/actions';
import { xanyahApi } from '../utils/xanyah-api';

export const updateStoresField = (field, value) => ({
  field,
  type: UPDATE_STORES_FIELD,
  value
});

export const addStore = store => ({
  store,
  type: ADD_STORE
});

export const getStores = () => dispatch => {
  dispatch(updateStoresField('loading', true));
  xanyahApi.get('stores').then(({ data }) => {
    dispatch(updateStoresField('stores', data));
    dispatch(updateStoresField('loading', false));
  });
};

export const createStore = params => dispatch => {
  xanyahApi.post('stores', params).then(({ data }) => dispatch(addStore(data)));
};
