export default function PrivacySection({ data }) {
    return (
        <section className="w-full h-auto py-[30px] sm:py-[50px_70px] lg:py-[65px_80px] 2xl:py-[110px_120px] 3xl:py-[135px_100px] max-sm:mt-[150px] block relative z-0">
            <div className="w-[120px] sm:w-[180px] 2xl:w-[225px] 3xl:w-[280px] h-auto aspect-square bg-[#2FDDC3] rounded-full blur-[50px] sm:blur-[80px] 2xl:blur-[120px] absolute -z-1 inset-[0_auto_auto_-2%]"></div>
            <div className="container">
                <div className="text-[18px] sm:text-[24px] lg:text-[34px] 2xl:text-[40px] 3xl:text-[100px] leading-[1.2] font-normal text-[#0B436A] mb-[10px]">
                    {data?.title?.split(" ").map((item, index) => (
                        <span
                            key={index}
                            className={index === 0 ? "text-[#0B436A]" : "text-[#299B8A]"}
                        >
                            {item}{" "}
                        </span>
                    ))}
                </div>
                <div
                    className="typography sm:[&_img]:float-left [&_img]:w-full sm:[&_img]:w-[240px] lg:[&_img]:w-[320px] 2xl:[&_img]:w-[385px] 3xl:[&_img]:w-[485px] sm:[&_img]:m-[0_30px_20px_0] lg:[&_img]:m-[0_40px_30px_0] 2xl:[&_img]:m-[0_50px_30px_0] 3xl:[&_img]:m-[0_70px_40px_0] [&_p]:text-[14px] 2xl:[&_p]:text-[16px] 3xl:[&_p]:text-[20px] [&_p]:leading-[1.5] [&_p]:font-normal [&_p]:text-black [&_ul]:mb-[30px] [&_ul]:!p-0 [&_li]:text-[14px] 2xl:[&_li]:text-[16px] 3xl:[&_li]:text-[20px] [&_h2]:text-[18px] lg:[&_h2]:text-[20px] 2xl:[&_h2]:text-[24px] 3xl:[&_h2]:text-[30px] [&_h2]:text-[#0B436A] [&_li]:text-black [&_h2]:mb-[10px] [&_li]:flex  [&_li]:gap-[20px]  [&_li]:relative [&_li]:z-0 [&_li]:list-none [&_li::before]:content-[''] [&_li::before]:w-[7px] 2xl:[&_li::before]:w-[10px] [&_li::before]:h-[7px] 2xl:[&_li::before]:h-[10px] [&_li::before]:bg-linear-to-r [&_li::before]:from-[#0B436A] [&_li::before]:to-[#299B8A] [&_li::before]:rounded-full [&_li::before]:relative [&_li::before]:block [&_li::before]:p-[2px] [&_li::before]:z-1 [&_li::before]:inset-[7px_auto_auto_0] 3xl:[&_li::before]:inset-[10px_auto_auto_0] [&_p]:mb-[20px] lg:[&_p]:mb-[30px] 3xl:[&_p]:mb-[50px]"
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                />
            </div>
        </section>
    );
}
