import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import {
  actions,
  actionTypes,
  middleware,
} from './index';
import GeneralSettings from '@bufferapp/publish-general-settings';
import InstagramDirectUpload from '@bufferapp/publish-general-settings/components/InstagramDirectUpload';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});


describe('GeneralSettings', () => {
  it('should render', () => {
    const store = storeFake({
      generalSettings: {
        directPostingEnabled: false,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <InstagramDirectUpload onSetUpDirectPostingClick={null} />
      </Provider>,
    );
    expect(wrapper.find(InstagramDirectUpload).length)
      .toBe(1);
  });

  it('should export actions', () => {
    expect(actions)
      .toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
});
