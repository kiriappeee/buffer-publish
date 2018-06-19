import { connect } from 'react-redux';
import { actions as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import { actions } from './reducer';
import ChangePassword from './components/ChangePassword';

export default connect(
  state => ({
    showModal: state.changePassword.showModal,
  }),
  dispatch => ({
    onRequestOpenModal: () => dispatch(actions.requestOpenModal()),
    onRequestCloseModal: () => dispatch(actions.requestCloseModal()),
    onSubmit: ({ password, newPassword }) => {
      dispatch(
        asyncDataFetchActions.fetch({
          name: 'changePassword',
          args: {
            password,
            newPassword,
          },
        }),
      );
    },
  }),
)(ChangePassword);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
