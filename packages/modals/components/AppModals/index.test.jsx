import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AppModals from './index';

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
});
