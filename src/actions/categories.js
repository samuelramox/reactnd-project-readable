import { get } from '../services/api';
import {
  CATEGORIES_IS_LOADING,
  CATEGORIES_HAS_ERRORED,
  CATEGORIES_FETCH_DATA_SUCCESS
} from '../services/actions';

export function categoriesIsLoading(bool) {
  return {
    type: CATEGORIES_IS_LOADING,
    isLoading: bool
  };
}

export function categoriesHasErrored(bool) {
  return {
    type: CATEGORIES_HAS_ERRORED,
    hasErrored: bool
  };
}

export function categoriesFetchDataSuccess(categories) {
  return {
    type: CATEGORIES_FETCH_DATA_SUCCESS,
    categories
  };
}

export function categoriesFetchData() {
  const url = 'http://localhost:3001/categories';
  return dispatch => {
    dispatch(categoriesIsLoading(true));
    get(url)
      .then(res => {
        dispatch(categoriesIsLoading(false));
        return res.data;
      })
      .then(categories => dispatch(categoriesFetchDataSuccess(categories)))
      .catch(() => dispatch(categoriesHasErrored(true)));
  };
}
