import { getDateString, isInThePast } from './date';
import { parseLinksAndTwitterEntities, parseFacebookEntities } from './linkParsing';

const getImageUrls = (draft) => {
  if (!(draft.media && draft.media.picture && draft.extra_media)) return [];
  const imageUrls = draft.extra_media.map(media =>
    media.photo
  );

  imageUrls.unshift(draft.media.picture);
  return imageUrls;
};

const getPostActionString = ({ draft, profileTimezone, isPastDue, twentyFourHourTime }) => {
  if (draft.scheduled_at) {
    const dateString = getDateString(
      draft.scheduled_at,
      profileTimezone,
      {
        isPastDue,
        twentyFourHourTime,
      },
    );
    return `This draft ${isPastDue ? 'was' : 'will be'} scheduled for ${dateString}${isPastDue ? '' : ' on approval'}.`;
  } else if (draft.shared_next) {
    return 'This draft will be added to the top of the queue on approval.';
  }

  return 'This draft will be added to the queue on approval.';
}

const getDraftDetails = ({
  draft,
  profileTimezone,
  isPastDue,
  twentyFourHourTime
}) => {
  const createdAt = draft.created_at;
  const createdAtString = getDateString(
    createdAt,
    profileTimezone,
    {
      createdAt,
      twentyFourHourTime,
    }
  );
  let avatarUrl = '';
  if (draft.user) {
    avatarUrl = draft.user.avatar || draft.user.gravatar;
  }

  return {
    via: draft.via,
    userName: draft.user ? draft.user.name : '',
    email: draft.user ? draft.user.email : '',
    avatarUrl,
    createdAt: createdAtString,
    postAction: getPostActionString({
      draft,
      profileTimezone,
      isPastDue,
      twentyFourHourTime,
    }),
    isRetweet: draft.retweet !== undefined,
  };
};

const getRetweetProfileInfo = (draft) => {
  const retweet = draft.retweet;
  if (!retweet) {
    return undefined;
  }

  return {
    name: retweet.profile_name,
    handle: `@${retweet.username}`,
    avatarUrl: retweet.avatars.https,
  };
};

const getPostType = ({ draft }) => {
  if (!draft.media || draft.retweet) {
    return 'text';
  } else if (draft.media && draft.media.picture && !draft.extra_media) {
    return 'image';
  } else if (draft.media && draft.media.picture && draft.extra_media) {
    return 'multipleImage';
  } else if (draft.media && draft.media.video) {
    return 'video';
  } else if (draft.media && draft.media.link) {
    return 'link';
  }
  return 'text';
};

export const profileIsManager = profile =>
  profile.organization_role === 1;

export const parseProps = ({
  draft,
  user,
  profile,
  view,
}) => {
  const media = draft.media || {};
  const isVideo = media.video;
  const role = profile.organization_role;
  const profileTimezone = profile.timezone;
  const isPastDue = isInThePast(draft.scheduled_at);
  const hasPermission = user.id === draft.user_id || profileIsManager(profile);
  const twentyFourHourTime = user.twentyfour_hour_time;
  let retweetComment;
  let text;

  if (draft.retweet) {
    text = draft.retweet.text;
    retweetComment = draft.retweet.comment;
  } else {
    text = draft.text;
  }

  const links =
    parseLinksAndTwitterEntities(text)
      .concat(draft.profile_service === 'facebook' ? parseFacebookEntities(text, draft.entities) : [])
      .sort(({ indices: [startIdxA] }, { indices: [startIdxB] }) => startIdxA - startIdxB);

  return {
    id: draft.id,
    profileId: profile.id,
    hasPermission,
    isConfirmingDelete: draft.isDeleting && !draft.requestingDraftAction,
    isDeleting: draft.isDeleting && draft.requestingDraftAction,
    isMoving: draft.isMoving,
    isPastDue,
    isWorking: !draft.isDeleting && draft.requestingDraftAction,
    imageSrc: isVideo ? media.thumbnail : media.picture,
    imageUrls: getImageUrls(draft),
    links,
    linkAttachment: {
      title: media.title,
      url: media.expanded_link,
      description: media.description,
      thumbnailUrl: media.preview,
    },
    role,
    profileTimezone,
    manager: profileIsManager(profile),
    needsApproval: draft.needs_approval,
    draftDetails: getDraftDetails({
      draft,
      profileTimezone,
      isPastDue,
      twentyFourHourTime,
    }),
    retweetComment,
    retweetCommentLinks: parseLinksAndTwitterEntities(retweetComment),
    retweetProfile: getRetweetProfileInfo(draft),
    text,
    type: getPostType({ draft }),
    view,
    // Add these fields as they are required for editing composer
    createdAt: draft.created_at,
    scheduled_at: draft.scheduled_at,
    scheduledAt: draft.scheduled_at,
    media: draft.media,
    extra_media: draft.extra_media,
    retweet: draft.retweet,
    profile_service: draft.profile_service,
    source_url: draft.source_url,
    subprofile_id: draft.subprofile_id,
    sharedNext: draft.shared_next,
    entities: draft.entities,
  };
};

export const parseDraftMaps = ({
  draftMap,
  user,
  profile,
  view,
}) =>
  Object.values(draftMap).map(draft => parseProps({ draft, user, profile, view }));
