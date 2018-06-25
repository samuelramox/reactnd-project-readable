import { combineReducers } from 'redux';
import { postsIsLoading, postsHasErrored, posts } from './posts';

export default combineReducers({
  postsIsLoading,
  postsHasErrored,
  posts
});
