import { cookies } from "next/headers";

export async function getRequestContext() {
  const cookieStore = await cookies();

  return {
    country: cookieStore?.get("country")?.value || "united-arab-emirates",
    business_type: cookieStore?.get("business_type")?.value || null,
  };
}