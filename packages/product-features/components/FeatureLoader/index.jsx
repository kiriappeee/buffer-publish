import React from 'react';
import PropTypes from 'prop-types';

const FeatureLoader = ({
   productFeatures,
   supportedFeatures,
   children,
   fallback,
   supportedPlans,
 }) => {
  const {
    planName,
    features,
  } = productFeatures;

  if (typeof supportedPlans !== 'undefined') {
    const supportedPlanList = (typeof supportedPlans === 'string' ? [supportedPlans] : supportedPlans)
      .map(p => p.toLowerCase());
    const currentPlan = planName.toLowerCase();
    if (!supportedPlanList.some((plan) => plan === currentPlan)) {
      return fallback || null;
    }
  }

  if (typeof supportedFeatures !== 'undefined') {
    const supportedFeatureList = typeof supportedFeatures === 'string' ? [supportedFeatures] : supportedFeatures;
    const supportedFeatureNames = supportedFeatureList.map(f => f.toLowerCase());
    const currentFeatures = Object.keys(features).filter(f => features[f])
      .map(f => f.toLowerCase());

    if (!supportedFeatureNames.some(feature => currentFeatures.indexOf(feature) >= 0)) {
      return fallback || null;
    }
  }

  return children;
};

FeatureLoader.propTypes = {
  featureNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  fallback: PropTypes.node,
  supportPlans: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

FeatureLoader.defaultProps = {
  features: [],
};

export default FeatureLoader;
