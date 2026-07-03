
import { Heading } from "@/components/layout/Heading";
import { renderHtml } from "@/lib/helper";
import Image from '@/components/common/ContentImage';

export default function NationSection({
    title,
    description,
    image,
    image_alt_text
}) {
    return (
        <section className="py-[40px] xl:py-[60px] 2xl:py-[90px] 3xl:py-[140px] relative">
             <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#1a9af577] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute right-0 -z-1 inset-[0_auto_-2%]"></div>
            <div className="container">
                <div className="flex flex-wrap -m-[7px]">
                    <div className="w-full md:w-1/2 xl:w-7/12 p-[7px]">
                        <div className="sm:max-w-[90%] w-full">
                            <Heading as="h2" size="heading1" className="mb-[15px]">
                                {title}
                            </Heading>
                            <div>{renderHtml(description)}</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-5/12 p-[7px]">
                        <div className="w-full h-full aspect-[630/350] p-[15px] 2xl:p-[20px_24px] rounded-[10px] bg-transparent
                            backdrop-blur-[20px] backdrop-saturate-[180%]
                            shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]">
                            <div className="w-full h-full overflow-hidden rounded-[10px] ">
                                <Image src={image} className="w-full h-full object-cover" width="630" height="350" alt={image_alt_text} title={image_alt_text} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
