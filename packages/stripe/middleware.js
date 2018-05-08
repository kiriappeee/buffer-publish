/* global Stripe */

import { actions, actionTypes } from './reducer';

export default store => next => (action) => {
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      Stripe.createToken(action.card, (status, response) => {
        actions.approveCreditCard(response.id);
      });
      break;
    default:
      break;
  }

  next(action);
};
