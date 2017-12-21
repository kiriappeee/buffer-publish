/* global $ */

import {
  COLLABORATION_DRAFT_CREATED,
  FETCH_PROFILE_DRAFTS_SUCCESS,
  COLLABORATION_DRAFT_UPDATED,
  COLLABORATION_DRAFT_APPROVED,
  COLLABORATION_DRAFT_DELETED
 } from '../reducers/';

const updateCollabToolCountsInDOM = (numNeedsApproval, numDrafts) => {
  if (numNeedsApproval > 0) {
    $('.js-collabTool-count-approval').text(numNeedsApproval);
    $('.js-collabTool-count-approval').removeClass('hidden');
  } else {
    $('.js-collabTool-count-approval').addClass('hidden');
  }
  if (numDrafts > 0) {
    $('.js-collabTool-count-draft').text(numDrafts);
    $('.js-collabTool-count-draft').removeClass('hidden');
  } else {
    $('.js-collabTool-count-draft').addClass('hidden');
  }
};

const middleware = store => next => (action) => {
  switch (action.type) {
    case COLLABORATION_DRAFT_CREATED:
    case COLLABORATION_DRAFT_UPDATED:
    case COLLABORATION_DRAFT_APPROVED:
    case COLLABORATION_DRAFT_DELETED:
    case FETCH_PROFILE_DRAFTS_SUCCESS:
      /**
       * Call next() first to ensure we'll get the latest state
       */
      var returnValue = next(action);
      var { drafts: { drafts: { draftMap } } } = store.getState();
      var numNeedsApproval = Object.values(draftMap).filter(d => d.needs_approval).length;
      var numDrafts = Object.values(draftMap).filter(d => !d.needs_approval).length;
      updateCollabToolCountsInDOM(numNeedsApproval, numDrafts);
      return returnValue;
    default:
      return next(action);
  }
};

export default middleware;
