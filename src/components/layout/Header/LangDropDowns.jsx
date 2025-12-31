"use client";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";

export default function LangDropDown() {
  const { language, languageData, setLanguage, languages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 cursor-pointer focus:outline-none">
        <Image
          src={languageData?.flag}
          alt={languageData?.fullName}
          width={28}
          height={20}
          className="rounded-sm object-cover w-[28px] h-[20px]"
        />
        <span className="font-medium text-[16px] uppercase">{languageData?.name}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-accent' : ''}`}
          >
            <div className="flex items-center gap-2 w-full">
              <Image
                src={lang.flag}
                alt={lang.fullName}
                width={20}
                height={20}
                className="rounded-sm object-cover w-[20px] h-[20px]"
              />
              <span>{lang.fullName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
