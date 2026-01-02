import { NextResponse } from "next/server";

const DUMMY_CATEGORIES = [
  { id: 1, title: "Corporate" },
  { id: 2, title: "Finance" },
  { id: 3, title: "Technology" },
  { id: 4, title: "Sustainability" },
  { id: 5, title: "Innovation" },
  { id: 6, title: "Heritage" },
];

export async function GET(request) {
  try {
    // Simulate API delay (optional - remove in production)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return response in the expected format
    return NextResponse.json({
      data: {
        archive_categories: DUMMY_CATEGORIES,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch archives",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
