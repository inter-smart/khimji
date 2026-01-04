import { Suspense } from "react";
import ContactDetail from "./ContactDetail"; // client component
import ContactDetailsSkeleton from "@/components/layout/Skeletons/ContactTabSection";

export default function Contacts({ sectors, cms, lang }) {
  return (
    <div className="w-full h-auto block">
      <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.3] font-normal text-[#0B436A] text-center mb-[15px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[35px]">
        {cms?.title2 || "CONTACT DETAILS"}
      </h2>
      <Suspense fallback={<ContactDetailsSkeleton />}>
        <ContactDetail sectors={sectors} lang={lang} />
      </Suspense>
    </div>
  );
}
