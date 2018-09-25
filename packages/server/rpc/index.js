const { rpc } = require('@bufferapp/buffer-rpc');

const changeDateTimePreferences = require('./changeDateTimePreferences');
const changePassword = require('./changePassword');
const closeAccount = require('./closeAccount');
const composerApiProxyMethod = require('./composerApiProxy');
const connectedApps = require('./connectedApps');
const deletePostMethod = require('./deletePost');
const draftPostsMethod = require('./draftPosts');
const enabledApplicationModesMethod = require('./enabledApplicationModes');
const environmentMethod = require('./environment');
const featureMethod = require('./features');
const getNumberOfPostsMethod = require('./getNumberPosts');
const getTimezonesMethod = require('./getTimezones');
const pauseQueueMethod = require('./pauseQueue');
const performanceTrackingMethod = require('./performanceTracking');
const profilesMethod = require('./profiles');
const queuedPostsMethod = require('./queuedPosts');
const reorderPostsMethod = require('./reorderPosts');
const requeuePost = require('./requeuePost');
const revokeConnectedApp = require('./revokeConnectedApp');
const savePublishBetaRedirect = require('./savePublishBetaRedirect');
const sendFeedback = require('./sendFeedback');
const sentPostsMethod = require('./sentPosts');
const sharePostNowMethod = require('./sharePostNow');
const twoFactorConfirm = require('./twoFactorConfirm');
const twoFactorRecovery = require('./twoFactorRecovery');
const twoFactorUpdate = require('./twoFactorUpdate');
const updateEmail = require('./updateEmail');
const updatePausedSchedules = require('./updatePausedSchedules');
const updateScheduleMethod = require('./updateSchedule');
const updateTimezoneMethod = require('./updateTimezone');
const upgradeToPro = require('./upgradeToPro');
const userMethod = require('./user');

module.exports = rpc(
  changeDateTimePreferences,
  changePassword,
  closeAccount,
  composerApiProxyMethod,
  connectedApps,
  deletePostMethod,
  draftPostsMethod,
  enabledApplicationModesMethod,
  environmentMethod,
  featureMethod,
  getNumberOfPostsMethod,
  getTimezonesMethod,
  pauseQueueMethod,
  performanceTrackingMethod,
  profilesMethod,
  queuedPostsMethod,
  reorderPostsMethod,
  requeuePost,
  revokeConnectedApp,
  savePublishBetaRedirect,
  sendFeedback,
  sentPostsMethod,
  sharePostNowMethod,
  twoFactorConfirm,
  twoFactorRecovery,
  twoFactorUpdate,
  updateEmail,
  updatePausedSchedules,
  updateScheduleMethod,
  updateTimezoneMethod,
  upgradeToPro,
  userMethod,
);
