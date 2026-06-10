"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heading } from "@/components/layout/Heading";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ArchiveSection({ archives, title, lang }) {
  const globeContainerRef = useRef(null);
  const globeInstanceRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("CORPORATE");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [globeReady, setGlobeReady] = useState(false);
  const isRTL = lang?.trim() === "ar";

  const router = useRouter();
  const tHome = useTranslations("home");
  const transformArchivesToFrontend = (backendArchives) => {
    const frontendData = {};


    backendArchives.forEach((categoryGroup) => {
      const categoryName = categoryGroup.title.toUpperCase().trim();

      frontendData[categoryName] = categoryGroup.archives.map((archive) => ({
        id: archive.id,
        image:
          archive.media_type === "image"
            ? archive.image
            : archive.video_thumbnail_image,
        media_type: archive?.media_type,
        video_thumbnail_image: archive.video_thumbnail_image,
        video: archive?.video,
        category: categoryName,
        date: new Date(archive.event_date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        title: archive.title,
        location: archive.location,
        coordinates: {
          lat: parseFloat(archive.latitude),
          lng: parseFloat(archive.longitude),
        },
        link: archive.link,
      }));
    });

    return frontendData;
  };
  const archivesData = transformArchivesToFrontend(archives);

  const handleClick = () => {
    router.push(`/${lang}/newsroom`);
  };

  // Usage

  // Get categories
  const categories = Object.keys(archivesData);

  const currentData = archivesData[activeCategory] || [];
  const currentItem = currentData.length > 0 ? currentData[currentIndex] : null;

  const textcontent = `text-[16px] xs:text-[20px] md:text-[12px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[18px] text-[#000000] font-medium`;
  const icons = `w-[22px] lg:w-[30px] 2xl:w-[35px] 3xl:w-[45px] h-[22px] lg:h-[30px] 2xl:h-[35px] 3xl:h-[45px] rounded-full flex items-center justify-center overflow-hidden bg-[linear-gradient(#299a8b45_0%,#0c456b30_78%)] [&>svg]:max-w-[10px] lg:[&>svg]:max-w-[15px] [&>svg]:3xl:max-w-[18px]`;
  const iconBlock = `w-[calc(100%-20px)] lg:w-[calc(100%-30px)] 2xl:w-[calc(100%-35px)] 3xl:w-[calc(100%-45px)] px-[10px] xl:px-[15px]`;

  // Initialize globe
  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const initGlobe = async () => {
      // Wait for the DOM to be ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!globeContainerRef.current || !isMounted) {
        return;
      }

      try {
        const Globe = (await import("globe.gl")).default;

        if (!isMounted || !globeContainerRef.current) {
          return;
        }

        // Clear any existing content
        globeContainerRef.current.innerHTML = "";

        // Set responsive dimensions
        const isMobile = window.innerWidth < 1024;
        const containerWidth =
          globeContainerRef.current.offsetWidth || (isMobile ? 350 : 600);
        const containerHeight = isMobile ? 350 : 650;

        const globe = Globe()(globeContainerRef.current)
          .globeImageUrl(
            "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          )
          .bumpImageUrl(
            "//unpkg.com/three-globe/example/img/earth-topology.png"
          )
          .backgroundColor("rgba(0,0,0,0)")
          .width(containerWidth)
          .height(containerHeight);

        globe
          .pointsData([])
          .pointLat("lat")
          .pointLng("lng")
          .pointColor(() => "#299B8A")
          .pointAltitude(0.01)
          .pointRadius(0.1);

        // Add labels without dots
        globe
          .labelsData([])
          .labelLat("lat")
          .labelLng("lng")
          .labelText("location")
          .labelSize(1.6)
          .labelDotRadius(0)
          .labelColor(() => "#ffff")
          .labelResolution(2);

        if (globe.controls()) {
          globe.controls().enableZoom = false;
          globe.controls().autoRotate = false;
          globe.controls().enableRotate = true;
          globe.controls().enablePan = false;
        }

        if (isMounted) {
          globeInstanceRef.current = globe;
          setGlobeReady(true);
          setIsLoading(false);

          // Handle window resize
          const handleResize = () => {
            if (globeInstanceRef.current && globeContainerRef.current) {
              const newWidth = globeContainerRef.current.offsetWidth;
              if (newWidth > 0) {
                globeInstanceRef.current.width(newWidth);
              }
            }
          };
          window.addEventListener("resize", handleResize);
          globe._resizeHandler = handleResize; // Store for cleanup
        }
      } catch (err) {
        console.error("Globe initialization error:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    timeoutId = setTimeout(initGlobe, 0);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (globeInstanceRef.current) {
        if (globeInstanceRef.current._resizeHandler) {
          window.removeEventListener(
            "resize",
            globeInstanceRef.current._resizeHandler
          );
        }
        // Globe.gl destructor isn't always available, so we clear the container
        if (globeContainerRef.current) {
          globeContainerRef.current.innerHTML = "";
        }
      }
      globeInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!globeReady || !globeInstanceRef.current || !currentItem) {
      return;
    }

    try {
      const data = [
        {
          lat: Number(currentItem?.coordinates?.lat),
          lng: Number(currentItem?.coordinates?.lng),
          location: currentItem.location,
        },
      ];
      globeInstanceRef.current.pointsData(data);
      globeInstanceRef.current.labelsData(data);

      // Move to the location
      globeInstanceRef.current.pointOfView(
        {
          lat: Number(currentItem.coordinates.lat),
          lng: Number(currentItem.coordinates.lng),
          altitude: 1.8,
        },
        1500
      );
    } catch (err) {
      console.error("Error updating globe:", err);
    }
  }, [globeReady, currentItem]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.7,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeInScale = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const slideInFromLeft = {
    hidden: {
      opacity: 0,
      x: isRTL ? 50 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInFromRight = {
    hidden: {
      opacity: 0,
      x: isRTL ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.6 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const globeContainerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(41, 154, 139, 0.9)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const categoryButtonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.05,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    active: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="bg-[#E7F7F5] lg:bg-white py-[40px_20px] 2xl:py-[60px_10px] 3xl:py-[80px_20px] relative overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeInUp}>
            <Heading
              size="heading1"
              as="h3"
              className="max-sm:text-[35px] max-lg:text-[43px] mb-[20px] 2xl:mb-[40px] 3xl:mb-[50px]"
            >
              {title}
            </Heading>
          </motion.div>

          <motion.div className="absolute z-10  bottom-[5%] end-[70px] 2xl:end-[100px] 3xl:end-[150px] pointer-events-none  m-auto w-[110px] 2xl:w-[150px] 3xl:w-[205px] h-[110px] 2xl:h-[150px] 3xl:h-[205px] blur-[165px] rounded-full bg-[#2FDDC3] animate-float" />

          <div className="flex justify-center flex-wrap gap-2 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8 mb-[60px] lg:mb-[30px]">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`text-[16px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] max-lg:p-[10px_17px] tracking-wide transition-colors cursor-pointer 
                                     uppercase rounded-[40px] max-lg:border max-lg:border-[#0b426a22] max-lg:bg-white ${activeCategory === cat
                    ? " max-lg:bg-gradient-to-r from-[#0B436A] to-[#299B8A] lg:bg-transparent text-white lg:text-[#289989] font-medium"
                    : "text-[#000000] hover:text-[#289989]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Globe */}
        <div className="relative">
          <motion.div
            className="relative mb-8 w-full max-w-[650px] !h-[200px] md:!h-[400px] lg:!h-[650px] m-auto lg:bg-transparent after:absolute after:content-[''] 
                        after:bottom-0 after:left-0 after:right-0 after:bg-white after:w-full after:h-[265px] after:3xl:h-[270px] after:hidden"
            variants={globeContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-lg text-teal-600 font-medium">
                  {tHome("loadingGlobe")}
                </div>
              </div>
            )}

            {/* Animated SVG Marker */}
            {globeReady && currentItem && (
              <motion.div
                className="absolute z-20"
                style={{
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "35%",
                }}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  ease: "easeOut",
                }}
              >
                <motion.svg
                  width="23"
                  height="30"
                  viewBox="0 0 23 30"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M11.1328 0C17.2793 0 22.2656 4.98633 22.2656 11.1328C22.2656 17.2793 11.1328 30 11.1328 30C11.1328 30 0 17.2793 0 11.1328C0 4.98633 4.98633 0 11.1328 0ZM11.1328 5.68359C8.05664 5.68359 5.56641 8.17383 5.56641 11.25C5.56641 14.3262 8.05664 16.8164 11.1328 16.8164C14.209 16.8164 16.6992 14.3262 16.6992 11.25C16.6992 8.17383 14.209 5.68359 11.1328 5.68359Z"
                    fill="#299B8A"
                  />
                </motion.svg>
              </motion.div>
            )}

            <div
              ref={globeContainerRef}
              className="flex items-center justify-center w-full mx-auto h-[250px] lg:h-[550px] min-h-[250px] lg:min-h-[550px] pointer-events-none"
            />
          </motion.div>

          {/* Card Navigation */}

          <motion.div
            className="relative md:absolute md:bottom-[80px] lg:bottom-[160px] xl:bottom-[120px] 2xl:bottom-[70px] 3xl:bottom-[0px] left-0 right-0 m-auto w-full 
                          lg:max-w-[80%] md:max-h-[175px] xl:max-h-[210px] 2xl:max-h-[265px] 3xl:max-h-[340px] h-full
                          flex items-center justify-center max-lg:mt-[-45px]"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            key={`${activeCategory}-${currentIndex}`}
          >
            {currentItem && (
              <div
                className="shadow-2xl overflow-hidden w-full h-full md:rounded-[10px] p-[15px] lg:p-[20px] 2xl:p-[25px] 3xl:p-[30px] 
                            border border-white bg-[#E7F7F5] lg:bg-white
                                backdrop-blur-[20px] lg:backdrop-saturate-[180%] 
                                shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] flex flex-wrap flex-row"
              >
                <div className="w-full md:w-[200px] lg:w-[280px] xl:w-[350px] 2xl:w-[475px] 3xl:w-[600px] max-xl:h-full">
                  <motion.div
                    className="w-full h-full rounded-[10px] overflow-hidden group aspect-[600/280] cursor-pointer"
                    variants={imageVariants}
                    onClick={handleClick}
                  >
                    {currentItem?.media_type === "video" &&
                      currentItem?.video ? (
                      <video
                        src={currentItem.video}
                        poster={
                          currentItem?.video_thumbnail_image ||
                          "/images/placeholder.png"
                        }
                        className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-500"
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={currentItem.image}
                        alt={currentItem.title}
                        title={currentItem.title}
                        width="600"
                        height="300"
                        className="w-full h-full object-cover transition-all group-hover:scale-105"
                      />
                    )}
                  </motion.div>
                </div>
                <div
                  className="w-full md:w-[calc(100%-200px)] lg:w-[calc(100%-280px)] xl:w-[calc(100%-350px)] 2xl:w-[calc(100%-475px)] 3xl:w-[calc(100%-600px)] 
                                flex items-center py-[25px] md:p-[15px] xl:p-[20px] 2xl:p-[25px] 3xl:p-[40px] relative"
                >
                  <div className="w-full">
                    <motion.div
                      className="lg:absolute lg:top-0 lg:end-0 flex items-center gap-3 ms-auto w-fit has-[button:disabled]:hidden max-lg:hidden"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <motion.button
                        onClick={() => {
                          if (isRTL) {
                            setCurrentIndex((i) =>
                              i === currentData.length - 1 ? 0 : i + 1
                            );
                          } else {
                            setCurrentIndex((i) =>
                              i === 0 ? currentData.length - 1 : i - 1
                            );
                          }
                        }}
                        disabled={currentData.length <= 1}
                        className="p-3 bg-[#defaf670] border border-white rounded-full w-[35px] 3xl:w-[44px] h-[35px] 3xl:h-[44px]
                                                 transition-all cursor-pointer hover:bg-[#299A8B] group [&>svg]:fill-[#299A8B]"
                        variants={buttonVariants}
                        whileHover="hover"
                      >
                        <svg
                          viewBox="0 0 18 17"
                          className="group-hover:fill-white transition-all"
                        >
                          <path
                            d="M0.320356 8.82784C-0.10678 8.40071 -0.10678 7.70818 0.320356 7.28105L7.28094 0.320463C7.70807 -0.106673 8.4006 -0.106673 
                                                    8.82773 0.320463C9.25487 0.747599 9.25487 1.44012 8.82773 1.86726L2.64055 8.05444L8.82773 14.2416C9.25487 14.6688 9.25487 15.3613 8.82773 
                                                    15.7884C8.4006 16.2156 7.70807 16.2156 7.28094 15.7884L0.320356 8.82784ZM17.8146 8.05444V9.14819H1.09375V8.05444V6.96069H17.8146V8.05444Z"
                          />
                        </svg>
                      </motion.button>

                      <motion.button
                        onClick={() => {
                          if (isRTL) {
                            setCurrentIndex((i) =>
                              i === 0 ? currentData.length - 1 : i - 1
                            );
                          } else {
                            setCurrentIndex((i) =>
                              i === currentData.length - 1 ? 0 : i + 1
                            );
                          }
                        }}
                        disabled={currentData.length <= 1}
                        className="p-3 bg-[#defaf670] border border-white rounded-full w-[35px] 3xl:w-[44px] h-[35px] 3xl:h-[44px]
                                                 transition-all cursor-pointer hover:bg-[#299A8B] group [&>svg]:fill-[#299A8B]"
                        variants={buttonVariants}
                        whileHover="hover"
                      >
                        <svg
                          viewBox="0 0 18 17"
                          className="group-hover:fill-white transition-all"
                        >
                          <path
                            d="M17.4943 8.82784C17.9214 8.40071 17.9214 7.70818 17.4943 7.28105L10.5337 0.320463C10.1066 -0.106673 9.41404 -0.106673 8.9869 0.320463C8.55977 0.747599 8.55977 1.44012 8.9869 1.86726L15.1741 8.05444L8.9869 14.2416C8.55977 14.6688 8.55977 15.3613 8.9869 15.7884C9.41404 16.2156 10.1066 16.2156 10.5337 15.7884L17.4943 8.82784ZM0
                                                     8.05444V9.14819H16.7209V8.05444V6.96069H0V8.05444Z"
                          />
                        </svg>
                      </motion.button>
                    </motion.div>

                    <motion.div
                      className="text-[16px] xs:text-[20px] md:text-[14px] 2xl:text-[15px] 3xl:text-[18px] font-medium text-[#000000] mb-[25px] md:mb-[15px] xl:mb-[20px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {currentItem.category}
                    </motion.div>
                    <div className="flex flex-wrap -m-[8px]">
                      {[
                        { icon: "date", content: currentItem.date, index: 0 },
                        { icon: "title", content: currentItem.title, index: 1 },
                        {
                          icon: "location",
                          content: currentItem.location,
                          index: 2,
                        },
                        { icon: "link", content: currentItem.link, index: 3 },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className={`w-full ${idx === 1 ? "md:w-3/5" : "md:w-2/5"
                            } p-[8px]`}
                          custom={idx}
                          variants={iconItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <div className="flex items-center">
                            <div className={icons}>
                              {item.icon === "date" && (
                                <svg
                                  className="max-w-[22px]"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_1342_3911)">
                                    <path
                                      d="M22 6.61036V5.52754V1.52973H19.2053V0.271606H18.1225V1.52973H14.0972V0.271606H13.0144V1.52973H8.98562V0.271606H7.90281V1.52973H3.8775V0.271606H2.79469V1.52973H0V5.53098V6.61379V21.7319H22V6.61036ZM1.08281 2.60911H2.79469V3.83973H3.8775V2.60911H7.90625V3.83973H8.98906V2.60911H13.0178V3.83973H14.1006V2.60911H18.1294V3.83973H19.2122V2.60911H20.9241V5.52754H1.08281V2.60911ZM20.9172 20.6491H1.08281V6.61036H20.9172V20.6491Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M12.3853 8.54907H14.2209V9.63188H12.3853V8.54907Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M16.9916 8.54907H18.8272V9.63188H16.9916V8.54907Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M3.17625 11.5845H5.01187V12.6673H3.17625V11.5845Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M7.77906 11.5845H9.61469V12.6673H7.77906V11.5845Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M12.3853 11.5845H14.2209V12.6673H12.3853V11.5845Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M16.9916 11.5845H18.8272V12.6673H16.9916V11.5845Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M3.17625 14.6198H5.01187V15.7026H3.17625V14.6198Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M7.77906 14.6198H9.61469V15.7026H7.77906V14.6198Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M12.3853 14.6198H14.2209V15.7026H12.3853V14.6198Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M16.9916 14.6198H18.8272V15.7026H16.9916V14.6198Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M3.17625 17.655H5.01187V18.7378H3.17625V17.655Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M7.77906 17.655H9.61469V18.7378H7.77906V17.655Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1342_3911">
                                      <rect
                                        width="22"
                                        height="22"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              )}
                              {item.icon === "title" && (
                                <svg viewBox="0 0 32 32">
                                  <g clipPath="url(#clip0_1342_3936)">
                                    <path
                                      d="M6.68748 11.875C6.68748 17.0445 10.8931 21.25 16.0625 21.25C21.2319 21.25 25.4375 17.0445 25.4375 11.875C25.4375 6.70557 21.2319 2.5 16.0625 2.5C10.8931 2.5 6.68748 6.70557 6.68748 11.875ZM16.0625 3.75C20.5427 3.75 24.1875 7.39478 24.1875 11.875C24.1875 16.3552 20.5427 20 16.0625 20C11.5823 20 7.93749 16.3552 7.93749 11.875C7.93749 7.39478 11.5823 3.75 16.0625 3.75Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M10.2744 10.7607L12.697 13.1477L12.1397 16.5025C12.1008 16.7361 12.1973 16.9715 12.3889 17.1106C12.5803 17.2498 12.834 17.2686 13.0442 17.1597L16.0625 15.5923L19.0806 17.1597C19.2891 17.2678 19.5427 17.251 19.7359 17.1106C19.9275 16.9715 20.0239 16.7361 19.9851 16.5025L19.4277 13.1477L21.8504 10.7607C22.0191 10.5947 22.0794 10.3477 22.0061 10.1223C21.9329 9.89722 21.7388 9.73292 21.5047 9.69752L18.1426 9.19141L16.6213 6.14917C16.5156 5.9375 16.2991 5.80371 16.0625 5.80371C15.8257 5.80371 15.6094 5.9375 15.5034 6.14917L13.9822 9.19141L10.6201 9.69752C10.386 9.73267 10.1919 9.89722 10.1187 10.1223C10.0454 10.3477 10.106 10.5947 10.2744 10.7607ZM14.4893 10.3792C14.6904 10.3489 14.8643 10.2227 14.9553 10.0408L16.0625 7.82617L17.1697 10.0408C17.2608 10.2227 17.4346 10.3489 17.6358 10.3792L20.0828 10.7476L18.3193 12.4846C18.1746 12.6275 18.1082 12.8318 18.1414 13.0325L18.5471 15.4741L16.3504 14.3335C16.2603 14.2866 16.1614 14.2632 16.0625 14.2632C15.9636 14.2632 15.8648 14.2866 15.7744 14.3335L13.5776 15.4741L13.9834 13.0325C14.0169 12.8318 13.9504 12.6275 13.8054 12.4846L12.0422 10.7476L14.4893 10.3792Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M16.6875 0.625001C16.6875 0.970217 16.4077 1.25 16.0625 1.25C15.7173 1.25 15.4375 0.970217 15.4375 0.625001C15.4375 0.279786 15.7173 0 16.0625 0C16.4077 0 16.6875 0.279786 16.6875 0.625001Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M13.1169 0.368354C7.85937 1.7104 4.18748 6.44209 4.18748 11.875C4.18748 15.2492 5.60619 18.4287 8.09667 20.6804L4.33128 27.3164C4.21019 27.53 4.22533 27.7947 4.36986 27.9929C4.51439 28.1914 4.76146 28.2869 5.00194 28.2368L9.27807 27.3489L10.781 31.584C10.8625 31.8144 11.0713 31.9758 11.3149 31.9976C11.5586 32.0193 11.7922 31.8965 11.9131 31.6838L16.0625 24.3889L20.2117 31.6838C20.3235 31.8804 20.5315 31.9998 20.7546 31.9998C20.773 31.9998 20.7915 31.999 20.8098 31.9976C21.0535 31.9758 21.2622 31.8142 21.344 31.584L22.8467 27.3489L27.1228 28.2368C27.3631 28.2866 27.6104 28.1912 27.7549 27.9929C27.8997 27.7947 27.9146 27.53 27.7935 27.3164L24.0281 20.6804C26.5186 18.4287 27.9373 15.2492 27.9373 11.875C27.9373 6.44209 24.2654 1.7104 19.0081 0.368354C18.6733 0.282905 18.3333 0.484809 18.2478 0.819283C18.1624 1.15376 18.3643 1.49409 18.6987 1.57954C23.4024 2.78022 26.6875 7.01387 26.6875 11.875C26.6875 17.7912 21.8826 22.5 16.0625 22.5C10.2383 22.5 5.43749 17.7873 5.43749 11.875C5.43749 7.01387 8.7224 2.78022 13.426 1.57954C13.7605 1.49409 13.9624 1.15376 13.8772 0.819283C13.7917 0.484809 13.4517 0.282905 13.1169 0.368354ZM11.5022 29.8784L10.2739 26.4172C10.1694 26.1228 9.86376 25.9507 9.55785 26.0141L6.10009 26.7322L9.08007 21.4802C10.8176 22.7434 12.875 23.5129 15.0144 23.7034L11.5022 29.8784ZM22.5669 26.0141C22.2612 25.9507 21.9553 26.1228 21.8508 26.4172L20.6228 29.8784L17.1104 23.7034C19.25 23.5129 21.3071 22.7434 23.0449 21.4802L26.0249 26.7322L22.5669 26.0141Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1342_3936">
                                      <rect
                                        width="32"
                                        height="32"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              )}
                              {item.icon === "location" && (
                                <svg viewBox="0 0 29 29">
                                  <g clipPath="url(#clip0_1342_3928)">
                                    <path
                                      d="M14.5 0C8.59288 0 3.78727 4.80561 3.78727 10.7127C3.78727 12.6574 4.65941 14.7489 4.69596 14.8371C4.97764 15.5057 5.53345 16.5442 5.93423 17.153L13.2794 28.2822C13.58 28.7385 14.0249 29 14.5 29C14.9751 29 15.42 28.7385 15.7206 28.2829L23.0664 17.153C23.4678 16.5442 24.023 15.5057 24.3047 14.8371C24.3412 14.7495 25.2127 12.658 25.2127 10.7127C25.2127 4.80561 20.4071 0 14.5 0ZM23.1427 14.3481C22.8912 14.9474 22.3739 15.9135 22.014 16.4592L14.6683 27.5891C14.5233 27.809 14.4773 27.809 14.3324 27.5891L6.9866 16.4592C6.62677 15.9135 6.10941 14.9468 5.85798 14.3475C5.84726 14.3217 5.04759 12.3965 5.04759 10.7127C5.04759 5.50067 9.28794 1.26032 14.5 1.26032C19.7121 1.26032 23.9524 5.50067 23.9524 10.7127C23.9524 12.399 23.1509 14.3292 23.1427 14.3481Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M14.5 5.04187C11.3725 5.04187 8.82855 7.58646 8.82855 10.7133C8.82855 13.8402 11.3725 16.3848 14.5 16.3848C17.6275 16.3848 20.1714 13.8402 20.1714 10.7133C20.1714 7.58646 17.6275 5.04187 14.5 5.04187ZM14.5 15.1244C12.0682 15.1244 10.0889 13.1457 10.0889 10.7133C10.0889 8.2809 12.0682 6.30219 14.5 6.30219C16.9318 6.30219 18.9111 8.2809 18.9111 10.7133C18.9111 13.1457 16.9318 15.1244 14.5 15.1244Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1342_3928">
                                      <rect
                                        width="29"
                                        height="29"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              )}
                              {item.icon === "link" && (
                                <svg viewBox="0 0 18 18">
                                  <g clipPath="url(#clip0_1342_3946)">
                                    <path
                                      d="M9.68847 12.4427L6.93439 15.1968C6.93439 15.1968 6.93439 15.1969 6.93432 15.1969C6.93432 15.1969 6.93432 15.197 6.93426 15.197C5.79536 16.3359 3.94212 16.336 2.8031 15.197C2.25131 14.6452 1.9475 13.9116 1.9475 13.1313C1.9475 12.3512 2.25131 11.6177 2.8029 11.0659C2.80297 11.0658 2.80303 11.0657 2.8031 11.0657L5.55718 8.31153C5.9374 7.93125 5.9374 7.31467 5.55712 6.93445C5.1769 6.55424 4.56032 6.55424 4.18004 6.93445L1.42596 9.6886C1.42576 9.6888 1.42557 9.68906 1.42537 9.68925C0.506219 10.6087 0 11.8312 0 13.1313C0 14.4318 0.506414 15.6544 1.42602 16.574C2.37523 17.5232 3.62196 17.9978 4.86874 17.9978C6.11553 17.9978 7.36232 17.5232 8.3114 16.574C8.31146 16.574 8.31146 16.5739 8.31146 16.5739L11.0655 13.8198C11.4458 13.4395 11.4458 12.823 11.0655 12.4427C10.6853 12.0625 10.0688 12.0625 9.68847 12.4427Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M18 4.86885C18 3.56838 17.4935 2.34574 16.5739 1.42613C14.6756 -0.472155 11.5868 -0.47209 9.68854 1.42613C9.68847 1.42626 9.68834 1.42633 9.68828 1.42646L6.93426 4.18041C6.55398 4.56063 6.55398 5.17727 6.93426 5.55749C7.12446 5.7477 7.37361 5.84273 7.62283 5.84273C7.87198 5.84273 8.12126 5.74763 8.31133 5.55749L11.0654 2.80353C11.0654 2.8034 11.0655 2.80334 11.0657 2.80321C12.2046 1.66431 14.0578 1.66425 15.1968 2.80321C15.7486 3.355 16.0525 4.08862 16.0525 4.86885C16.0525 5.64902 15.7487 6.38251 15.197 6.93431L15.1968 6.9345L12.4428 9.68865C12.0625 10.0689 12.0625 10.6854 12.4428 11.0657C12.633 11.2559 12.8822 11.351 13.1313 11.351C13.3805 11.351 13.6298 11.2559 13.8199 11.0657L16.574 8.31158C16.5742 8.31138 16.5744 8.31112 16.5746 8.31093C17.4937 7.39145 18 6.169 18 4.86885Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M5.55732 12.4426C5.74746 12.6328 5.99668 12.7279 6.24583 12.7279C6.49504 12.7279 6.74426 12.6328 6.9344 12.4426L12.4427 6.93433C12.823 6.55412 12.823 5.93754 12.4427 5.55726C12.0625 5.17704 11.4459 5.17704 11.0656 5.55726L5.55732 11.0655C5.17704 11.4458 5.17704 12.0624 5.55732 12.4426Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1342_3946">
                                      <rect
                                        width="18"
                                        height="18"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              )}
                            </div>
                            <div className={iconBlock}>
                              {item.icon === "link" ? (
                                <a
                                  href={item.content}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`${textcontent} hover:text-[#299B8A] transition-colors break-all line-clamp-2`}
                                >
                                  {item.content}
                                </a>
                              ) : (
                                <div className={textcontent}>
                                  {item.content}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="flex items-center gap-3 m-auto w-fit mt-[30px] has-[button:disabled]:hidden lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              onClick={() => {
                if (isRTL) {
                  setCurrentIndex((i) =>
                    i === currentData.length - 1 ? 0 : i + 1
                  );
                } else {
                  setCurrentIndex((i) =>
                    i === 0 ? currentData.length - 1 : i - 1
                  );
                }
              }}
              disabled={currentData.length <= 1}
              className="p-3 bg-[#defaf670] border border-[#0B436A] rounded-full w-[35px] 3xl:w-[44px] h-[35px] 3xl:h-[44px]
                                    flex items-center justify-center transition-all cursor-pointer hover:bg-[#299A8B] group [&>svg]:fill-[#299A8B]"
              variants={buttonVariants}
              whileHover="hover"
            >
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.245461 6.76397C-0.0818138 6.4367 -0.0818138 5.90608 0.245461 5.5788L5.57871 0.245555C5.90598 -0.0817194 6.4366 -0.0817194 6.76388 0.245555C7.09115 0.57283 7.09115 1.10345 6.76388 1.43072L2.02321 6.17139L6.76388 10.9121C7.09115 11.2393 7.09115 11.7699 6.76388 12.0972C6.4366 12.4245 5.90598 12.4245 5.57871 12.0972L0.245461 6.76397ZM13.6497 6.17139V7.00943H0.838044V6.17139V5.33335H13.6497V6.17139Z"
                  fill="#299A8B"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={() => {
                if (isRTL) {
                  setCurrentIndex((i) =>
                    i === 0 ? currentData.length - 1 : i - 1
                  );
                } else {
                  setCurrentIndex((i) =>
                    i === currentData.length - 1 ? 0 : i + 1
                  );
                }
              }}
              disabled={currentData.length <= 1}
              className="p-3 bg-[#defaf670] border border-[#0B436A] rounded-full w-[35px] 3xl:w-[44px] h-[35px] 3xl:h-[44px]
                                     flex items-center justify-center transition-all cursor-pointer hover:bg-[#299A8B] group [&>svg]:fill-[#299A8B]"
              variants={buttonVariants}
              whileHover="hover"
            >
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4042 6.76397C13.7315 6.4367 13.7315 5.90608 13.4042 5.5788L8.07099 0.245555C7.74372 -0.0817194 7.2131 -0.0817194 6.88583 0.245555C6.55855 0.57283 6.55855 1.10345 6.88583 1.43072L11.6265 6.17139L6.88583 10.9121C6.55855 11.2393 6.55855 11.7699 6.88583 12.0972C7.2131 12.4245 7.74372 12.4245 8.07099 12.0972L13.4042 6.76397ZM0 6.17139V7.00943H12.8117V6.17139V5.33335H0V6.17139Z"
                  fill="#299A8B"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
