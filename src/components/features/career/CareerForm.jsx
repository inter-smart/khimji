import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function CareerForm() {
    const form = useForm({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            message: "",
            privacyConsent: false,
        },
    });

    function onSubmit(values) {
        console.log("Form submitted:", values);
        alert("Application submitted successfully!");
        form.reset();
    }

    const inputStyle = "w-full h-[30px] 2xl:h-[40px] 3xl:h-[50px] rounded-none border-0 border-b-1 border-black/10 shadow-none p-[4_0] text-[14px] 2xl:text-[16px] 3xl:text-[20px] placeholder:text-[14px] 2xl:placeholder:text-[16px] 3xl:placeholder:text-[20px] placeholder:text-black ring-0 focus-visible:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200";
    const formItemStyle = "mb-[20px] sm:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] gap-0";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[10px] 2xl:gap-x-[20px]">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem className={formItemStyle}>
                                <FormControl>
                                    <Input
                                        placeholder="Full Name*" {...field}
                                        className={inputStyle} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className={formItemStyle}>
                                <FormControl>
                                    <Input
                                        placeholder="Phone Number*" {...field}
                                        className={inputStyle} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className={formItemStyle}>
                            <FormControl>
                                <Input
                                    placeholder="Email*" type="email" {...field}
                                    className={inputStyle}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className={formItemStyle}>
                            <FormControl>
                                <Textarea
                                    placeholder="Your Message*"
                                    className={`${inputStyle} min-h-[75px] 3xl:min-h-[100px]`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full h-auto p-[15px] sm:p-[20px] 3xl:p-[30px] mb-[20px] sm:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] bg-[#faf8f8] border-1 border-dashed border-black/20 text-center relative z-0">
                    <span className="w-[20px] sm:w-[25px] 2xl:w-[30px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] lg:mb-[10px] flex items-center justify-center">
                        <Image
                            src="/images/resume_upload.svg"
                            alt="Upload Icon"
                            width={50}
                            height={50}
                            className="w-full h-full object-contain"
                        />
                    </span>
                    <div className="text-center">
                        <div className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal text-black mb-[5px] sm:mb-[10px]">Upload Resume</div>
                        <div className="text-[12px] 2xl:text-[13px] 3xl:text-[15px] leading-[1.2] font-normal text-black/50">Max file size 1 MB , JPG / PDF Format </div>
                    </div>
                    <Input
                        id="resume"
                        type="file"
                        accept=".jpg,.jpeg,.pdf"
                        className="w-full h-full absolute z-1 inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                        <FormItem className="gap-[10px] sm:gap-[15px] 2xl:gap-[20px] 3xl:gap-[25px] mb-[20px] sm:mb-[30px] 3xl:mb-[40px] flex items-center">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="w-[20px] 2xl:w-[25px] h-[20px] 2xl:h-[25px] border-black rounded-[5px] cursor-pointer"
                                />
                            </FormControl>
                            <div className="leading-none">
                                <FormLabel className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal text-black/60 cursor-pointer">
                                    I agree to the Privacy Policy and consent to the processing of my information.
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <div className="w-full h-auto flex justify-end">
                    <Button type="submit" size="lg" className="text-[13px] sm:text-[14px] 2xl:text-[16px] 3xl:text-[18px] leading-[1.2] font-normal text-black h-auto p-[7px_25px] sm:p-[10px_25px] 2xl:p-[10px_30px] 3xl:p-[10px_30px] bg-transparent rounded-[5px] border-1 border-black hover:bg-black hover:text-white transition-all duration-300">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
