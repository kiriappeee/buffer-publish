export const actionTypes = {
  STORE_VALUE: 'STORE_VALUE',
  UPGRADE: 'UPGRADE',
};

const initialState = {
  cycle: 'year',
  card: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_VALUE:
      return {
        ...state,
        card: {
          ...state.card,
          [action.id]: action.value,
        },
      };
    default:
      return state;
  }
};

export const actions = {
  storeValue: (id, value) => ({
    type: actionTypes.STORE_VALUE,
    id,
    value,
  }),
  upgrade: () => ({
    type: actionTypes.UPGRADE,
  }),
};
