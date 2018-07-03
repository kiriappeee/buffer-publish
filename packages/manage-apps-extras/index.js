import { connect } from 'react-redux';
import AppsAndExtras from './components/AppsAndExtras';
import { actions } from './reducer';

export default connect(
  state => ({
    showModalAppId: state.manageAppsExtras.showModalAppId,
    showModalAppName: state.manageAppsExtras.showModalAppName,
  }),
  dispatch => ({
    onRequestOpenModal: ({ appId, appName }) => dispatch(actions.requestOpenModal({ appId, appName })),
    onRequestCloseModal: () => dispatch(actions.requestCloseModal()),
    onSubmit: () => {
      // dispatch(
      //   asyncDataFetchActions.fetch({
      //     name: 'AppsAndExtras',
      //     args: {
      //       password,
      //       newPassword,
      //     },
      //   }),
      // );
    },
  }),
)(AppsAndExtras);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
