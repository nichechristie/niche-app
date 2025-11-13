import { NextRequest, NextResponse } from "next/server";
import { Testimony } from "@/types/testimony";

// Mock database (replace with actual database in production)
// This should be shared with create/route.ts in a real implementation
const testimonies: Testimony[] = [];

export async function GET(request: NextRequest) {
  try {
    // Sort by most recent first
    const sortedTestimonies = [...testimonies].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      testimonies: sortedTestimonies,
    });
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonies" },
      { status: 500 }
    );
  }
}
