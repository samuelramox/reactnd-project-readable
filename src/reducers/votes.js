import { VOTE_SCORE_SUCCESS } from '../services/actions';

export function votes(state = [], action) {
  switch (action.type) {
    case VOTE_SCORE_SUCCESS:
      return state;
    default:
      return state;
  }
}
