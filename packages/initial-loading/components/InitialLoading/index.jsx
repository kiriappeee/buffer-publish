import React from 'react';
import PropTypes from 'prop-types';

import { BufferLoading } from '@bufferapp/publish-shared-components';


class InitialLoading extends React.Component {
  constructor() {
    super();
    this.onCompomentMount = this.onCompomentMount.bind(this);
  }

  componentDidMount() {
    this.props.onCompomentMount();
  }

  render() {
    return <BufferLoading fullscreen />;
  }
}

InitialLoading.propTypes = {
  onCompomentMount: PropTypes.func.isRequired,
};

export default InitialLoading;
