"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import GlobalLoader from "@/components/layout/GlobalLoader";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const VENTURE_SUBMENU = [
  { label: "Consumer Oriented", businessType: "b2c" },
  { label: "Corporate Oriented", businessType: "b2b" },
];

export default function HeaderNavigation({ locale, pathname, onNavigationClick, menuItems, showDarkHeader }) {
  const isEN = locale === "en";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleVentureClick(businessType) {
    document.cookie = `business_type=${businessType}; path=/`;
    window.dispatchEvent(new CustomEvent("businessTypeChanged", { detail: { business_type: businessType } }));
    startTransition(() => { router.push(`/${locale}/venture`); });
  }

  return (
    <>
    {isPending && <GlobalLoader />}
    <nav aria-label="Primary navigation" className="w-full">
      <ul className="flex items-center gap-3 text-[15px] 2xl:text-[18px]">
        {menuItems?.map((item) => {
          const isActive = pathname === item.slug;
          const linkClass = cn(
            "transition-colors duration-200 px-2 2xl:px-4 3xl:px-6",
            showDarkHeader ? "text-[#000] hover:text-black" : "text-[#000] font-semibold hover:text-[#299b8a]",
            isActive ? "text-[#299b8a] " : ""
          );

          if (item.slug === "/venture") {
            return (
              <li key={item.slug}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={cn(linkClass, "flex items-center gap-1 outline-none")}>
                      {isEN ? item.name : item.name_ar}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {VENTURE_SUBMENU.map((opt) => (
                      <DropdownMenuItem
                        key={opt.businessType}
                        onClick={() => handleVentureClick(opt.businessType)}
                        className="cursor-pointer"
                      >
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            );
          }

          return (
            <li key={item.slug}>
              <Link
                href={`/${locale}${item.slug}`}
                onClick={onNavigationClick}
                className={linkClass}
              >
                {isEN ? item.name : item.name_ar}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
    </>
  );
}
