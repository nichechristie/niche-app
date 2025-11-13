import { NextRequest, NextResponse } from "next/server";
import { Testimony } from "@/types/testimony";

// Mock database (replace with actual database in production)
const testimonies: Testimony[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testimonyId, address } = body;

    if (!testimonyId || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const testimony = testimonies.find(t => t.id === testimonyId);
    if (!testimony) {
      return NextResponse.json(
        { error: "Testimony not found" },
        { status: 404 }
      );
    }

    const likeIndex = testimony.likes.indexOf(address);

    if (likeIndex > -1) {
      // Unlike
      testimony.likes.splice(likeIndex, 1);
    } else {
      // Like
      testimony.likes.push(address);

      // TODO: Reward testimony author with 0.5 NICHE per like
      console.log(`${address} liked testimony by ${testimony.userId}`);
    }

    return NextResponse.json({
      success: true,
      likes: testimony.likes.length,
      liked: likeIndex === -1,
    });
  } catch (error) {
    console.error("Error liking testimony:", error);
    return NextResponse.json(
      { error: "Failed to like testimony" },
      { status: 500 }
    );
  }
}
