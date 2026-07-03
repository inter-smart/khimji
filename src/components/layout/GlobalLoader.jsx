"use client";

import { createPortal } from "react-dom";
import Image from '@/components/common/ContentImage';

export default function GlobalLoader() {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center transition-opacity duration-500">
      {/* Logo with rotating ring */}
      <div className="relative">
        {/* Rotating ring around logo */}
        <div className="absolute -inset-4 border-4 border-transparent border-t-[#00416B] border-r-[#B02129] rounded-full animate-spin"></div>

        {/* Logo container with scale animation */}
        <div className="relative w-20 h-20 p-4 animate-pulse">
          <Image src="/images/loader.png" alt="Logo" fill className="object-contain" priority />
        </div>
      </div>
    </div>,
    document.body
  );
}
