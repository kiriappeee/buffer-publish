import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import Modal from './index';

storiesOf('Modal', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <Modal
      handleSubmit={action('onSubmit')}
      onRequestCloseModal={action('onRequestCloseModal')}
      appName={'Client 1'}
    />
  ));
