module.exports = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/manage/accounts/connect';
  }
  return 'https://buffer.com/manage/accounts/connect';
};
