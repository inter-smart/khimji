"use client";
import dynamic from "next/dynamic";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
const QuestionSection = dynamic(
  () => import("@/components/features/ICV-initiative/QuestionSection"),
  { ssr: false }
);

export default function QuestionSectionClient({ intiatives_cms }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <QuestionSection
        title={intiatives_cms?.section2_title}
        description={intiatives_cms?.section2_description}
        form_title={intiatives_cms?.section2_form_title}
      />
    </GoogleReCaptchaProvider>
  );
}
