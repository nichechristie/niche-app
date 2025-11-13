import { NextRequest, NextResponse } from "next/server";

// Mock database (replace with actual database in production)
let posts: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");
    const address = searchParams.get("address");

    let filteredPosts = [...posts];

    if (filter === "following" && address) {
      // TODO: Filter by users that address is following
      // For now, return all posts
      filteredPosts = posts;
    }

    return NextResponse.json({
      success: true,
      posts: filteredPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
