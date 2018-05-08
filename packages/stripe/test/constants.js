
export const CREDIT_CARD = '4242424242424242';
export const TOKEN = 'tok_visa';
export const SUCCESS_RESPONSE = {
  id: TOKEN,
  card: {
    name: 'Buffer',
  },
};

export const ERROR_RESPONSE = {
  error: {
    message: 'This is an error response',
  },
};

export const CARD_WITHOUT_NAME_RESPONSE = {
  card: {
    name: null,
  },
};

export const CARD_WITHOUT_ZIP_RESPONSE = {
  card: {
    name: 'Buffer',
    country: 'US',
    address_zip: false,
  },
};

