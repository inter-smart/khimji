"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CONTACT_BUTTON_CLASS =
  "text-[12px] 2xl:text-[16px] 3xl:text-[18px] text-black capitalize font-medium flex items-center group transition-all duration-300 hover:text-[#299B8A]";
const ARROW_ICON_CLASS =
  "w-[14px] h-[14px] flex items-center mt-[5px] mx-[15px] transition-transform duration-300 group-hover:translate-x-1";

export default function BannerClient({ data, country }) {
  const posterUrl = data?.[0]?.video_thumbnail_image || data?.[0]?.image;

  return (
    <div>
      {posterUrl && (
        <link rel="preload" as="image" href={posterUrl} fetchPriority="high" />
      )}
      <link rel="preload" as="image" href="/images/clipImg.avif" type="image/avif" />

      {country === "oman" ? (
        <section className="py-[60px_40px] xl:py-[60px_40px] 2xl:py-[80px_40px] 3xl:py-[145px_60px] max-sm:hidden relative z-0">
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
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={posterUrl}
                    className="w-full h-full object-cover
                    [mask-image:url('/images/clipImg.avif')]
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
        </section>
      ) : (
        <section className="relative w-full h-[calc(100vh-var(--header-height,108px))] max-sm:hidden after:absolute after:content-[''] after:top-0 after:bottom-0 after:bg-gradient-to-t after:from-black/70 after:from-[40%] after:to-transparent after:w-full after:h-full">
          <div className="w-full h-full">
            <video
              preload="auto"
              autoPlay
              loop
              muted
              playsInline
              poster={posterUrl}
              className="w-full h-full object-cover "
            >
              <source src={data[0]?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

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
      )}
    </div>
  );
}
