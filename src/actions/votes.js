import { post } from '../services/api';

export function handleVoteSuccess() {
  return { type: 'VOTE_SCORE_SUCCESS' };
}

export function handleVotes(url, value) {
  return dispatch => {
    post(url, value)
      .then(res => {
        return res.data;
      })
      .then(() => dispatch(handleVoteSuccess()));
  };
}
