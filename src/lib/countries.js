// lib/countries.js

export const COUNTRIES = {
  us: {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currency: '$',
    language: 'English'
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: '£',
    language: 'English'
  },
  in: {
    code: 'in',
    name: 'India',
    flag: '🇮🇳',
    currency: '₹',
    language: 'Hindi/English'
  },
  ae: {
    code: 'ae',
    name: 'UAE',
    flag: '🇦🇪',
    currency: 'AED',
    language: 'Arabic'
  }
};

export const SUPPORTED_COUNTRIES = ['us', 'uk', 'in', 'ae'];
export const DEFAULT_COUNTRY = 'us';