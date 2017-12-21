import {
  OPEN_COMPOSER,
  TOGGLE_DATE_TIME_FORM,
  CHANGE_VIEW
 } from './index';

export const initialState = {
  composerOpen: false,
  showDateTimeForm: false,
  right: null,
  top: null,
  view: 'drafts'
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_COMPOSER:
      return {
        ...state,
        composerOpen: action.payload,
      };
    case TOGGLE_DATE_TIME_FORM:
      return {
        ...state,
        showDateTimeForm: action.payload,
        rescheduledDraftId: action.draftId,
        right: action.payload ? action.right : null,
        top: action.payload ? action.top : null,
      };
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.view
      };
    default:
      return state;
  }
}
