
import Image from "next/image";

export default function VentureCard({ item }) {
    return (
        <div className="
                    relative z-0 w-full h-full 
                    sm:p-[15px] xl:p-[20px] 2xl:p-[25px] 3xl:p-[30px] flex flex-wrap overflow-hidden
                    rounded-[10px] border border-white bg-transparent
                    backdrop-blur-[20px] backdrop-saturate-[180%]
                    shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]
                  ">

            <div className="w-full lg:w-[180px] xl:w-[200px] 2xl:w-[250px] 3xl:w-[350px]">
                <div className="w-full h-full overflow-hidden rounded-[10px]">
                    <video
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover max-sm:hidden"
                    >
                        <source src={item.video} type="video/mp4" />
                    </video>

                    <Image src="/images/vetureCard-1.jpg" width="395" height="465" className="w-full h-full object-cover sm:hidden" />
                </div>
            </div>

            <div className="max-xs:p-[25px_25px_70px] max-sm:p-[35px_20px_75px] absolute bottom-0 left-0 max-sm:h-full sm:relative w-full lg:w-[calc(100%-180px)] xl:w-[calc(100%-200px)] 2xl:w-[calc(100%-250px)] 
                     3xl:w-[calc(100%-350px)]  flex items-center
                     after:absolute after:-content-[''] after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black after:to-black/0
                     after:sm:hidden
                     ">
                <div className="realtive z-1 w-full max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:h-full sm:max-w-[450px] sm:p-[15px] 2xl:p-[25px] 3xl:p-[30px] 3xl:px-[35px]">
                    <div className="
                         text-[22px]  xs:text-[25px] sm:text-[14px] lg:text-[16px] xl:text-[18px]
                          2xl:text-[23px] 3xl:text-[30px] font-medium max-sm:text-white
                          sm:bg-gradient-to-r sm:from-[#0B436A] sm:to-[#299B8A]
                          sm:bg-clip-text text-transparent uppercase
                          mb-[10px] 2xl:mb-[15px] 3xl:mb-[25px]
                        ">
                        {item.title}
                    </div>

                    <div className="relative z-1">
                        <div className="w-full max-sm:bg-transparent max-sm:backdrop-blur-[3px] max-sm:border-white/20 max-sm:border p-[12px_8px] xs:p-[12px] sm:p-0">
                            <p className="max-sm:text-white">{item.description}</p>
                        </div>
                        <div className="mt-[8px] sm:mt-[20px] max-sm:bg-transparent max-sm:backdrop-blur-[3px] max-sm:border-white/20 max-sm:border w-full">
                            <div className="flex items-center w-full max-sm:w-[70%] m-auto">
                                {item.logos.map((logo, i) => (
                                    <div key={i} className="w-1/4 p-[8px]">
                                        <div className="w-full h-full flex items-center">
                                            <Image
                                                src={`/images/${logo}.png`}
                                                width={60}
                                                height={60}
                                                alt={logo}
                                                className="w-auto object-contain min-w-[30px] 2xl:min-w-[50px] 3xl:min-w-[60px]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
