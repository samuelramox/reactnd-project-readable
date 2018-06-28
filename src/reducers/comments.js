const COMMENTS_LOADING = 'COMMENTS_LOADING';
const COMMENTS_ERRORED = 'COMMENTS_ERRORED';
const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
const COMMENT_ID_SUCCESS = 'COMMENT_ID_SUCCESS';
const INSERT_UPDATE_COMMENT_SUCCESS = 'INSERT_UPDATE_COMMENT_SUCCESS';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

export function commentsLoading(state = false, action) {
  switch (action.type) {
    case COMMENTS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function commentsErrored(state = false, action) {
  switch (action.type) {
    case COMMENTS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}

export function comments(state = [], action) {
  switch (action.type) {
    case COMMENTS_SUCCESS:
      return action.comments;
    default:
      return state;
  }
}

export function comment(state = [], action) {
  switch (action.type) {
    case COMMENT_ID_SUCCESS:
      return action.comment;
    case INSERT_UPDATE_COMMENT_SUCCESS:
      return action.comment;
    case DELETE_COMMENT_SUCCESS:
      return action.comment;
    default:
      return state;
  }
}
