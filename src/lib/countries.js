// lib/countries.js

export const COUNTRIES = {
  uae: {
    code: 'ae',
    name: 'UAE',
    flag: 'https://flagcdn.com/w40/ae.png',
    currency: 'AED',
    language: 'Arabic',
    isRTL: true
  },
  oman: {
    code: 'om',
    name: 'Oman',
    flag: 'https://flagcdn.com/w40/om.png',
    currency: 'OMR',
    language: 'Arabic',
    isRTL: true
  },
  saudi: {
    code: 'sa',
    name: 'Saudi Arabia',
    flag: 'https://flagcdn.com/w40/sa.png',
    currency: 'SAR',
    language: 'Arabic',
    isRTL: true
  },
  qatar: {
    code: 'qa',
    name: 'Qatar',
    flag: 'https://flagcdn.com/w40/qa.png',
    currency: 'QAR',
    language: 'Arabic',
    isRTL: true
  },
  Bahrain: {
    code: 'bh',
    name: 'Bahrain',
    flag: 'https://flagcdn.com/w40/bh.png',
    currency: 'BHD',
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
    language: 'Hindi/English',
    isRTL: false
  }
};

export const COUNTRY_SLUG_MAP = {
  "united-arab-emirates": "uae",
  "saudi-arabia": "saudi",
  "qatar": "qatar",
  "kuwait": "kuwait",
  "oman": "oman",
  "india": "india",
};


export const SUPPORTED_COUNTRIES = ['uae', 'oman', 'saudi', 'qatar', 'kuwait', 'india'];
export const RTL_COUNTRIES = ['uae', 'oman', 'saudi', 'qatar', 'kuwait'];
export const DEFAULT_COUNTRY = 'uae';

export const isRTLLocale = (locale) => RTL_COUNTRIES.includes(locale);