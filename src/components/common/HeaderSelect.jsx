 import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function HeaderSelect() {
    return (
        <div className="flex items-center ">
            <div className="px-[7px] sm:px-[3px]">
                <Select>
                    <SelectTrigger
                        className="
                          relative
                          text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-white sm:text-black font-medium max-w-full min-h-[30px] 2xl:min-h-[35px] 3xl:min-h-[45px] px3 sm:px-2 
                          border border-white sm:border-black min-w-[115px] lg:min-w-[125px] rounded-[40px] sm:rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none
                          data-[state=open]:border-[#00095b]
                          data-[placeholder]:sm:text-black
                           data-[placeholder]:text-white  [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px] after:bg-[url('/images/arrow.svg')] after:max-sm:invert-100 after:max-sm:brightness-100 after:bg-no-repeat after:bg-center
                        "
                    >
                        <SelectValue placeholder="Business" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Location Select */}
            <div className="px-[7px] sm:px-[3px]">
                <Select>
                    <SelectTrigger
                         className="
                          relative
                          text-[12px] 2xl:text-[14px] 3xl:text-[18px] text-white sm:text-black font-medium max-w-full min-h-[30px] 2xl:min-h-[35px] 3xl:min-h-[45px] px3 sm:px-2 
                          border border-white sm:border-black min-w-[115px] lg:min-w-[125px] rounded-[40px] sm:rounded-[5px]
                          outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none
                          data-[state=open]:border-[#00095b]
                          data-[placeholder]:sm:text-black
                           data-[placeholder]:text-white  [&>svg]:hidden
                          after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2  after:w-[12px] after:h-[12px] after:bg-[url('/images/arrow.svg')] after:max-sm:invert-100 after:max-sm:brightness-100 after:bg-no-repeat after:bg-center
                        "
                        >
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="it">India</SelectItem>
                        <SelectItem value="finance">Usa</SelectItem>
                        <SelectItem value="marketing">Saudi</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
