import Image from "next/image";
const brands = [
    "/images/partner-1.png",
    "/images/partner-2.png",
    "/images/partner-3.png",
    "/images/partner-4.png", 
    "/images/partner-5.png",
    "/images/partner-6.png",
    "/images/partner-7.png",
    "/images/partner-8.png",
    "/images/partner-9.png",
];

export default function ParnerSectionMobile() {
    return (
        <section className="py-[0_40px] sm:hidden">
            <div className="container">
                <div className="flex flex-wrap -m-[5px]">
                    {brands.map((logo, index) => (
                        <div className="flex-grow-1 p-[5px]" key={index}>
                            <div className="w-full h-full flex items-center justify-center p-[5px]">
                                <Image
                                    src={logo}
                                    alt="Brand Logo"
                                    width={140}
                                    height={65}
                                    className="w-auto object-contain  max-w-[70px]  min-w-[42px]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
