import { getRequestContext } from "./getCookieData";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/` || "http://localhost:3001";

export class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function getData(endpoint, lang, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const { country, business_type } = await getRequestContext();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Location-Slug": country,
      "Accept-Language": lang,
      "Business-Type": business_type,
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

    return {
      error: !data?.status,
      data: data?.status ? data?.data : null,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
    };
  }
}
