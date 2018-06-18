import { connect } from 'react-redux';
import AppModals from './components/AppModals';

const mapStateToProps = state => state.modals;
export default connect(mapStateToProps)(AppModals);

export middleware from './middleware';
export reducer, { actions, actionTypes } from './reducer';
