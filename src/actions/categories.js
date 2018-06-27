import { get } from '../services';

export function categoriesLoading(bool) {
  return {
    type: 'CATEGORIES_LOADING',
    isLoading: bool
  };
}

export function categoriesErrored(bool) {
  return {
    type: 'CATEGORIES_ERRORED',
    hasErrored: bool
  };
}

export function categoriesSuccess(categories) {
  return {
    type: 'CATEGORIES_SUCCESS',
    categories
  };
}

export function categoriesFetchData() {
  const url = 'http://localhost:3001/categories';
  return dispatch => {
    dispatch(categoriesLoading(true));
    get(url)
      .then(res => {
        dispatch(categoriesLoading(false));
        return res.data;
      })
      .then(categories => dispatch(categoriesSuccess(categories)))
      .catch(() => dispatch(categoriesErrored(true)));
  };
}
