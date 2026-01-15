import { cookies } from "next/headers";
import { DEFAULT_COUNTRY, DEFAULT_BUSINESS_TYPE } from "./constants";

export async function getRequestContext() {
  const cookieStore = await cookies();

  return {
    country: cookieStore?.get("country")?.value || DEFAULT_COUNTRY,
    business_type: cookieStore?.get("business_type")?.value || DEFAULT_BUSINESS_TYPE,
  };
}
