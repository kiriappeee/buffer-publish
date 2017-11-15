import { connect } from 'react-redux';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import { actions } from './reducer';

import ProfileSettings from './components/ProfileSettings';

export default connect(
  state => ({
    loading: state.settings.loading,
    scheduleLoading: state.settings.scheduleLoading,
    settingsHeader: state.settings.settingsHeader,
    translations: state.i18n.translations.settings, // all package translations
    days: state.settings.days,
    schedules: state.settings.schedules,
    pausedSchedules: state.settings.pausedSchedules,
    items: state.settings.items,
    profileTimezoneCity: state.settings.profileTimezoneCity,
    hasTwentyFourHourTimeFormat: state.settings.hasTwentyFourHourTimeFormat,
    clearTimezoneInput: state.settings.clearTimezoneInput,
    paused: state.settings.paused,
  }),
  (dispatch, ownProps) => ({
    onRemoveTimeClick: (hours, minutes, dayName, timeIndex, paused) => {
      dispatch(actions.handleRemoveTimeClick({
        hours,
        minutes,
        dayName,
        timeIndex,
        profileId: ownProps.profileId,
        paused,
      }));
    },
    onUpdateTime: (hours, minutes, dayName, timeIndex, paused) => {
      dispatch(actions.handleUpdateTime({
        hours,
        minutes,
        dayName,
        timeIndex,
        profileId: ownProps.profileId,
        paused,
      }));
    },
    onAddPostingTime: ({ day, time }) => {
      dispatch(actions.handleAddPostingTime({
        hours: time.hours,
        minutes: time.minutes,
        dayName: day.day || day,
        profileId: ownProps.profileId,
      }));
    },
    onUpdateTimezone: ({ timezone, city }) => {
      dispatch(actions.handleUpdateTimezone({
        timezone,
        city,
        profileId: ownProps.profileId,
      }));
    },
    // send both args to allow debounce to work correctly
    onGetTimezones: (ev, timezone) => {
      if (timezone.length > 1) {
        dispatch(actions.handleGetTimezones({
          query: timezone,
        }));
      }
    },
    onTimezoneInputFocus: () => {
      dispatch(actions.handleTimezoneInputFocus());
    },
    onTimezoneInputBlur: () => {
      dispatch(actions.handleTimezoneInputBlur());
    },
    // maybe we can pass a `pausing` flag here that we can
    // check in the handler to see how to update the schedules?
    onPauseToggleClick: (dayName, paused) => {
      dispatch(actions.handlePauseToggleClick({
        profileId: ownProps.profileId,
        dayName,
        paused,
      }));
    },
    onUnpauseClick: () => {
      dispatch(profileSidebarActions.onUnpauseClick({ profileId: ownProps.profileId }));
    },
    onPauseClick: () => {
      dispatch(profileSidebarActions.onPauseClick({ profileId: ownProps.profileId }));
    },
  }),
)(ProfileSettings);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
/*
a consumer of a package should be able to use the package in the following way:
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
*/
