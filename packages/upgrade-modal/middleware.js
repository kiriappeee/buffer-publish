import { actions as stripeActions } from '@bufferapp/stripe';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  const card = getState().upgradeModal.card;
  next(action);
  switch (action.type) {
    case actionTypes.UPGRADE:
      dispatch(stripeActions.validateCreditCard(card));
      break;
    default:
      break;
  }
};
