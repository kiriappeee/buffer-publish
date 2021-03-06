import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
} from '@bufferapp/components';

import {
  fontFamily,
  fontSize,
} from '@bufferapp/components/style/font';

import {
  curiousBlue,
  geyser,
} from '@bufferapp/components/style/color';

import {
  borderRadius,
} from '@bufferapp/components/style/border';

const formLabelStyle = {
  display: 'block',
  padding: '0 0 0.25rem 0',
};

const getInputStyle = (focused, backgroundStyle) => ({
  fontFamily,
  fontSize,
  padding: '0.5rem',
  borderRadius,
  border: focused
    ? `1px solid ${curiousBlue}`
    : `1px solid ${geyser}`,
  width: '100%',
  boxSizing: 'border-box',
  outline: 0,
  background: backgroundStyle || '#fff',
});

class InputText extends React.Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  onFocus() {
    this.setState({ focused: true });
  }
  onBlur() {
    this.setState({ focused: false });
  }
  render() {
    const { id, label, autoComplete, note, backgroundStyle, store } = this.props;
    const { focused } = this.state;
    return (
      <div>
        <label htmlFor={id} style={formLabelStyle}>
          <Text size="small">{label}</Text>
        </label>
        <input
          id={id}
          type="text"
          style={getInputStyle(focused, backgroundStyle)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoComplete={autoComplete}
          onKeyUp={ev => store(id, ev.target.value.trim())}
        />
        {note && <Text size="extra-small">{note}</Text>}
      </div>
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  note: PropTypes.string,
  backgroundStyle: PropTypes.string,
  store: PropTypes.func.isRequired,
};

InputText.defaultProps = {
  autoComplete: 'off',
  note: null,
  backgroundStyle: null,
};

export default InputText;
