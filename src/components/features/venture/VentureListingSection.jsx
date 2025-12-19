"use client"

import { Heading } from "@/components/layout/Heading";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import Image from "next/image";
import VentureCard from "@/components/common/VentureCard";

// Ventures data array
const corporateVentures = [
  {
    id: 1,
    video: "/videos/venture-1.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Logistics & Shipping",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 2,
    video: "/videos/venture-2.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Construction & Building Solutions",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 3,
    video: "/videos/venture-1.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Engineering & Energy Solutions",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 4,
    video: "/videos/venture-2.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Marine Services & Equipment",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 5,
    video: "/videos/venture-1.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Special Projects",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 6,
    video: "/videos/venture-2.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Hospitality",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
   logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 7,
    video: "/videos/venture-1.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Information Technology",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
  {
    id: 8,
    video: "/videos/venture-2.mp4",
    mobileImage: "/images/vetureCard-1.jpg",
    title: "Warehousing & Distribution",
    description:
      "Khimji Ramdas Shipping and Multimodal Logistics , KRHL (Khimji Ramdas Heavy Lift), Schenker Khimji's LLC, Khimji's Sparkle Marine Services SAOC, Middle East Fuji Khimji LLC",
    logos: [
      "/images/ship-1.png",
      "/images/ship-2.png",
      "/images/ship-3.png",
      "/images/ship-4.png",
    ],
  },
];

const consumerVentures = [
  // Add consumer ventures data here if needed
];

export default function VentureListingSection() {
  return (
    <section className="py-[40px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[140px]">
      <div className="container">
        <Tabs defaultValue="corporate" className="w-full mb-[35px ]">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-[20px] xl:mb-[50px] 2xl:mb-[80px] 3xl:mb-[130px]">
            <Heading
              as="h2"
              size="heading1" 
              className="mb-[10px] sm:!mb-0"
            >Ventures</Heading>

            {/* Tabs Header */}
            <TabsList className="flex items-center  bg-transparent -m-[3px] max-sm:w-full">
              <div className="w-1/2 px-[3px]">
                <TabsTrigger
                  value="corporate"
                  className=" w-full
                  text-[11px] xs:text-[16px]
                  border border-[#2E8B8B]
                  cursor-pointer
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-[#0B436A]
                  data-[state=active]:to-[#299B8A]
                  data-[state=active]:text-white
                  data-[state=inactive]:text-[#000000]
                  rounded-none py-2 px-3 font-medium"  >
                  CORPORATE ORIENTED
                </TabsTrigger>
              </div>

              <div className="w-1/2 px-[3px]">
                <TabsTrigger
                  value="consumer"
                  className="w-full
                  text-[11px] xs:text-[16px]
                  border border-[#2E8B8B]
                  cursor-pointer
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-[#0B436A]
                  data-[state=active]:to-[#299B8A]
                  data-[state=active]:text-white
                  data-[state=inactive]:text-[#000000]
                  rounded-none py-2 px-3  font-medium "  >
                  CONSUMER ORIENTED
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          {/* Content */}
          <TabsContent value="corporate" >
            <div className="mb-[20px] 2xl:mb-[40px] 3xl:mb-[60px]">
              <div className="text-[16px] md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-medium bg-gradient-to-r from-[#0B436A]
                to-[#299B8A] from-[30%] to-[100%] bg-clip-text text-transparent
                uppercase tracking-wide !mb-[10px] 2xl:!mb-[10px] 3xl:!mb-[15px]">
                Corporate Oriented
              </div>
              <p>Khimji Ramdas drives growth across Retail, Infrastructure, Logistics, Lifestyle, and Travel. Through strong joint ventures and international presence, we connect markets and enrich communities</p>
            </div>
             <div className="flex flex-wrap -m-[5px] lg:-m-[10px] 3xl:-m-[15px]">
              {corporateVentures.map((venture) => (
                <div key={venture.id} className="w-full sm:w-1/2 p-[5px]  lg:p-[10px] 3xl:p-[15px]">
                  <VentureCard item={venture} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consumer" >
              <div className="mb-[20px] 2xl:mb-[40px] 3xl:mb-[60px]">
              <div className="text-[16px] md:text-[18px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-medium bg-gradient-to-r from-[#0B436A]
                to-[#299B8A] from-[30%] to-[100%] bg-clip-text text-transparent
                uppercase tracking-wide !mb-[10px] 2xl:!mb-[10px] 3xl:!mb-[15px]">
                Corporate Oriented
              </div>
              <p>Khimji Ramdas drives growth across Retail, Infrastructure, Logistics, Lifestyle, and Travel. Through strong joint ventures and international presence, we connect markets and enrich communities</p>
            </div>
            <div className="flex flex-wrap -m-[5px] lg:-m-[10px] 3xl:-m-[15px]">
              {consumerVentures.map((venture) => (
                <div key={venture.id} className="w-full sm:w-1/2 p-[5px]  lg:p-[10px] 3xl:p-[15px]">
                  <VentureCard item={venture} />
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>

      </div>
    </section >
  )
}