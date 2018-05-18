import reducer, { actions } from './reducer';

describe('reducer', () => {
  let state = {};

  describe('initial state', () => {
    beforeEach(() => {
      state = reducer(undefined, {
        type: 'TEST',
      });
    });
    it('has yearly cycle selected', () => expect(state.cycle).toBe('year'));
    it('has no card information', () => expect(state.card).toEqual({}));
  });

  it('storeValue stores card information as <id, value> pairs', () => {
    state = reducer(undefined, actions.storeValue('cardName', 'Buffer'));
    expect(state.card.cardName).toBe('Buffer');
  });

  it('selectCycle changes the cycle', () => {
    state = reducer(undefined, actions.selectCycle('monthly'));
    expect(state.cycle).toBe('monthly');
  });
});
