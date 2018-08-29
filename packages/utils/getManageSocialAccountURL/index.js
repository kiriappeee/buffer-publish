module.exports = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/manage/own';
  }
  return 'https://buffer.com/manage/own';
};
