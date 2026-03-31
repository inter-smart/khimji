import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword") || "";

    if (!keyword.trim()) {
      return NextResponse.json({
        status: true,
        data: { results: [] },
      });
    }

    // Get headers from request for language and location context
    const lang = request.headers.get("Accept-Language") || "en";
    const locationSlug = request.headers.get("Location-Slug") || "oman";
    const businessSlug = request.headers.get("Business-Slug") || "b2b";

    const response = await fetch(
      `${API_BASE_URL}/api/search?keyword=${encodeURIComponent(keyword)}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
          "Location-Slug": locationSlug,
          "Business-Slug": businessSlug,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          status: false,
          error: "Failed to fetch search results",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      {
        status: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
