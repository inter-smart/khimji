import Image from "next/image";

export default function Loading() {
  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500 `}>
      {/* Logo with rotating ring */}
      <div className="relative">
        {/* Rotating ring around logo */}
        <div className="absolute -inset-4 border-4 border-transparent border-t-[#00416B] border-r-[#B02129] rounded-full animate-spin"></div>

        {/* Logo container with scale animation */}
        <div className="relative w-20 h-20 p-4 animate-pulse">
          <Image src="/images/loader.png" alt="Logo" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}
