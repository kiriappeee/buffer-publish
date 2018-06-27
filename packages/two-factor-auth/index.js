import { connect } from 'react-redux';
import TwoFactorAuth from './components/TwoFactorAuth';
import { actions } from './reducer';

export default connect(
  state => ({
    machineState: state.twoFactorAuth.machineState,
    isEnabled: state.twoFactorAuth.isEnabled,
    // TODO: May not need to pass all the below state down
    editMode: state.twoFactorAuth.editMode,
    type: state.twoFactorAuth.type,
    phoneAreaCode: state.twoFactorAuth.phoneAreaCode,
    phoneNumber: state.twoFactorAuth.phoneNumber,
    confirmationCode: state.twoFactorAuth.confirmationCode,
    recoveryCode: state.twoFactorAuth.recoveryCode,
  }),
  dispatch => ({
    transition: (action, params) => dispatch(actions.transition(action, params)),
    setPhoneNumber: value => dispatch(actions.setPhoneNumber(value)),
  }),
)(TwoFactorAuth);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
