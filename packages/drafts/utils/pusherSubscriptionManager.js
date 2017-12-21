import {
  draftUpdated,
  draftDeleted,
  draftApproved,
  draftCreated
} from '../actions/';

class PusherSubscriptionManager {
  init (store) {
    this.store = store;
    // TODO: refactor buffer.webSocket into a generic singleton so it can be used here
    // app/webroot/js/helpers/webSocket.js
    // app/webroot/js/multiple-composers/utils/WebSocket.js
    // this assumes that buffer.webSocket._pusher is initailized
    this.pusher = buffer.webSocket._pusher;
    this.lastProfileId = null;
    this.unlisten = store.subscribe(() => {
      const { profile: { profile: { _id: profileId } } } = this.store.getState();
      if (profileId !== this.lastProfileId) {
        this.subscribeToProfileUpdates(profileId);
      }
    });
  }

  subscribeToProfileUpdates(profileId) {
    if (this.channel) {
      this.channel.unbind();
    }

    const channelName = `private-updates-${profileId}`;
    const { dispatch } = this.store;

    this.lastProfileId = profileId;
    this.channel = this.pusher.subscribe(channelName);

    this.channel.bind('collaboration_draft_updated', (data) => {
      dispatch(draftUpdated(data));
    });
    this.channel.bind('collaboration_draft_approved', (data) => {
      dispatch(draftApproved(data));
    });
    this.channel.bind('deleted_update', (data) => {
      dispatch(draftDeleted(data));
    });
    this.channel.bind('added_update', (data) => {
      dispatch(draftCreated(data));
    });
  }
}

export default new PusherSubscriptionManager();
