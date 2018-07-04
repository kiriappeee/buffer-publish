import { connect } from 'react-redux';
import { actions as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import { actions } from './reducer';
import CloseAccount from './components/CloseAccount';

export default connect(
  state => ({
    showModal: state.closeAccount.showModal,
  }),
  dispatch => ({
    onRequestOpenModal: () => dispatch(actions.requestOpenModal()),
    onRequestCloseModal: () => dispatch(actions.requestCloseModal()),
    onSubmit: ({ feedback }) => {
      dispatch(
        asyncDataFetchActions.fetch({
          name: 'closeAccount',
          args: {
            feedback,
          },
        }),
      );
    },
  }),
)(CloseAccount);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
