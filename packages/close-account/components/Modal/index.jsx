import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Popover, Card, Text, Input, Button } from '@bufferapp/components';
import { yellowLight, yellowUltraLight } from '@bufferapp/components/style/color';
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
        width: '40rem',
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
              You are about to delete your Buffer account.
            </Text>
          </div>
          <form>
            <div style={inputStyle}>
              <Field
                component={Input}
                type={'textarea'}
                name={'feedback'}
                label={"If you have a moment, please let us know why you're leaving (optional)"}
                placeholder={'Add your brutally honest feedback here :)'}
              />
            </div>
            <div
              style={{
                margin: '1rem',
              }}
            />
            <Card backgroundColor={yellowUltraLight} borderColor={yellowLight} reducedPadding>
              <Text>
                Please keep in mind that <strong>deleting your Buffer account is permanent</strong>{' '}
                and will remove all of your stored tweets, posts, analytics and accounts forever.
              </Text>
            </Card>
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
              <Button warning onClick={handleSubmit} disabled={submitting}>
                Delete Your Account
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

export default reduxForm({
  form: formName,
})(Modal);
