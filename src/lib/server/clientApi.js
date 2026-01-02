const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/` || "http://localhost:3001";

export async function multipartPostToAPI(endpoint, formData) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("❌ multipartPostToAPI error:", error);
    throw error;
  }
}
