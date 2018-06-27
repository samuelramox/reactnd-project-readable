import { combineReducers } from 'redux';
import { postsLoading, postsErrored, posts, post } from './posts';

export default combineReducers({
  postsLoading,
  postsErrored,
  posts,
  post
});
