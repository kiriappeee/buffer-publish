/* global Stripe */

import { actions, actionTypes } from './reducer';

const getErrorMessage = (response) => {
  let message = null;
  if (response.error) {
    message = response.error.message;
  } else if (!response.card.name) {
    message = 'Uh oh, please fill out the cardholder name :)';
  } else if (response.card.country === 'US') {
    if (!response.card.address_zip) {
      message = 'For extra security, please add the zip code associated with this card';
    }
  }

  return message;
};

export default ({ dispatch }) => next => (action) => {
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      Stripe.createToken(action.card, (status, response) => {
        const errorMessage = getErrorMessage(response);
        if (errorMessage) {
          dispatch(actions.throwValidationError(errorMessage));
        } else dispatch(actions.approveCreditCard(response.id));
      });
      break;
    default:
      break;
  }

  next(action);
};
