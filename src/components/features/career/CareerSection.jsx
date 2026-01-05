"use client";
import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CareerForm from "./CareerForm";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { renderHtml } from "@/lib/helper";
import { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function CareerSection({ data }) {
  const [openDialog, setOpenDialog] = useState({});

  const handleCloseDialog = (careerId) => {
    setOpenDialog((prev) => ({ ...prev, [careerId]: false }));
  };

  return (
    <section className="w-full h-auto py-[40px] sm:py-[60px_50px] lg:py-[80px_70px] 2xl:py-[100px_80px] 3xl:py-[135px_100px] overflow-hidden block relative z-0">
      <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[150px] opacity-40 pointer-events-none absolute -z-1 inset-[50%_-5%_auto_auto]"></div>
      <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[150px] opacity-40 pointer-events-none absolute -z-1 inset-[auto_auto_2%_-15%]"></div>
      <div className="container">
        <div className="w-full h-auto mb-[25px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] block">
          <Heading as="h2" size="heading1" className="!mb-[10px] sm:!mb-[15px] 2xl:!mb-[20px] 3xl:!mb-[25px]">
            {data?.title}
          </Heading>
          <div className="text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.5] font-normal text-black mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]">
            {data?.description}
          </div>
          <Link
            href={`mailto:${data?.email}` || "#"}
            target={data?.button?.target ? "_self" : "_blank"}
            className="text-[14px] lg:text-[16px] 2xl:text-[18px] 3xl:text-[20px] leading-[1] font-normal text-[#00416B] w-fit underline flex items-center hover:opacity-70 transition-opacity duration-300"
          >
            {data?.email}
            <span className="w-[15px] 3xl:w-[20px] h-auto aspect-square ms-[8px] sm:ms-[10px] 3xl:ms-[15px] mb-[-5px] flex items-center justify-center">
              <Image src="/images/career_arrow.svg" alt="Arrow" width={20} height={20} className="w-full h-full object-contain" />
            </span>
          </Link>
        </div>
        <div className="w-full h-auto">
          <Accordion type="single" defaultValue="item-1" collapsible>
            {data?.careerList?.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index} className="last:border-b-1">
                <AccordionTrigger className="py-[15px] lg:py-[20px] 2xl:py-[25px] 3xl:py-[40px] [&[data-state]>svg]:hidden hover:no-underline">
                  <div className="w-full h-auto xl:h-full flex flex-wrap items-center">
                    <div className="w-full xl:w-1/2 mb-[15px] sm:mb-[25px] xl:mb-0">
                      <div className="text-[16px] 2xl:text-[20px] 3xl:text-[24px] leading-[1.2] font-normal text-[#1C2222] mb-[5px]">
                        {item?.title}
                      </div>
                      <div className="text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal text-[#1E1E1E]">{item?.summary}</div>
                    </div>
                    <div className="w-full xl:w-1/2 h-full flex flex-wrap [&>*]:flex [&>*]:items-center sm:[&>*]:justify-center max-sm:[&>*]:mb-[10px]">
                      <div className="w-full sm:w-[30%] h-auto xl:h-full sm:px-[10px] relative z-0 before:content-[''] before:w-[2px] before:h-full before:bg-gradient-to-b before:from-[#F8F8F8] before:via-[#D0D0D0] before:to-[#F8F8F8] before:absolute before:z-1 before:inset-[0_auto_0_0] after:content-[''] after:w-[2px] after:h-full after:bg-gradient-to-b after:from-[#F8F8F8] after:via-[#D0D0D0] after:to-[#F8F8F8] after:absolute after:z-1 after:inset-[0_0_0_auto] max-sm:before:hidden max-sm:after:hidden">
                        <div className="text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal text-[#1C2222]">
                          Job Type: {item?.job_type}
                        </div>
                      </div>
                      <div className="text-center w-full sm:w-[50%] sm:px-[10px]">
                        <div className="text-[13px] 2xl:text-[14px] 3xl:text-[16px] leading-[1.2] font-normal text-[#1C2222]">
                          Requirements: {item?.experience}
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()} className="w-full sm:w-[20%] flex sm:justify-end sm:ps-[10px]  ">
                        <Dialog
                          open={openDialog[item?.id]}
                          onOpenChange={(open) => setOpenDialog((prev) => ({ ...prev, [item?.id]: open }))}
                          className="w-full"
                        >
                          <DialogTrigger asChild>
                            <div className="text-[12px] 2xl:text-[15px] 3xl:text-[18px] leading-[1.2] font-normal text-black p-[10px_15px] 2xl:p-[15px_20px] 3xl:p-[15px_25px] rounded-[5px] border-1 border-black hover:bg-black hover:text-white transition-all duration-300">
                              Apply Now
                            </div>
                          </DialogTrigger>
                          <DialogContent className="lg:max-w-[600px] 2xl:max-w-[720px] 3xl:max-w-[900px] sm:p-[40px] lg:p-[50px] 2xl:p-[60px] 3xl:p-[80px] max-h-[100vh]      overflow-y-auto">
                            <DialogTitle className="text-[18px] sm:text-[20px] 2xl:text-[25px] 3xl:text-[32px] leading-[1] font-normal bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent w-fit uppercase mb-[15px] sm:mb-[20px] lg:mb-[30px] 2xl:mb-[35px] 3xl:mb-[50px]">
                              Fill the form below
                            </DialogTitle>
                            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
                              <CareerForm careerId={item?.id} onSuccess={() => handleCloseDialog(item?.id)} />
                            </GoogleReCaptchaProvider>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full h-auto py-[10px] sm:py-[20px] 2xl:py-[20px_30px] 3xl:py-[20px_40px] flex flex-wrap">
                    <div className="w-full sm:w-[35%] sm:me-10 max-sm:mb-[20px]">
                      <div className="text-[16px] 3xl:text-[20px] leading-[1] font-normal text-[#00416B] mb-[15px] sm:mb-[25px]">
                        Responsibilities:
                      </div>
                      {renderHtml(
                        item?.responsibilities,
                        "[&_li]:text-[13px] 2xl:[&_li]:text-[14px] 3xl:[&_li]:text-[16px] [&_li]:leading-[1.2] [&_li]:font-normal [&_li]:text-[#1E1E1E] [&_li]:mb-[15px] [&_ul]:list-disc [&_ul]:list-inside"
                      )}
                    </div>
                    <div className="w-full sm:w-[35%]">
                      <div className="text-[16px] 3xl:text-[20px] leading-[1] font-normal text-[#00416B] mb-[15px] sm:mb-[25px]">
                        Required Skills:
                      </div>
                      {renderHtml(
                        item?.required_skills,
                        "[&_li]:text-[13px] 2xl:[&_li]:text-[14px] 3xl:[&_li]:text-[16px] [&_li]:leading-[1.2] [&_li]:font-normal [&_li]:text-[#1E1E1E] [&_li]:mb-[15px] [&_ul]:list-disc [&_ul]:list-inside"
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
