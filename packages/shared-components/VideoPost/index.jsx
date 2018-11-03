import React from 'react';
import ImagePost from '../ImagePost';

const VideoPost = ({
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
  tag,
  retweetProfile,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  isLightboxOpen,
  draggable,
  dragging,
  hovering,
  statistics,
  subprofiles,
  profile_service: profileService,
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  isSent,
}) =>
  <ImagePost
    isConfirmingDelete={isConfirmingDelete}
    isDeleting={isDeleting}
    isWorking={isWorking}
    imageSrc={imageSrc}
    links={links}
    postDetails={postDetails}
    tag={tag}
    text={text}
    onCancelConfirmClick={onCancelConfirmClick}
    onDeleteClick={onDeleteClick}
    onDeleteConfirmClick={onDeleteConfirmClick}
    onEditClick={onEditClick}
    onShareNowClick={onShareNowClick}
    onRequeueClick={onRequeueClick}
    retweetProfile={retweetProfile}
    onImageClick={onImageClick}
    onImageClickNext={onImageClickNext}
    onImageClickPrev={onImageClickPrev}
    onImageClose={onImageClose}
    isLightboxOpen={isLightboxOpen}
    draggable={draggable}
    dragging={dragging}
    hovering={hovering}
    statistics={statistics}
    subprofiles={subprofiles}
    profileService={profileService}
    service_geolocation_name={locationName}
    source_url={sourceUrl}
    subprofile_id={subprofileID}
    isSent={isSent}
  />;

VideoPost.propTypes = ImagePost.propTypes;

VideoPost.defaultProps = {
  ...ImagePost.defaultProps,
  tag: 'VIDEO',
};

export default VideoPost;
