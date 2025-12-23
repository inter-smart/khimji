// lib/countries.js

export const COUNTRIES = {
  uae: {
    code: 'ae',
    name: 'UAE',
    flag: 'https://flagcdn.com/w40/ae.png',
    currency: 'AED',
    language: 'Arabic'
  },
  oman: {
    code: 'om',
    name: 'Oman',
    flag: 'https://flagcdn.com/w40/om.png',
    currency: 'OMR',
    language: 'Arabic'
  },
  saudi: {
    code: 'sa',
    name: 'Saudi Arabia',
    flag: 'https://flagcdn.com/w40/sa.png',
    currency: 'SAR',
    language: 'Arabic'
  },
  qatar: {
    code: 'qa',
    name: 'Qatar',
    flag: 'https://flagcdn.com/w40/qa.png',
    currency: 'QAR',
    language: 'Arabic'
  },
  kuwait: {
    code: 'kw',
    name: 'Kuwait',
    flag: 'https://flagcdn.com/w40/kw.png',
    currency: 'KWD',
    language: 'Arabic'
  },
  india: {
    code: 'in',
    name: 'India',
    flag: 'https://flagcdn.com/w40/in.png',
    currency: '₹',
    language: 'Hindi/English'
  }
};

export const SUPPORTED_COUNTRIES = ['uae', 'oman', 'saudi', 'qatar', 'kuwait', 'india'];
export const DEFAULT_COUNTRY = 'uae';