export const actionTypes = {
  CREDIT_CARD_VALIDATING: 'CREDIT_CARD_VALIDATING',
  CREDIT_CARD_ERROR: 'CREDIT_CARD_ERROR',
  CREDIT_CARD_APPROVED: 'CREDIT_CARD_APPROVED',
};

const MONTHLY_CYCLE = 'month';
const YEARLY_CYCLE = 'year';

const initialState = {
  error: null,
  card: null,
  token: null,
  validating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      return {
        ...state,
        validating: true,
        card: action.card,
      };
    case actionTypes.CREDIT_CARD_ERROR:
      return {
        ...state,
        validating: false,
        error: action.error,
      };
    case actionTypes.CREDIT_CARD_APPROVED:
      return {
        ...state,
        validating: false,
        token: action.token,
      };
    case actionTypes.CHANGE_BILLING_CYCLE:
      return {
        ...state,
        cycle: action.cycle,
      };
    default:
      return state;
  }
};

export const actions = {
  validateCreditCard: card => ({
    type: actionTypes.CREDIT_CARD_VALIDATING,
    card,
  }),
  throwValidationError: error => ({
    type: actionTypes.CREDIT_CARD_ERROR,
    error,
  }),
  approveCreditCard: token => ({
    type: actionTypes.CREDIT_CARD_APPROVED,
    token,
  }),
  setMonthlyCycle: () => ({
    type: actionTypes.CHANGE_BILLING_CYCLE,
    cycle: MONTHLY_CYCLE,
  }),
  setYearlyCycle: () => ({
    type: actionTypes.CHANGE_BILLING_CYCLE,
    cycle: YEARLY_CYCLE,
  }),
};
