import { parseOtherMeta } from "../helper";
import { API_BASE_URL, defaultMeta, DefaultOgImage, DEFAULT_COUNTRY } from "./constants";
import { getRequestContext } from "./getCookieData";

export async function getMetaData(pageKey, lang = "en", pagename = "") {
  const fallback = {
    en: {
      title: "Khimji Ramdas",
      description:
        "Khimji Ramdas is one of the largest business and tendering groups in Oman, contributing to infrastructure, construction, transport, and sustainable development.",
      keywords: "Khimji Ramdas, Oman business group, infrastructure Oman, construction company Oman, transport solutions, tenders Oman",
    },
    ar: {
      title: "خنجي رمضان",
      description:
        "تُعد خنجي رمضان من أكبر مجموعات الأعمال والمناقصات في سلطنة عمان، وتسهم في تطوير البنية التحتية وقطاعات البناء والنقل والتنمية المستدامة.",
      keywords: "خنجي رمضان، مجموعة أعمال عمانية، البنية التحتية، البناء في عمان، حلول النقل، المناقصات",
    },
  };

  const pageMeta = defaultMeta?.[pageKey]?.[lang] || defaultMeta?.[pageKey]?.en || fallback[lang];

  const metaTitle = pageMeta.title;
  const metaDescription = pageMeta.description;
  const metaKeywords = pageMeta.keywords;

  const { country } = await getRequestContext();

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang || "en",
    "Location-Slug": country || DEFAULT_COUNTRY,
  };

  try {
    const response = await fetch(`${API_BASE_URL}meta-tags?page=${pageKey}`, {
      method: "GET",
      headers,
    });

    const result = await response.json();

    const meta = result.data;

    if (result.status) {
      const { other } = parseOtherMeta(meta?.other_meta_tags || "");
      return {
        title: meta?.meta_title || metaTitle,
        description: meta?.meta_description || metaDescription,
        keywords: meta?.meta_keywords || metaKeywords,
        // Enhanced SEO fields
        openGraph: {
          title: meta?.og_title || meta?.meta_title || metaTitle,
          description: meta?.og_description || meta?.meta_description || metaDescription,
          images: meta?.og_image ? [{ url: meta.og_image, width: 1200, height: 630 }] : [{ url: DefaultOgImage, width: 1200, height: 630 }],
          type: "website",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
        },
        other: {
          ...other,
        },

        error: null,
      };
    }

    // fallback if API fails but status != success
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, lang, pagename);
  } catch (error) {
    // catch network or API errors
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, lang, pagename);
  }
}

function buildFallbackMetadata(title, description, keywords, lang, pagename) {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
    },
    other: {},
    links: [],
    structuredData: null,
    error: "No metadata found",
  };
}
