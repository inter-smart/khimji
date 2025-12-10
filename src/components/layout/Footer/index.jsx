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
                            autoplay={{ delay: 0, disableOnInteraction: false }}
                            speed={2500}
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
                                <div className="text-[11px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] text-white font-medium mb-[15px] 2xl:mb-[20px] 3xl:mb-[30px] uppercase">Follow Us</div>
                                <div className="flex items-center -m-[10px] xl:-m-[14px] 2xl:-m-[17px] 3xl:-m-[22px]">
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                            <div className="w-[15px] 2xl:w-[20px] 3xl:w-[30px] h-[15px] 2xl:h-[20px] 3xl:h-[25px] flex items-center justify-center">
                                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.9054 6.21137H18.0581V2.38328H14.146C13.8197 2.37005 9.84154 2.29599 8.81046 6.12584C8.79552 6.16596 8.46601 7.0768 8.46601 9.20445L4.88889 9.21503V13.23L8.47053 13.2199V23.8101H13.9415V13.2292H17.5625V9.20357H13.9415V7.93694C13.9415 7.14955 14.2823 6.21137 15.9054 6.21137ZM16.6572 10.0849V12.347H13.0362V22.9279H9.37579V12.3355L5.79414 12.3457V10.0941L9.38529 10.084L9.37579 9.63562C9.32872 7.38188 9.65868 6.43401 9.67362 6.3886C10.5635 3.09 13.9614 3.25577 14.1071 3.26458L17.1528 3.26547V5.33007H15.9054C13.7903 5.33007 13.0366 6.67649 13.0366 7.9365V10.0849H16.6572Z" fill="white" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                            <div className="w-[15px] 2xl:w-[20px] 3xl:w-[30px] h-[15px] 2xl:h-[20px] 3xl:h-[25px] flex items-center justify-center">
                                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.77727 0C2.02296 0 1.3372 0.274311 0.822894 0.78862C0.274311 1.3372 0 2.02292 0 2.74295C0 3.49726 0.308585 4.18302 0.822894 4.69733C1.3372 5.21164 2.05724 5.52022 2.74299 5.48595C2.74299 5.48595 2.77727 5.48595 2.81158 5.48595C3.49734 5.48595 4.14879 5.21164 4.66309 4.69733C5.1774 4.18302 5.48599 3.49726 5.48599 2.74295C5.52026 2.02292 5.21168 1.33716 4.69737 0.822854C4.18306 0.274271 3.4973 0 2.77727 0ZM4.18306 4.21733C3.80589 4.59451 3.29158 4.8345 2.74299 4.80023C2.22869 4.80023 1.6801 4.59451 1.30293 4.21733C0.891482 3.84016 0.685759 3.29158 0.685759 2.74299C0.685759 2.19441 0.891482 1.6801 1.30293 1.26866C1.6801 0.891482 2.19441 0.685759 2.77727 0.685759C3.29158 0.685759 3.80589 0.891482 4.18306 1.26866C4.59451 1.6801 4.80023 2.19441 4.80023 2.74299C4.80023 3.29158 4.59451 3.84016 4.18306 4.21733Z" fill="white" />
                                                    <path d="M4.11445 6.1709H1.33718C0.788596 6.1709 0.342834 6.61662 0.342834 7.19952V19.2001C0.342834 19.7487 0.822869 20.2287 1.37145 20.2287H4.11445C4.66303 20.2287 5.14306 19.7487 5.14306 19.2343V7.19952C5.14306 6.65089 4.66303 6.1709 4.11445 6.1709ZM4.45731 19.2343C4.45731 19.4058 4.28586 19.5429 4.11445 19.5429H1.37145C1.2 19.5429 1.02859 19.3715 1.02859 19.2001V7.19952C1.02859 7.02807 1.16573 6.85666 1.33718 6.85666H4.11445C4.2859 6.85666 4.45731 7.02811 4.45731 7.19952V19.2343Z" fill="white" />
                                                    <path d="M15.7721 5.82888H15.0521C13.7149 5.82888 12.4462 6.41178 11.6234 7.33753V6.8575C11.6234 6.51464 11.2805 6.17174 10.9376 6.17174H7.50888C7.20029 6.17174 6.82312 6.44605 6.82312 6.82318V19.6123C6.82312 19.9895 7.20029 20.2295 7.50888 20.2295H11.2805C11.5891 20.2295 11.9662 19.9895 11.9662 19.6123V12.2063C11.9662 11.0748 12.7891 10.1833 13.852 10.1833C14.4006 10.1833 14.9149 10.389 15.2921 10.7662C15.635 11.0748 15.7721 11.5548 15.7721 12.172V19.5438C15.7721 19.8866 16.115 20.2295 16.4579 20.2295H19.8866C20.2295 20.2295 20.5724 19.8867 20.5724 19.5438V10.6977C20.5723 7.9547 18.4808 5.82888 15.7721 5.82888ZM19.8866 19.5095L19.8523 19.5438H16.4921L16.4579 12.172C16.4579 11.3491 16.2521 10.732 15.8064 10.2863C15.2921 9.77194 14.6063 9.49763 13.8863 9.49763C12.4462 9.53191 11.3148 10.6977 11.3148 12.2063V19.5438H7.54315V6.8575H10.9376L10.9719 6.89177V9.05187L11.8976 8.12611L11.9319 8.09184C12.6177 7.13181 13.8177 6.51464 15.0863 6.51464H15.8064C18.1036 6.51464 19.8866 8.36615 19.8866 10.6977V19.5095Z" fill="white" />
                                                </svg>

                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                            <div className="w-[15px] 2xl:w-[20px] 3xl:w-[30px] h-[15px] 2xl:h-[20px] 3xl:h-[25px] flex items-center justify-center">
                                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.95996 0.0743256H16.0586C19.3042 0.0743256 21.9451 2.71446 21.9453 5.96007V16.0587C21.9453 19.3043 19.3042 21.9454 16.0586 21.9454H5.95996C2.71435 21.9452 0.0742188 19.3042 0.0742188 16.0587V5.96007C0.0744187 2.71459 2.71448 0.0745255 5.95996 0.0743256ZM5.95996 1.2169C3.34464 1.2171 1.217 3.34475 1.2168 5.96007V16.0587C1.2168 18.674 3.34452 20.8017 5.95996 20.8019H16.0586C18.6742 20.8019 20.8018 18.6741 20.8018 16.0587V5.96007C20.8016 3.34463 18.6739 1.2169 16.0586 1.2169H5.95996Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                    <path d="M11.0093 5.06331C14.2883 5.06331 16.9565 7.73062 16.9566 11.0096C16.9566 14.2886 14.2884 16.9569 11.0093 16.9569C7.73036 16.9568 5.06305 14.2886 5.06305 11.0096C5.06312 7.73067 7.73041 5.06338 11.0093 5.06331ZM11.0093 6.20589C8.36074 6.20596 6.2057 8.361 6.20563 11.0096C6.20563 13.6584 8.3607 15.8132 11.0093 15.8133C13.6582 15.8133 15.813 13.6585 15.813 11.0096C15.813 8.36096 13.6582 6.20589 11.0093 6.20589Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                    <path d="M17.1743 2.92533C18.1145 2.92548 18.8794 3.69025 18.8794 4.63041C18.8792 5.57046 18.1144 6.33534 17.1743 6.33549C16.2342 6.33549 15.4694 5.57056 15.4692 4.63041C15.4692 3.69031 16.2341 2.92533 17.1743 2.92533ZM17.1743 4.06791C16.8644 4.06791 16.6118 4.3203 16.6118 4.63041C16.612 4.94021 16.8645 5.19193 17.1743 5.19193C17.4842 5.19179 17.7357 4.94014 17.7358 4.63041C17.7358 4.32037 17.4843 4.06806 17.1743 4.06791Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-[10px] xl:p-[14px] 2xl:p-[17px] 3xl:p-[22px]">
                                        <Link href="#" className={SOCIAL_ICON_CLASS}>
                                            <div className="w-[15px] 2xl:w-[20px] 3xl:w-[30px] h-[15px] 2xl:h-[20px] 3xl:h-[25px] flex items-center justify-center">
                                                <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.9668 0.074585H24.0381C27.2871 0.0746317 29.9307 2.72644 29.9307 5.98572V16.059C29.9307 19.3182 27.2871 21.97 24.0381 21.9701H5.9668C2.71772 21.9701 0.0742188 19.3189 0.0742188 16.059V5.98572C0.0742188 2.72641 2.71772 0.074585 5.9668 0.074585ZM5.9668 1.15076C3.31103 1.15076 1.15039 3.3207 1.15039 5.98572V16.0599C1.15058 18.7248 3.31114 20.8939 5.9668 20.8939H24.0381C26.6937 20.8939 28.8533 18.7254 28.8535 16.0599V5.98572C28.8535 3.32073 26.6938 1.1508 24.0381 1.15076H5.9668Z" fill="white" stroke="#313232" stroke-width="0.147775" />
                                                    <path d="M11.3668 5.89282C11.534 5.79719 11.7401 5.79906 11.9059 5.89575L20.3903 10.8645V10.8655C20.5553 10.9618 20.6569 11.139 20.6569 11.3303C20.6568 11.4976 20.5788 11.6541 20.4489 11.7551L20.3903 11.7952L11.9059 16.7629C11.8219 16.8118 11.7284 16.8362 11.6344 16.8362C11.5417 16.8362 11.4487 16.8132 11.3658 16.7659C11.1991 16.67 11.0963 16.4908 11.0963 16.2981V6.3606C11.0963 6.16724 11.1994 5.98865 11.3668 5.89282ZM12.1725 15.3586L12.2838 15.2932L18.944 11.3938L19.0524 11.3293L18.944 11.2659L12.2838 7.3645L12.1725 7.29907V15.3586Z" fill="white" stroke="#313232" stroke-width="0.147775" />
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