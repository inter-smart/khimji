"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { Heading } from "@/components/layout/Heading";
import { renderHtml } from "@/lib/helper";

export default function DrivenSection({ title, description, image, image_alt_text, metrics }) {


 console.log("metrics", metrics)



  return (
    <section className="w-full h-auto py-[40px_30px] sm:py-[70px_50px] lg:py-[100px_60px] 2xl:py-[120px_70px] 3xl:py-[150px_90px] block">
      <div className="container relative z-0">
        <div className="w-[80px] sm:w-[100px] lg:w-[120px] 2xl:w-[140px] 3xl:w-[180px] h-auto aspect-square mx-auto bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[60px] lg:blur-[80px] 2xl:blur-[120px] absolute -z-1 inset-[0_0_auto_0]"></div>
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-[calc(100%-440px)] 2xl:w-[calc(100%-530px)] 3xl:w-[calc(100%-670px)] pe-[40px] mb-[20px] sm:mb-[30px] lg:mb-0">
            <div className="w-full h-auto lg:max-w-[490px] 2xl:max-w-[590px] 3xl:max-w-[750px]">
              <Heading
                as="h2"
                size="heading1"
                className="mb-[35px]"
                dangerouslySetInnerHimageTML={{ __html: title }}
              ></Heading>
              <div className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.5] font-normal text-black">
                {renderHtml(description)}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[440px] 2xl:w-[530px] 3xl:w-[670px]">
            <div className="w-full h-auto">
              <div
                className="w-full h-auto aspect-[620/300] p-[10px] 2xl:p-[15px] 3xl:p-[20px] mb-[10px] sm:mb-[15px] 2xl:mb-[20px] rounded-[7px] 2xl:rounded-[10px] border border-white bg-transparent
                    backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] overflow-hidden block"
              >
                <Image
                  src={image || "/images/placeholder.png"}
                  alt={image_alt_text || "Image"}
                  width={620}
                  height={300}
                  className="w-full h-full rounded-[7px] 2xl:rounded-[10px] object-cover"
                />
              </div>
              <div className="w-full h-auto mx-[-5px] sm:mx-[-10px] flex items-center">
                {metrics?.metrics?.map((item, index) => (
                  <div key={index} className="w-1/4 px-[5px] sm:px-[10px]">
                    <div className="text-[24px] sm:text-[32px] lg:text-[38px] 2xl:text-[45px] 3xl:text-[58px] leading-[1.2] font-normal bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent mb-[5px] lg:mb-[10px]">
                      <CountUp
                        start={0}
                        end={item?.value || 0}
                        duration={2.5}
                        separator=","
                        suffix={item?.suffix || "+"}
                        enableScrollSpy={true}
                      />
                    </div>
                    <div className="text-[10px] sm:text-[12px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.1] uppercase font-normal text-[#013763]">
                      {item?.key || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
