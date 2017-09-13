import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  const findByKey = job => job.jobkey === action.payload.jobkey;

  switch (action.type) {
    case REHYDRATE:
      return action.payload.likes || INITIAL_STATE;
    case LIKE_JOB:
      const likeDup = state.filter(findByKey);

      return likeDup.length ? state : [...state, action.payload];
    case CLEAR_LIKED_JOBS:
      return INITIAL_STATE;
    default:
      return state;
  }
}