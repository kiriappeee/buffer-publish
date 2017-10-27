import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';

import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

import QueuedPosts from './index';
import postLists from './postData';

/* eslint-disable react/prop-types */
class _TestContextContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
const TestContextContainer = DragDropContext(TestBackend)(_TestContextContainer);

storiesOf('QueuedPosts')
  .addDecorator(checkA11y)
  .addDecorator(getStory => <TestContextContainer>{getStory()}</TestContextContainer>)
  .add('default', () => (
    <QueuedPosts
      total={10}
      loading={false}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('loading', () => (
    <QueuedPosts
      total={0}
      loading
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('paused', () => (
    <QueuedPosts
      total={10}
      loading={false}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      paused
      onUnpauseClick={action('onUnpauseClick')}
    />
  ));
