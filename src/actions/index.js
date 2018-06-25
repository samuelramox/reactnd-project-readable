export function postsIsLoading(bool) {
  return {
    type: 'POSTS_LOADING',
    isLoading: bool
  };
}

export function postsHasErrored(bool) {
  return {
    type: 'POSTS_ERRORED',
    hasErrored: bool
  };
}

export function postsFetchDataSuccess(posts) {
  return {
    type: 'POSTS_SUCCESS',
    posts
  };
}
