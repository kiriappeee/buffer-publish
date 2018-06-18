import { connect } from 'react-redux';
import { actions } from './reducer';
import EditEmail from './components/EditEmail';

// default export = container
export default connect(
  state => ({
    email: state.appSidebar.user.email,
    displayModal: state.editEmail.displayModal,
  }),
  dispatch => ({
    onClick: () => dispatch(actions.showModal()),
    hideModal: () => dispatch(actions.hideModal()),
    saveEmail: () => dispatch(actions.saveEmail()),
    updateEmail: email => dispatch(actions.updateEmail(email.target.value)),
  }),
)(EditEmail);

export Modal from './components/Modal';

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
