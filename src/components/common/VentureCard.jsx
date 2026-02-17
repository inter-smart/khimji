import { renderHtml } from "@/lib/helper";
import Image from "next/image";

export default function VentureCard({ item }) {
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
            alt={item?.image_alt_text}
            className="hidden sm:block w-full h-full object-cover"
          />
      )}
          {/* MOBILE IMAGE ONLY */}
          <Image
            src={item.image_mobile}
            width={395}
            height={465}
            alt={item?.image_mobile_alt_text}
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
          after:bg-gradient-to-t after:from-black after:to-black/0
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

            {/* LOGOS */}
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
                      alt={partner?.logo_alt_text}
                      width={80}
                      height={40}
                      className="object-contain  min-w-[38px] max-w-[38px] 3xl:min-width-[50px] 3xl:max-w-[50px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
