import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header>
      <div className="w-full bg-white max-sm:hidden">
        <div className="container">
          <div className="w-full flex flex-wrap items-center justify-between p-[15px_0] border-b border-[rgba(0,0,0,0.1)]">
            {/* Logo Skeleton */}
            <div className="flex items-center justify-center max-w-[125px] lg:max-w-[145px] xl:max-w-[175px] 2xl:max-w-[225px] 3xl:max-w-[275px] w-full">
              <Skeleton className="h-[45px] w-full rounded-md" />
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-4 p-4 rounded-xl">
                {/* Search Box Skeleton */}
                <Skeleton className="h-[40px] w-[220px] rounded-lg" />

                {/* Business Select Skeleton */}
                <Skeleton className="h-[40px] w-[160px] rounded-lg" />

                {/* Language Dropdown Skeleton */}
                <div className="flex items-center gap-2 px-2">
                  <Skeleton className="h-[20px] w-[28px] rounded-sm" />
                  <Skeleton className="h-[18px] w-[36px] rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
