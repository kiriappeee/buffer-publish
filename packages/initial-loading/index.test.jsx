import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import InitialLoading, {
  actions,
  actionTypes,
} from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('InitialLoading', () => {
  it('should render', () => {
    const store = storeFake({

    });
    const wrapper = mount(
      <Provider store={store}>
        <InitialLoading />
      </Provider>,
    );
    expect(wrapper.find(InitialLoading).length)
      .toBe(1);
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });
});
