import BlogCard from "@/components/common/BlogCard";
import BlogPagination from "./Pagination";
import { useTranslations } from "next-intl";

export default function BlogsSection({ blogs, paginationData, error, variant, lang }) {
  const t = useTranslations("blog");
  return (
    <section className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[60px_70px] 2xl:py-[70px_90px] 3xl:py-[90px_115px] overflow-hidden block relative z-0">
      <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] opacity-40 pointer-events-none absolute -z-1 inset-[5%_0_auto_auto]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] opacity-40 pointer-events-none absolute -z-1 inset-[15%_auto_auto_-10%]"></div>
      <div className="container">
        <div className="w-full h-auto mb-[40px] sm:mb-[60px] lg:mb-[80px] 2xl:mb-[110px] 3xl:mb-[140px]">
          {blogs.length === 0 ? (
            <NoDataState variant={variant} />
          ) : error ? (
            <ErrorState message={error} />
            
          ): (
            <div className="w-full mx-[-5px] sm:mx-[-7px] 2xl:mx-[-10px] flex flex-wrap">
              {blogs?.length > 0 ? (
                blogs?.map((item, index) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-[5px] sm:p-[7px] 2xl:p-[10px]">
                    <BlogCard item={item} variant={variant} lang={lang}/>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-gray-500">{variant === "news" ? t("noNewsFound") : t("noBlogsFound")}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {paginationData && paginationData.last_page > 1 && <BlogPagination paginationData={paginationData} />}
      </div>
    </section>
  );
}

function ErrorState({ message, variant }) {
  const t = useTranslations("blog");
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[60px] h-[60px] bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-[30px] h-[30px] text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-red-600 font-medium mb-2">{variant === "news" ? t("errorLoadingNews") : t("errorLoadingBlogs")}</p>
        <p className="text-[14px] 2xl:text-[16px] text-[#666]">{message}</p>
      </div>
    </div>
  );
}

function NoDataState({variant}) {
  const t = useTranslations("blog");
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-[60px] h-[60px] bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-[30px] h-[30px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-[16px] 2xl:text-[18px] text-[#666] font-medium mb-2">{variant === "news" ? t("noNewsFound") : t("noBlogsFound")}</p>
        <p className="text-[14px] 2xl:text-[16px] text-[#999]">{variant === "news" ? t("noNewsAvailable") : t("noBlogsAvailable")}</p>
      </div>
    </div>
  );
}
