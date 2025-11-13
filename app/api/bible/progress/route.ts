import { NextRequest, NextResponse } from "next/server";

// Mock database (replace with actual database in production)
const userProgress: Map<string, {
  completedLessons: string[];
  totalRewardsEarned: string;
  currentStreak: number;
  lastStudyDate?: Date;
}> = new Map();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    // Get or create user progress
    let progress = userProgress.get(address.toLowerCase());

    if (!progress) {
      progress = {
        completedLessons: [],
        totalRewardsEarned: "0",
        currentStreak: 0,
      };
      userProgress.set(address.toLowerCase(), progress);
    }

    return NextResponse.json({
      success: true,
      ...progress,
    });
  } catch (error) {
    console.error("Error fetching Bible study progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
