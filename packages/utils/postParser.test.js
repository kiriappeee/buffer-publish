import postParser from './postParser';

const tweet = {
  profile_service: 'twitter',
  text: 'What Do the New Twitter Rules Mean for Social Media Managers (and Buffer Customers) https://buff.ly/2JNS3tL',
  type: 'text',
};
const retweet = {
  profile_service: 'twitter',
  retweet: {
    user_id: 19475858,
    tweet_id: '990952846110658560',
    username: 'LouPas',
    url: 'https://twitter.com/LouPas/status/990952846110658560',
    created_at: 1525096544,
    created_at_string: 'Mon Apr 30 13:55:44 +0000 2018',
    profile_name: 'Lou Paskalis',
    text: '“The Daily has more listeners that the New York Times has readers. We are the new front page and reporters want to be on our show because of the power of that megaphone. You don’t skim a podcast” Michael Barbaro, TheDaily, #NewFronts https://t.co/zJR5wjR6e5',
    avatars: {
      http: 'http://pbs.twimg.com/profile_images/867425050043052033/Ci4OgTlV_normal.jpg',
      https: 'https://pbs.twimg.com/profile_images/867425050043052033/Ci4OgTlV_normal.jpg',
    },
    comment: 'Fascinating #Really',
    comment_formatted: 'Fascinating <a href="https://twitter.com/#!/search?q=%23Really" title="#Really" class="hashtag" rel="external nofollow" target="_blank">#Really</a>',
  },
  retweeted_tweet_id: '990952846110658560',
  text: 'Fascinating',
  text_formatted: '“The Daily has more listeners that the New York Times has readers. We are the new front page and reporters want to be on our show because of the power of that megaphone. You don’t skim a podcast” Michael Barbaro, TheDaily, <a href="https://twitter.com/#!/search?q=%23NewFronts" title="#NewFronts" class="hashtag" rel="external nofollow" target="_blank">#NewFronts</a> <a class="url" href="https://t.co/zJR5wjR6e5" rel="external nofollow" target="_blank">https://t.co/zJR5wjR6e5</a>',
  type: 'retweet',
};

describe('post parser', () => {
  it('extracts links from retweet', () => {
    const parsedPost = postParser(retweet);
    expect(parsedPost.links).toHaveLength(2);
  });

  it('stores links from retweet comment in retweetCommentLinks', () => {
    const parsedPost = postParser(retweet);
    expect(parsedPost.retweetCommentLinks).toHaveLength(1);
  });

  it('does not extract retweetCommentLinks if there is no retweetComment', () => {
    const parsedPost = postParser(tweet);
    expect(parsedPost.retweetCommentLinks).toHaveLength(0);
  });
});
