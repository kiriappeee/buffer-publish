import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  Text,
  Card,
  Button,
  Popover,
  Input,
} from '@bufferapp/components';

import { CloseIcon } from '@bufferapp/components/Icon/Icons';

const getContainerStyle = hidden => ({
  position: 'absolute',
  top: '13px',
  right: '16px',
  width: '260px',
  display: hidden ? 'none' : '',
});

const cardInnerStyle = {
  padding: '16px 32px',
  textAlign: 'center',
  lineHeight: 1.1,
  position: 'relative',
};

const closeIconContainerStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
};

const buttonContainerStyle = {
  marginTop: '10px',
};

const modalHeaderStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
};

const modalInnerContainerStyle = {
  width: '410px',
  padding: '10px 30px',
  textAlign: 'center',
};

const modalInputContainerStyle = {
  padding: '25px 0',
};

class AppSwitcher extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onFeedbackChange = this.onFeedbackChange.bind(this);
  }

  state = {
    hidden: false,
    showFeedbackModal: false,
    feedbackBody: '',
  }

  onFeedbackChange(event) {
    this.setState({ feedbackBody: event.target.value });
  }

  closeModal() {
    this.setState({
      showFeedbackModal: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendFeedback(this.state.feedbackBody);
  }

  renderFeedbackModal() {
    const { feedbackBody } = this.state;
    const { submittingFeedback, redirecting } = this.props;
    const noTextEntered = feedbackBody === '';
    if (redirecting) {
      return (
        <Popover>
          <Card>
            <div style={modalInnerContainerStyle}>
              <Text size="large">Thanks for your feedback! 👍</Text>
              <br /><br />
              <Text size="mini">Now taking you to classic Buffer...</Text>
            </div>
          </Card>
        </Popover>
      );
    }
    return (
      <Popover onOverlayClick={this.closeModal}>
        <Card>
          <div style={closeIconContainerStyle}>
            <Button
              borderless
              noStyle
              onClick={this.closeModal}
            >
              <CloseIcon />
            </Button>
          </div>
          <div style={modalInnerContainerStyle}>
            <Text color="black">
              <span style={modalHeaderStyle}>
                Would you let us know what&apos;s causing you to switch back?
              </span>
            </Text>
            <form onSubmit={this.handleSubmit}>
              <div style={modalInputContainerStyle}>
                <Input
                  meta={{ submitting: submittingFeedback }}
                  input={{ value: feedbackBody, onChange: this.onFeedbackChange }}
                  placeholder="Even a few words would be incredibly helpful :)"
                />
              </div>
              <Button
                disabled={submittingFeedback || noTextEntered}
                small
                onClick={this.handleSubmit}
              >
                {submittingFeedback
                  ? 'Please wait...'
                  : 'Back to classic Buffer'
                }
              </Button>
            </form>
          </div>
        </Card>
      </Popover>
    );
  }

  render() {
    const { showGoBackToClassic } = this.props;
    if (!showGoBackToClassic) {
      return null;
    }
    const { showFeedbackModal, hidden } = this.state;
    return (
      <div>
        {showFeedbackModal && this.renderFeedbackModal()}
        <div style={getContainerStyle(hidden)}>
          <Card shadowHeight={1} noPadding>
            <div style={cardInnerStyle}>
              <div style={closeIconContainerStyle}>
                <Button
                  borderless
                  noStyle
                  onClick={() => { this.setState({ hidden: true }); }}
                >
                  <CloseIcon />
                </Button>
              </div>
              <Text size="extra-small">
                Thanks for using our beta!
                You can switch back and forth at any time.
              </Text>
              <div style={buttonContainerStyle}>
                <Button
                  small
                  onClick={() => {
                    this.setState({ showFeedbackModal: true });
                    setTimeout(() => {
                      ReactDOM // eslint-disable-line
                        .findDOMNode(this)
                        .querySelector('input')
                        .focus();
                    }, 100);
                  }}
                >
                  Back to classic Buffer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

AppSwitcher.propTypes = {
  showGoBackToClassic: PropTypes.bool.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  submittingFeedback: PropTypes.bool.isRequired,
  redirecting: PropTypes.bool.isRequired,
};

export default AppSwitcher;
