import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';

import AppModalsConnected from '../../index';
import AppModals from './index';

const fakeStore = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const renderer = new ShallowRenderer();

describe('Modals', () => {
  it('renders nothing when no modals are visible', () => {
    const visibleModals = { showUpgradeModal: false };
    const rendered = renderer.render(
      <AppModals {...visibleModals} />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders upgrade modal', () => {
    const visibleModals = { showUpgradeModal: true };
    const rendered = renderer.render(
      <AppModals {...visibleModals} />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders a connected upgrade modal', () => {
    const visibleModals = { showUpgradeModal: true };
    const rendered = renderer.render(
      <Provider store={fakeStore({ modals: visibleModals })}>
        <AppModalsConnected />
      </Provider>
    );
    expect(rendered).toMatchSnapshot();
  });
});
