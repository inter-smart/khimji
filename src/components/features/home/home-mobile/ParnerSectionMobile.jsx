import Image from "next/image";


export default function ParnerSectionMobile({brands}) {
    return (
        <section className="py-[0_40px] sm:hidden">
            <div className="container">
                <div className="flex flex-wrap -m-[5px]">
                    {brands?.map((item, index) => (
                        <div className="flex-grow-1 p-[5px]" key={index}>
                            <div className="w-full h-full flex items-center justify-center p-[5px]">
                                <Image
                                    src={item?.logo}
                                    alt={item?.logo_alt_text}
                                    width={140}
                                    height={65}
                                    className="w-auto object-contain  max-w-[70px] min-w-[42px]  3xs:min-w-[50px] invert-0 brightness-0 saturate-0"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
