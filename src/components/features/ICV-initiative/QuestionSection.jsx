"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/layout/Heading";
import { renderHtml } from "@/lib/helper";
import { Loader2 } from "lucide-react";

// Form validation schema
const questionFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  question: z.string().min(1, "Question is required"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export default function QuestionSection({ title, description, form_title }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      question: "",
      privacyConsent: false,
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      console.log("Form submitted:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Thank you for your question! We will get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle =
    "w-full h-[35px] 2xl:h-[45px] 3xl:h-[55px] rounded-none border-0 border-b-1 border-black/10 shadow-none p-[8px_0] text-[14px] 2xl:text-[16px] 3xl:text-[20px] placeholder:text-[14px] 2xl:placeholder:text-[16px] 3xl:placeholder:text-[20px] placeholder:text-black ring-0 focus-visible:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 bg-transparent";
  const formItemStyle = "mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]";

  const privacyConsent = form.watch("privacyConsent");

  return (
    <section className="w-full py-[40px] xl:py-[50px] 2xl:py-[60px] 3xl:py-[80px]">
      <div className="container overflow-hidden">
        <div className="flex flex-wrap -m-[15px] items-center">
          <div className="w-full lg:w-1/2 p-[15px]">
            <div className="md:max-w-[600px]">
              <Heading as="h2" size="heading1" className="!mb-[20px] 2xl:!mb-[30px] 3xl:!mb-[45px] font-light leading-[1.1]">
                {title}
              </Heading>
              {renderHtml(description, "[&_*]:text-[14px] [&_*]:2xl:text-[16px] [&_*]:3xl:text-[20px] [&_*]:leading-[1.6] [&_*]:text-black/70")}
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-[15px]">
            <div className="w-full p-[30px] sm:p-[40px] lg:p-[50px] 2xl:p-[60px] 3xl:p-[80px] rounded-[15px] bg-white/40 backdrop-blur-[20px] border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
              <Heading as="h3" size="heading5" className="!mb-[30px] 2xl:!mb-[40px] 3xl:!mb-[55px] font-normal">
                {form_title}
              </Heading>

              <Form {...form}>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[20px] 2xl:gap-x-[30px]">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className={formItemStyle}>
                          <FormControl>
                            <Input placeholder="Full Name*" {...field} className={inputStyle} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage className="text-[12px] mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className={formItemStyle}>
                          <FormControl>
                            <Input placeholder="Phone Number*" {...field} className={inputStyle} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage className="text-[12px] mt-1" />
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
                          <Input placeholder="Email*" type="email" {...field} className={inputStyle} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage className="text-[12px] mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem className={formItemStyle}>
                        <FormControl>
                          <Textarea
                            placeholder="Your Question*"
                            className={`${inputStyle} min-h-[80px] 2xl:min-h-[100px] 3xl:min-h-[120px] resize-none`}
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-[12px] mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-[30px] 2xl:mb-[40px] 3xl:mb-[50px]">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="w-[18px] h-[18px] 2xl:w-[22px] 2xl:h-[22px] border-black/40 rounded-[3px] data-[state=checked]:bg-black data-[state=checked]:border-black mt-[2px]"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <div className="flex-1 space-y-1 leading-none">
                          <FormLabel className="text-[13px] 2xl:text-[15px] 3xl:text-[18px] font-normal text-black cursor-pointer">
                            I agree to the Privacy Policy and consent to the processing of my information.*
                          </FormLabel>
                          <FormMessage className="text-[12px]" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="w-full flex justify-end">
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={!privacyConsent || isSubmitting}
                      className="min-w-[120px] 2xl:min-w-[150px] 3xl:min-w-[180px] h-[40px] 2xl:h-[50px] 3xl:h-[60px] text-[14px] 2xl:text-[16px] 3xl:text-[18px] font-medium text-black bg-white/60 hover:bg-gradient-to-r hover:from-[#0B436A] hover:to-[#299B8A] hover:text-white border border-black/20 hover:border-transparent rounded-[4px] shadow-sm hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-white/60 disabled:hover:text-black"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
