import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import EditEmail from './index';

const wrapper = {
  maxWidth: '800px',
};

storiesOf('EditEmail', module)
  .addDecorator(checkA11y)
  .add('clicking on the edit link displays the modal', () => (
    <div style={wrapper}>
      <EditEmail email="hello@bufferapp.com" onClick={action('display modal')} />
    </div>
  ));
