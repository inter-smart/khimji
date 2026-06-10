import LocationDropdown from "../layout/Header/LocationDropdown";

export default function HeaderSelect({ locationsPromise }) {
  return (
    <div className="flex items-center -mx-[7px]">
      <LocationDropdown locationsPromise={locationsPromise} />
    </div>
  );
}
