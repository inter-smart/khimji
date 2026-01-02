"use client";

import { useState } from "react";
import Link from "next/link";
import { Heading } from "@/components/layout/Heading";
import Image from "next/image";
import { renderHtml } from "@/lib/helper";

export default function ProcurementSection({ initiatives }) {
  const [isExpanded, setIsExpanded] = useState(false);

//   const procurementData = [
//     {
//       image: "/images/lp-1.jpg",
//       title: "Partnered Omani SME for sewage treatment project",
//       details: [
//         {
//           label: "Client :",
//           value: "Dusit 2 Hotel (Green Peak Adventures Resort)",
//         },
//         {
//           label: "Year :",
//           value: "Dusit 2 Hotel (Green Peak Adventures Resort)",
//         },
//       ],
//       overview:
//         "The newly developed Dusit 2 resort hotel in Jabal Al Akhdar required a sewage treatment plant to be installed.",
//       solution:
//         "Our team brought Al Qadeer Engineering on board for the installation of 2 x 125 KLD sewage treatment plants at the location.",
//       impact:
//         "The project was completed successfully. Our relationship with the Omani SME Al Qadeer Engineering continues as we are developing their team to be able to handle installation and maintenance independently.",
//     },
//     {
//       image: "/images/lp-2.jpg",
//       title: "Design & installation of solar power plant with Omani SME",
//       details: [
//         {
//           label: "Client :",
//           value: "Royal Court Affairs",
//         },
//         {
//           label: "Year :",
//           value: "KR Barka Warehouse Solar Plant",
//         },
//       ],
//       overview:
//         "Oman’s Vision 2040 has set a goal of 35-40% of energy consumption to be from renewable sources",
//       solution:
//         "Our team brought Al Qadeer Engineering on board for the installation of 2 x 125 KLD sewage treatment plants at the location.",
//       impact:
//         "The project was completed successfully. Our relationship with the Omani SME Al Qadeer Engineering continues as we are developing their team to be able to handle installation and maintenance independently.",
//     },
//     {
//       image: "/images/lp-3.jpg",
//       title: "Crushing and Screening Plants setup using Omani resources",
//       details: [
//         {
//           label: "Client :",
//           value: "KR Barka Warehouse Solar Plant",
//         },
//         {
//           label: "Year :",
//           value: "2020-21",
//         },
//       ],
//       overview:
//         "Oman’s Vision 2040 has set a goal of 35-40% of energy consumption to be from renewable sources. With solar power being readily available to us",
//       solution:
//         "Our team brought Al Qadeer Engineering on board for the installation of 2 x 125 KLD sewage treatment plants at the location.",
//       impact:
//         "The project was completed successfully. Our relationship with the Omani SME Al Qadeer Engineering continues as we are developing their team to be able to handle installation and maintenance independently.",
//     },
//     {
//       image: "/images/lp-4.jpg",
//       title:
//         "Omani team & products engaged for interior project at SQU Hospital",
//       details: [
//         {
//           label: "Client :",
//           value: "Royal Court Affairs",
//         },
//         {
//           label: "Year :",
//           value: "2020-21",
//         },
//       ],
//       overview:
//         "A tender was floated for the supply and installation of loose furniture that met certain specifications derived from other brands.",
//       solution:
//         "Our team brought Al Qadeer Engineering on board for the installation of 2 x 125 KLD sewage treatment plants at the location.",
//       impact:
//         "The project was completed successfully. Our relationship with the Omani SME Al Qadeer Engineering continues as we are developing their team to be able to handle installation and maintenance independently.",
//     },
//   ];

//   const buildingData = [
//     {
//       image: "/images/capacity-1.jpg",
//       logo: "/images/jalsa.png",
//       title: "JALSAH - COMMUNITY ENGAGEMENT",
//       description:
//         "Jalsah’ is an interactive knowledge-exchange program that enables talented individuals to present and exchange their innovative ideas with the KR’s senior management. The long-term objective of ‘Jalsah’ program will be to invite industry experts, entrepreneurs, students, and achievers, from all walks of life, engaging them, and constructively find solutions.",
//     },
//     {
//       image: "/images/capacity-2.jpg",
//       logo: "/images/tasees.png",
//       title: "TASEES - DEVELOPING ENTREPRENEURSHIP",
//       description:
//         "Tasees focuses on mirroring the country’s interest in creating an entrepreneurial mindset for its youth, encouraging the ongoing development of knowledge and skills amongst the professionals by guiding, supporting and mentoring aspiring entrepreneurs through a proven 3-step methodology.",
//     },
//     {
//       image: "/images/capacity-3.jpg",
//       title: "CELEBRATING THE FIRST OMANI TUG MASTERS",
//       description:
//         "As a part of its ongoing focus towards building capacity among Omani nationals, Khimji’s Sparkle Marine Services has groomed two exceptional Omani’s to become tug masters. Thabit Al Alawi and Sameeh Al Rasadi become the first ever Tug masters to operate at Asyad Drydock in Duqm",
//     },
//     {
//       image: "/images/capacity-4.jpg",
//       title: "PARTNERING WITH ESO",
//       description:
//         "KR Eshraqa is an important partner in supporting the Environmental Society of Oman (ESO) towards building capacity in the nature conservation category which serves both for employment and training of Omani youth as well as raising awareness towards protecting our fragile ecosystem.",
//     },
//     {
//       image: "/images/capacity-5.jpg",
//       title: "CAMPUS TO CORPORATE - TRAINING",
//       description:
//         "A specially crafted One-day comprehensive and interactive workshop aimed at equipping final year college students with knowledge, skills and attitude essential for achieving success in the corporate world right from day one. The importance of learning as a continuous exercise over earning, goal setting, personal excellence, creativity and innovation with a proactive initiative to solve problems is emphasized upon in the form of informative videos, healthy group discussions and talks by successful inspiring Omani personalities.",
//     },
//     {
//       image: "/images/capacity-6.jpg",
//       title: "TRAIN THE TRAINER",
//       description:
//         "Targeted at shaping tomorrow’s leaders, administrative and executive professionals from various colleges and universities are offered a Two-day intensive workshop designed and approved by ILM, U.K to mould them from managers to leaders. This unique development program is a road way to self-understanding, knowing others and learning to deal with complex challenges that arise during the journey. Before the end of 2019, we target to reach out, train and certify 100 professionals across Oman.",
//     },
//     {
//       image: "/images/capacity-7.jpg",
//       title: "MANAGEMENT TRAINEE PROGRAM",
//       description:
//         "Celebrating its successful development of youth as future leaders following a rigorous international learning journey, Khimji Ramdas celebrated 42 graduates of its Management Trainee Programme for Omani nationals at the Hormuz Grand Hotel in Muscat. Following an event held under the auspices of His Excellency Abdullah bin Nasser Al Bakri, Former Minister of Ministry of Labour, KR’s 14th batch of trainees were formally inducted as the latest recruits of the KR Group, having been selected for participation from an application pool of over 1,500 graduates. KR’s latest batch of trainees completed a four-month learning journey in Oman under the Training Initiative for Nationals (TIN), delivered in partnership with Khimji Training Institute (KTI) before travelling to Kuala Lumpur for their three weeks of intensive residential training. During their 21 days in Malaysia participants focused on critical topics including stress management, leadership, performance development, and outbound training processes. Upon concluding their training in the Far East, KR’s trainees returned to Muscat and commenced work in their new roles on 10th December 2018.",
//     },
//   ];


  const procurementData = initiatives[0]?.initiatives || [];

  const buildingData = initiatives[1]?.initiatives || [];

  return (
    <section className="">
      <div className="container">
        <div className="flex flex-wrap -m-[8px] mb-[25px] 2xl:mb-[35px] 3xl:mb-[50px]">
          {initiatives?.map((item, index) => (
            <div
             key={index} className="p-[8px]">
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

                  <ul className="mb-[25px] 2xl:mb-[40px] 3xl:mb-[60px]">
                      <li
                        className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#000000] mb-[15px]"
                      >
                        <span className="lg:px-[25px] uppercase">
                          client
                        </span>
                        {item?.client}
                      </li>

                       <li
                        className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] text-[#000000] mb-[15px]"
                      >
                        <span className="lg:px-[25px] uppercase">
                          Year
                        </span>
                        {item?.year}
                      </li>
                  </ul>

                  <div className="text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[25px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide !my-[14px]">
                    OverView
                  </div>
                  <p>{renderHtml(item.description)}</p>

                  {isExpanded && (
                    <>
                      <div className="text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[25px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide !my-[14px]">
                        Solution
                      </div>
                      <p>{renderHtml(item.description)}</p>

                      <div className="text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[25px] font-medium bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent uppercase tracking-wide !my-[14px]">
                        The ICV Impact
                      </div>
                      <p>{renderHtml(item.description)}</p>
                    </>
                  )}

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[18px] text-[#000000] flex border border-[#000] w-fit h-[40px] items-center justify-center cursor-pointer px-[7px] mt-[30px]"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                    <span className="w-[8px] h-[8px] flex items-center justify-center mx-[5px]">
                      {isExpanded ? "-" : "+"}
                    </span>
                  </button>
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