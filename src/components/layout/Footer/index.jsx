"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";

const brands = [
    "/images/brand-1.png",
    "/images/brand-2.png",
    "/images/brand-3.png",
    "/images/brand-4.png",
    "/images/brand-5.png",
    "/images/brand-6.png",
    "/images/brand-7.png",
    "/images/brand-8.png",
    "/images/brand-9.png",
];

// Common class names as constants
const FOOTER_LINK_CLASS = "text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium mb-[4px] xl:mb-[7px] 3xl:mb-[10px] inline-block transition-all duration-300 hover:text-white/80 hover:translate-x-1";
const CONTACT_BUTTON_CLASS = "text-[12px] 2xl:text-[16px] 3xl:text-[18px] text-white capitalize font-medium flex items-center group transition-all duration-300 hover:text-white/90";
const ARROW_ICON_CLASS = "w-[14px] h-[14px] flex items-center mt-[5px] mx-[15px] transition-transform duration-300 group-hover:translate-x-1";
const SOCIAL_ICON_CLASS = "transition-all duration-300 hover:text-white/70 hover:scale-125";

export default function Footer() {
    return (
        <section className="w-full relative bg-gradient-to-r from-[#0B436A] to-[#299B8A] py-[30px] overflow-hidden">

            <div className="container">

                {/* BRAND SLIDER */}
                <div className="flex flex-wrap pb-[30px] border-b border-white/20 mb-[65px]">

                    {/* BRANDS BOX */}
                    <div className="w-[100px] xl:w-[115px] 2xl:w-[150px] 3xl:w-[185px]">
                        <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium w-full h-[40px] xl:h-[50px] 2xl:h-[65px] 3xl:h-[80px] flex items-center justify-center rounded-[10px] border border-white">
                            BRANDS
                        </div>
                    </div>

                    {/* SLIDER */}
                    <div className="w-[calc(100%-100px)] xl:w-[calc(100%-115px)] 2xl:w-[calc(100%-150px)] 3xl:w-[calc(100%-185px)] pl-[60px]">
                        <Swiper
                            modules={[Autoplay]}
                            // autoplay={{ delay: 0, disableOnInteraction: false }}
                            // speed={2500}
                            loop={true}
                            slidesPerView={2}
                            spaceBetween={40}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                768: { slidesPerView: 5 },
                                1024: { slidesPerView: 7 },
                                1280: { slidesPerView: 9 },
                            }}
                            className="w-full h-[40px] xl:h-[75px] 3xl:h-[80px]"
                        >
                            {brands.map((logo, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image
                                            src={logo}
                                            alt="Brand Logo"
                                            width={140}
                                            height={65}
                                            className="w-auto object-contain max-w-[65px] 2xl:max-w-[70px] min-w-[65px] 2xl:min-w-[70px]"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>

                {/* FOOTER CONTENT */}
                <div className="flex flex-wrap pb-[80px]">

                    {/* LEFT BIG TEXT */}
                    <div className="w-5/12">
                        <div className="text-[35px] lg:text-[40px] xl:text-[50px] 2xl:text-[65px] 3xl:text-[80px] leading-[1.4] text-white font-light uppercase">
                            Innovative <br />
                            Solutions, <br />
                            Trusted <br />
                            Partnerships
                        </div>
                    </div>

                    {/* CENTER LINKS */}
                    <div className="w-4/12">
                        <div className="flex flex-wrap -m-[15px]">

                            {/* COUNTRIES */}
                            <div className="w-1/2 p-[15px]">
                                <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium uppercase mb-[15px]">
                                    Countries
                                </div>

                                <ul>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>India</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>UAE</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Oman</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Saudi Arabia</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Qatar</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Bahrain</Link></li>
                                </ul>
                            </div>

                            {/* OTHER LINKS */}
                            <div className="w-1/2 p-[15px]">
                                <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium uppercase mb-[15px]">
                                    Other Links
                                </div>

                                <ul>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Privacy Policy</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Terms Of Use</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Sitemap</Link></li>
                                    <li><Link href="#" className={FOOTER_LINK_CLASS}>Responsible Disclosure</Link></li>
                                </ul>
                            </div>
                            <div className="w-full p-[15px]">
                                <p className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] font-medium text-white mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px]">From inquiries to detailed support, we're always ready to help you find the right solution for your needs.</p>

                                <Link href="#!" className={CONTACT_BUTTON_CLASS}>
                                    contact us
                                    <div className={ARROW_ICON_CLASS}>
                                        <svg className="w-full h-full object-cover" viewBox="0 0 14 15" >
                                            <g clipPath="url(#clip0_1055_230)">
                                                <path d="M7.23334 12.7448C7.14887 12.7465 7.0637 12.7245 6.98857 12.6748C6.7718 12.5318 6.70577 12.2213 6.8362 11.9893C6.84717 11.9688 8.2096 9.53275 10.8103 7.99975H0.700004C0.442637 7.99975 0.233337 7.7755 0.233337 7.49975C0.233337 7.224 0.442637 6.99975 0.700004 6.99975H10.8103C8.22407 5.4755 6.84624 3.02875 6.8327 3.00425C6.70507 2.77075 6.77577 2.46 6.99347 2.32175C7.2142 2.1815 7.50494 2.26275 7.63677 2.5005C7.84887 2.863 9.8378 6.11275 13.4052 7.012C13.6187 7.06825 13.7667 7.2685 13.7667 7.5C13.7667 7.7315 13.6197 7.93225 13.4092 7.987C9.8266 8.8895 7.84444 12.1435 7.63024 12.5118C7.54624 12.656 7.39084 12.7415 7.23334 12.7448Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1055_230">
                                                    <rect width="14" height="15" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COMPANY INFO */}
                    <div className="w-3/12">

                        {/* LOGO */}
                        <div className="flex flex-col items-end text-right max-w-[175px] xl:max-w-[200px] 2xl:max-w-[265px] 3xl:max-w-[320px] ml-auto">
                            <div className="max-w-[130px] xl:max-w-[165px] 2xl:max-w-[210px] 3xl:max-w-[250px] w-full mb-[25px] xl:mb-[30px] 2xl:mb-[35px] 3xl:mb-[50px]">
                                <Image
                                    src="/images/Logo-white.png"
                                    width={150}
                                    height={80}
                                    alt="KR Logo"
                                    className="w-full object-contain"
                                />
                            </div>

                            {/* TEXT */}
                            <p className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium">
                                For more than 150 years, Khimji Ramdas has been at the heart of Oman's journey of progress and prosperity. Founded on a legacy of trust and integrity.
                            </p>

                            {/* SOCIAL ICONS */}
                            <div className="mt-[25px] xl:mt-[30px] 2xl:mt-[35px] 3xl:mt-[50px]">
                                <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px]">Follow Us</div>
                                <div className="flex items-center -m-[10px] xl:-m-[14px] 2xl:-m-[17px] 3xl:-m-[22px]">
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                            <div className="w-[13px] 2xl:w-[17px] 3xl:w-[20px] h-[13px] 2xl:h-[17px] 3xl:h-[20px] flex items-center justify-center">
                                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.4264 11.0479C21.3894 8.13393 20.2448 5.38036 18.2036 3.2944C16.1247 1.16999 13.3806 0 10.4767 0C7.67352 0 5.05115 1.10227 3.09258 3.10368C1.35458 4.87975 0.288283 7.24853 0.0899355 9.77374C-0.0981753 12.1696 0.498661 14.5941 1.77312 16.6327L0.0327899 21.4399C-0.0402382 21.6417 0.0110504 21.8685 0.163386 22.0171C0.263483 22.1147 0.394606 22.1662 0.527788 22.1662C0.597228 22.1662 0.667301 22.1457 0.733733 22.1168L5.26628 20.1458C6.99658 21.2463 8.97509 21.8135 11.0067 21.8135H11.0069C13.8096 21.8135 16.4319 20.7244 18.3902 18.7232C20.3852 16.6845 21.4635 13.9671 21.4264 11.0479ZM17.6439 17.9738C15.8848 19.7714 13.5276 20.7614 11.0066 20.7613C9.08738 20.7613 7.2201 20.1872 5.60662 19.1011C5.51913 19.0422 5.41803 19.0123 5.31635 19.0123C5.24654 19.0123 5.17647 19.0264 5.11035 19.0551L1.4465 20.6431L2.85535 16.7515C2.91429 16.5886 2.89286 16.4067 2.79783 16.2627C0.20829 12.3424 0.646089 7.12888 3.8388 3.86629C5.59802 2.06854 7.95539 1.07843 10.4767 1.07843C13.0987 1.07843 15.5778 2.13622 17.4573 4.05696C19.3029 5.94293 20.3377 8.43066 20.3712 11.0619C20.4046 13.6878 19.436 16.1425 17.6439 17.9738Z" fill="white" />
                                                    <path d="M16.0866 13.2223C15.9534 13.1517 15.8024 13.0717 15.6205 12.9686C15.519 12.9109 15.3914 12.8319 15.2562 12.7483C14.562 12.3191 14.036 12.0154 13.5882 12.0154C13.4833 12.0154 13.3841 12.0321 13.2937 12.065C12.9014 12.2072 12.5793 12.5874 12.2678 12.955C12.1536 13.0896 11.9902 13.2824 11.891 13.3686C11.4977 13.3012 10.6681 12.8172 9.77289 11.9739C8.87663 11.1297 8.3626 10.3474 8.29204 9.97785C8.38341 9.88411 8.58969 9.72906 8.73355 9.62082C9.12231 9.32848 9.52432 9.0262 9.67622 8.65784C9.86999 8.18456 9.51486 7.61854 8.95082 6.80917C8.86207 6.68178 8.77821 6.56147 8.71737 6.4666C8.6075 6.29462 8.5226 6.15233 8.44767 6.02692C8.14014 5.51212 7.93696 5.17188 7.17347 5.17188C6.67794 5.17188 5.97734 5.61293 5.50278 6.05033C4.81311 6.68614 4.43323 7.42018 4.43323 8.11869C4.43454 10.0159 5.55863 12.1903 7.5173 14.0866C7.52067 14.0897 7.52403 14.0906 7.5275 14.0937C9.54071 15.9387 11.8505 16.9939 13.8646 16.9939H13.8654C14.6059 16.9939 15.3855 16.6402 16.0605 15.9909C16.5252 15.5439 16.9941 14.8888 16.9941 14.4224C16.9942 13.7033 16.6331 13.512 16.0866 13.2223ZM13.8648 16.0137C12.1492 16.0125 10.0564 15.0332 8.26551 13.3939C6.52494 11.7069 5.48523 9.73549 5.48413 8.11968C5.48413 7.14229 6.83068 6.21301 7.18282 6.16208C7.25475 6.16238 7.29248 6.16639 7.31045 6.16926C7.357 6.21974 7.44952 6.37464 7.53191 6.51257C7.60647 6.63739 7.69931 6.79279 7.81753 6.97783C7.88899 7.08934 7.9781 7.21717 8.07241 7.35248C8.2509 7.60864 8.60971 8.12354 8.67019 8.34333C8.56904 8.47819 8.25521 8.71416 8.07804 8.84739C7.62454 9.18843 7.23289 9.48289 7.23289 9.89906C7.234 10.9043 8.60866 12.2772 9.02994 12.674C9.45123 13.0708 10.9088 14.3656 11.9783 14.3666C12.4172 14.3653 12.7286 13.9979 13.0891 13.5725C13.2313 13.4048 13.4833 13.1074 13.6271 13.0127C13.8602 13.0692 14.4075 13.4076 14.6797 13.5759C14.8233 13.6647 14.959 13.7486 15.0781 13.8163C15.2739 13.9273 15.4388 14.0147 15.5714 14.085C15.7177 14.1626 15.8823 14.2498 15.9358 14.2936C15.9389 14.3105 15.9431 14.346 15.9435 14.4137C15.889 14.7451 14.9021 16.0125 13.8648 16.0137Z" fill="white" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                             <div className="w-[13px] 2xl:w-[17px] 3xl:w-[20px] h-[13px] 2xl:h-[17px] 3xl:h-[20px] flex items-center justify-center">
                                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.77727 0C2.02296 0 1.3372 0.274311 0.822894 0.78862C0.274311 1.3372 0 2.02292 0 2.74295C0 3.49726 0.308585 4.18302 0.822894 4.69733C1.3372 5.21164 2.05724 5.52022 2.74299 5.48595C2.74299 5.48595 2.77727 5.48595 2.81158 5.48595C3.49734 5.48595 4.14879 5.21164 4.66309 4.69733C5.1774 4.18302 5.48599 3.49726 5.48599 2.74295C5.52026 2.02292 5.21168 1.33716 4.69737 0.822854C4.18306 0.274271 3.4973 0 2.77727 0ZM4.18306 4.21733C3.80589 4.59451 3.29158 4.8345 2.74299 4.80023C2.22869 4.80023 1.6801 4.59451 1.30293 4.21733C0.891482 3.84016 0.685759 3.29158 0.685759 2.74299C0.685759 2.19441 0.891482 1.6801 1.30293 1.26866C1.6801 0.891482 2.19441 0.685759 2.77727 0.685759C3.29158 0.685759 3.80589 0.891482 4.18306 1.26866C4.59451 1.6801 4.80023 2.19441 4.80023 2.74299C4.80023 3.29158 4.59451 3.84016 4.18306 4.21733Z" fill="white" />
                                                    <path d="M4.11451 6.1709H1.33724C0.788657 6.1709 0.342896 6.61662 0.342896 7.19952V19.2001C0.342896 19.7487 0.822931 20.2287 1.37151 20.2287H4.11451C4.66309 20.2287 5.14313 19.7487 5.14313 19.2343V7.19952C5.14313 6.65089 4.66309 6.1709 4.11451 6.1709ZM4.45737 19.2343C4.45737 19.4058 4.28592 19.5429 4.11451 19.5429H1.37151C1.20006 19.5429 1.02865 19.3715 1.02865 19.2001V7.19952C1.02865 7.02807 1.16579 6.85666 1.33724 6.85666H4.11451C4.28596 6.85666 4.45737 7.02811 4.45737 7.19952V19.2343Z" fill="white" />
                                                    <path d="M15.7721 5.82861H15.0521C13.7149 5.82861 12.4462 6.41151 11.6234 7.33727V6.85723C11.6234 6.51437 11.2805 6.17147 10.9376 6.17147H7.50888C7.20029 6.17147 6.82312 6.44578 6.82312 6.82292V19.6121C6.82312 19.9892 7.20029 20.2292 7.50888 20.2292H11.2805C11.5891 20.2292 11.9662 19.9892 11.9662 19.6121V12.206C11.9662 11.0745 12.7891 10.183 13.852 10.183C14.4006 10.183 14.9149 10.3888 15.2921 10.7659C15.635 11.0745 15.7721 11.5546 15.7721 12.1717V19.5435C15.7721 19.8864 16.115 20.2293 16.4579 20.2293H19.8866C20.2295 20.2293 20.5724 19.8864 20.5724 19.5435V10.6974C20.5723 7.95444 18.4808 5.82861 15.7721 5.82861ZM19.8866 19.5092L19.8523 19.5435H16.4921L16.4579 12.1718C16.4579 11.3489 16.2521 10.7317 15.8064 10.286C15.2921 9.77168 14.6063 9.49736 13.8863 9.49736C12.4462 9.53164 11.3148 10.6974 11.3148 12.206V19.5435H7.54315V6.85723H10.9376L10.9719 6.89151V9.0516L11.8976 8.12585L11.9319 8.09157C12.6177 7.13154 13.8177 6.51437 15.0863 6.51437H15.8064C18.1036 6.51437 19.8866 8.36588 19.8866 10.6974V19.5092Z" fill="white" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                            <div className="w-[13px] 2xl:w-[17px] 3xl:w-[20px] h-[13px] 2xl:h-[17px] 3xl:h-[20px] flex items-center justify-center">
                                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.8727 8.76017L19.2994 0H17.5395L11.0909 7.60633L5.94046 0H0L7.78853 11.5021L0 20.6885H1.75999L8.56987 12.656L14.0092 20.6885H19.9496L11.8723 8.76017H11.8727ZM9.46219 11.6035L8.67305 10.4581L2.39414 1.34441H5.09738L10.1645 8.69945L10.9537 9.8448L17.5404 19.4052H14.8371L9.46219 11.6039V11.6035Z" fill="white" />
                                                </svg>

                                            </div>
                                        </Link>
                                    </div>
                                     <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                              <div className="w-[13px] 2xl:w-[17px] 3xl:w-[20px] h-[13px] 2xl:h-[17px] 3xl:h-[20px] flex items-center justify-center">
                                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.95996 0.0742188H16.0586C19.3042 0.0742188 21.9451 2.71436 21.9453 5.95996V16.0586C21.9453 19.3042 19.3042 21.9453 16.0586 21.9453H5.95996C2.71435 21.9451 0.0742188 19.3041 0.0742188 16.0586V5.95996C0.0744187 2.71448 2.71448 0.0744187 5.95996 0.0742188ZM5.95996 1.2168C3.34464 1.217 1.217 3.34464 1.2168 5.95996V16.0586C1.2168 18.6739 3.34452 20.8016 5.95996 20.8018H16.0586C18.6742 20.8018 20.8018 18.674 20.8018 16.0586V5.95996C20.8016 3.34452 18.6739 1.2168 16.0586 1.2168H5.95996Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                    <path d="M11.0094 5.06348C14.2884 5.06348 16.9566 7.73079 16.9567 11.0098C16.9567 14.2888 14.2884 16.957 11.0094 16.957C7.73042 16.957 5.06311 14.2888 5.06311 11.0098C5.06318 7.73083 7.73047 5.06355 11.0094 5.06348ZM11.0094 6.20605C8.3608 6.20613 6.20576 8.36117 6.20569 11.0098C6.20569 13.6586 8.36076 15.8134 11.0094 15.8135C13.6583 15.8135 15.8131 13.6586 15.8131 11.0098C15.813 8.36112 13.6582 6.20605 11.0094 6.20605Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                    <path d="M17.1743 2.92529C18.1145 2.92544 18.8794 3.69021 18.8794 4.63037C18.8792 5.57042 18.1144 6.3353 17.1743 6.33545C16.2342 6.33545 15.4694 5.57052 15.4692 4.63037C15.4692 3.69027 16.2341 2.92529 17.1743 2.92529ZM17.1743 4.06787C16.8644 4.06787 16.6118 4.32026 16.6118 4.63037C16.612 4.94018 16.8645 5.19189 17.1743 5.19189C17.4842 5.19175 17.7357 4.9401 17.7358 4.63037C17.7358 4.32033 17.4843 4.06802 17.1743 4.06787Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                     <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                              <div className="w-[13px] 2xl:w-[17px] 3xl:w-[20px] h-[13px] 2xl:h-[17px] 3xl:h-[20px] flex items-center justify-center">
                                                <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.9668 0.0742188H24.0381C27.2871 0.0742655 29.9307 2.72607 29.9307 5.98535V16.0586C29.9307 19.3179 27.2871 21.9697 24.0381 21.9697H5.9668C2.71772 21.9697 0.0742188 19.3185 0.0742188 16.0586V5.98535C0.0742188 2.72604 2.71772 0.0742188 5.9668 0.0742188ZM5.9668 1.15039C3.31103 1.15039 1.15039 3.32033 1.15039 5.98535V16.0596C1.15058 18.7244 3.31114 20.8936 5.9668 20.8936H24.0381C26.6937 20.8935 28.8533 18.725 28.8535 16.0596V5.98535C28.8535 3.32036 26.6938 1.15044 24.0381 1.15039H5.9668Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                    <path d="M11.3668 5.89258C11.534 5.79694 11.7401 5.79882 11.9059 5.89551L20.3903 10.8643V10.8652C20.5553 10.9615 20.6569 11.1388 20.6569 11.3301C20.6568 11.4973 20.5788 11.6538 20.4489 11.7549L20.3903 11.7949L11.9059 16.7627C11.8219 16.8116 11.7284 16.8359 11.6344 16.8359C11.5417 16.8359 11.4487 16.813 11.3658 16.7656C11.1991 16.6698 11.0963 16.4906 11.0963 16.2979V6.36035C11.0963 6.167 11.1994 5.9884 11.3668 5.89258ZM12.1725 15.3584L12.2838 15.293L18.944 11.3936L19.0524 11.3291L18.944 11.2656L12.2838 7.36426L12.1725 7.29883V15.3584Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>

                {/* BOTTOM LINE */}
                <div className="border-t border-white/20 py-5 flex items-center justify-between text-white/60 text-sm">

                    <span>Copyright © 2025 Khimji Ramdas. All Rights Reserved.</span>

                    <span className="flex items-center gap-2">
                        Designed & Developed By:
                        <Image
                            src="/images/intersmart.png"
                            width={110}
                            height={28}
                            alt="InterSmart"
                        />
                    </span>

                </div>

            </div>
        </section>
    );
}