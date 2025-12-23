"use client";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"

export default function ArchiveListingSection({ data }) {
    const archive_list = [
        ...new Map(
            data?.archiveList?.map(item => [
                item.category,
                { value: item.category, label: item.title }
            ]) || []
        ).values()
    ];
    return (
        <section className="w-full h-auto py-[40px] sm:py-[60px] lg:py-[90px] 2xl:py-[110px] 3xl:py-[140px] overflow-hidden block relative z-0">
            <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] pointer-events-none absolute -z-1 inset-[0_auto_auto_-2%]"></div>
            <div className="w-[75px] 3xl:w-[110px] h-auto aspect-square bg-[#2FDDC3] mx-auto rounded-full blur-[50px] sm:blur-[60px] 2xl:blur-[80px] pointer-events-none absolute -z-1 inset-[8%_0_auto_0]"></div>
            <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[150px] opacity-40 pointer-events-none absolute -z-1 inset-[27%_-5%_auto_auto]"></div>
            <div className="container">
                <div className="w-full h-auto mb-[30px] sm:mb-[50px] lg:mb-[80px] 2xl:mb-[110px] 3xl:mb-[140px]">
                    <Tabs defaultValue={archive_list[0]?.value}>
                        <TabsList className="w-full h-auto bg-transparent gap-[5px] 2xl:gap-[10px] mb-[25px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] flex flex-wrap sm:justify-start">
                            {archive_list.map(item => (
                                <TabsTrigger
                                    key={item.value}
                                    value={item.value}
                                    className="text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal uppercase text-white w-auto h-auto flex-0 p-[10px_20px] 2xl:p-[15px_25px] 3xl:p-[15px_30px] border-[#2E8B8B] rounded-none data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0B436A] data-[state=active]:to-[#299B8A] data-[state=active]:text-white data-[state=inactive]:text-[#000000] cursor-pointer" >
                                    {item?.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {archive_list.map(item => (
                            <TabsContent key={item.value} value={item.value}>
                                <div className="w-full h-auto lg:mx-[-20px] 2xl:mx-[-25px] 3xl:mx-[-30px] flex flex-wrap">
                                    {data?.archiveList
                                        .filter(card => card.category === item.value)
                                        .map(item => (
                                            <div
                                                key={item.id}
                                                className="w-full xl:w-1/2 p-[5px_0] sm:p-[10px_0] lg:p-[15px_20px] 2xl:p-[15px_25px] 3xl:p-[20px_30px]">
                                                <ArchiveCard key={item.id} item={item} />
                                            </div>
                                        ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
                <div>
                    <CustomPagination data={data} />
                </div>
            </div>
        </section>
    );
}

function ArchiveCard({ item }) {
    return (
        <div className="group [--image-size:100%] sm:[--image-size:210px] 2xl:[--image-size:310px] 3xl:[--image-size:385px] w-full h-full p-[10px_10px_15px_10px] sm:p-[15px_15px_20px_15px] 2xl:p-[20px_20px_30px_20px] rounded-[5px] 2xl:rounded-[8px] border border-white backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[inset_5px_1px_33px_#f1f1f1,inset_3px_-3px_5px_#fafafa] flex flex-wrap">
            <div className="w-[var(--image-size)] h-[210px] sm:h-auto aspect-[385/360] max-sm:mb-[20px] rounded-[5px] 2xl:rounded-[8px] overflow-hidden block">
                <Image
                    src={item?.media?.path || "/images/placeholder.png"}
                    alt={item?.media?.alt || "Archive"}
                    width={385}
                    height={360}
                    className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-500" />
            </div>
            <div className="w-[var(--image-size)] sm:w-[calc(100%-var(--image-size))] pl-[15px] sm:pl-[20px] lg:pl-[25px] 2xl:pl-[30px] 3xl:pl-[40px]">
                <div className="text-[15px] sm:text-[16px] 2xl:text-[18px] 3xl:text-[22px] leading-[1.2] font-normal text-black mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]">
                    {item?.title}
                </div>
                <div className="[--icon-size:30px] 2xl:[--icon-size:35px] 3xl:[--icon-size:40px] [--text-size:13px] sm:[--text-size:14px] 2xl:[--text-size:16px] 3xl:[--text-size:20px] w-full h-auto [&>*]:mb-[10px] sm:[&>*]:mb-[15px] 2xl:[&>*]:mb-[25px] 3xl:[&>*]:mb-[35px] [&>*]:last:mb-0 block">
                    <div className="w-full h-auto flex items-center">
                        <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
                            <Image
                                src="/images/archive_date_icon.svg"
                                alt="Date"
                                width={15}
                                height={15}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px]">
                            {item?.date}
                        </div>
                    </div>
                    <div className="w-full h-auto flex items-center">
                        <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
                            <Image
                                src="/images/archive_location_icon.svg"
                                alt="Location"
                                width={15}
                                height={15}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px]">
                            {item?.location}
                        </div>
                    </div>
                    <div className="w-full h-auto flex items-center">
                        <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
                            <Image
                                src="/images/archive_award_icon.svg"
                                alt="Awards"
                                width={15}
                                height={15}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px]">
                            {item?.year}
                        </div>
                    </div>
                    <Link
                        href={item?.button?.link || "#"}
                        target={item?.button?.target ? "_self" : "_blank"}
                        className="w-full h-auto flex items-center"
                    >
                        <div className="w-[var(--icon-size)] h-auto aspect-square p-[8px] 2xl:p-[10px] bg-gradient-to-t from-[#0C456B]/20 to-[#299A8B]/20 rounded-full overflow-hidden block">
                            <Image
                                src="/images/archive_link_icon.svg"
                                alt="Link"
                                width={15}
                                height={15}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-[length:var(--text-size)] leading-[1] font-normal text-black w-[calc(100%-var(--icon-size))] pl-[10px] hover:text-[#299A8B] transition-colors duration-300">
                            {item?.button?.label}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function CustomPagination({ data }) {
    return (
        <Pagination>
            <PaginationContent
                className="[--width:25px] 2xl:[--width:30px] 3xl:[--width:35px]"
            >
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        aria-label="Previous"
                        className="w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent hover:opacity-50 transition-opacity duration-300"
                    >
                        <Image
                            src="/images/previous_pagination.svg"
                            alt="previous pagination"
                            width={35}
                            height={35}
                            className="w-full h-full object-contain"
                        />
                    </PaginationLink>
                </PaginationItem>
                {data?.paginationList.pages.map((item, index) => (
                    <PaginationItem
                        key={index}
                        className="mx-[5px] 2xl:mx-[10px]"
                    >
                        <PaginationLink
                            href="#"
                            className={`text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-[1] font-normal tracking-[1px] px-[5px] sm:px-[10px] 2xl:px-[15px] transition-all duration-300 relative z-0 ${item === data?.paginationList.active ? "font-semibold bg-gradient-to-r from-[#0B436A] to-[#299B8A] bg-clip-text text-transparent before:content-[''] before:w-full before:h-[1px] before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:absolute before:z-1 before:left-0 before:bottom-0 hover:text-[#2C8F87]" : "text-[#919193] hover:text-[#2C8F87]"}`}>
                            {String(item).padStart(2, "0")}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        aria-label="Next"
                        className="w-[var(--width)] h-auto aspect-square p-0 flex items-center justify-center hover:bg-transparent hover:opacity-50 transition-opacity duration-300"
                    >
                        <Image
                            src="/images/next_pagination.svg"
                            alt="next pagination"
                            width={35}
                            height={35}
                            className="w-full h-full object-contain"
                        />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}