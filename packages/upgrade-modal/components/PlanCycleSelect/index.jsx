import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
} from '@bufferapp/components';

import {
  curiousBlue,
  mystic,
} from '@bufferapp/components/style/color';

import {
  borderRadius,
} from '@bufferapp/components/style/border';

import { CircleCheckmarkIcon } from '@bufferapp/components/Icon/Icons';

const getPlanCycleStyle = (selected, first) => ({
  display: 'block',
  flex: '1',
  padding: '0.8rem 0.25rem',
  borderRadius,
  cursor: 'pointer',
  position: 'relative',

  background: selected ? curiousBlue : 'white',
  border: selected ? '1px solid transparent' : `1px solid ${mystic}`,
  marginRight: first ? '25px' : 0,
});

const checkmarkContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '15px',
  transform: 'translateY(-11px)',
};

const PlanCycleButton = ({ first, label, description, selected }) =>
  <button style={getPlanCycleStyle(selected, first)}>
    <Text color={selected ? 'white' : 'nevada'} size="large" weight="bold">{label}</Text><br />
    <Text color={selected ? 'white' : 'nevada'} size="small">{description}</Text>
    {selected &&
      <div style={checkmarkContainerStyle}>
        <CircleCheckmarkIcon size={{ width: '22px' }} color="white" />
      </div>
    }
  </button>;

PlanCycleButton.propTypes = {
  first: PropTypes.bool,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

PlanCycleButton.defaultProps = {
  first: false,
};

const PlanCycleSelect = ({ translations, cycle }) => (
  <div style={{ display: 'flex' }}>
    <PlanCycleButton
      first
      label={translations.proPlanMonthlyPrice}
      description={translations.proPlanMonthlyDescription}
      selected={cycle === 'month'}
    />
    <PlanCycleButton
      label={translations.proPlanYearlyPrice}
      description={translations.proPlanYearlyDescription}
      selected={cycle === 'year'}
    />
  </div>
);

PlanCycleSelect.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cycle: PropTypes.string.isRequired,
};

export default PlanCycleSelect;
