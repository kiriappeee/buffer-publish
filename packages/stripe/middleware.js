/* global Stripe */

import { actions, actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      Stripe.createToken(action.card, (status, response) => {
        if (!response.error) {
          dispatch(actions.approveCreditCard(response.id));
        } else dispatch(actions.throwValidationError(response.error.message));
      });
      break;
    default:
      break;
  }

  next(action);
};
