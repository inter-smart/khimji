import Link from "next/link";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";


export default function ContactDetail({ data }) {
    return (
        <div className="w-full h-auto block">
            <h2 className="text-[22px] sm:text-[28px] lg:text-[34px] 2xl:text-[40px] 3xl:text-[50px] leading-[1.3] font-normal text-[#0B436A] text-center mb-[15px] sm:mb-[20px] lg:mb-[25px] 2xl:mb-[30px] 3xl:mb-[35px]">{data?.contact_detail?.title}</h2>
            <Tabs
                defaultValue={data?.contact_detail?.contact_detail_tabs?.[0]?.key}
            >
                <TabsList className="w-auto h-auto gap-[5px] 2xl:gap-[10px] mx-auto mb-[20px] sm:mb-[30px] lg:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px] bg-transparent flex flex-wrap justify-center">
                    {data?.contact_detail?.contact_detail_tabs.map((item) => (
                        <TabsTrigger
                            key={item.key}
                            value={item.key}
                            className="text-[13px] sm:text-[14px] 2xl:text-[16px] 3xl:text-[18px] leading-[1] font-normal text-black uppercase w-auto h-auto p-[10px_15px] sm:p-[12px_20px] 2xl:p-[15px_25px] rounded-[0] !shadow-none border-transparent cursor-pointer flex relative z-0 data-[state=active]:text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:opacity-30 data-[state=active]:before:opacity-100 before:transition-all before:duration-300 after:content-[''] after:absolute after:inset-[1px] after:bg-white data-[state=active]:after:bg-transparent before:z-[-2] after:z-[-1] after:transition-all after:duration-300 hover:before:opacity-100"
                        >
                            {item?.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {data?.contact_detail?.contact_detail_tabs?.map((item) => (
                    <TabsContent key={item.key} value={item.key}>
                        <div className="w-full h-auto p-[20px] lg:p-[30px] 2xl:p-[40px] 3xl:p-[50px] bg-white rounded-[8px]">
                            {item?.contact_list?.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full h-auto py-[20px] sm:py-[25px] lg:py-[30px] 2xl:py-[35px] 3xl:py-[45px] border-b border-[#00416B]/20 last:border-b-0 first:pt-0 block"
                                >
                                    <div className="text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-[1.2] font-normal text-[#0B436A] mb-[15px] sm:mb-[20px] 3xl:mb-[25px]">
                                        {item?.title}
                                    </div>
                                    <div className="sm:mx-[-10px] lg:mx-[-15px] 2xl:mx-[-20px] 3xl:mx-[-25px] flex flex-wrap">
                                        {item?.items_list?.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 h-auto py-[5px] sm:p-[10px] lg:p-[10px_15px] 2xl:p-[15px_20px] 3xl:p-[15px_25px]"
                                            >
                                                <div className="w-full h-full p-[15px] sm:p-[20px] 2xl:p-[30px] rounded-[5px] overflow-hidden block relative z-0 data-[state=active]:text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0B436A] before:to-[#299B8A] before:rounded-[5px] before:opacity-60 after:content-[''] after:absolute after:inset-[1px] after:bg-white after:rounded-[5px] before:z-[-2] after:z-[-1] hover:before:opacity-100 before:transition-all before:duration-300">
                                                    <div className="text-[16px] lg:text-[18px] 2xl:text-[22px] 3xl:text-[28px] leading-[1.3] font-normal text-[#0B436A] mb-[10px] sm:mb-[15px] 2xl:mb-[25px]">
                                                        {item?.title}
                                                    </div>
                                                    {item?.address && (
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: item.address }}
                                                            suppressHydrationWarning
                                                            className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal text-black sm:mb-[15px] 2xl:mb-[20px]"
                                                        />
                                                    )}
                                                    <div className="[&>*]:text-[14px] 2xl:[&>*]:text-[16px] 3xl:[&>*]:text-[20px] [&>*]:leading-[1.4] [&>*]:font-normal gap-[7px] sm:gap-[10px] 3xl:gap-[15px] flex flex-col">
                                                        {item?.telephone_number && (
                                                            <span className="text-[#00416B]">Tel:
                                                                <Link
                                                                    href={`mailto:${item?.telephone_number}`}
                                                                    target="self"
                                                                    className="text-black pl-2 hover:text-[#2FDDC3] transition-colors duration-300"
                                                                >
                                                                    {item?.telephone_number}
                                                                </Link>
                                                            </span>
                                                        )}
                                                        {item?.fax_number && (
                                                            <span className="text-[#00416B]">Fax:
                                                                <Link
                                                                    href={`mailto:${item?.fax_number}`}
                                                                    target="self"
                                                                    className="text-black pl-2 hover:text-[#2FDDC3] transition-colors duration-300"
                                                                >
                                                                    {item?.fax_number}
                                                                </Link>
                                                            </span>
                                                        )}
                                                        {item?.email && (
                                                            <span className="text-[#00416B]">Email:
                                                                <Link
                                                                    href={`mailto:${item?.email}`}
                                                                    target="self"
                                                                    className="text-black pl-2 hover:text-[#2FDDC3] transition-colors duration-300"
                                                                >
                                                                    {item?.email}
                                                                </Link>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </TabsContent>
                ))}

            </Tabs>
        </div>
    )
}
