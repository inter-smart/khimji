const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/lib/countries";


export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Common API request utility
 * @param {string} endpoint - API endpoint (e.g., "get-businesses", "home")
 * @param {object} options - Fetch options
 * @param {string} options.method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} options.body - Request body for POST/PUT requests
 * @param {object} options.headers - Additional headers
 * @param {string} options.language - Accept-Language header (default: "en")
 * @returns {Promise<object>} - Response data with error handling
 */
export async function fetchFromAPI(endpoint, options = {}) {
  const {
    method = "GET",
    body = null,
    headers = {},
    language,
    ...otherOptions
  } = options;

  // Construct URL
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  const url = `${base}/api/${path}`;

  // Setup headers
  const myHeaders = new Headers();
  myHeaders.append("Accept-Language", language);
  myHeaders.append("Business-Slug", "b2b"),
  myHeaders.append("Location-Slug", "united-arab-emirates"),
  myHeaders.append("Content-Type", "application/json");
  
  // Add custom headers
  Object.entries(headers).forEach(([key, value]) => {
    myHeaders.append(key, value);
  });

  // Setup request options
  const requestOptions = {
    method,
    headers: myHeaders,
    redirect: "follow",
    ...otherOptions,
  };

  // Add body for POST/PUT/PATCH requests
  if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    console.log(`Fetching: ${url}`);
    
    const response = await fetch(url, requestOptions);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.text();
      throw new APIError(
        `API Error: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Parse JSON response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return {
        success: true,
        data: data?.data || data,
        status: response.status,
        error: null,
      };
    }

    // Handle non-JSON responses
    const text = await response.text();
    return {
      success: true,
      data: text,
      status: response.status,
      error: null,
    };

  } catch (error) {
    console.error(`API Error [${url}]:`, error);
    
    return {
      success: false,
      data: null,
      status: error.status || 500,
      error: {
        message: error.message,
        details: error.data,
      },
    };
  }
}

/**
 * GET request
 */
export async function getAPI(endpoint, options = {}) {
  return fetchFromAPI(endpoint, { ...options, method: "GET" });
}

/**
 * POST request
 */
export async function postAPI(endpoint, body, options = {}) {
  return fetchFromAPI(endpoint, { ...options, method: "POST", body });
}

/**
 * PUT request
 */
export async function putAPI(endpoint, body, options = {}) {
  return fetchFromAPI(endpoint, { ...options, method: "PUT", body });
}

/**
 * DELETE request
 */
export async function deleteAPI(endpoint, options = {}) {
  return fetchFromAPI(endpoint, { ...options, method: "DELETE" });
}

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: GET request with default language
// const { success, data, error } = await getAPI("get-businesses");

// Example 2: GET request with custom language
// const result = await getAPI("get-businesses", { language: "ar" });

// Example 3: POST request
// const result = await postAPI("create-business", {
//   name: "My Business",
//   email: "test@example.com"
// });

// Example 4: Custom headers
// const result = await getAPI("protected-route", {
//   headers: {
//     "Authorization": "Bearer token123"
//   }
// });

// Example 5: Using in React Server Component
// export default async function Page() {
//   const { success, data, error } = await getAPI("get-businesses");
//   
//   if (!success) {
//     return <div>Error: {error.message}</div>;
//   }
//   
//   return <div>{JSON.stringify(data)}</div>;
// }

// export async function fetchDropdownDataAPI(endpoint, options = {}) {
//   const url = `${API_BASE_URL}${endpoint}`;

//   const defaultOptions = {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     cache: "no-cache",
//     ...options,
//   };

//   try {
//     const response = await fetch(url, defaultOptions);

//     if (!response.ok) {
//       throw new APIError("Failed to fetch data from API", response.status);
//     }
//     const data = await response.json();

//     return {
//       data: data?.status ? data?.data : null,
//     };
//   } catch (error) {
//     throw new APIError(error.message, error.status || 500);
//   }
// }

// export async function postToAPI(endpoint, data) {
//   const url = `${API_BASE_URL}${endpoint}`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new APIError("Failed to post data to API", response.status);
//     }

//     const responseData = await response.json();

//     return {
//       data: responseData?.status ? responseData?.data : null,
//     };
//   } catch (error) {
//     throw new APIError(error.message, error.status || 500);
//   }
// }

// export async function multipartPostToAPI(endpoint, formData) {
//   const url = `${API_BASE_URL}${endpoint}`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       // ❌ DO NOT manually set Content-Type
//       // The browser automatically adds the multipart boundary.
//       body: formData,
//     });

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("❌ multipartPostToAPI error:", error);
//     throw error;
//   }
// }

// export async function getMetaData(pageKey, pagename = "") {
//   // fallback meta from defaultMeta
//   const fallback = defaultMeta[pageKey] || {
//     title: "Skyline Hospitals",
//     description: "Be part of a hospital dedicated to excellence, compassion, and innovation.",
//     keywords:
//       "Skyline Hospitals, best hospital, healthcare services, medical care, advanced treatments, multispeciality hospital, patient care, doctors, surgeons, emergency care, health checkup, medical innovation, hospital in UAE, world-class healthcare",
//   };

//   const metaTitle = fallback.title;
//   const metaDescription = fallback.description;
//   const metaKeywords = fallback.keywords;

//   try {
//     const response = await fetch(
//       `${API_BASE_URL}meta-tags?page=${pageKey}`,
//       { cache: "no-store" } // optional: prevents stale data in Next.js
//     );

//     const result = await response.json();

//     const meta = result.data;

//     if (result.status) {
//       return {
//         title: meta?.meta_title || metaTitle,
//         description: meta?.meta_description || metaDescription,
//         keywords: meta?.meta_keywords || metaKeywords,
//         // Enhanced SEO fields
//         openGraph: {
//           title: meta?.og_title || meta?.meta_title || metaTitle,
//           description: meta?.og_description || meta?.meta_description || metaDescription,
//           images: meta?.og_image ? [{ url: meta.og_image, width: 1200, height: 630 }] : [{ url: DefaultOgImage, width: 1200, height: 630 }],
//           type: "website",
//           url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pagename}`,
//         },
//         twitter: {
//           card: "summary_large_image",
//           title: meta?.twitter_title || meta?.meta_title || metaTitle,
//           description: meta?.twitter_description || meta?.meta_description || metaDescription,
//           images: meta?.twitter_image ? [meta.twitter_image] : [],
//         },
//         alternates: {
//           canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${pagename}`,
//         },
//         error: null,
//       };
//     }

//     // fallback if API fails but status != success
//     return {
//       title: metaTitle,
//       description: metaDescription,
//       keywords: metaKeywords,
//       openGraph: {
//         title: metaTitle,
//         description: metaDescription,
//         type: "website",
//         url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pagename}`,
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: metaTitle,
//         description: metaDescription,
//       },
//       alternates: {
//         canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${pagename}`,
//       },
//       error: result.message || "No metadata found",
//     };
//   } catch (error) {
//     // catch network or API errors
//     return {
//       title: metaTitle,
//       description: metaDescription,
//       keywords: metaKeywords,
//       openGraph: {
//         title: metaTitle,
//         description: metaDescription,
//         type: "website",
//         url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pagename}`,
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: metaTitle,
//         description: metaDescription,
//       },
//       alternates: {
//         canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${pagename}`,
//       },
//       error: "No metadata found",
//     };
//   }
// }
