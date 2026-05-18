"use client";

import BottomLine from "./BottomLine";
import Links from "./Links";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { usePolicySlug } from "@/context/PolicySlugContext";
import Brands from "./Brands";
import FooterMobile from "./FooterMobile";
import SocialLinks from "./SocialLinks";

const otherLinks = [
  {
    label: "Faq",
    label_ar: "الأسئلة الشائعة",
    link: "faq",
  },
  {
    label: "Heritage",
    label_ar: "التاريخ",
    link: "heritage",
  },
  {
    label: "Ventures",
    label_ar: "الاستثمارات",
    link: "venture",
  },
  {
    label: "ICV Initiatives",
    label_ar: "استثمارات ICV",
    link: "icv-initiatives",
  },
  {
    label: "Career",
    label_ar: "الوظائف",
    link: "career",
  },
  {
    label: "Contact",
    label_ar: "اتصل بنا",
    link: "contact",
  },
  {
    label: "Newsrooms",
    label_ar: "غرف الأخبار",
    link: "news",
  },
  {
    label: "Blogs",
    label_ar: "المدونة",
    link: "blog",
  },
];
export default function FooterClient({ siteSettingPromise, lang }) {
  siteSettingPromise;
  const { brands, site_settings, social_links, locations, policies } = siteSettingPromise?.data || {};

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { setPrivacyPolicySlug } = usePolicySlug();
  const [prevPolicies, setPrevPolicies] = useState(policies);

  useEffect(() => {
    if (prevPolicies && policies && prevPolicies !== policies) {
      // Policies changed, likely due to country change refresh
      const currentSlug = params?.slug;
      if (currentSlug) {
        const oldPolicy = prevPolicies.find((p) => p.slug === currentSlug);
        if (oldPolicy) {
          // Find corresponding policy in new list
          const newPolicy =
            policies.find((p) => p.id === oldPolicy.id) ||
            policies.find((p) => p.title === oldPolicy.title);

          if (newPolicy && newPolicy.slug !== currentSlug) {
            router.push(`/${lang}/${newPolicy.slug}`);
          }
        }
      }
    }
    setPrevPolicies(policies);

    // Update global privacy policy slug
    const privacyPolicy = policies?.find(
      (p) =>
        p.slug.includes("privacy-policy") ||
        (p.title && p.title.toLowerCase().includes("privacy policy"))
    );
    if (privacyPolicy) {
      setPrivacyPolicySlug(privacyPolicy.slug);
    }
  }, [policies, params?.slug, lang, router, prevPolicies, setPrivacyPolicySlug]);
  const [loading, setLoading] = useState(false);

  function changeCountry(slug) {
    setLoading(true);
    document.cookie = `country=${slug}; path=/`;
    // Dispatch custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("countryChanged", { detail: { country: slug } })
    );
    router.refresh();
  }

  return (
    <>
           <section className="w-full hidden sm:block relative bg-gradient-to-r from-[#0B436A] to-[#299B8A] py-[30px] overflow-hidden min-h-[520px] lg:min-h-[580px]">
        <div className="container">
          <div className="min-h-[145px] xl:min-h-[170px] 3xl:min-h-[175px]">
            <Brands brands={brands} lang={lang} />
          </div>
          <div className="flex flex-wrap pb-[80px]">
            <Links
              locations={locations}
              lang={lang}
              site_settings={site_settings}
              changeCountry={changeCountry}
              policies={policies}
              otherLinks={otherLinks}
            />
            <SocialLinks social_links={social_links} site_settings={site_settings} lang={lang} />
          </div>
          <BottomLine lang={lang} />
        </div>
      </section>
      <FooterMobile data={siteSettingPromise?.data} changeCountry={changeCountry} lang={lang} otherLinks={otherLinks} />
    </>
  );
}
