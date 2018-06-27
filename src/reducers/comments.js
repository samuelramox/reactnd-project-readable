const COMMENTS_LOADING = 'COMMENTS_LOADING';
const COMMENTS_ERRORED = 'COMMENTS_ERRORED';
const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';

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
