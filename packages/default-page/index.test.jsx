import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import React from 'react';
import DefaultPage, {
  actions,
  actionTypes,
  middleware,
} from './index';

describe('DefaultPage', () => {

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
