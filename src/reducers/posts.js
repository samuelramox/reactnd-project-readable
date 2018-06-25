const POSTS_LOADING = 'POSTS_LOADING';
const POSTS_ERRORED = 'POSTS_ERRORED';
const POSTS_SUCCESS = 'POSTS_SUCCESS';

export function postsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function postsErrored(state = false, action) {
  switch (action.type) {
    case POSTS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case POSTS_SUCCESS:
      return action.posts;
    default:
      return state;
  }
}
