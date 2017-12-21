/**
 * editDraftWithComposer()
 *
 * Open a draft for editing in the composer.
 *
 * @param  {object} draft
 * @param  {string} timezone
 *
 * @return {Promise}
 */
const editDraftWithComposer = ({ draft, timezone }) => {
  if (buffer.data.user.hasFeature('mc-dashboard')) {
    var activeProfileId = buffer.data.profiles.getOpen().id;
    var profilesWithCurrentSelected = buffer.data.profiles.toJSON().map(function(profile) {
      profile.selected = profile.id === activeProfileId;
      return profile;
    });

    buffer.appBridges.multipleComposers.init({
      env: 'WEB_DASHBOARD',
      data: {
        profiles: profilesWithCurrentSelected,
        bufferGlobal: buffer,
        update: draft,
        subprofileId: draft.subprofile_id,
        scheduledAt: draft.scheduled_at,
      },
      options: {
        canSelectProfiles: false,
        saveButtons: ['SAVE'],
      },
    });

    return new Promise(() => {}); // For compatibility with the current API that expects a promise
  } else {
    const hasCustomSchedule = draft.scheduled_at !== undefined;

    const model = new buffer.Model.Draft({
      profiles: buffer.data.profiles,
      shouldSaveState: false
    });

    model.set({'media': draft.media, 'text': draft.text});

    if (draft.extra_media) {
      model.set('extra_media', draft.extra_media);
    }

    if (hasCustomSchedule && timezone) {
      model.set('calendarDay', moment(draft.scheduled_at * 1000).tz(timezone).valueOf());
    }

    // Set comment in text so that the comment shows in composer to be edited;
    // Save retweet itself or it is overwritten by the comment
    if (draft.retweet) {
      model.set({
        text: draft.retweet.comment,
        retweet: draft.retweet,
        'retweet-text': draft.text
      });
    }

    var isPinterest = (draft.profile_service === 'pinterest');
    if (isPinterest) model.set('source_url', draft.source_url);

    var editModal = new buffer.View.ModalComposer({
        editMode: true,
        contributionMode: true,
        model: model,
        featureForTracking: 'edit-contribution',
        calendarCreateMode: hasCustomSchedule,
        initialCursorPosition: null,
        subProfileId: isPinterest ? draft.subprofile_id : null,
        isCollabToolComposer: true,
      });

    return new Promise((resolve, reject) => {
      editModal.on('saved:update', function(data) {
        var processedData = data.draft.collabToolToAPI();
        var comment;
        var commentFormatted;

        if (data.draft.attributes.retweet) {
          comment = data.draft.attributes.text;
          commentFormatted = buffer.utils.toHTML(data.draft.attributes.text, 'twitter');
          processedData.retweet.comment = comment;
          processedData.retweet.comment_formatted = commentFormatted;
        }

        if (data.subprofileIds && data.subprofileIds.length > 0) {
          processedData.subprofile_id = data.subprofileIds[0];
        }

        /**
         * We can't send down a null `scheduled_at` since that gets formatted as the
         * the string "null" after processing by the `buffer-js-request` library,
         * this in turn confuses the updates/:id/update endpoint.
         * So we send an empty string instead.
         */
        if (processedData.scheduled_at === null) {
          processedData.scheduled_at = "";
        }

        resolve(processedData);

        /*api.post({
          url: '/updates/' + draft.id + '/update',
          data: processedData
        });*/
      });
    });
  }
};

export default editDraftWithComposer;
