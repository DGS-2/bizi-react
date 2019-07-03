import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, SET_REGISTERED_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  registered: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: 
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_REGISTERED_USER:
      return {
        ...state,
        registered: action.payload
      };
    default:
      return state;
  }
}