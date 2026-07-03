"use client";

import Link from "next/link";
import Image from '@/components/common/ContentImage';
import { useTranslations } from "next-intl";

export default function BottomLine() {
  const t = useTranslations("footer");

  return (
    <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-white border-t border-white/20 py-5 flex items-center justify-between">
      <span>
        {t("copyright", { year: new Date().getFullYear() })}
      </span>

      <Link href="https://www.intersmartsolution.com/" target="_blank" className="flex items-center gap-2">
        {t("designedBy")}
        <Image src="/images/intersmart.png" width={110} height={28} alt="InterSmart" />
      </Link>
    </div>
  );
}
