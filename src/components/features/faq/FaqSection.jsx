import { Heading } from "@/components/layout/Heading";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqSection({ data }) {
    return (
        <section className="w-full h-auto py-[40px] sm:py-[70px_60px] lg:py-[100px_80px] 2xl:py-[120px_100px] 3xl:py-[155px_130px] overflow-hidden block relative z-0">
            <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
            <div className="container">
                <div className="w-full h-auto sm:px-[50px] lg:px-[70px] xl:px-[90px] 2xl:px-[110px] 3xl:px-[140px]">
                    <Heading
                        as="h2"
                        size="heading1"
                        className="!text-[#0B436A] !mb-[20px] lg:!mb-[30px] 3xl:!mb-[40px]"
                    >
                        {data?.title}
                    </Heading>
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue={`item-${data?.faq_list?.[1]?.id}`}
                    >
                        {data?.faq_list?.map((item) => (
                            <AccordionItem
                                value={`item-${item.id}`}
                                key={item.id}
                                className="w-full h-auto p-[5px_15px] sm:p-[7px_15px] lg:p-[10px_15px] 2xl:p-[15px_20px] 3xl:p-[20px_25px] mb-[5px] sm:mb-[10px] 2xl:mb-[15px] rounded-[5px] 2xl:rounded-[8px] border border-[#383838]/10 bg-transparent overflow-hidden relative z-0 data-[state=open]:border-transparent data-[state=open]:before:content-[''] data-[state=open]:before:absolute data-[state=open]:before:inset-0 data-[state=open]:before:bg-gradient-to-r data-[state=open]:before:from-[#0B436A] data-[state=open]:before:to-[#299B8A] data-[state=open]:before:rounded-[5px] 2xl:data-[state=open]:before:rounded-[8px] data-[state=open]:after:content-[''] data-[state=open]:after:absolute data-[state=open]:after:inset-[1px] data-[state=open]:after:bg-white data-[state=open]:after:rounded-[4px] 2xl:data-[state=open]:after:rounded-[7px] data-[state=open]:before:z-[-2] data-[state=open]:after:z-[-1]">
                                <AccordionTrigger className="[&>svg]:text-[#132C26] 2xl:[&>svg]:w-[17px] 2xl:[&>svg]:h-[17px]">
                                    <div className="text-[16px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.4] font-normal text-black max-w-[90%]">{item?.title}</div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div
                                        className="typography [&_p]:text-[14px] 2xl:[&_p]:text-[16px] 3xl:[&_p]:text-[20px] [&_p]:leading-[1.8] [&_p]:font-normal [&_p]:text-black [&_p]:last:my-0 mb-0 max-w-[90%] [&>*]:mb-[20px] 2xl:[&>*]:mb-[30px]"
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section >
    )
}
