"use client";

import { useState } from "react";
import Link from "next/link";
import { Heading } from "@/components/layout/Heading";
import Image from "next/image";
import { parseInitiativeDescription, renderHtml } from "@/lib/helper";

export default function ProcurementSection({ initiatives }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const procurementData = initiatives[0]?.initiatives || [];

  const buildingData = initiatives[1]?.initiatives || [];

  return (
    <section className="">
      <div className="container">
        <div className="flex flex-wrap -m-[8px] mb-[25px] 2xl:mb-[35px] 3xl:mb-[50px]">
          {initiatives?.map((item, index) => (
            <div key={index} className="p-[8px]">
              <Link
                href={`#${item?.title}`}
                className="text-[14px] 2xl:text-[16px] 3xl:text-[18px] text-[#000000] uppercase w-full h-[35px] 2xl:h-[40px] p-[1px] flex items-center justify-center 
                            md:w-fit bg-gradient-to-r from-[rgba(11,67,106,0.3)] to-[rgba(41,155,138,0.3)] cursor-pointer group transition-all"
              >
                <div className="w-full h-full bg-white px-[10px] text-center flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[rgba(11,67,106,0.3)] group-hover:to-[rgba(41,155,138,0.3)]">
                  {item?.title}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* procurement */}
        <div
          className="w-full pb-[50px] xl:pb-[60px] 2xl:pb-[80px] 3xl:pb-[100px] relative"
          id={initiatives[0]?.title}
        >
          <div className="lg:text-[22px] xl:text-[30px] 2xl:text-[40px] 3xl:text-[50px] text-[#0B436A] font-normal uppercase mb-[20px] xl:mb-[25px] 2xl:mb-[45px] 3xl:mb-[65px]">
            {initiatives[0]?.title}
          </div>
          {/* 
          {procurementData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-wrap -m-[7px] last-of-type:mb-0 mb-[20px] xl:mb-[30px] 2xl:mb-[50px] 3xl:mb-[70px]
                             ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-full lg:w-1/2 p-[7px]">
                <div
                  className={`w-full h-full p-[15px] 2xl:p-[20px_24px] rounded-[10px] bg-transparent
                                        backdrop-blur-[20px] backdrop-saturate-[180%]
                                        shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]
                                        ${
                                          isExpanded
                                            ? "aspect-[770/830]"
                                            : "aspect-[800/570]"
                                        }`}
                >
                  <div className="w-full h-full overflow-hidden rounded-[10px]">
                    <Image
                      src={item.image}
                      className="w-full h-full object-cover"
                      width={770}
                      height={830}
                      alt="icv-image"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 p-[7px]">
                <div
                  className="w-full h-full p-[35px_25px] lg:p-[45px_35px] 2xl:p-[70px_40px_40px] rounded-[10px] bg-transparent
                                    backdrop-blur-[20px] backdrop-saturate-[180%]
                                    shadow-[inset_5px_1px_3px_#f1f1f1]"
                >
                  <Heading
                    as="div"
                    size="heading3"
                    className="!mb-[25px] 2xl:!mb-[30px] 3xl:!mb-[45px]"
                  >
                    {item.title}
                  </Heading>

                  {(item?.cient ||
                    item?.year)&& (
                      <ul className="mb-[25px] 2xl:mb-[40px] 3xl:mb-[60px]">
                        {
                          item?.client &&
                        <li className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#000000] mb-[15px]">
                          <span className="lg:px-[25px] uppercase">client</span>
                          {item?.client}
                        </li>
                        }
                        {item?.year &&
                          <li className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#000000] mb-[15px]">
                          <span className="lg:px-[25px] uppercase">Year</span>
                          {item?.year}
                        </li>
                          }
                      </ul>
                    )}
            {procurementData?.map((item) => {
  const sections = parseInitiativeDescription(item.description);


  return (
    <div key={item.id}>
      {sections.map((section, index) => (
        <div key={index}>
          {(index === 0 || isExpanded) && (
            <>
              <h3 className="text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[25px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide my-[14px]">
                {section.title}
              </h3>
              <div className="text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] text-gray-700 [&_p]:mb-4">
                {renderHtml(section.content)}
              </div>
            </>
          )}
        </div>
      ))}

      {sections.length > 1 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[18px] text-[#000000] flex items-center gap-2 border border-[#000] w-fit h-[40px] px-4 mt-[30px] hover:bg-gray-50 transition-colors"
        >
          {isExpanded ? "Show Less" : "Show More"}
          <span className="text-xl font-light">
            {isExpanded ? "−" : "+"}
          </span>
        </button>
      )}
    </div>
  );
})}
                </div>
              </div>
            </div>
          ))} */}

          {procurementData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-wrap -m-[7px] last-of-type:mb-0 mb-[20px] xl:mb-[30px] 2xl:mb-[50px] 3xl:mb-[70px]
                ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-full lg:w-1/2 p-[7px]">
                <div
                  className={`w-full h-full p-[15px] 2xl:p-[20px_24px] rounded-[10px] bg-transparent
                    backdrop-blur-[20px] backdrop-saturate-[180%]
                    shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]
                    ${isExpanded ? "aspect-[770/830]" : "aspect-[800/570]"}`}
                >
                  <div className="w-full h-full overflow-hidden rounded-[10px]">
                    <Image
                      src={item.image}
                      className="w-full h-full object-cover"
                      width={770}
                      height={830}
                      alt="icv-image"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 p-[7px]">
                <div
                  className="w-full h-full p-[35px_25px] lg:p-[45px_35px] 2xl:p-[70px_40px_40px] rounded-[10px] bg-transparent
                    backdrop-blur-[20px] backdrop-saturate-[180%]
                    shadow-[inset_5px_1px_3px_#f1f1f1]"
                >
                  <Heading
                    as="div"
                    size="heading3"
                    className="!mb-[25px] 2xl:!mb-[30px] 3xl:!mb-[45px]"
                  >
                    {item.title}
                  </Heading>

                  {(item?.client || item?.year) && (
                    <ul className="mb-[25px] 2xl:mb-[40px] 3xl:mb-[60px]">
                      {item?.client && (
                        <li className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#000000] mb-[15px]">
                          <span className="lg:px-[25px] uppercase">client :</span>
                          {item?.client}
                        </li>
                      )}
                      {item?.year && (
                        <li className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#000000] mb-[15px]">
                          <span className="lg:px-[25px] uppercase">Year :</span>
                          {item?.year}
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Parse and render sections for THIS item only */}
                  {(() => {
                    const sections = parseInitiativeDescription(
                      item.description
                    );

                    return (
                      <>
                        {sections.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            {(sectionIndex === 0 || isExpanded) && (
                              <>
                                <h3 className="text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[25px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide my-[14px]">
                                  {section.title}
                                </h3>
                                <div className="text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] text-gray-700 [&_p]:mb-4">
                                  {renderHtml(section.content)}
                                </div>
                              </>
                            )}
                          </div>
                        ))}

                        {sections.length > 1 && (
                          <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[18px] text-[#000000] flex items-center gap-2 border border-[#000] w-fit h-[40px] px-4 mt-[30px] hover:bg-gray-50 transition-colors"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                            <span className="text-xl font-light">
                              {isExpanded ? "−" : "+"}
                            </span>
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* buildingData */}
        <div
          className="w-full py-[20px] xl:py-[40px] 2xl:py-[60px] 3xl:py-[80px_50px] relative before:absolute before:top-0 before:content-[''] before:bg-[url(/images/border-line.png)] before:bg-cover before:bg-no-repeat before:left-0 before:w-full before:h-[8px]"
          id={initiatives[1]?.title}
        >
          <div className="text-[22px] xl:text-[30px] 2xl:text-[40px] 3xl:text-[50px] text-[#0B436A] font-normal uppercase mb-[20px] xl:mb-[25px] 2xl:mb-[45px] 3xl:mb-[65px]">
            {initiatives[1]?.title}
          </div>

          {buildingData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-wrap -m-[7px] last-of-type:mb-0 mb-[25px] xl:mb-[40px] 2xl:mb-[50px] 3xl:mb-[70px]
                             ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-full lg:w-1/2 p-[7px]">
                <div
                  className="w-full h-full p-[15px] 2xl:p-[20px_24px] rounded-[10px] bg-transparent
                                        backdrop-blur-[20px] backdrop-saturate-[180%]
                                        shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] aspect-[770/530] "
                >
                  <div className="w-full h-full overflow-hidden rounded-[10px]">
                    <Image
                      src={item.image}
                      className="w-full h-full object-cover"
                      width={770}
                      height={830}
                      alt={item?.image_alt_text}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 p-[7px] ">
                <div
                  className="w-full h-full flex items-center p-[35px_25px] lg:p-[45px_35px] 2xl:p-[70px_40px_40px] rounded-[10px] bg-transparent
                                    backdrop-blur-[20px] backdrop-saturate-[180%]
                                    shadow-[inset_5px_1px_3px_#f1f1f1]"
                >
                  <div className="w-full">
                    <Heading
                      as="div"
                      size="heading3"
                      className="!mb-[25px] 2xl:!mb-[30px] 3xl:!mb-[45px]"
                    >
                      {item.title}
                    </Heading>

                    {item.logo && (
                      <div className="mb-[15px] xl:mb-[20px] 3xl:mb-[30px]">
                        <Image
                          src={item.logo}
                          alt={item.logo_alt_text}
                          width={150}
                          height={60}
                          className="h-[40px] xl:h-[50px] 3xl:h-[60px] w-auto object-contain"
                        />
                      </div>
                    )}
                    <p>{renderHtml(item.description)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
