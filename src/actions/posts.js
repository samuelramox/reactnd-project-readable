import { get } from '../services';

export function postsLoading(bool) {
  return {
    type: 'POSTS_LOADING',
    isLoading: bool
  };
}

export function postsErrored(bool) {
  return {
    type: 'POSTS_ERRORED',
    hasErrored: bool
  };
}

export function postsSuccess(posts) {
  return {
    type: 'POSTS_SUCCESS',
    posts
  };
}

export function postIdSuccess(post) {
  return {
    type: 'POST_ID_SUCCESS',
    post
  };
}

export function postsFetchData() {
  const url = 'http://localhost:3001/posts';
  return dispatch => {
    dispatch(postsLoading(true));
    get(url)
      .then(res => {
        dispatch(postsLoading(false));
        return res.data;
      })
      .then(posts => dispatch(postsSuccess(posts)))
      .catch(() => dispatch(postsErrored(true)));
  };
}

export function postFetchById(idPost) {
  const url = `http://localhost:3001/posts/${idPost}`;
  return dispatch => {
    dispatch(postsIsLoading(true));
    get(url)
      .then(res => {
        dispatch(postsIsLoading(false));
        return res.data;
      })
      .then(post => dispatch(postFetchByIdDataSuccess(post)))
      .catch(() => dispatch(postsHasErrored(true)));
  };
}
