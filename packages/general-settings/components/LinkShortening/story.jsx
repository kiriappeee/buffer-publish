import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import LinkShortener from './index';

const linkList = [{ domain: 'option1', name: 'option2', selected: true }];
const linkListMulti = [{ domain: 'option1', name: 'option2', selected: true }, { domain: 'option2', name: 'option2', selected: false }];

storiesOf('LinkShortener', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <LinkShortener />
  ))
  .add('Show single shortener option', () => (
    <LinkShortener
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show multiple shortener options', () => (
    <LinkShortener
      linkShorteners={linkListMulti}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show pinterest message', () => (
    <LinkShortener
      profileService="pinterest"
    />
  ));
