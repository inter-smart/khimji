"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BorderBeam } from "@/components/ui/border-beam";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocationDropdown({ countries: allCountries }) {
  const [countries, setCountries] = useState([]);
  const router = useRouter();

  // Load countries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("countries");
    if (stored) {
      setCountries(JSON.parse(stored));
    }
  }, []);

  function changeCountry(slug) {
    document.cookie = `country=${slug}; path=/`;
    router.refresh();
  }

  const selectedCountry = document.cookie
    .split("; ")
    .find((c) => c.startsWith("country="))
    ?.split("=")[1];

  return (
    <div className="px-[7px] sm:px-[3px]">
      <div className="relative inline-flex rounded-full">
        <Select
          value={selectedCountry}
          onValueChange={changeCountry}
          modal={false}
        >
          <SelectTrigger className="relative text-white sm:text-black min-w-[115px] rounded-[40px] sm:rounded-[5px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>

          <SelectContent className="max-w-[180px]">
            {countries.map((c) => (
              <SelectItem key={c.id} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <BorderBeam
          duration={15}
          size={60}
          reverse
          className="from-transparent via-white/70 to-transparent"
        />
        <BorderBeam
          duration={13}
          size={70}
          className="from-transparent via-white/70 to-transparent"
        />
      </div>
    </div>
  );
}
