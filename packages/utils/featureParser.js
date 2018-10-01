module.exports = (featureData) => {
  const { features } = featureData;

  return {
    features: features || {},
    planName: Object.keys(features || {}).filter(k => features[k] === true).length > 0 ? 'pro' : 'free',
  };
};
