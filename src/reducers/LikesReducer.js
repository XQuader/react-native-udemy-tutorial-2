import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  const findByKey = job => job.jobkey === action.payload.jobkey;

  switch (action.type) {
    case LIKE_JOB:
      const likeDup = state.filter(findByKey);

      return likeDup.length ? state : [...state, action.payload];
    case CLEAR_LIKED_JOBS:
      return INITIAL_STATE;
    // case DISLIKE_JOB:
    //   const dislikeDup = state.dislikes.filter(findByKey);
    //
    //   return dislikeDup.length ? state : {
    //     likes: [...state.likes],
    //     dislikes: [...state.dislikes, action.payload]
    //   };
    default:
      return state;
  }
}