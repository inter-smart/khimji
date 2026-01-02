"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BorderBeam } from "@/components/ui/border-beam";
import LocationDropdown from "../layout/Header/LocationDropdown";

export default function HeaderSelect({ data, countries }) {
  return (
    <div className="flex items-center -mx-[7px]">
      <div className="px-[7px] sm:px-[3px]">
        <div className="relative inline-flex rounded-full">
          <Select modal={false}>
            <SelectTrigger
              className="
                          relative
                          text-[16px] 3xs:text-[18px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-white sm:text-black font-medium max-w-full min-h-[30px]
                           2xl:min-h-[35px] 3xl:min-h-[45px] px-3 sm:px-2 
                          border border-white/5 sm:border-black min-w-[115px] lg:min-w-[125px] rounded-[40px] sm:rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none backdrop-blur-[2px]
                          data-[state=open]:border-[#00095b]                         
                          data-[placeholder]:sm:text-black
                           data-[placeholder]:text-white  [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px]
                           after:bg-[url('/images/arrow.svg')] after:max-sm:invert-100 after:max-sm:brightness-100 after:bg-no-repeat after:bg-center
                        "
            >
              <SelectValue placeholder="Business" />
            </SelectTrigger>
            <SelectContent className="max-w-[110px] ">
              {data?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <BorderBeam duration={10} size={50} className="from-transparent via-white/70 to-transparent" />
          <BorderBeam duration={11} size={50} reverse className="from-transparent via-white/70 to-transparent" />
        </div>
      </div>

      {/* Location Select */}

      <LocationDropdown allCountries={countries} />
    </div>
  );
}
