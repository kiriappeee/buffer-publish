import { connect } from 'react-redux';
import BufferAPI from '@bufferapp/buffer-js-api';
import { dateTimeToUnixTimestamp } from '../utils/date';
import DateTimeForm from '../components/DateTimeForm';
import {
  hideDateTimeForm,
  rescheduleSuccess,
} from '../actions/';

const mapStateToProps = state => {
  const { profile, settings, user } = state;
  return {
    draftId: settings.rescheduledDraftId,
    timezone: profile.profile.timezone,
    settings: settings,
    twentyFourHourTime: user.user.twentyfour_hour_time,
    firstDayOfWeek: user.user.week_starts_monday ? 1 : 0
  };
};

const mapDispatchToProps = dispatch => ({
  onRescheduleOverlayClick: () => dispatch(hideDateTimeForm()),
  onRescheduleCloseClick: () => dispatch(hideDateTimeForm()),
  onRescheduleSubmit: ({
      draftId,
      date,
      time,
      timezone
    }) => BufferAPI.post(
        `updates/${draftId}/update.json`,
      {
        csrf_token: buffer.csrf,
        scheduled_at: dateTimeToUnixTimestamp({
          date,
          time,
          timezone,
        }),
        // Passing 'pinned' through as 'scheduled_at' gets unset in the update
        // and lack of any other param will throw error.
        pinned: false,
        collab_reschedule: true
      })
        .then((response) => {
          // Temporarily catching the success action via pusherSubscriptionManager with
          // 'collaboration_draft_updated' event and COLLABORATION_DRAFT_UPDATED action.
          if (response.error) {
            throw new SubmissionError({ _error: response.error });
          } else {
            dispatch(rescheduleSuccess({
              draft: response.draft
            }));
            dispatch(hideDateTimeForm());
          }
        }
        ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateTimeForm);
