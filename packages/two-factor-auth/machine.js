const handleEnabled = state => (state.isEnabled ? 'enabled' : 'disabled');

const machine = {
  disabled: {
    ENABLE: 'chooseMethod',
  },
  chooseMethod: {
    CHOOSE_SMS: 'setupSMS',
    SETUP_APP: 'setupApp',
    CLOSE: handleEnabled,
  },
  setupSMS: {
    NEXT: 'confirm',
    ERROR: 'setupSMS',
    BACK: 'chooseMethod',
    CLOSE: handleEnabled,
  },
  setupApp: {
    NEXT: 'confirm',
    BACK: 'chooseMethod',
    CLOSE: handleEnabled,
  },
  confirm: {
    CODE_ACCEPTED: state => (state.editMode ? 'enabled' : 'recovery'),
    CODE_REJECTED: 'confirm',
    BACK: state => (state.updateMethod === 'app' ? 'setupApp' : 'setupSMS'),
    CLOSE: handleEnabled,
  },
  recovery: {
    CLOSE: 'enabled',
  },
  enabled: {
    DISABLE: 'disabled',
    CHANGE_METHOD: 'chooseMethod',
    CHANGE_SMS: 'setupSMS',
    CHANGE_APP: 'setupApp',
    SHOW_RECOVERY: 'recovery',
  },
};

const stateFromTransition = ({
  state,
  transitionName,
  nextMachineState,
  /* params, */
}) => {
  const { machineState: currentMachineState } = state;
  let newState = {};

  // Clear any errors when closed
  if (transitionName === 'CLOSE') {
    newState = { error: '' };
  }

  // Store the new TFA method that we're setting up when
  // it's associated screen is viewed
  if (nextMachineState === 'setupSMS') {
    newState = { ...newState, updateMethod: 'sms' };
  }
  if (nextMachineState === 'setupApp') {
    newState = { ...newState, updateMethod: 'app' };
  }

  switch (nextMachineState) {
    // If we're going to phone/app setup directly from 'enabled'
    // then mark this as 'editMode' so we don't show the 'recovery'
    // screen again
    case 'setupSMS':
    case 'setupApp':
      newState = {
        ...newState,
        editMode: currentMachineState === 'enabled',
      };
      break;
    case 'enabled':
      newState = {
        ...newState,
        isEnabled: true,
      };
      break;
    case 'disabled':
      newState = {
        ...newState,
        isEnabled: false,
      };
      break;
    default:
      break;
  }
  return {
    ...state,
    ...newState,
  };
};

export const handleTransition = ({ state, name: transitionName, params }) => {
  const { machineState } = state;
  if (machineState) {
    if (machine[machineState][transitionName]) {
      let nextMachineState = machine[machineState][transitionName];
      if (typeof nextMachineState === 'function') {
        nextMachineState = nextMachineState(state);
      }
      const newState = stateFromTransition({
        state,
        transitionName,
        nextMachineState,
        params,
      });
      return {
        ...newState,
        machineState: nextMachineState,
      };
    }
  }
  return state;
};

export default machine;
