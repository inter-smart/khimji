"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { careerFormSchema } from "@/lib/validations/schemas";
import { toast } from "sonner";
import { multipartPostToAPI } from "@/lib/server/clientApi";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function CareerForm({ careerId, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
      resume: undefined,
      privacyConsent: false,
    },
  });

  const handleFormSubmit = async (data) => {
    if (!careerId) {
      toast.error("Career ID missing!");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha("careers");

      const formData = new FormData();
      formData.append("career_id", careerId);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append("message", data.message);
      if (recaptchaToken) {
        formData.append("captcha_key", recaptchaToken);
      }

      if (data.resume && data.resume[0]) {
        formData.append("resume", data.resume[0]);
      }

      const response = await multipartPostToAPI("career-enquiry", formData);

      if (!response.status) {
        setFormError(response.message || "Failed to submit application");
        return;
      }

      if (response.status) {
        toast.success("Application submitted successfully!", {
          style: {
            background: "#10b981",
            color: "white",
          },
        });
        form.reset({
          name: "",
          email: "",
          phone_number: "",
          message: "",
          resume: undefined,
          privacyConsent: false,
        });

        // Close the modal after successful submission
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      setFormError("An error occurred while submitting your application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full h-[30px] 2xl:h-[40px] 3xl:h-[50px] rounded-none border-0 border-b-1 border-black/10 shadow-none p-[4_0] text-[14px] 2xl:text-[16px] 3xl:text-[20px] placeholder:text-[14px] 2xl:placeholder:text-[16px] 3xl:placeholder:text-[20px] placeholder:text-black ring-0 focus-visible:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200";
  const formItemStyle = "mb-[20px] sm:mb-[25px] 2xl:mb-[30px] 3xl:mb-[40px] gap-0";

  const privacyConsent = form.watch("privacyConsent");

  return (
    <Form {...form}>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[10px] 2xl:gap-x-[20px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={formItemStyle}>
                <FormControl>
                  <Input placeholder="Full Name*" {...field} className={inputStyle} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className={formItemStyle}>
                <FormControl>
                  <Input placeholder="Phone Number*" {...field} className={inputStyle} disabled={isSubmitting} />
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
                <Input placeholder="Email*" type="email" {...field} className={inputStyle} disabled={isSubmitting} />
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
                <Textarea placeholder="Your Message*" className={`${inputStyle} min-h-[75px] 3xl:min-h-[100px]`} {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className={formItemStyle}>
              <FormControl>
                <div className="w-full h-auto p-[15px] sm:p-[20px] 3xl:p-[30px] bg-[#faf8f8] border-1 border-dashed border-black/20 text-center relative z-0">
                  <span className="w-[20px] sm:w-[25px] 2xl:w-[30px] 3xl:w-[40px] h-auto aspect-square mx-auto mb-[5px] lg:mb-[10px] flex items-center justify-center">
                    <Image src="/images/resume_upload.svg" alt="Upload Icon" width={50} height={50} className="w-full h-full object-contain" />
                  </span>
                  <div className="text-center">
                    <div className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal text-black mb-[5px] sm:mb-[10px]">
                      {value && value[0] ? value[0].name : "Upload Resume"}
                    </div>
                    {!value && (
                      <div className="text-[12px] 2xl:text-[13px] 3xl:text-[15px] leading-[1.2] font-normal text-black/50">
                        Max file size 5 MB, PDF / DOC / DOCX Format
                      </div>
                    )}
                  </div>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full h-full absolute z-1 inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => onChange(e.target.files)}
                    disabled={isSubmitting}
                    {...fieldProps}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacyConsent"
          render={({ field }) => (
            <FormItem className="gap-[10px] sm:gap-[15px] 2xl:gap-[20px] 3xl:gap-[25px] mb-[20px] sm:mb-[30px] 3xl:mb-[40px] flex items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="w-[20px] 2xl:w-[25px] h-[20px] 2xl:h-[25px] border-black rounded-[5px] cursor-pointer mt-[2px]"
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="flex-1 leading-none space-y-1">
                <FormLabel className="text-[14px] 2xl:text-[16px] 3xl:text-[20px] leading-[1.2] font-normal text-black/60 cursor-pointer">
                  I agree to the Privacy Policy and consent to the processing of my information.*
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {formError && (
          <div className="mb-[15px] sm:mb-[20px] p-[10px_15px] sm:p-[12px_20px] bg-red-50 border border-red-200 rounded-[5px] text-red-600 text-[13px] sm:text-[14px] 2xl:text-[15px] 3xl:text-[17px] leading-[1.4]">
            {formError}
          </div>
        )}
        <div className="w-full h-auto flex justify-end">
          <Button
            type="button"
            size="lg"
            disabled={!privacyConsent || isSubmitting}
            onClick={form.handleSubmit(handleFormSubmit)}
            className="text-[13px] sm:text-[14px] 2xl:text-[16px] 3xl:text-[18px] leading-[1.2] font-normal text-black h-auto p-[7px_25px] sm:p-[10px_25px] 2xl:p-[10px_30px] 3xl:p-[10px_30px] bg-transparent rounded-[5px] border-1 border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
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
  );
}
