module.exports = (featureData) => {
  const { features } = featureData;

  return {
    features: features || {},
    planName: Object.keys(features || {}).length > 0 ? 'pro' : 'free',
  };
};
