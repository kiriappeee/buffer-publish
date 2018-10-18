
module.exports = {
  getClassicBufferURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/classic';
    }
    return 'https://buffer.com/classic';
  },
  getConnectSocialAccountURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/manage/accounts/connect';
    }
    return 'https://buffer.com/manage/accounts/connect';
  },
  getManageSocialAccountURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/manage/own';
    }
    return 'https://buffer.com/manage/own';
  },
  getInstagramDirectPostingURL: (profileIdObj) => {
    const profileId = profileIdObj.profileId;
    if (window.location.hostname === 'publish.local.buffer.com') {
      return `https://local.buffer.com/instagram/setup?profile_id=${profileId}`;
    }
    return `https://buffer.com/instagram/setup?profile_id=${profileId}`;
  },
};
