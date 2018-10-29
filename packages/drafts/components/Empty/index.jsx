import React from 'react';
import PropTypes from 'prop-types';
import {
  EmptyState,
} from '@bufferapp/publish-shared-components';
import {
  Button,
  Text,
} from '@bufferapp/components';
import styles from './style.css';

const openWithUrl = (url) => {
  window.open(url, '_blank');
};

const renderEmailPrompt = ({
  isManager,
  userMessages,
  userNewDraftsSubscribeLink,
  handleUserReadMessage,
}) => {
  const message = 'new_contributions_emails';
  if (isManager && !userMessages.includes(message)) {
    const emailLink = userNewDraftsSubscribeLink;
    return (
      <div className={styles.banner}>
        <Text size={'small'}>{'Email me when a new draft is awaiting approval'}</Text>
        <span className={styles['left-button']}>
          <Button
            quaternary
            onClick={() => handleUserReadMessage({ message })}
          >
            {'No, thanks'}
          </Button>
        </span>
        <span className={styles['right-button']}>
          <Button
            quaternary
            onClick={() => {
              openWithUrl(emailLink);
              handleUserReadMessage({ message });
            }}
          >
            {'Yes, please'}
          </Button>
        </span>
      </div>
    );
  }
  return '';
};

const renderEmptyState = (isManager, view) => {
  let title;
  let subtitle;
  let emoji;

  if (view === 'approval') {
    emoji = '✨';
    title = 'Nothing to see here!';

    if (isManager) {
      subtitle = 'Only drafts that are awaiting approval will appear here, until you approve them.';
    } else {
      subtitle = 'Create a draft in the Drafts tab and then click, \'Request Approval\' to send it here for review. Your post will be added to the queue once a manager approves it.';
    }
  } else if (view === 'drafts') {
    emoji = '✍️';
    title = 'Looks like you don\'t have any drafts yet!';

    if (isManager) {
      subtitle = 'This is where drafts from your team members will appear.';
    } else {
      subtitle = 'Use this place to create some drafts — when you\'re ready click Request Approval to send them to the Pending Approval tab.';
    }
  }
  return (
    <EmptyState
      title={title}
      subtitle={subtitle}
      emoji={emoji}
    />);
};

const Empty = ({
  isManager,
  userMessages,
  userNewDraftsSubscribeLink,
  handleUserReadMessage,
  view,
}) => (
  <div className={styles.container}>
    { renderEmailPrompt({
      isManager,
      userMessages,
      userNewDraftsSubscribeLink,
      handleUserReadMessage,
    }) }
    { renderEmptyState(isManager, view) }
  </div>
  );

Empty.propTypes = {
  isManager: PropTypes.bool,
  userMessages: PropTypes.arrayOf(),
  userNewDraftsSubscribeLink: PropTypes.string,
  handleUserReadMessage: PropTypes.func,
  view: PropTypes.oneOf(['approval', 'drafts', null]),
};

Empty.defaultProps = {
  isManager: false,
  userMessages: [],
};

export default Empty;
