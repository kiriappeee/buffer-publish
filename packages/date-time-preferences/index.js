import { connect } from 'react-redux';
import DateTimePreferences from './components/DateTimePreferences';

// default export = container
export default connect(
  state => ({
    // add state here
  }),
)(DateTimePreferences);
