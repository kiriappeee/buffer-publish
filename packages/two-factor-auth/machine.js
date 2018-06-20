const handleEnabled = state => (state.isEnabled ? "enabled" : "disabled");

const machine = {
  disabled: {
    ENABLE: "chooseMethod"
  },
  chooseMethod: {
    CHOOSE_SMS: "setupSMS",
    CHOOSE_APP: "setupApp",
    CLOSE: handleEnabled
  },
  setupSMS: {
    PHONE_ACCEPTED: "confirmSMSCode",
    PHONE_REJECTED: "setupSMS",
    BACK: "chooseMethod",
    CLOSE: handleEnabled
  },
  setupApp: {
    NEXT: "confirmAppCode",
    BACK: "chooseMethod",
    CLOSE: handleEnabled
  },
  confirmSMSCode: {
    CODE_ACCEPTED: state => (state.editMode ? "enabled" : "recovery"),
    CODE_REJECTED: "confirmSMSCode",
    BACK: "setupSMS",
    CLOSE: handleEnabled
  },
  confirmAppCode: {
    CODE_ACCEPTED: state => (state.editMode ? "enabled" : "recovery"),
    CODE_REJECTED: "confirmAppCode",
    BACK: "setupApp",
    CLOSE: handleEnabled
  },
  recovery: {
    CLOSE: "enabled"
  },
  enabled: {
    DISABLE: "disabled",
    CHANGE_METHOD: "chooseMethod",
    CHANGE_SMS: "setupSMS",
    CHANGE_APP: "setupApp",
    SHOW_RECOVERY: "recovery"
  }
};

const stateFromTransition = ({
  state,
  transitionName,
  nextMachineState,
  params
}) => {
  const { machineState: currentMachineState } = state;
  switch (nextMachineState) {
    // If we're changing phone/qpp settings directly from 'enabled'
    // then mark this as 'editMode' so we don't show the 'recovery'
    // screen again
    case "setupSMS":
    case "setupApp":
      return {
        ...state,
        editMode: currentMachineState === "enabled"
      };
    default:
      return state;
  }
};

export const handleTransition = ({ state, name: transitionName, params }) => {
  const { machineState } = state;
  if (machineState) {
    if (machine[machineState][transitionName]) {
      let nextMachineState = machine[machineState][transitionName];
      if (typeof nextMachineState === "function") {
        nextMachineState = nextMachineState(state);
      }
      const newState = stateFromTransition({
        state,
        transitionName,
        nextMachineState,
        params
      });
      return {
        ...newState,
        machineState: nextMachineState
      };
    }
  }
  return state;
};

export default machine;
