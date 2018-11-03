import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actionTypes, actions } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should fetch enabledApplicationModes ', () => {
    const RPC_NAME = 'user';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'enabledApplicationModes'
    }));
  });

  it('should fetch queuedPosts', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
    }
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'queuedPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
    }));
  });

  it('should fetch queuedPosts if updatePausedSchedules is successful', () => {
    const action = {
      type: `updatePausedSchedules_${dataFetchActionTypes.FETCH_SUCCESS}`,
      args: {
        profileId: 'id1',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'queuedPosts',
        args: {
          profileId: action.args.profileId,
          isFetchingMore: false,
        },
      }));
  });

  it('should trigger a notification for COMPOSER_EVENT in case of success', () => {
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'saved-drafts',
      data: {
        message: 'message to receive',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: action.data.message,
    }));
  });

  it('should fetch posts again after a post is requeued', () => {
    const RPC_NAME = 'requeuePost';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
      args: {
        profileId: 'id1',
      },
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'queuedPosts',
        args: {
          profileId: action.args.profileId,
          isFetchingMore: false,
          isReordering: true,
        },
    }));
  });

  it('should trigger a notification if post is successfully re-added to the queue', () => {
    const RPC_NAME = 'queuedPosts';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
      args: {
        isReordering: true,
      },
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: 'We\'ve re-added this post to your queue!',
    }));
  });

  it('should trigger a notification if post is successfully deleted', () => {
    const RPC_NAME = 'deletePost';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: 'Okay, we\'ve deleted that post!',
    }));
  });

  it('should fetch deletePost', () => {
    const action = {
      type: actionTypes.POST_CONFIRMED_DELETE,
      updateId: 'id1',
    }
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'deletePost',
        args: {
          updateId: action.updateId,
        },
    }));
  });

  it('should fetch sharePostNow', () => {
    const action = {
      type: actionTypes.POST_SHARE_NOW,
      post: {
        id: 'id1',
      },
      profileId: 'profileId1',
    }
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'sharePostNow',
        args: {
          updateId: action.post.id,
          profileId: action.profileId,
        },
    }));
  });

  it('should fetch requeuePost', () => {
    const action = {
      type: actionTypes.POST_REQUEUE,
      post: {
        id: 'id1',
      },
      profileId: 'profileId1',
    }
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'requeuePost',
        args: {
          updateId: action.post.id,
          profileId: action.profileId,
        },
    }));
  });

  it('should trigger a notification if post is successfully shared', () => {
    const RPC_NAME = 'sharePostNow';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: 'Yay, your post has been shared! 🎉',
    }));
  });

  it('should trigger a notification if it fails to share a post', () => {
    const RPC_NAME = 'sharePostNow';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
      error: 'Failed to share',
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: action.error,
    }));
  });

  it('should fetch reorderPosts', () => {
    const queue = {
      byProfileId: {
        'profileId1': {
          posts: {
            'post1': {
              id: 'postId1',
              due_at: '1534262220',
            },
            'post2': {
              id: 'postId2',
              due_at: '1534262224',
            },
          },
        },
      },
    };
    const orderedIds = [
      'postId1',
      'postId2',
    ];
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        queue,
      }),
    };
    const action = {
      type: actionTypes.POST_DROPPED,
      commit: true,
      profileId: 'profileId1',
    };
    middleware(store)(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(store.dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'reorderPosts',
        args: {
          profileId: action.profileId,
          order: orderedIds,
        },
    }));
  });

  it('should fetch getNumberOfPosts', () => {
    const action = {
      type: actionTypes.GET_NUMBER_POSTS,
      profileId: 'profileId1',
      startDate: '1536580119',
      endDate: '1536581119',
    }
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'getNumberOfPosts',
        args: {
          profileId: action.profileId,
          startDate: action.startDate,
          endDate: action.endDate,
        },
    }));
  });

  describe('Update Post Counts', () => {
    const queue = {
      byProfileId: {
        'profileId1': {
          total: 9,
        },
      },
    };
    const sent = {
      byProfileId: {
        'profileId1': {
          total: 0,
        },
      },
    };
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        queue,
        sent,
      }),
    };

    it('should update count when a post was created', () => {
      const newCounts = {
        pending: 10,
        sent: 0,
      };
      const action = {
        type: actionTypes.POST_CREATED,
        profileId: 'profileId1',
      };
      middleware(store)(next)(action);
      expect(next)
        .toBeCalledWith(action);
      expect(store.dispatch)
        .toBeCalledWith(actions.postCountUpdated(action.profileId, newCounts)
      );
    });

    it('should update count when a post was deleted', () => {
      const newCounts = {
        pending: 8,
        sent: 0,
      };
      const action = {
        type: actionTypes.POST_DELETED,
        profileId: 'profileId1',
      };
      middleware(store)(next)(action);
      expect(next)
        .toBeCalledWith(action);
      expect(store.dispatch)
        .toBeCalledWith(actions.postCountUpdated(action.profileId, newCounts)
      );
    });

    it('should update count when a post was sent', () => {
      const newCounts = {
        pending: 8,
        sent: 1,
      };
      const action = {
        type: actionTypes.POST_SENT,
        profileId: 'profileId1',
      };
      middleware(store)(next)(action);
      expect(next)
        .toBeCalledWith(action);
      expect(store.dispatch)
        .toBeCalledWith(actions.postCountUpdated(action.profileId, newCounts)
      );
    });
  });
});