import { post } from '../services/api';

export function handleVotesSuccess() {
  return {
    type: 'VOTES_SUCCESS'
  };
}

export function handleVotes(url, value) {
  return dispatch => {
    post(url, value)
      .then(res => {
        return res.data;
      })
      .then(() => dispatch(handleVotesSuccess()));
  };
}
