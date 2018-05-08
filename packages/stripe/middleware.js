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
    } else if (response.card.address_zip_check === 'fail') {
      message = 'Whoops, looks like that zip code doesn\'t match what your bank has on record - up for trying again?';
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
