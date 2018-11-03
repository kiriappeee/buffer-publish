import React from 'react';
import {
  actions,
  actionTypes,
  middleware,
} from './index';

describe('GeneralSettings', () => {
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
