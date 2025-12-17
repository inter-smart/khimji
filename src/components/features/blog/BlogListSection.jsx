import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import BlogCard from "@/components/common/BlogCard";

const pagination = {
    paginationList: {
        pages: [1, 2, 3],
        active: 1,
    },
}

export default function BlogListSection({ data }) {
    return (
        <section className="w-full h-auto py-[40px] sm:py-[50px] lg:py-[60px_70px] 2xl:py-[70px_90px] 3xl:py-[90px_115px] overflow-hidden block relative z-0">
            <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] absolute -z-1 inset-[0_auto_auto_-2%]"></div>
            <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[180px] opacity-40 absolute -z-1 inset-[5%_0_auto_auto]"></div>
            <div className="w-[170px] sm:w-[220px] 2xl:w-[285px] 3xl:w-[370px] h-auto aspect-square bg-[#1A9BF5] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] opacity-40 absolute -z-1 inset-[15%_auto_auto_-10%]"></div>
            <div className="container">
                <div className="w-full h-auto mb-[40px] sm:mb-[60px] lg:mb-[80px] 2xl:mb-[110px] 3xl:mb-[140px]">
                    <div className='w-full mx-[-5px] sm:mx-[-7px] 2xl:mx-[-10px] flex flex-wrap'>
                        {data?.blogList?.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-[5px] sm:p-[7px] 2xl:p-[10px]">
                                <BlogCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
                <CustomPagination data={pagination} />
            </div>
        </section>
    )
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