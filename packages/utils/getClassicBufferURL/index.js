module.exports = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/classic';
  }
  return 'https://buffer.com/classic';
};
