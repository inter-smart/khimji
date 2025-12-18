import Image from "next/image";

export default function VentureCard({ item }) {
  return (
    <div
      className="
        relative z-0 w-full h-full
        sm:p-[15px] xl:p-[20px] 2xl:p-[25px] 3xl:p-[30px]
        flex flex-wrap overflow-hidden
        rounded-[10px]
        border border-white
        bg-transparent
        backdrop-blur-[20px] backdrop-saturate-[180%]
        shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa]
      "
    >
      {/* LEFT MEDIA */}
      <div className="w-full lg:w-[180px] xl:w-[200px] 2xl:w-[250px] 3xl:w-[350px]">
        <div className="w-full h-full overflow-hidden rounded-[10px] group">
          {/* Desktop Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover max-sm:hidden"
          >
            <source src={item.video} type="video/mp4" />
          </video>

          {/* Mobile Image */}
          <Image
            src={item.mobileImage}
            width={395}
            height={465}
            alt={item.title}
            className="
              w-full h-full object-cover
              sm:hidden
              transition-transform duration-700 ease-out
              group-hover:scale-110
            "
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div
        className="
          absolute bottom-0 left-0
          max-sm:h-full
          sm:relative
          w-full
          lg:w-[calc(100%-180px)]
          xl:w-[calc(100%-200px)]
          2xl:w-[calc(100%-250px)]
          3xl:w-[calc(100%-350px)]
          flex items-center
          max-xs:p-[25px_25px_70px]
          max-sm:p-[35px_20px_75px]
          after:absolute after:top-0 after:left-0
          after:w-full after:h-full
          after:bg-gradient-to-t after:from-black after:to-black/0
          after:sm:hidden
        "
      >
        <div
          className="
            relative z-10 w-full
            max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:h-full
            sm:max-w-[450px]
            sm:p-[15px]
            2xl:p-[25px]
            3xl:p-[30px] 3xl:px-[35px]
          "
        >
          {/* TITLE */}
          <h3
            className="
              text-[22px] xs:text-[25px]
              sm:text-[14px] lg:text-[16px] xl:text-[18px]
              2xl:text-[23px] 3xl:text-[30px]
              font-medium
              max-sm:text-white
              sm:bg-gradient-to-r sm:from-[#0B436A] sm:to-[#299B8A]
              sm:bg-clip-text sm:text-transparent
              uppercase
              mb-[10px] 2xl:mb-[15px] 3xl:mb-[25px]
            "
          >
            {item.title}
          </h3>

          {/* DESCRIPTION */}
          <div className="relative z-10">
            <div
              className="
                w-full
                max-sm:bg-transparent
                max-sm:backdrop-blur-[3px]
                max-sm:border max-sm:border-white/20
                p-[12px_8px] xs:p-[12px] sm:p-0
              "
            >
              <p className="max-sm:text-white">{item.description}</p>
            </div>

            {/* LOGOS */}
            <div
              className="
                mt-[8px] sm:mt-[20px]
                max-sm:bg-transparent
                max-sm:backdrop-blur-[3px]
                max-sm:border max-sm:border-white/20
                w-full
              "
            >
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-sm:w-[70%] mx-auto">
                {item.logos.map((logo, i) => (
                  <div
                    key={i}
                    className="
                      flex items-center justify-center
                      w-[45px] h-[28px]
                      sm:w-[55px] sm:h-[32px]
                      2xl:w-[65px] 2xl:h-[38px]
                      3xl:w-[75px] 3xl:h-[45px]
                    "
                  >
                    <Image
                      src={`/images/${logo}.png`}
                      alt={logo}
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
