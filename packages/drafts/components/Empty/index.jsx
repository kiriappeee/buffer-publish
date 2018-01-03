import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
} from '@bufferapp/components';
import styles from './style.css';

const openWithUrl = (url) => {
  window.open(url, '_blank');
};

const renderEmailPrompt = ({ isManager, user, handleUserReadMessage }) => {
  const message = 'new_contributions_emails';
  if (isManager && !user.messages.includes(message)) {
    const emailLink = user.new_contributions_emails_subscribe_link;
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

const renderEmptyContent = (isManager, view) => {
  let msg;
  if (view === 'approval') {
    if (isManager) {
      msg = 'Only drafts that are awaiting approval will appear here, until you approve them.';
    } else {
      msg = 'Create a draft in the Drafts tab and then click, \'Request Approval\' to send it here for review. Your post will be added to the queue once a manager approves it.';
    }
  } else if (view === 'drafts') {
    if (isManager) {
      msg = 'This is where drafts from your team members will appear.';
    } else {
      msg = 'Use this place to create some drafts — when you\'re ready click Request Approval to send them to the Pending Approval tab.';
    }
  }
  return (
    <div className={styles.text}>
      <Text size={'small'}>{msg}</Text>
    </div>
  );
};

const renderEmptyHeader = (isManager, view) => {
  let msg;
  let emoji;
  if (view === 'approval') {
    emoji = '✨';
    msg = 'Nothing to see here!';
  } else if (view === 'drafts') {
    emoji = '✍️';
    msg = 'Looks like you don\'t have any drafts yet!';
  }
  return (
    <div className={styles.header}>
      <Text size={'large'}>{emoji}</Text>
      <br />
      <Text weight={'bold'}>
        {msg}
      </Text>
    </div>
  );
};

const Empty = ({
  isManager,
  profile,
  user,
  handleUserReadMessage,
  view
}) => (
  <div className={styles.container}>
    { renderEmailPrompt({ profile, isManager, user, handleUserReadMessage }) }
    { renderEmptyHeader(isManager, view) }
    { renderEmptyContent(isManager, view) }
  </div>
  );

Empty.propTypes = {
  isManager: PropTypes.bool,
  profile: PropTypes.object,
  user: PropTypes.object,
  handleUserReadMessage: PropTypes.func,
  view: PropTypes.oneOf(['approval', 'drafts', null])
};

export default Empty;
