"use client";

import Link from "next/link";
import Image from '@/components/common/ContentImage';
import { renderHtml } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GlobalLoader from "@/components/layout/GlobalLoader";
import { useTranslations } from "next-intl";

const FOOTER_LINK_CLASS =
  "text-[14px] text-white font-medium mb-[6px] inline-block transition-all duration-300 hover:text-white/80 hover:translate-x-1";
const SOCIAL_ICON_CLASS =
  "transition-all duration-300 hover:text-white/70 hover:scale-125 group  ";

export default function FooterMobile({ data, lang, otherLinks }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("footer");

  function changeCountry(slug) {
    setLoading(true);
    document.cookie = `country=${slug}; path=/`;
    window.dispatchEvent(
      new CustomEvent("countryChanged", { detail: { country: slug } }),
    );
    router.refresh();
  }

  return (
    <>
      {loading && <GlobalLoader />}
      <section className="bg-gradient-to-r from-[#0B436A] to-[#299B8A] pt-[45px] pb-[30px] sm:hidden">
        <div className="container">
          <Link
            href={`/${lang}`}
            className="block w-full max-w-[205px] m-auto mb-[25px]"
          >
            <Image
              src="/images/Logo-white-footer.png"
              width="205"
              height="45"
              className="w-full h-full object-contain"
              alt="footer_img"
            />
          </Link>
          {renderHtml(
            data?.site_settings?.footer_title,
            "[&_]:text-[23px] [&_]:text-white [&_]:text-center [&_]:uppercase [&_]:mb-[15px]",
          )}
          {/* countryBx */}
          <div className="w-full h-full border border-[#d9d9d93a] p-[15px] text-center rounded-[10px] bg-transparent backdrop-blur-[2px] mb-[30px]">
            <div className="text-[16px] text-white uppercase mb-[10px]">
              {t("countries")}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {data?.locations?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => changeCountry(item?.slug)}
                  className="text-[14px] text-white ps-[10px] relative before:absolute before:top-0 before:start-0
                            before:bottom-0 before:content-[''] before:m-auto before:bg-[#D9D9D9] before:w-[5px] before:h-[5px] before:rounded-full cursor-pointer"
                >
                  {item?.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <div className="text-[16px] text-white font-medium uppercase mb-[15px]">
                {t("otherLinks")}
              </div>
              <ul>
                {data?.policies?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${lang}/${item?.slug}`}
                      className={FOOTER_LINK_CLASS}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
                {otherLinks?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${lang}/${item?.link}`}
                      className={FOOTER_LINK_CLASS}
                    >
                      {lang === "en" ? item?.label : item?.label_ar}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <div className="text-[16px] text-white font-medium uppercase mb-[15px]">
                {t("contactUs")}
              </div>
              <p className="text-[14px] text-white mb-[20px]">
                {data?.site_settings?.footer_description}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="text-[16px] xs:text`-[18px] text-white font-medium w-fit flex items-center justify-center h-[40px] xs:h-[50px]
                           min-w-[120px] xs:min-w-[140px] p-[8px] border border-white "
              >
                {t("contactUs")}
                <div className="w-[14px] xs:w-[17px] h-[14px] flex items-center mx-[10px]">
                  <svg
                    className="w-full h-full object-contain"
                    viewBox="0 0 18 14"
                  >
                    <g clipPath="url(#clip0_1342_4984)">
                      <path
                        d="M9.38156 13.4279C9.27201 13.43 9.16155 13.4034 9.0641 13.3431C8.78295 13.17 8.69731 12.7942 8.86648 12.5133C8.8807 12.4885 10.6478 9.53965 14.0209 7.68392H0.907875C0.574073 7.68392 0.302612 7.41246 0.302612 7.07865C0.302612
                                        6.74485 0.574073 6.47339 0.907875 6.47339H14.0209C10.6665 4.62824 8.87949 1.66639 8.86194 1.63673C8.6964 1.35407 8.7881 0.977903
                                        9.07045 0.810547C9.35674 0.640771 9.73382 0.739126 9.90481 1.02693C10.1799 1.46574 12.7595 5.39965 17.3865 6.48822C17.6634 6.55631 17.8552 6.79872 17.8552
                                        7.07896C17.8552 7.35919 17.6646 7.60221 17.3916 7.66848C12.745 8.76098 10.1742 12.7 9.89634 13.1458C9.78739 13.3204 9.58584 13.4239 9.38156 13.4279Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1342_4984">
                        <rect width="18" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <div className="my-[15px] xs:my-[20px] border-b border-white/20">
            {data?.site_settings?.footer_social_title && (
              <>
                <div className="text-[14px] xs:text-[16px]  text-white font-medium mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px] uppercase">
                  {t("followUs")}
                </div>
                <div className="flex items-center -m-[10px] pb-[40px]">
                  {data?.social_links?.map((item, index) => (
                    <div key={index} className="p-[10px]">
                      <Link href={item?.url} className={SOCIAL_ICON_CLASS}>
                        <div className="w-[15px] h-[15px] flex items-center justify-center">
                          <Image
                            src={item?.icon}
                            className="w-full h-full object-contain"
                            width={30}
                            height={30}
                            alt={item?.name}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="text-[14px] text-white flex flex-col items-center gap-3">
            <p className="text-white">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <Link href="https://www.intersmartsolution.com/" target="_blank" className="flex items-center gap-[2px] sm:gap-2">
              {t("designedBy")}
              <Image src="/images/intersmart.png" width={110} height={28} alt="InterSmart" />
            </Link>
          </div>
        </div>

      </section>
    </>
  );
}
