import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import ComposerWrapper from './components/ComposerWrapper';

const ComposerPopover = ({
  onSave,
  transparentOverlay,
  preserveComposerStateOnClose,
  type,
}) => (
  <Popover
    left={'0px'}
    top={'73px'}
    width={'100%'}
    transparentOverlay={transparentOverlay}
    onOverlayClick={onSave}
  >
    <ComposerWrapper
      type={type}
      onSave={onSave}
      preserveStateOnClose={preserveComposerStateOnClose}
    />
  </Popover>
);

ComposerPopover.propTypes = {
  onSave: PropTypes.func.isRequired,
  transparentOverlay: PropTypes.bool,
  preserveComposerStateOnClose: PropTypes.bool,
  type: PropTypes.oneOf(['queue', 'drafts', 'sent']),
};

ComposerPopover.defaultProps = {
  transparentOverlay: false,
  preserveComposerStateOnClose: false,
};

export default ComposerPopover;
