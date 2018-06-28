import { combineReducers } from 'redux';
import { postsLoading, postsErrored, posts, post } from './posts';
import { categoriesLoading, categoriesErrored, categories } from './categories';
import {
  commentsLoading,
  commentsErrored,
  comments,
  comment
} from './comments';

export default combineReducers({
  postsLoading,
  postsErrored,
  posts,
  post,
  categoriesLoading,
  categoriesErrored,
  categories,
  commentsLoading,
  commentsErrored,
  comments,
  comment
});
