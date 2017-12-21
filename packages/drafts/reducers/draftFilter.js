import {
  SET_DRAFT_FILTER,
} from './index';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRAFT_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default reducer;
