import { combineReducers } from 'redux';
import { postsLoading, postsErrored, posts, post } from './posts';
import { categoriesLoading, categoriesErrored, categories } from './categories';

export default combineReducers({
  postsLoading,
  postsErrored,
  posts,
  post,
  categoriesLoading,
  categoriesErrored,
  categories
});
