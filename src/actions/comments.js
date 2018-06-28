import { get, post, put, deleteData } from '../services';

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

export function commentIdSuccess(comment) {
  return {
    type: 'COMMENT_ID_SUCCESS',
    comment
  };
}

export function deleteCommentSuccess(comment) {
  return {
    type: 'DELETE_COMMENT_SUCCESS',
    comment
  };
}

export function insertUpdateCommentSuccess(comment) {
  return {
    type: 'INSERT_UPDATE_COMMENT_SUCCESS',
    comment
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

export function insertComment(commentData) {
  const url = `http://localhost:3001/comments/`;

  return dispatch => {
    post(url, commentData)
      .then(res => {
        dispatch(commentsLoading(false));
        return res.data;
      })
      .then(post => dispatch(insertUpdateCommentSuccess(post)))
      .catch(() => dispatch(commentsErrored(true)));
  };
}

export function commentFetchById(idComment) {
  const url = `http://localhost:3001/comments/${idComment}`;
  return dispatch => {
    dispatch(commentsLoading(true));
    get(url)
      .then(res => {
        dispatch(commentsLoading(false));
        return res.data;
      })
      .then(comment => dispatch(commentIdSuccess(comment)))
      .catch(() => dispatch(commentsErrored(true)));
  };
}

export function updateComment(id, { body, timestamp }) {
  const url = `http://localhost:3001/comments/${id}`;
  const data = {
    timestamp,
    body
  };
  return dispatch => {
    put(url, data)
      .then(res => {
        dispatch(commentsLoading(false));
        return res.data;
      })
      .then(comment => dispatch(insertUpdateCommentSuccess(comment)))
      .catch(() => dispatch(commentsErrored(true)));
  };
}

export function deleteComment(id) {
  const url = `http://localhost:3001/comments/${id}`;

  return dispatch => {
    deleteData(url)
      .then(res => {
        dispatch(commentsLoading(false));
        return res.data;
      })
      .then(comment => dispatch(deleteCommentSuccess(comment)))
      .catch(() => dispatch(commentsErrored(true)));
  };
}
