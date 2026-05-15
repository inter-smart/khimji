"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const CONTACT_BUTTON_CLASS =
  "text-[12px] 2xl:text-[16px] 3xl:text-[18px] text-black capitalize font-medium flex items-center group transition-all duration-300 hover:text-[#299B8A]";
const ARROW_ICON_CLASS =
  "w-[14px] h-[14px] flex items-center mt-[5px] mx-[15px] transition-transform duration-300 group-hover:translate-x-1";

export default function BannerClient({ data }) {
  return (
    <div>
      {/* <section className="py-[60px_40px] xl:py-[60px_40px] 2xl:py-[80px_40px] 3xl:py-[145px_60px] max-sm:hidden relative z-0">
        <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
        <div className="container">
          <div className="flex flex-wrap -m-[8px]">
            <div className="w-4/12 p-[8px] flex items-center">
              <div className="w-full">
                <motion.div
                  className="sm:text-[25px] md:text-[30px] lg:text-[50px] xl:text-[60px] 2xl:text-[80px] 3xl:text-[100px] text-[#0B436A] font-medium leading-[30px] lg:leading-[50px] xl:leading-[60px] 2xl:leading-[80px] 3xl:leading-[100px] uppercase mb-[20px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {data[0]?.title?.split(" ")[0]}
                  <motion.span
                    className="text-[#299B8A] block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {data[0]?.title?.split(" ")[1]}
                  </motion.span>
                </motion.div>

                <motion.p
                  className="mb-[15px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {data[0]?.description}
                </motion.p>
                {data[0]?.action_type && data[0]?.action_url && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <Link
                      href={data[0]?.action_url}
                      className={CONTACT_BUTTON_CLASS}
                    >
                      {data[0]?.action_title}
                      <motion.div
                        className={ARROW_ICON_CLASS}
                        whileHover={{ x: 5 }}
                      >
                        <svg
                          className="w-full h-full object-cover"
                          viewBox="0 0 14 15"
                        >
                          <g clipPath="url(#clip0_1055_230)">
                            <path
                              d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1055_230">
                              <rect width="14" height="15" fill="black" />
                            </clipPath>
                          </defs>
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="w-8/12 p-[8px]">
              <motion.div
                className="max-w-[1075px] w-full relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none bg-cover bg-no-repeat bg-center z-10"
                ></motion.div>
                <div className="absolute top-0 left-0 w-full h-full z-1">
                  <Image
                    src="/images/krBg.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    fetchPriority="high"
                  />
                </div>
                <video
                  preload="none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={data[0]?.video_thumbnail_image ? data[0]?.video_thumbnail_image : data[0]?.image}
                  className="w-full h-full object-cover
                  [mask-image:url('/images/krBg.avif')]
                  [mask-repeat:no-repeat]
                  [mask-position:center]
                  [mask-size:cover]
                  [-webkit-mask-image:url('/images/clipImg.avif')]
                  [-webkit-mask-repeat:no-repeat]
                  [-webkit-mask-position:center]
                  [-webkit-mask-size:cover]"
                >
                  <source src={data[0]?.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}


      {/* full screen video banner */}

      <section className="relative w-full h-[calc(100vh-var(--header-height,108px))] max-sm:hidden after:absolute after:content-[''] after:top-0 after:bottom-0 after:bg-gradient-to-t after:from-black/70 after:from-[40%] after:to-transparent after:w-full after:h-full">
        <div className="w-full h-full">
          <video
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            poster={data[0]?.video_thumbnail_image ? data[0]?.video_thumbnail_image : data[0]?.image}
            className="w-full h-full object-cover "
          >
            <source src={data[0]?.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* contents */}

          <div className="absolute bottom-0 left-0 w-full h-full z-1 flex">
            <div className="container flex items-end ">
              <div className="w-full h-full flex items-end pb-[130px] justify-center z-0">
                <div className="w-full">
                  <motion.div
                    className="sm:text-[25px] md:text-[30px] lg:text-[50px] xl:text-[60px] 2xl:text-[80px] 3xl:text-[100px] text-[#0B436A] font-medium leading-[30px] lg:leading-[50px] xl:leading-[60px] 2xl:leading-[80px] 3xl:leading-[100px] uppercase mb-[20px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {data[0]?.title?.split(" ")[0]}
                    <motion.span
                      className="text-[#299B8A] block"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {data[0]?.title?.split(" ")[1]}
                    </motion.span>
                  </motion.div>

                  <motion.p
                    className="mb-[15px] text-white max-w-[70%]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {data[0]?.description}
                  </motion.p>
                  {data[0]?.action_type && data[0]?.action_url && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                    >
                      <Link
                        href={data[0]?.action_url}
                        className={CONTACT_BUTTON_CLASS}
                      >
                        {data[0]?.action_title}
                        <motion.div
                          className={ARROW_ICON_CLASS}
                          whileHover={{ x: 5 }}
                        >
                          <svg
                            className="w-full h-full object-cover"
                            viewBox="0 0 14 15"
                          >
                            <g clipPath="url(#clip0_1055_230)">
                              <path
                                d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1055_230">
                                <rect width="14" height="15" fill="black" />
                              </clipPath>
                            </defs>
                          </svg>
                        </motion.div>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* MOBILE VIEW */}
      <section className="w-full relative h-screen sm:hidden z-0 before:absolute before:top-0 before:content-[''] before:bottom-0 before:w-full before:h-full before:bg-gradient-to-t before:from-black  before:to-black/0 before:opacity-[0.5]">
        <Image
          src={data[0]?.image_mobile}
          className="w-full h-full object-cover absolute top-0 left-0 -z-1"
          width={440}
          height={930}
          alt={data[0]?.alt_text || "Khimji Ramdas"}
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="container flex items-end h-full py-[60px]">
          <div className="relative z-1 w-full">
            <div className="text-[40px] xs:text-[50px] text-white font-medium mb-[10px] uppercase leading-[45px] xs:leading-[55px]">
              {data[0]?.title?.split(" ")[0]}
              <br />
              {data[0]?.title?.split(" ")[1]}
            </div>
            <p className="text-[16px] xs:text-[20px] text-white max-w-[90%] mb-[25px] xs:mb-[35px]">
              {data[0]?.description}
            </p>

            {data[0]?.action_type && data[0]?.action_url && (
              <Link
                href={data[0]?.action_url}
                className="text-[16px] xs:text-[18px] text-white font-medium w-fit flex items-center justify-center h-[40px] xs:h-[50px] min-w-[160px] xs:min-w-[180px] p-[8px] border border-white"
              >
                {data[0]?.action_title}
                <div className="w-[14px] xs:w-[17px] h-[14px] flex items-center mx-[10px]">
                  <svg
                    className="w-full h-full object-contain"
                    viewBox="0 0 18 14"
                  >
                    <g clipPath="url(#clip0_1342_4984)">
                      <path
                        d="M9.38156 13.4279C9.27201 13.43 9.16155 13.4034 9.0641 13.3431C8.78295 13.17 8.69731 12.7942 8.86648 12.5133C8.8807 12.4885 10.6478 9.53965 14.0209 7.68392H0.907875C0.574073 7.68392 0.302612 7.41246 0.302612 7.07865C0.302612 6.74485 0.574073 6.47339 0.907875 6.47339H14.0209C10.6665 4.62824 8.87949 1.66639 8.86194 1.63673C8.6964 1.35407 8.7881 0.977903 9.07045 0.810547C9.35674 0.640771 9.73382 0.739126 9.90481 1.02693C10.1799 1.46574 12.7595 5.39965 17.3865 6.48822C17.6634 6.55631 17.8552 6.79872 17.8552 7.07896C17.8552 7.35919 17.6646 7.60221 17.3916 7.66848C12.745 8.76098 10.1742 12.7 9.89634 13.1458C9.78739 13.3204 9.58584 13.4239 9.38156 13.4279Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1342_4984">
                        <rect width="18" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
