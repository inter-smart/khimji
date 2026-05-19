"use client";
import parse from "html-react-parser";
import { useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function BoardDirectorSection({ title, directors }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="[--gradient:70px] sm:[--gradient:100px] lg:[--gradient:120px] 2xl:[--gradient:140px] 3xl:[--gradient:180px] w-full h-auto py-[40px] sm:py-[60px_50px] lg:py-[80px_70px] 2xl:py-[100px_90px] 3xl:py-[125px_110px] relative z-0">
        <div className="animate-float w-[var(--gradient)] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[auto_auto_30%_-2%]"></div>
        <div className="animate-float w-[var(--gradient)] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[30%_0_auto_auto]"></div>
        <div className="container">
          <Heading
            as="h2"
            size="heading1"
            className="text-center !mb-[20px] sm:!mb-[35px] 2xl:!mb-[40px] 3xl:!mb-[50px]"
          >
            {title}
          </Heading>
          <div className="w-full h-auto block">
            {directors?.map((director, index) => (
              <div
                key={index}
                className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[70px] 2xl:py-[90px] 3xl:py-[120px] last:pb-0 first:pt-0 block relative z-0 before:content-[''] before:w-full before:h-[7px] sm:before:h-[10px] before:bg-[linear-gradient(90deg,#0C476B_0%,#0C476B_70%,#238A84_70%,#238A84_100%)] before:[mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_8px)] sm:before:[mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_16px)] before:[-webkit-mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_8px)] sm:before:[-webkit-mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_16px)] before:bg-no-repeat before:contain before:bg-center before:absolute border-z-1 before:inset-[auto_0_0_0] last:before:hidden"
              >
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={2}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={500}
                  loop={true}
                  breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 40 },
                    1280: { slidesPerView: 4, spaceBetween: 70 },
                    1536: { slidesPerView: 4, spaceBetween: 90 },
                    1771: { slidesPerView: 4, spaceBetween: 110 },
                  }}
                  className="board_directorSlider"
                >
                  {director?.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="group w-full h-full block">
                        <button
                          onClick={() => setSelected(item)}
                          className="w-full h-auto aspect-[280/325] mb-[10px] 2xl:mb-[15px] 3xl:mb-[20px] rounded-full select-none overflow-hidden flex items-center justify-center relative z-0 before:content-[''] before:w-full before:h-[80%] before:bg-linear-to-t before:from-white before:to-[#C0E7E9] before:rounded-full before:absolute before:z-[-1] before:inset-[auto_0_0_0] group-hover:translate-y-[-10px] transition-transform duration-500 ease-in-out cursor-pointer"
                          aria-label={`View profile of ${item?.name}`}
                        >
                          <Image
                            src={item?.image || "/images/placeholder.png"}
                            alt={item?.image_alt_text || "Image"}
                            width={280}
                            height={325}
                            className="w-full h-full object-cover"
                          />
                        </button>
                        <div className="w-full h-auto text-center">
                          <button
                            onClick={() => setSelected(item)}
                            className="text-[15px] sm:text-[16px] 2xl:text-[20px] 3xl:text-[24px] leading-[1.2] font-semibold text-[#013763] mb-[5px] hover:text-[#238A84] transition-colors cursor-pointer"
                          >
                            {item?.name}
                          </button>
                          {item?.designation && (
                            <div className="text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[1.3] text-[#238A84]">
                              {item.designation}
                            </div>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent
          className="max-w-[460px] px-6 sm:px-8"
          style={{ top: "calc(50vh + var(--header-height, 108px) / 2)" }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-[160px] sm:w-[200px] select-none mb-5 relative mt-2">
              <div className="w-full aspect-280/325 rounded-full overflow-hidden flex items-center justify-center relative z-0">
                <div className="absolute bottom-0 left-0 right-0 h-[80%] rounded-full bg-linear-to-t from-white to-[#C0E7E9] z-[-1]" />
                <Image
                  src={selected?.image}
                  alt={selected?.image_alt_text || selected?.name || "Director"}
                  width={280}
                  height={325}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <DialogHeader className="w-full space-y-1">
              <DialogTitle className="text-center text-[20px] sm:text-[24px] font-bold text-[#013763] leading-tight">
                {selected?.name}
              </DialogTitle>
              {/* {selected?.designation && ( */}
                <DialogDescription className="text-[14px] sm:text-[16px] font-medium text-[#238A84]">
                  {/* {selected.designation} */}
                  ghsjkghskjgsdjgjjrhln,ncxmbkc vjsldfjsl scjvaslkfjlkafgpret lfjsfjlsdkfldsf
                </DialogDescription>
              {/* )} */}
            </DialogHeader>
            {
              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed text-left mt-4">
                {parse(selected?.description ?? "")}
              </p>
            }
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
