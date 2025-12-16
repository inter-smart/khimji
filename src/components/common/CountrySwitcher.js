// components/common/CountrySwitcher.js

'use client';

import { useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { COUNTRIES } from '@/lib/countries';

export default function CountrySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  
  // Get current country from URL
  const currentCountry = COUNTRIES[params.country];
  
  // Get all countries as array
  const countries = Object.values(COUNTRIES);

  // Function to change country
  const handleCountryChange = (newCountryCode) => {
    // Replace old country code with new one in URL
    const newPathname = pathname.replace(`/${params.country}`, `/${newCountryCode}`);
    
    // Navigate to new URL
    router.push(newPathname);
    
    // Close dropdown
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Button to open dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-2xl">{currentCountry.flag}</span>
        <span className="font-medium">{currentCountry.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Background overlay - closes dropdown when clicked */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Country list */}
          <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[200px]">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  currentCountry.code === country.code ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium">{country.name}</span>
                
                {/* Checkmark for selected country */}
                {currentCountry.code === country.code && (
                  <svg 
                    className="w-5 h-5 ml-auto text-blue-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}