/* global Stripe */

import { actions as notification } from '@bufferapp/notifications';
import { actions as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
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
  const errorMessages = getState().i18n.translations.stripe;
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      Stripe.createToken(action.card, (status, response) => {
        const errorMessage = getErrorMessage(response, errorMessages);
        if (errorMessage) {
          dispatch(actions.throwValidationError(errorMessage));
          dispatch(notification.createNotification({
            notificationType: 'error',
            message: errorMessage,
          }));
        } else {
          dispatch(asyncDataFetchActions.fetch({
            name: 'upgradeToPro',
            args: {
              next: window.location.pathname,
              cycle: getState().upgradeModal.cycle,
              token: response.id,
            },
          }));
        }
      });
      break;
    default:
      break;
  }

  next(action);
};
