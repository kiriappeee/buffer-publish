import machine, { handleTransition } from "./machine";

describe("machine", () => {
  for (let [machineState, stateTransitions] of Object.entries(machine)) {
    for (let [transitionName, nextMachineStateName] of Object.entries(
      stateTransitions
    )) {
      let state = { ...initialState, machineState };
      if (typeof nextMachineStateName === "function") {
        nextMachineStateName = nextMachineStateName(state);
      }
      const nextState = handleTransition({
        state,
        name: transitionName
      });
      it(`transitions from ${machineState} with ${transitionName} to ${nextMachineStateName}`, () => {
        expect(nextState.machineState).toBe(nextMachineStateName);
      });
    }
  }

  describe("transitions with CLOSE", () => {
    const closableMachineStates = [
      "chooseMethod",
      "setupSMS",
      "setupApp",
      "confirmSMSCode",
      "confirmAppCode"
    ];
    for (let machineState of closableMachineStates) {
      it(`from ${machineState} to enabled`, () => {
        const nextState = handleTransition({
          state: { machineState, isEnabled: true },
          name: "CLOSE"
        });
        expect(nextState.machineState).toBe("enabled");
      });
    }
    for (let machineState of closableMachineStates) {
      it(`from ${machineState} to disabled`, () => {
        const nextState = handleTransition({
          state: { machineState, isEnabled: false },
          name: "CLOSE"
        });
        expect(nextState.machineState).toBe("disabled");
      });
    }
  });

  describe("transitions with CODE_ACCEPTED to enabled when in editMode", () => {
    const editModeMachineStates = ["confirmSMSCode", "confirmAppCode"];
    for (let machineState of editModeMachineStates) {
      it(`for ${machineState}`, () => {
        const nextState = handleTransition({
          state: { machineState, editMode: true },
          name: "CODE_ACCEPTED"
        });
        expect(nextState.machineState).toBe("enabled");
      });
    }
  });
});
