import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Input } from '@bufferapp/components';

class SetupSMS extends React.Component {
  constructor() {
    super();
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }
  componentDidMount() {
    const input = this.inputContainer.querySelector('input');
    input.focus();
    input.select();
  }
  handlePhoneChange(event) {
    this.props.setPhoneNumber(event.target.value);
  }
  render() {
    const { transition, phoneNumber } = this.props;
    return (
      <React.Fragment>
        <div style={{ textAlign: 'center' }}>
          <Text size="large">Set up your phone number</Text>
          <div style={{ margin: '12px 0' }}>
            <Text size="mini" weight="medium">
              This will be the device we send verification codes each time you log into Buffer.
            </Text>
          </div>
        </div>
        <div style={{ padding: '16px 0 20px' }} ref={(el) => { this.inputContainer = el; }}>
          <div style={{ paddingBottom: '4px' }}>
            <Text size="mini" weight="medium">Phone number (incl. country code)</Text>
          </div>
          <Input
            type="text"
            placeholder="e.g., +1 123-555-1234"
            input={{ value: phoneNumber, onChange: this.handlePhoneChange }}
          />
        </div>
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div style={{ display: 'inline', paddingRight: '20px' }}>
            <Button tertiary onClick={() => transition('CLOSE')}>Cancel</Button>
          </div>
          <Button onClick={() => transition('PHONE_ACCEPTED')}>Next</Button>
        </div>
      </React.Fragment>
    );
  }
}

SetupSMS.propTypes = {
  transition: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
};

export default SetupSMS;
