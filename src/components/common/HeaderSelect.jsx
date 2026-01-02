"use client";

import BusinessTypeDropDown from "../layout/Header/BusinessTypeDropDown";
import LocationDropdown from "../layout/Header/LocationDropdown";

export default function HeaderSelect({ businessTypePromise, locationsPromise }) {
  return (
    <div className="flex items-center -mx-[7px]">
      <BusinessTypeDropDown businessTypePromise={businessTypePromise} />
      <LocationDropdown locationsPromise={locationsPromise} />
    </div>
  );
}
