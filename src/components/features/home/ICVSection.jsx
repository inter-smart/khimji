"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { motion } from "framer-motion";
import Link from "next/link";
import { renderHtml } from "@/lib/helper";
import dynamic from "next/dynamic";

const ICVinitiativeMobile = dynamic(() =>
  import("./home-mobile/ICVinitiativeMobile")
);

export default function ICVSection({
  title,
  description,
  banner,
  banner_alt_text,
  initiatives,
  lang,
}) {
  const isRTL = lang == " ar";

  const icvVideos = [
    { src: "/videos/icv-1.mp4", title: "Business" },
    { src: "/videos/icv-2.mp4", title: "Infrastructure" },
    { src: "/videos/icv-3.mp4", title: "Training & Skills" },
    { src: "/videos/icv-2.mp4", title: "Innovation" },
    { src: "/videos/icv-4.mp4", title: "Sustainability" },
  ];

  return (
    <>
      <section
        className='relative z-0 py-[45px] 2xl:py-[80px_50px] 3xl:py-[100px_70px] bg-[#FAFAFA] overflow-hidden max-sm:hidden
        after:absolute after:content-[""] after:left-0 after:top-0 after:w-full after:h-[170px] after:md:h-[185px] after:xl:h-[200px] after:2xl:h-[240px] after:3xl:h-[300px] after:rounded-[0_0_100%_100%] after:scale-[1.35] after:bg-[#FAFAFA] after:z-10
        before:absolute before:content-[""] before:left-0 before:bottom-0 before:w-full before:h-[100px] before:xl:h-[140px] before:2xl:h-[160px] before:3xl:h-[180px] before:rounded-[100%_100%_0_0] before:scale-[1.25] before:bg-[#FAFAFA] before:z-10
        '
      >
        <div className="container">
          <div className="max-w-[420px] 2xl:max-w-[450px] 3xl:max-w-[600px] m-auto text-center relative z-20">
            <Heading size="heading1" as="h2" className="mb-[30px]">
              {title}
            </Heading>
            {renderHtml(description)}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative z-0"
        >
          <Swiper
            dir={isRTL ? "rtl" : "ltr"}
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={2500}
            loop={true}
            slidesPerView={2}
            spaceBetween={25}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.5 },
            }}
            className="h-[450px] xl:h-[500px] 2xl:h-[560px] 3xl:h-[700px] relative z-20"
          >
            {initiatives?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link
                  href="/ICV"
                  className="relative z-0 w-full h-full overflow-hidden"
                >
                  {item?.media_type === "video" ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={item?.image}
                      alt={item?.image_alt_text}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 p-[20px] pb-[90px] xl:pb-[130px] 2xl:pb-[140px] 3xl:pb-[170px] w-full z-10 flex items-end">
                    <div className="2xl:text-[20px] 3xl:text-[30px] text-white font-medium uppercase">
                      {item.title}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      <ICVinitiativeMobile
        title={title}
        description={description}
        banner={banner}
        banner_alt_text={banner_alt_text}
        data={initiatives}
        lang={lang}
      />
    </>
  );
}
