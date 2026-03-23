"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeaderNavigation({ locale, pathname, onNavigationClick, menuItems, showDarkHeader }) {
  const isEN = locale === "en";

  return (
    <nav aria-label="Primary navigation" className="w-full">
      <ul className="flex items-center gap-3 text-[15px] 2xl:text-[18px]">
        {menuItems?.map((item) => {
          const isActive = pathname === item.slug;
          return (
            <li key={item.slug}>
              <Link
                href={`/${locale}${item.slug}`}
                onClick={onNavigationClick}
                className={cn(
                  "transition-colors duration-200 px-2 2xl:px-4 3xl:px-6",
                  showDarkHeader ? "text-[#000] hover:text-black" : "text-[#000] font-semibold hover:text-[#299b8a]",
                  isActive ? "text-[#299b8a] " : ""
                )}
              >
                {isEN ? item.name : item.name_ar}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
