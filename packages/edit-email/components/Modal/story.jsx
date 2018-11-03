import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Modal from './index';

const wrapper = {
  maxWidth: '800px',
};

storiesOf('Edit email modal', module)
  .addDecorator(checkA11y)
  .add('modal', () => (
    <div style={wrapper}>
      <Modal email="hello@bufferapp.com" updateEmail={action('update email')} hideModal={action('hide modal')}/>
    </div>
  ));
