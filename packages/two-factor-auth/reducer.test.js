import reducer, { initialState, actions } from './reducer';

describe('reducer', () => {
  it('exists', () => {
    expect(reducer).toBeDefined();
  });
  it('returns initial state', () => {
    expect(reducer(initialState, { type: 'FOO' })).toEqual(initialState);
    expect(reducer(undefined, { type: 'FOO' })).toEqual(initialState);
  });
  it('handles a state transition', () => {
    const actual = reducer(initialState, actions.transition('ENABLE'));
    expect(actual.machineState).toEqual('chooseMethod');
  });
  it('ignores invalid transitions', () => {
    const actual = reducer(initialState, actions.transition('FOOBAR'));
    expect(actual.machineState).toEqual(initialState.machineState);
  });
});
