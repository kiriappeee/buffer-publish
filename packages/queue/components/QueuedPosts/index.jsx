import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  Button,
} from '@bufferapp/components';
import {
  EmptyState,
  PostDragLayer,
  BufferLoading,
} from '@bufferapp/publish-shared-components';

import ComposerPopover from '@bufferapp/publish-composer-popover';
import QueueItems from '../QueueItems';
import QueuePausedBar from '../QueuePausedBar';
import MiniCalendar from '../MiniCalendar';
import FeatureLoader from '@bufferapp/product-features';
import InstagramDirectPostingBanner from '../InstagramDirectPostingBanner';

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const topBarContainerStyle = {
  display: 'flex',
  position: 'relative',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const buttonStyle = {
  height: '40px',
  marginLeft: '1.5rem',
  minWidth: '150px',
};

const QueuedPosts = ({
  total,
  loading,
  postLists,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  onCancelConfirmClick,
  onRequeueClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  showComposer,
  showCalendar,
  editMode,
  paused,
  onUnpauseClick,
  onCalendarToggleClick,
  numberOfPostsByDate,
  onMiniCalendarMonthChange,
  subprofiles,
  isInstagramProfile,
  directPostingEnabled,
  onSetUpDirectPostingClick,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  return (
    <div>
      <PostDragLayer />

      <div style={topBarContainerStyle}>
        <div style={composerStyle}>
          {showComposer && !editMode &&
            <ComposerPopover
              onSave={onComposerCreateSuccess}
              transparentOverlay
              preserveComposerStateOnClose
              type={'queue'}
            />
          }
          <Input
            placeholder={'What would you like to share?'}
            onFocus={onComposerPlaceholderClick}
          />
        </div>
        <FeatureLoader
          supportedFeatures={'mini_calendar'}
        >
          <div style={buttonStyle}>
            <Button
              secondary
              onClick={onCalendarToggleClick}
            >
              {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            </Button>
          </div>

          {showCalendar &&
            <MiniCalendar
              numberOfPostsByDate={numberOfPostsByDate}
              onMonthChange={onMiniCalendarMonthChange}
            />
          }
        </FeatureLoader>

      </div>
      {isInstagramProfile && !directPostingEnabled &&
        <InstagramDirectPostingBanner onSetUpDirectPostingClick={onSetUpDirectPostingClick} />
      }
      {!!paused && <QueuePausedBar handleClickUnpause={onUnpauseClick} />}
      {total < 1 &&
        <EmptyState
          title="It looks like you haven't got any posts in your queue!"
          subtitle="Click the box above to add a post to your queue :)"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/fresh-queue%402x.png"
          heroImgSize={{ width: '229px', height: '196px' }}
        />
      }
      {showComposer && editMode &&
        <ComposerPopover 
          onSave={onComposerCreateSuccess}
          type={'queue'}
        />
      }
      <QueueItems
        items={postLists}
        subprofiles={subprofiles}
        onCancelConfirmClick={onCancelConfirmClick}
        onRequeueClick={onRequeueClick}
        onDeleteClick={onDeleteClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onShareNowClick={onShareNowClick}
        onImageClick={onImageClick}
        onImageClickNext={onImageClickNext}
        onImageClickPrev={onImageClickPrev}
        onImageClose={onImageClose}
        onDropPost={onDropPost}
        draggable={!paused}
      />
    </div>
  );
};

QueuedPosts.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ).isRequired,
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  total: PropTypes.number,
  onComposerPlaceholderClick: PropTypes.func.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onRequeueClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onShareNowClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func.isRequired,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  paused: PropTypes.bool,
  onUnpauseClick: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool,
  onCalendarToggleClick: PropTypes.func.isRequired,
  onMiniCalendarMonthChange: PropTypes.func,
  numberOfPostsByDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  IsInstagramProfile: PropTypes.bool,
  directPostingEnabled: PropTypes.bool,
  onSetUpDirectPostingClick: PropTypes.func,
};

QueuedPosts.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  showComposer: false,
  total: 0,
  enabledApplicationModes: [],
  editMode: false,
  paused: false,
  showCalendar: false,
  numberOfPostsByDate: null,
  subprofiles: [],
  IsInstagramProfile: false,
  directPostingEnabled: false,
};

export default QueuedPosts;
