import { get } from '../services';

export function commentsLoading(bool) {
  return {
    type: 'COMMENTS_LOADING',
    isLoading: bool
  };
}

export function commentsErrored(bool) {
  return {
    type: 'COMMENTS_ERRORED',
    hasErrored: bool
  };
}

export function commentsSuccess(comments) {
  return {
    type: 'COMMENTS_SUCCESS',
    comments
  };
}

export function commentsFetchData(postId) {
  const url = `http://localhost:3001/posts/${postId}/comments`;
  return dispatch => {
    dispatch(commentsLoading(true));
    get(url)
      .then(res => {
        dispatch(commentsLoading(false));
        return res.data;
      })
      .then(comments => dispatch(commentsSuccess(comments)))
      .catch(() => dispatch(commentsErrored(true)));
  };
}
