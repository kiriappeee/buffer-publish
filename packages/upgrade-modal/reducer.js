import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('UPGRADE_MODAL', {
  STORE_VALUE: 0,
  UPGRADE: 0,
  SELECT_CYCLE: 0,
});

const initialState = {
  cycle: 'year',
  card: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_CYCLE:
      return {
        ...state,
        cycle: action.cycle,
      };
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
  selectCycle: cycle => ({
    type: actionTypes.SELECT_CYCLE,
    cycle,
  }),
};
