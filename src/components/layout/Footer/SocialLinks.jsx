"use client";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_ICON_CLASS = "transition-all duration-300 hover:text-white/70 hover:scale-125 group";

export default function SocialLinks({ social_links, site_settings, lang }) {
  return (
    <div className="w-3/12">
      {/* LOGO */}
      <div className="flex flex-col items-end text-end max-w-[175px] xl:max-w-[200px] 2xl:max-w-[265px] 3xl:max-w-[320px] ms-auto">
        <Link
          href="/"
          className="max-w-[130px] xl:max-w-[165px] 2xl:max-w-[210px] 3xl:max-w-[250px] w-full mb-[25px] xl:mb-[30px] 2xl:mb-[35px] 3xl:mb-[50px] block transition-[0.5s] hover:scale-90"
        >
          <Image src="/images/Logo-white-footer.png" width={150} height={80} alt="KR Logo" className="w-full object-contain" />
        </Link>

        {/* TEXT */}
        <p className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium">{site_settings?.footer_about}</p>

        {/* SOCIAL ICONS */}
        <div className="mt-[25px] xl:mt-[30px] 2xl:mt-[35px] 3xl:mt-[50px]">
          <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px] uppercase">
            {lang === "en" ? "Follow Us" : "تابعنا"}
          </div>
          <div className="flex items-center -m-[10px] xl:-m-[14px] 2xl:-m-[17px] 3xl:-m-[22px]">
            {
              // map
              social_links?.map((item, index) => (
                <div key={index} className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                  <Link target="_blank" href={item?.url} className={SOCIAL_ICON_CLASS}>
                    <div className="w-[15px] 2xl:w-[20px] 3xl:w-[30px] h-[15px] 2xl:h-[20px] 3xl:h-[25px] flex items-center justify-center">
                      {item.icon && <Image src={item.icon} width={30} height={30} alt={item.name} className="w-full object-contain" />}
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
