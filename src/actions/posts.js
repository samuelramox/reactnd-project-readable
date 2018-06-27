import { get, post, put } from '../services';

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

export function insertUpdatePostSuccess(post) {
  return {
    type: 'INSERT_UPDATE_POST_SUCCESS',
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
    dispatch(postsLoading(true));
    get(url)
      .then(res => {
        dispatch(postsLoading(false));
        return res.data;
      })
      .then(post => dispatch(postIdSuccess(post)))
      .catch(() => dispatch(postsErrored(true)));
  };
}

export function insertPost(postData, id) {
  const baseUrl = 'http://localhost:3001/posts';
  const url = id ? `${baseUrl}/${id}` : baseUrl;
  return dispatch => {
    post(url, postData)
      .then(res => {
        dispatch(postsLoading(false));
        return res.data;
      })
      .then(post => dispatch(insertUpdatePostSuccess(post)))
      .catch(() => dispatch(postsErrored(true)));
  };
}

export function updatePost(id, title, body) {
  const url = `http://localhost:3001/posts/${id}`;
  const data = {
    title,
    body
  };
  return dispatch => {
    put(url, data)
      .then(res => {
        dispatch(postsLoading(false));
        return res.data;
      })
      .then(post => dispatch(insertUpdatePostSuccess(post)))
      .catch(() => dispatch(postsErrored(true)));
  };
}
