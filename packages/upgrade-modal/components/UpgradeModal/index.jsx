import React from 'react';
import PropTypes from 'prop-types';

import {
  Popover,
  Card,
  Text,
  Divider,
  Button,
} from '@bufferapp/components';

import { LockIcon } from '@bufferapp/components/Icon/Icons';

import InputText from '../InputText';
import PlanCycleSelect from '../PlanCycleSelect';
import Select from '../Select';

const listStyle = {
  padding: '0 1rem',
};

const listStyleLeft = {
  ...listStyle,
  marginRight: '1.2rem',
};

const listItemStyle = {
  marginBottom: '0.75rem',
};

const ListItem = ({ text }) =>
  <li style={listItemStyle}>
    <Text>
      {text}
    </Text>
  </li>;

ListItem.propTypes = { text: PropTypes.string.isRequired };

const currentYear = new Date().getFullYear();
const creditCardSvg = '<svg width="31" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M0 0h31v21H0z"/><rect width="31" height="21" rx="3" fill="%232D98C8"/><path fill="%23343E47" d="M0 3h31v3H0z"/><path fill="%23fff" d="M6 9h20v4H6z"/><path fill="%23FD232B" d="M20 10h5v2h-5z"/></svg>';

const UpgradeModal = ({ translations, cycle }) => (
  <Popover>
    <Card>
      <div style={{ width: '550px', margin: '0 25px' }}>
        <div style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>
          <Text size="large" color="outerSpace">{translations.proUpgradeHeader}</Text>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <ul style={listStyleLeft}>
              <ListItem text={translations.proPlanSocialAccounts} />
              <ListItem text={translations.proPlanFiltering} />
              <ListItem text={translations.proPlanCuration} />
            </ul>
          </div>
          <div style={{ flex: '1' }}>
            <ul style={listStyle}>
              <ListItem text={translations.proPlanScheduling} />
              <ListItem text={translations.proPlanCalendar} />
              <ListItem text={translations.proPlanBitly} />
            </ul>
          </div>
        </div>

        <Divider marginTop="" marginBottom="1.5rem" />

        <PlanCycleSelect
          translations={translations}
          cycle={cycle}
        />

        <div style={{ textAlign: 'center', margin: '1.5rem 0 1rem' }}>
          <Text>{translations.enterPaymentDetails} <LockIcon color="shamrock" /></Text>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, paddingRight: '25px' }}>
            <InputText id="cardName" label={translations.nameOnCard} />
          </div>
          <div style={{ flex: 1 }}>
            <InputText id="cardNumber" label={translations.cardNumber} />
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <div style={{ flex: 1, paddingRight: '25px' }}>
            <Select id="cardExpiryMonth" label={translations.expirationMonth}>
              <option />
              <option value="01">1 - Jan</option>
              <option value="02">2 - Feb</option>
              <option value="03">3 - Mar</option>
              <option value="04">4 - Apr</option>
              <option value="05">5 - May</option>
              <option value="06">6 - Jun</option>
              <option value="07">7 - Jul</option>
              <option value="08">8 - Aug</option>
              <option value="09">9 - Sep</option>
              <option value="10">10 - Oct</option>
              <option value="11">11 - Nov</option>
              <option value="12">12 - Dec</option>
            </Select>
          </div>

          <div style={{ flex: 1, paddingRight: '25px' }}>
            <Select id="cardExpiryYear" label={translations.expirationYear}>
              <option />
              {[...Array(26).keys()].map(i => (
                <option
                  key={currentYear + i}
                  value={currentYear + i}
                >
                  {currentYear + i}
                </option>
              ))}
            </Select>
          </div>

          <div style={{ flex: 1, paddingRight: '25px', position: 'relative' }}>
            <InputText
              id="cardCvc"
              label={translations.securityCode}
              backgroundStyle={`right 6px center no-repeat url('data:image/svg+xml;utf8,${creditCardSvg}')`}
            />
          </div>

          <div style={{ flex: 1 }}>
            <InputText id="cardZip" label={translations.zipCode} note={translations.zipLeaveBlank} />
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0 0' }}>
          <Button large>{translations.upgradeCta}</Button>
          <br /><br />
          <Button secondary large borderless>{translations.stayOnFreeCta}</Button>
        </div>
      </div>
    </Card>
  </Popover>
);

UpgradeModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cycle: PropTypes.string.isRequired,
};

export default UpgradeModal;
