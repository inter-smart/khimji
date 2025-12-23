
import { Heading } from "@/components/layout/Heading";
import Image from "next/image";

export default function NationSection() {
    return (
        <section className="py-[40px] xl:py-[60px] 2xl:py-[90px] 3xl:py-[140px]">
            <div className="container">
                <div className="flex flex-wrap -m-[7px]">
                    <div className="w-full md:w-1/2 xl:w-7/12 p-[7px]">
                        <div className="sm:max-w-[90%] w-full">
                            <Heading as="h2" size="heading1" className="mb-[15px]">
                                Creating Value within the nation: Unlocking Oman’s potential
                            </Heading>
                            <p>We at KR have placed great emphasis on nurturing local businesses to thrive
                                and in doing so we have built relationships
                                and partnerships that have stood the test of time.
                                We have also consistently groomed local talent through youth development programmes and built careers for
                                promising candidates, Together we have come far and together we can go further.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-5/12 p-[7px]">
                        <div className="w-full h-full aspect-[630/350] p-[15px] 2xl:p-[20px_24px] rounded-[10px] bg-transparent
                            backdrop-blur-[20px] backdrop-saturate-[180%]
                            shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]">
                            <div className="w-full h-full overflow-hidden rounded-[10px] ">
                                <Image src="/images/icv-sec-1.jpg" className="w-full h-full object-cover" width="630" height="350" alt="icv-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
