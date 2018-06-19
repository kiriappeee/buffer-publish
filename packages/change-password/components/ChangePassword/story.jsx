import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import ChangePassword from './index';

const store = createStore(combineReducers({ form: formReducer }));

storiesOf('ChangePassword', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <ChangePassword
      onRequestCloseModal={action('onRequestCloseModal')}
      onSubmit={action('onRequestCloseModal')}
    />
  ))
  .add('showModal', () => (
    <ChangePassword
      onRequestCloseModal={action('onRequestCloseModal')}
      onSubmit={action('onRequestCloseModal')}
      showModal
    />
  ));
