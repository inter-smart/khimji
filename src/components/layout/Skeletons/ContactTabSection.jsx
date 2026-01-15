import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ContactDetailsSkeleton = () => {
  return (
    <div className="w-full h-auto block">
      {/* Tabs Skeleton */}
      <div className="w-auto h-auto gap-[5px] 2xl:gap-[10px] mx-auto mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] flex flex-wrap justify-center">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-[40px] sm:h-[44px] 2xl:h-[50px] w-[160px] sm:w-[180px] 2xl:w-[200px]" />
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="w-full h-auto p-[20px] lg:p-[30px] 2xl:p-[40px] 3xl:p-[50px] bg-white rounded-[8px]">
        {/* Category Section */}
        <div className="w-full h-auto py-[20px] sm:py-[25px] lg:py-[30px] 2xl:py-[35px] 3xl:py-[45px] border-b border-[#00416B]/20">
          {/* Category Title Skeleton */}
          <Skeleton className="h-[24px] sm:h-[28px] lg:h-[32px] 2xl:h-[36px] 3xl:h-[42px] max-w-[280px] mb-[15px] sm:mb-[20px] 3xl:mb-[25px]" />

          {/* Contact Cards Grid */}
          <div className="sm:mx-[-10px] lg:mx-[-15px] 2xl:mx-[-20px] 3xl:mx-[-25px] flex flex-wrap">
            {[1, 2, 3].map((contact) => (
              <div
                key={contact}
                className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 h-auto py-[5px] sm:p-[10px] lg:p-[10px_15px] 2xl:p-[15px_20px] 3xl:p-[15px_25px]"
              >
                <div className="w-full h-full p-[15px] sm:p-[20px] 2xl:p-[30px] rounded-[5px] overflow-hidden block relative z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:rounded-[5px] before:opacity-60 after:content-[''] after:absolute after:inset-[1px] after:bg-white after:rounded-[5px] before:z-[-2] after:z-[-1]">
                  {/* Contact Title Skeleton */}
                  <Skeleton className="h-[22px] lg:h-[26px] 2xl:h-[30px] 3xl:h-[36px] max-w-[180px] mb-[10px] sm:mb-[15px] 2xl:mb-[25px]" />

                  {/* Contact Content Lines */}
                  <div className="space-y-2">
                    <Skeleton className="h-[16px] 2xl:h-[18px] 3xl:h-[22px] w-full" />
                    <Skeleton className="h-[16px] 2xl:h-[18px] 3xl:h-[22px] w-[90%]" />
                    <Skeleton className="h-[16px] 2xl:h-[18px] 3xl:h-[22px] w-[80%]" />
                    <Skeleton className="h-[16px] 2xl:h-[18px] 3xl:h-[22px] w-[85%]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsSkeleton;
