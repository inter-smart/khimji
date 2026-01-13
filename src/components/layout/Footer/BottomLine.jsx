import Link from "next/link";
import Image from "next/image";

export default function BottomLine({ lang }) {
  return (
    <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-white border-t border-white/20 py-5 flex items-center justify-between">
      <span>{lang === "en" ? "Copyright © 2025 Khimji Ramdas. All Rights Reserved." : "جميع الحقوق محفوظة © 2025 خيمجي رامداس."}</span>

      <Link href="https://www.intersmartsolution.com/" target="_blank" className="flex items-center gap-2">
        {lang === "en" ? "Designed & Developed By:" : "تم التصميم والتطوير بواسطة"}
        <Image src="/images/intersmart.png" width={110} height={28} alt="InterSmart" />
      </Link>
    </div>
  );
}