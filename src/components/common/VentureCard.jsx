import { renderHtml } from "@/lib/helper";
import Image from '@/components/common/ContentImage';
import Link from "next/link";
import { useTranslations } from "next-intl";

const CONTACT_BUTTON_CLASS = `
  text-[14px] 2xl:text-[16px] 3xl:text-[18px]
  text-white sm:text-black capitalize font-medium
  flex items-center group transition-all duration-300
  hover:text-[#299B8A] max-w-fit max-lg:mb-[25px]
`;

const ARROW_ICON_CLASS = `
  w-[14px] h-[14px] flex items-center
   mx-[15px]
  transition-transform duration-300
  group-hover:translate-x-1
`;


export default function VentureCard({ item, lang = "en" }) {
  const t = useTranslations("common");

  const isRTL = lang?.trim() === "ar";

  const arrowVariants = {
    rest: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    hover: {
      x: isRTL ? -5 : 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className="
        relative z-0 w-full h-full min-h-[260px] lg:min-[350px] xl:min-h-[320px] 2xl:min-[400px] 3xl:min-h-[485px]
        sm:p-[15px] xl:p-[20px] 2xl:p-[25px] 3xl:p-[30px]
        flex flex-wrap overflow-hidden
        rounded-[10px]
        cursor-pointer
        border border-white
        bg-transparent
        backdrop-blur-[20px] backdrop-saturate-[180%]
        shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]
      "
    >
      {/* LEFT MEDIA */}
      <div className="w-full lg:w-[180px] xl:w-[200px] 2xl:w-[250px] 3xl:w-[350px]">
        <div className="w-full h-full overflow-hidden rounded-[10px]">

          {/* DESKTOP VIDEO ONLY */}

          {item?.media_type === "video" ?
            (<video
              autoPlay
              loop
              muted
              playsInline
              className="hidden sm:block w-full h-full object-cover"
              poster={item?.video_thumbnail_image || "/images/placeholder.png"}
            >
              <source src={item.video} type="video/mp4" />
            </video>
            ) : (
              <Image
                src={item?.image || "/images/placeholder.png"}
                width={395}
                height={465}
                alt={item?.image_alt_text || "Venture image"}
                className="hidden sm:block w-full h-full object-cover"
              />
            )}

          {/* MOBILE IMAGE ONLY */}

          <Image
            src={item.image_mobile}
            width={395}
            height={465}
            alt={item?.image_mobile_alt_text || "Venture mobile image"}
            className="block sm:hidden w-full h-full object-cover"
          />

        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div
        className="
          absolute bottom-0 left-0
          max-sm:h-full
          sm:relative
          w-full
          lg:w-[calc(100%-180px)]
          xl:w-[calc(100%-200px)]
          2xl:w-[calc(100%-250px)]
          3xl:w-[calc(100%-350px)]
          flex items-center
          max-xs:p-[25px_25px_70px]
          max-sm:p-[35px_20px_75px]
          after:absolute after:top-0 after:left-0
          after:w-full after:h-full
          after:bg-gradient-to-t after:from-black after:to-black/30
          after:sm:hidden
        "
      >
        <div
          className="
            relative z-10 w-full
            max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:h-full
            sm:max-w-[450px]
            sm:p-[15px]
            2xl:p-[25px] 3xl:px-[30px]
          "
        >
          {/* TITLE */}
          <h3
            className="
              text-[22px] xs:text-[25px]
              sm:text-[14px] lg:text-[16px] xl:text-[18px]
              2xl:text-[23px] 3xl:text-[30px]
              font-medium
              max-sm:text-white
              sm:bg-gradient-to-r sm:from-[#0B436A] sm:to-[#299B8A]
              sm:bg-clip-text sm:text-transparent
              uppercase
              mb-[10px] 2xl:mb-[15px] 3xl:mb-[25px]
            "
          >
            {item.title}
          </h3>

          {/* DESCRIPTION */}

          <div className="relative z-10">
            {item.description && (
              <div
                className="
                w-full
                max-sm:bg-transparent
                max-sm:backdrop-blur-[3px]
                max-sm:border max-sm:border-white/20
                p-[12px_8px] xs:p-[12px] sm:p-0
              "
              >
                {renderHtml(item.description, "max-sm:[&_*]:text-white")}
              </div>

            )}

            {/* LOGOS */}
            {item.partners?.length > 0 && (

              <div
                className="
                mt-[8px] sm:mt-[20px]
                max-sm:bg-transparent
                max-sm:backdrop-blur-[3px]
                max-sm:border max-sm:border-white/20
                w-full
              "
              >
                <div className="flex flex-wrap items-center justify-center gap-1 3xl:gap-4 max-sm:w-[85%] mx-auto p-[10px]">
                  {item?.partners?.map((partner, i) => (
                    <div
                      key={i}
                      className="
                      flex items-center justify-center
                      w-[45px] h-[28px]
                      sm:w-[55px] sm:h-[32px]
                      2xl:w-[65px] 2xl:h-[38px]
                      3xl:w-[75px] 3xl:h-[45px]
                    "
                    >
                      <Image
                        src={partner?.logo}
                        alt={partner?.logo_alt_text || "Partner logo"}
                        title={partner?.logo_alt_text || "Partner logo"}
                        width={80}
                        height={40}
                        className="object-contain  min-w-[38px] max-w-[38px] 3xl:min-width-[50px] 3xl:max-w-[50px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className={`${CONTACT_BUTTON_CLASS} w-full flex mt-[20px]`}>
              <span>{t("view")}</span>
              <div className={ARROW_ICON_CLASS} variants={arrowVariants}>
                <svg className="w-full h-full" viewBox="0 0 14 15">
                  <path
                    d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
