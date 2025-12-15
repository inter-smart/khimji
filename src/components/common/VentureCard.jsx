 
import Image from "next/image";

export default function VentureCard({ item }) {
    return (
        <div className="
                    relative z-0 w-full h-full 
                    p-[15px] xl:p-[20px] 2xl:p-[25px] 3xl:p-[30px] flex flex-wrap overflow-hidden
                    rounded-[10px] border border-white bg-transparent
                    backdrop-blur-[20px] backdrop-saturate-[180%]
                    shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]
                  ">
                    
            <div className="w-full lg:w-[180px] xl:w-[200px] 2xl:w-[250px] 3xl:w-[350px]">
                <div className="w-full h-full overflow-hidden rounded-[10px]">
                    <video
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={item.video} type="video/mp4" />
                    </video>
                </div>
            </div> 
         
            <div className="w-full lg:w-[calc(100%-180px)] xl:w-[calc(100%-200px)] 2xl:w-[calc(100%-250px)] 3xl:w-[calc(100%-350px)] flex items-center">
                <div className="w-full max-w-[450px] p-[15px] 2xl:p-[25px] 3xl:p-[30px] 3xl:px-[35px]">
                 
                    <div className="
                          text-[14px] lg:text-[16px] xl:text-[18px]
                          2xl:text-[23px] 3xl:text-[30px] font-medium
                          bg-gradient-to-r from-[#0B436A] to-[#299B8A]
                          bg-clip-text text-transparent uppercase
                          mb-[10px] 2xl:mb-[15px] 3xl:mb-[25px]
                        ">
                        {item.title}
                    </div> 
                   
                    <p>{item.description}</p>
                   
                    <div className="flex items-center -m-[8px] mt-[20px]">
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
    )
}
