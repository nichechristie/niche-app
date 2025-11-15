import { NextRequest, NextResponse } from "next/server";

// In a real app, this would connect to a database
// For now, we'll use in-memory storage (resets on server restart)
const userProgress = new Map<string, any>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "demo-user";

    const progress = userProgress.get(userId) || {
      userId,
      completedLessons: [],
      totalRewardsEarned: "0",
      currentStreak: 0,
      lastStudyDate: null,
    };

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Error fetching Jesus progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "demo-user", lessonId } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const currentProgress = userProgress.get(userId) || {
      userId,
      completedLessons: [],
      totalRewardsEarned: "0",
      currentStreak: 0,
      lastStudyDate: null,
    };

    // Add lesson if not already completed
    if (!currentProgress.completedLessons.includes(lessonId)) {
      currentProgress.completedLessons.push(lessonId);
      currentProgress.lastStudyDate = new Date().toISOString();

      // Update streak
      const lastDate = currentProgress.lastStudyDate
        ? new Date(currentProgress.lastStudyDate)
        : null;
      const today = new Date();

      if (lastDate) {
        const diffDays = Math.floor(
          (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          currentProgress.currentStreak += 1;
        } else if (diffDays > 1) {
          currentProgress.currentStreak = 1;
        }
      } else {
        currentProgress.currentStreak = 1;
      }

      userProgress.set(userId, currentProgress);
    }

    return NextResponse.json({
      success: true,
      progress: currentProgress,
    });
  } catch (error) {
    console.error("Error updating Jesus progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
