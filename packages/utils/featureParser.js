module.exports = featureData => ({
  features: featureData.features || [],
  planName: (featureData.features || []).length > 0 ? 'pro' : 'free',
});
