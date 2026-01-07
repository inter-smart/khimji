import { renderHtml } from "@/lib/helper";
import Link from "next/link";

const FOOTER_LINK_CLASS =
  "text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium mb-[4px] xl:mb-[7px] 3xl:mb-[10px] inline-block transition-all duration-300 hover:text-white/80 hover:translate-x-1 cursor-pointer";
const CONTACT_BUTTON_CLASS =
  "text-[12px] 2xl:text-[16px] 3xl:text-[18px] text-white capitalize font-medium flex items-center group transition-all duration-300 hover:text-white/90";
const ARROW_ICON_CLASS =
  "w-[14px] h-[14px] flex items-center mt-[5px] mx-[15px] transition-transform duration-300 group-hover:translate-x-1";

export default function Links({
  locations,
  lang,
  site_settings,
  changeCountry,
  policies,
}) {
  const otherLinks = [
    {
      label: "Blogs",
      link: "blog",
    },
    {
      label: "Faq",
      link: "faq",
    },
    {
      label: "ICV Initiatives",
      link: "ICV",
    },
    {
      label: "Career",
      link: "career",
    },
    {
      label: "Contact",
      link: "contact",
    },
  ];

  return (
    <>
      <div className="w-5/12">
        {renderHtml(
          site_settings?.footer_title,
          "max-w-[100px] text-[35px] lg:text-[35px] xl:text-[40px] 2xl:text-[55px] 3xl:text-[80px] leading-[1.4] text-white font-light uppercase"
        )}
      </div>
      <div className="w-4/12">
        <div className="flex flex-wrap -m-[15px]">
          {/* COUNTRIES */}
          <div className="w-1/2 p-[15px]">
            <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium uppercase mb-[15px]">
              {lang === "en" ? "Countries" : "بلدان"}
            </div>

            <ul>
              {locations?.map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => changeCountry(item?.slug)}
                    className={FOOTER_LINK_CLASS}
                  >
                    {item?.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* OTHER LINKS */}
          <div className="w-1/2 p-[15px]">
            <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium uppercase mb-[15px]">
              {lang === "en" ? "Other Links" : "روابط اخرى"}
            </div>

            <ul>
              {policies?.map((item, index) => (
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
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full p-[15px]">
            <p className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] font-medium text-white mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px]">
              {site_settings?.footer_description}
            </p>

            <Link href={`/${lang}/contact`} className={CONTACT_BUTTON_CLASS}>
              {lang === "en" ? "Contact Us" : "اتصل بنا"}
              <div className={ARROW_ICON_CLASS}>
                <svg className="w-full h-full object-cover" viewBox="0 0 14 15">
                  <g clipPath="url(#clip0_1055_230)">
                    <path
                      d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1055_230">
                      <rect width="14" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
