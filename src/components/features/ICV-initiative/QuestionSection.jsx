"use client";

import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/layout/Heading";
import { renderHtml } from "@/lib/helper";
import { Loader2 } from "lucide-react";
import { createQuestionFormSchema } from "@/lib/validations/schemas";
import { toast } from "sonner";
import { multipartPostToAPI, postToAPI } from "@/lib/server/clientApi";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function QuestionSection({ title, description, form_title }) {
  const t = useTranslations("icv");
  const tVal = useTranslations("validation");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const schema = useMemo(() => createQuestionFormSchema(tVal), [tVal]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
      privacyConsent: false,
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    formData.append("message", data.message);

    try {
      const recaptchaToken = await executeRecaptcha("question");
      if (recaptchaToken) {
        formData.append("captcha_key", recaptchaToken);
      }

      const response = await multipartPostToAPI("contact-enquiry", formData);

      if (!response.status) {
        toast.error(response.message || t("submitError"));
        return;
      }

      if (response.status) {
        toast.success(t("submitSuccess"), {
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
          privacyConsent: false,
        });
      }
    } catch (error) {
      toast.error(t("submitError"));
    }
  }

  const inputStyle =
    "w-full h-[35px] 2xl:h-[45px] 3xl:h-[55px] rounded-none border-0 border-b-1 border-black/10 shadow-none p-[8px_0] text-[14px] 2xl:text-[16px] 3xl:text-[20px] placeholder:text-[14px] 2xl:placeholder:text-[16px] 3xl:placeholder:text-[20px] placeholder:text-black ring-0 focus-visible:border-black focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 bg-transparent";
  const formItemStyle = "mb-[15px] sm:mb-[20px] 2xl:mb-[25px] 3xl:mb-[35px]";

  const privacyConsent = form.watch("privacyConsent");
  const isSubmitting = form.formState.isSubmitting;

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
                      name="name"
                      render={({ field }) => (
                        <FormItem className={formItemStyle}>
                          <FormControl>
                            <Input placeholder={t("fullName")} {...field} className={inputStyle} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage className="text-[12px] mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem className={formItemStyle}>
                          <FormControl>
                            <Input placeholder={t("phoneNumber")} {...field} className={inputStyle} disabled={isSubmitting} />
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
                          <Input placeholder={t("email")} type="email" {...field} className={inputStyle} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage className="text-[12px] mt-1" />
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
                            placeholder={t("yourQuestion")}
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
                            {t("iAgreeTo")}
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href="/privacy-policy"
                              className="text-[#299B8A] underline"
                            >
                              {t("privacyPolicy")}
                            </Link>
                            {t("consentText")}
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
                          {t("submitting")}
                        </>
                      ) : (
                        t("submit")
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
