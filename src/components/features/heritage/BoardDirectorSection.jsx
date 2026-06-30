"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { renderHtml } from "@/lib/helper";

function normalizeDirectors(directors, itemsPerRow) {
  if (!Array.isArray(directors) || directors.length === 0) return [];
  // Already grouped: [[{...}, {...}], ...]
  if (Array.isArray(directors[0])) return directors;
  // Flat API array: [{ id, name, ... }, ...]
  const rows = [];
  for (let i = 0; i < directors.length; i += itemsPerRow) {
    rows.push(directors.slice(i, i + itemsPerRow));
  }
  return rows;
}

export default function BoardDirectorSection({ title, directors }) {
  const [selected, setSelected] = useState(null);
  const [cols, setCols] = useState(4);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 800) {
        setCols(2);
      } else if (width <= 1280) {
        setCols(3);
      } else {
        setCols(4);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const activeCols = mounted ? cols : 4;
  const directorRows = normalizeDirectors(directors, activeCols);

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
            {directorRows.map((row, index) => (
              <div
                key={index}
                className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[70px] 2xl:py-[90px] 3xl:py-[120px] last:pb-0 first:pt-0 block relative z-0 before:content-[''] before:w-full before:h-[7px] sm:before:h-[10px] before:bg-[linear-gradient(90deg,#0C476B_0%,#0C476B_70%,#238A84_70%,#238A84_100%)] before:[mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_8px)] sm:before:[mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_16px)] before:[-webkit-mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_8px)] sm:before:[-webkit-mask-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_16px)] before:bg-no-repeat before:contain before:bg-center before:absolute border-z-1 before:inset-[auto_0_0_0] last:before:hidden"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-[30px] lg:gap-10 xl:gap-[70px] 2xl:gap-[90px] 3xl:gap-[110px]">
                  {row.map((item) => (
                    <div key={item.id ?? item.name} className="group w-full h-full block">
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-[350px] xs:max-w-[460px] sm:max-w-[650px] lg:max-w-[850px] xl:max-w-[950px] 2xl:max-w-[1150px]   px-6 lg:p-0 lg:bg-transparent lg:border-0 lg:shadow-none max-sm:px-5  max-sm:rounded-3xl max-sm:border-slate-200/60 max-sm:bg-gradient-to-b max-sm:from-white max-sm:via-slate-50/50 max-sm:to-white/95 max-sm:shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-sm:[top:50%!important]"

        >
          {/* Desktop & Tablet Layout (Original - completely unchanged) */}
          {/* <div className="hidden sm:flex flex-col items-center text-center">
            <div className="w-[160px] sm:w-[200px] select-none mb-5 relative mt-2">
              <div className="w-full aspect-280/325 rounded-full overflow-hidden flex items-center justify-center relative z-0">
                <div className="absolute bottom-0 left-0 right-0 h-[80%] rounded-full bg-linear-to-t from-white to-[#C0E7E9] z-[-1]" />
                <Image
                  src={selected?.image}
                  alt={selected?.image_alt_text || selected?.name || "Director"}
                  title={selected?.image_alt_text || selected?.name || "Director"}
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
              {selected?.designation && (
                <DialogDescription className="text-[14px] sm:text-[16px] font-medium text-[#238A84]">
                  {selected.designation}
                </DialogDescription>
              )}
            </DialogHeader>
            {
              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed text-left mt-4 w-full max-w-full [&_br]:hidden">
                {renderHtml(selected?.description ?? "")}
              </p>
            }
          </div> */}

          <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-r from-[#0B436A] to-[#299B8A] max-lg:hidden">


            <div className="flex items-end gap-8">

              {/* Content */}
              <div className="w-[55%] lg:w-[60%] p-[25px] ">
                <DialogHeader className="space-y-3 text-left mb-2 p-[25px] !pb-0 !pl-0">
                  <DialogTitle className="text-[35px] 2xl:text-[40px] 3xl:text-[48px] font-bold uppercase text-[#D7B07A] leading-none">
                    {selected?.name}
                  </DialogTitle>

                  {selected?.designation && (
                    <DialogDescription className="text-[#C0E7E9] text-lg [&_*]:!text-white">
                      {selected.designation}
                    </DialogDescription>
                  )}
                </DialogHeader>
                <div className="w-20 h-1 bg-[#D7B07A] mb-8" />

                <div className="max-h-[65vh] overflow-y-auto pr-4">
                  <div className="text-white/90 leading-8 [&_p]:mb-5 [&_br]:hidden [&_*]:!text-white">
                    {renderHtml(selected?.description ?? "")}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="w-[45%] lg:w-[40%] flex items-end justify-end self-end">
                <Image
                  src={selected?.image}
                  alt={selected?.image_alt_text || selected?.name || "Director"}
                  title={selected?.image_alt_text || selected?.name || "Director"}
                  width={500}
                  height={700}
                  className="w-full max-w-[450px] h-auto object-contain  drop-shadow-[0_25px_60px_rgba(0,0,0,0.25)] "
                />
              </div>

            </div>
          </div>
          {/* Mobile Layout (Modernized - active only on mobile screens) */}
          <div className="flex lg:hidden flex-col items-stretch text-left mt-2">
            <div className="text-[11px] font-bold tracking-widest text-[#238A84] uppercase mb-2">
              Board Profile
            </div>
            <div className="bg-gradient-to-br from-[#013763]/5 to-[#238A84]/5 p-4 rounded-2xl border-l-[3px] border-[#238A84] text-[13.5px] text-slate-700 leading-relaxed text-left max-h-[280px] overflow-y-auto">
              {renderHtml(selected?.description ?? "")}
            </div>
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-100">
              <div className="w-[60px] aspect-[280/325] shrink-0 rounded-full overflow-hidden relative border border-slate-100 ring-2 ring-white shadow-md">
                <div className="absolute bottom-0 left-0 right-0 h-[80%] rounded-full bg-linear-to-t from-white to-[#C0E7E9] z-[-1]" />
                <Image
                  src={selected?.image}
                  alt={selected?.image_alt_text || selected?.name || "Director"}
                  title={selected?.image_alt_text || selected?.name || "Director"}
                  width={280}
                  height={325}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogHeader className="w-full space-y-0.5 text-left">
                <DialogTitle className="text-[16px] font-bold text-[#013763] leading-tight">
                  {selected?.name}
                </DialogTitle>
                {selected?.designation && (
                  <DialogDescription className="text-[12px] font-semibold text-[#238A84]">
                    {selected.designation}
                  </DialogDescription>
                )}
              </DialogHeader>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
