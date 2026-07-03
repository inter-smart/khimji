
// components/common/PageLoader.jsx
"use client";

import { useEffect, useState } from "react";
import Image from '@/components/common/ContentImage';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo with rotating ring */}
      <div className="relative">
        {/* Rotating ring around logo */}
        <div className="absolute -inset-4 border-4 border-transparent border-t-[#00416B] border-r-[#B02129] rounded-full animate-spin"></div>
        
        {/* Logo container with scale animation */}
        <div className="relative w-20 h-20 p-4 animate-pulse">
          <Image
            src="/images/loader.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div> 
    </div>
  );
}