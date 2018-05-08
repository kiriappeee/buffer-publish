export const actionTypes = {
  CREDIT_CARD_VALIDATING: 'CREDIT_CARD_VALIDATING',
};

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
    default:
      return state;
  }
};

export const actions = {
  validateCreditCard: card => ({
    type: actionTypes.CREDIT_CARD_VALIDATING,
    card,
  }),
};
