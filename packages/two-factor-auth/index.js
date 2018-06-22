import { connect } from 'react-redux';
import TwoFactorAuth from './components/TwoFactorAuth';

export default connect(
  state => ({
    machineState: state.twoFactorAuth.machineState,
  }),
)(TwoFactorAuth);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
