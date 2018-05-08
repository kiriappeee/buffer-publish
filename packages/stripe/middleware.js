/* global Stripe */

import { actions, actionTypes } from './reducer';

const getErrorMessage = (response, errorMessages) => {
  let message = null;
  if (response.error) {
    message = response.error.message;
  } else if (!response.card.name) {
    message = errorMessages.noNameError;
  } else if (response.card.country === 'US') {
    if (!response.card.address_zip) {
      message = errorMessages.noZipError;
    } else if (response.card.address_zip_check === 'fail') {
      message = errorMessages.invalidZipError;
    }
  }

  return message;
};

export default ({ dispatch, getState }) => next => (action) => {
  const errorMessages = getState().i18n.stripe;
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      Stripe.createToken(action.card, (status, response) => {
        const errorMessage = getErrorMessage(response, errorMessages);
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
