import React from 'react';
import PropTypes from 'prop-types';
import {
  LinkifiedText,
} from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const TextPost = ({
  isConfirmingDelete,
  isDeleting,
  isWorking,
  imageSrc,
  links,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  postDetails,
  text,
  retweetProfile,
  retweetComment,
  retweetCommentLinks,
  draggable,
  dragging,
  hovering,
  fixed,
  statistics,
  subprofiles,
  profile_service: profileService,
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  isSent,
}) => {
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        <LinkifiedText
          color={'black'}
          links={links}
          size={'mini'}
          whitespace={'pre-wrap'}
          newTab
          unstyled
        >
          {text}
        </LinkifiedText>
      </span>
    </div>
  );

  return (
    <Post
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isWorking={isWorking}
      imageSrc={imageSrc}
      links={links}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      onRequeueClick={onRequeueClick}
      postDetails={postDetails}
      text={text}
      retweetProfile={retweetProfile}
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      draggable={draggable}
      dragging={dragging}
      hovering={hovering}
      fixed={fixed}
      statistics={statistics}
      subprofiles={subprofiles}
      profileService={profileService}
      locationName={locationName}
      sourceUrl={sourceUrl}
      subprofileID={subprofileID}
      isSent={isSent}
    >
      {children}
    </Post>
  );
};

TextPost.propTypes = {
  ...Post.commonPropTypes,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  retweetCommentLinks: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
  text: PropTypes.string.isRequired,
  isSent: PropTypes.bool,
};

TextPost.defaultProps = Post.defaultProps;

export default TextPost;
