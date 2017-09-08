import { FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    default:
      return state;
  }
}