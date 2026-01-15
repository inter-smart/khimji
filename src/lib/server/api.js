import { parseOtherMeta } from "../helper";
import { API_BASE_URL, DEFAULT_COUNTRY } from "./constants";
import { getRequestContext } from "./getCookieData";

export class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function getData(endpoint, lang = "en", country = null, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const requestData = await getRequestContext();
  const { business_type } = requestData;

  if (!country) {
    country = requestData.country;
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Location-Slug": country || DEFAULT_COUNTRY,
      "Accept-Language": lang,
      "Business-Slug": business_type,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      return {
        data: null,
        error: true,
      };
    }

    const data = await response.json();

    const otherMeta = data?.data?.meta_tags?.other_meta_tags;
    let structuredData = null;

    if (otherMeta) {
      const { scripts = [] } = parseOtherMeta(otherMeta) || {};
      structuredData = scripts.length ? scripts : null;
    }

    return {
      error: data?.status === false,
      data: data?.status ? data.data : null,
      structuredData,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
    };
  }
}
