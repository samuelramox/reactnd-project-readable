const CATEGORIES_LOADING = 'CATEGORIES_LOADING';
const CATEGORIES_ERRORED = 'CATEGORIES_ERRORED';
const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';

export function categoriesLoading(state = false, action) {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function categoriesErrored(state = false, action) {
  switch (action.type) {
    case CATEGORIES_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}

export function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
}
