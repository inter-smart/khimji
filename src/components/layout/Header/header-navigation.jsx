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
  {
    label: "Consumer Oriented",
    label_ar: "موجه للمستهلك",
    businessType: "b2c",
  },
  {
    label: "Corporate Oriented",
    label_ar: "موجه للشركات",
    businessType: "b2b",
  },
];

export default function HeaderNavigation({
  locale,
  pathname,
  onNavigationClick,
  menuItems,
  showDarkHeader,
}) {
  const isEN = locale === "en";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeBusinessType, setActiveBusinessType] = useState(() => {
    if (typeof window === "undefined") return null;
    const match = document.cookie.split("; ").find((c) => c.startsWith("business_type="));
    return match ? match.split("=")[1] : null;
  });

  function handleVentureClick(businessType) {
    document.cookie = `business_type=${businessType}; path=/`;
    setActiveBusinessType(businessType);
    window.dispatchEvent(
      new CustomEvent("businessTypeChanged", {
        detail: { business_type: businessType },
      }),
    );
    startTransition(() => {
      router.push(`/${locale}/venture`);
    });
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
              showDarkHeader
                ? "text-[#000] hover:text-black"
                : "text-[#000] font-semibold hover:text-[#299b8a]",
              isActive ? "text-[#299b8a] " : "",
            );

            if (item.slug === "/venture") {
              return (
                <li key={item.slug}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          linkClass,
                          "flex items-center gap-1 outline-none group",
                        )}
                      >
                        {isEN ? item.name : item.name_ar}
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-56 mt-2 rounded-xl border border-gray-100 bg-white/95 backdrop-blur-md p-2 shadow-xl"
                    >
                      {VENTURE_SUBMENU.map((opt) => {
                        const isActive =
                          document.cookie.split("; ").find((c) => c.startsWith("business_type=")) === `business_type=${opt.businessType}`;
                        return (
                          <DropdownMenuItem
                            key={opt.businessType}
                            onClick={() => handleVentureClick(opt.businessType)}
                            className={cn(
                              "cursor-pointer group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all",
                              isActive
                                ? "bg-[#299b8a]/10 text-[#299b8a]"
                                : "hover:bg-[#299b8a]/10 hover:text-[#299b8a] focus:bg-[#299b8a]/10 focus:text-[#299b8a]",
                            )}
                          >
                            <span>{isEN ? opt.label : opt.label_ar}</span>
                            <ChevronDown className="w-4 h-4 opacity-0 -rotate-90 transition-all group-hover:opacity-100 group-hover:translate-x-1 group-focus:opacity-100 group-focus:translate-x-1" />
                          </DropdownMenuItem>
                        );
                      })}
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
