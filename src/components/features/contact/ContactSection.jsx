import Link from "next/link";
import Image from "next/image";
import Contacts from "./Contacts";
import { useTranslations } from "next-intl";

export default function ContactSection({ sectors, cms, lang }) {
  const t = useTranslations("contact");
  return (
    <section className="w-full h-auto py-[40px] sm:py-[50px_60px] lg:py-[70px_80px] 2xl:py-[85px_100px] 3xl:py-[110px_130px] bg-[#f9fbfb] overflow-hidden block relative z-0">
      <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] 2xl:w-[225px] 2xl:h-[225px] 3xl:w-[280px] 3xl:h-[280px] bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%] transform-gpu"></div>
      <div className="w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] 2xl:w-[285px] 2xl:h-[285px] 3xl:w-[370px] 3xl:h-[370px] bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] opacity-40 pointer-events-none absolute -z-1 inset-[5%_-15%_auto_auto] transform-gpu"></div>
      <div className="w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] 2xl:w-[285px] 2xl:h-[285px] 3xl:w-[370px] 3xl:h-[370px] bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] opacity-40 pointer-events-none absolute z-1 inset-[auto_auto_40%_-10%] transform-gpu"></div>
      <div className="w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] 2xl:w-[285px] 2xl:h-[285px] 3xl:w-[370px] 3xl:h-[370px] bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] opacity-40 pointer-events-none absolute -z-1 inset-[auto_0_25%_auto] transform-gpu"></div>
      <div className="container">
        <div className="w-full h-auto mb-[30px] sm:mb-[40px] lg:mb-[60px] 2xl:mb-[75px] 3xl:mb-[100px] max-lg:gap-[20px] flex flex-wrap">
          <div className="w-full lg:w-1/4 sm:px-[15px] lg:flex items-center">
            <div className="text-[22px] sm:text-[28px] lg:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.3] font-normal text-[#0B436A]">
              {cms?.title1 || t("office")}
            </div>
          </div>
          <div className="w-full lg:w-1/4 sm:px-[15px] lg:flex items-center justify-center relative z-0 before:content-[''] before:w-[1px] before:h-[50%] before:my-auto before:bg-gradient-to-b before:from-[#F8F8F8] before:via-[#D0D0D0] before:to-[#F8F8F8] before:absolute before:z-1 before:inset-[0_auto_0_0] max-lg:before:hidden">
            <div
              dangerouslySetInnerHTML={{ __html: cms?.address ? cms.address : "" }}
              className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.4] font-normal text-black"
            />
          </div>
          <div className="w-full lg:w-1/4 sm:px-[15px] lg:flex items-center justify-center relative z-0 before:content-[''] before:w-[1px] before:h-[50%] before:my-auto before:bg-gradient-to-b before:from-[#F8F8F8] before:via-[#D0D0D0] before:to-[#F8F8F8] before:absolute before:z-1 before:inset-[0_auto_0_0] after:content-[''] after:w-[1px] after:h-[50%] after:my-auto after:bg-gradient-to-b after:from-[#F8F8F8] after:via-[#D0D0D0] after:to-[#F8F8F8] after:absolute after:z-1 after:inset-[0_0_0_auto] max-lg:before:hidden max-lg:after:hidden">
            <div className="[&>*]:text-[14px] 2xl:[&>*]:text-[16px] 3xl:[&>*]:text-[20px] [&>*]:leading-[1.4] [&>*]:font-normal">
              <span className="text-[#00416B] mb-[10px] flex items-center">
                {t("tel")}
                <Link
                  href={`tel:${cms?.phone_number1}`}
                  target="self"
                  className="text-black pl-2 hover:text-[#2FDDC3] transition-colors duration-300 direction"
                >
                  {cms?.phone_number1}
                </Link>
              </span>
              <span className="text-[#00416B] flex items-center">
                {t("fax")}
                <Link
                  href={`tel:${cms?.phone_number2}`}
                  target="self"
                  className="text-black pl-2 hover:text-[#2FDDC3] transition-colors duration-300 direction"
                >
                  {cms?.phone_number2}
                </Link>
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/4 sm:px-[15px] lg:flex items-center justify-center">
            <Link href={cms?.map_link || "#"} target={!cms?.map_link ? "_self" : "_blank"} className="group flex items-center">
              <span className="w-[20px] 2xl:w-[25px] 3xl:w-[35px] h-auto aspect-square flex items-center justify-center">
                <Image src="/images/map_icon_contact.svg" alt="location" width={35} height={35} className="w-full h-full object-contain" />
              </span>
              <span className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1] font-normal text-[#00416B] pl-1 lg:pl-2 underline group-hover:text-[#2FDDC3] transition-colors duration-300">
                {t("viewOnMap")}
              </span>
            </Link>
          </div>
        </div>
        <Contacts sectors={sectors} cms={cms} lang={lang} />
      </div>
    </section>
  );
}
