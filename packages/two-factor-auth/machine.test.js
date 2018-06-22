import machine, { handleTransition } from './machine';

describe('machine', () => {
  Object.entries(machine).forEach(([machineState, stateTransitions]) => {
    Object.entries(stateTransitions).forEach(([transitionName, nextMachineStateName]) => {
      const state = { machineState };
      if (typeof nextMachineStateName === 'function') {
        nextMachineStateName = nextMachineStateName(state);
      }
      it(`transitions from ${machineState} with ${transitionName} to ${nextMachineStateName}`, () => {
        const nextState = handleTransition({
          state,
          name: transitionName,
        });
        expect(nextState.machineState).toBe(nextMachineStateName);
      });
    });
  });

  describe('transitions with CLOSE', () => {
    const closableMachineStates = [
      'chooseMethod',
      'setupSMS',
      'setupApp',
      'confirmSMSCode',
      'confirmAppCode',
    ];
    closableMachineStates.forEach((machineState) => {
      it(`from ${machineState} to enabled`, () => {
        const nextState = handleTransition({
          state: { machineState, isEnabled: true },
          name: 'CLOSE',
        });
        expect(nextState.machineState).toBe('enabled');
      });
    });
    closableMachineStates.forEach((machineState) => {
      it(`from ${machineState} to disabled`, () => {
        const nextState = handleTransition({
          state: { machineState, isEnabled: false },
          name: 'CLOSE',
        });
        expect(nextState.machineState).toBe('disabled');
      });
    });
  });

  describe('transitions with CODE_ACCEPTED to enabled when in editMode', () => {
    const editModeMachineStates = ['confirmSMSCode', 'confirmAppCode'];
    editModeMachineStates.forEach((machineState) => {
      it(`for ${machineState}`, () => {
        const nextState = handleTransition({
          state: { machineState, editMode: true },
          name: 'CODE_ACCEPTED',
        });
        expect(nextState.machineState).toBe('enabled');
      });
    });
  });
});
