import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Input } from '@bufferapp/components';

class Confirm extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }
  componentDidMount() {
    if (this.inputContainer) {
      const input = this.inputContainer.querySelector('input');
      input.focus();
    }
  }
  handleSubmit() {
    this.props.submitCode(this.state.code);
  }
  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }
  render() {
    const {
      transition,
      updateMethod,
      loading,
      error,
    } = this.props;
    return (
      <Fragment>
        <div style={{ textAlign: 'center' }}>
          <Text size="large">Enter confirmation code</Text>
          <div style={{ margin: '12px 0 8px' }}>
            <Text size="mini" weight="medium">
              Awesome! Now we just need to confirm everything.{' '}
            </Text>
            {updateMethod === 'app' && <Text size="mini">
              Open your authenticator app and input the generated code.
            </Text>}
            {updateMethod === 'sms' && <Text size="mini">
              Please input the code that we just texted you.
            </Text>}
          </div>
        </div>
        <div style={{ padding: '0 0 24px' }} ref={(el) => { this.inputContainer = el; }}>
          <div style={{ paddingBottom: '4px' }}>
            <Text size="mini" weight="medium">Code</Text>
          </div>
          <Input
            type="text"
            input={{
              value: this.state.code,
              onChange: this.handleCodeChange,
            }}
            meta={{
              error,
              touched: Boolean(error),
              submitting: loading,
            }}
          />
        </div>
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div style={{ display: 'inline', paddingRight: '20px' }}>
            <Button tertiary onClick={() => transition('BACK')}>Back</Button>
          </div>
          <Button onClick={this.handleSubmit} disabled={loading}>
            {loading ? 'Please wait…' : 'Next'}
          </Button>
        </div>
      </Fragment>
    );
  }
}

Confirm.propTypes = {
  transition: PropTypes.func.isRequired,
  updateMethod: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  submitCode: PropTypes.func.isRequired,
};

export default Confirm;
