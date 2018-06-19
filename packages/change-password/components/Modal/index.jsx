import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Popover, Card, Text, Input, Button, Link } from '@bufferapp/components';
import formName from '../../symbols';

const inputStyle = {
  marginTop: '1.5rem',
};

const SubmitError = ({ error }) => (
  <div
    style={{
      ...inputStyle,
      textAlign: 'center',
    }}
  >
    <Text color={'torchRed'}>{error}</Text>
  </div>
);

SubmitError.propTypes = {
  error: PropTypes.string.isRequired,
};

const Modal = ({ handleSubmit, submitting, error, onRequestCloseModal }) => (
  <Popover onOverlayClick={() => onRequestCloseModal()}>
    <div
      style={{
        width: '30rem',
        margin: '0 25px',
      }}
    >
      <Card doublePadding>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Text size={'large'} color={'outerSpace'}>
              Change your password
            </Text>
          </div>
          <form>
            <div
              style={{
                ...inputStyle,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <Link href={'https://buffer.com/oops'} unstyled newTab>
                  {"I've forgotten my password"}
                </Link>
              </div>
              <Field
                name={'password'}
                component={Input}
                type={'password'}
                label={'Current Password'}
              />
            </div>
            <div style={inputStyle}>
              <Field
                component={Input}
                type={'password'}
                name={'newPassword'}
                label={'New Password'}
                placeholder={'At least 5 characters please'}
              />
            </div>
            <div style={inputStyle}>
              <Field
                component={Input}
                type={'password'}
                name={'newPasswordConfirm'}
                label={'Confirm New Password'}
                placeholder={'One more time...'}
              />
            </div>
            {error ? SubmitError({ error }) : null}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
              }}
            >
              <Button
                tertiary
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault();
                  onRequestCloseModal();
                }}
              >
                Cancel
              </Button>
              <div
                style={{
                  margin: '0.5rem',
                }}
              />
              <Button onClick={handleSubmit} disabled={submitting}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  </Popover>
);

Modal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRequestCloseModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  error: null,
};

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  }
  if (values.newPassword && values.newPassword.length < 5) {
    errors.newPassword = 'Please create a password at least 5 characters';
  }
  if (!values.newPasswordConfirm) {
    errors.newPasswordConfirm = 'Required';
  }
  if (
    values.newPassword &&
    values.newPasswordConfirm &&
    values.newPassword !== values.newPasswordConfirm
  ) {
    errors.newPasswordConfirm = 'Passwords Must Match';
  }
  return errors;
};

export default reduxForm({
  form: formName,
  validate,
})(Modal);
