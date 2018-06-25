import { combineReducers } from 'redux';
import { postsLoading, postsErrored, posts } from './posts';

export default combineReducers({
  postsLoading,
  postsErrored,
  posts
});
