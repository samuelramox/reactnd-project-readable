const VOTE_SCORE_SUCCESS = 'VOTE_SCORE_SUCCESS';

export function votes(state = [], action) {
  switch (action.type) {
    case VOTE_SCORE_SUCCESS:
      return state;
    default:
      return state;
  }
}
