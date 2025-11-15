import { NextRequest, NextResponse } from "next/server";
import { kingsLessons } from "@/lib/kingsLessons";

// In a real app, this would connect to a database and blockchain
// For now, we'll use in-memory storage
const completedLessons = new Map<string, any>();
const userProgress = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "demo-user", lessonId, score, answers } = body;

    if (!lessonId || typeof score !== "number") {
      return NextResponse.json(
        { error: "Lesson ID and score are required" },
        { status: 400 }
      );
    }

    // Find the lesson
    const lesson = kingsLessons.find((l) => l.id === lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    // Check if already completed
    const completionKey = `${userId}-${lessonId}`;
    const existingCompletion = completedLessons.get(completionKey);

    if (existingCompletion?.rewardClaimed) {
      return NextResponse.json({
        success: false,
        message: "Reward already claimed for this lesson",
        alreadyClaimed: true,
      });
    }

    // Calculate if passed (need at least 70% correct)
    const totalQuestions = lesson.questions.length;
    const correctAnswers = score;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const passed = percentage >= 70;

    if (!passed) {
      return NextResponse.json({
        success: false,
        message: "You need at least 70% to earn the reward. Try again!",
        score,
        percentage,
        passed: false,
      });
    }

    // Record completion
    const completion = {
      userId,
      lessonId,
      completed: true,
      score,
      completedAt: new Date().toISOString(),
      rewardClaimed: true,
      rewardAmount: lesson.reward,
    };

    completedLessons.set(completionKey, completion);

    // Update user progress
    const currentProgress = userProgress.get(userId) || {
      userId,
      completedLessons: [],
      totalRewardsEarned: "0",
      currentStreak: 0,
    };

    if (!currentProgress.completedLessons.includes(lessonId)) {
      currentProgress.completedLessons.push(lessonId);
      currentProgress.totalRewardsEarned = (
        parseFloat(currentProgress.totalRewardsEarned) +
        parseFloat(lesson.reward)
      ).toString();
    }

    userProgress.set(userId, currentProgress);

    // In a real app, this would trigger a crypto transaction
    // to send NICHE tokens to the user's wallet
    console.log(`Awarding ${lesson.reward} NICHE tokens to user ${userId} for completing ${lessonId}`);

    return NextResponse.json({
      success: true,
      message: `Congratulations! You earned ${lesson.reward} NICHE tokens!`,
      score,
      percentage,
      passed: true,
      rewardAmount: lesson.reward,
      completion,
      progress: currentProgress,
      // In production, include transaction hash:
      // transactionHash: "0x..."
    });
  } catch (error) {
    console.error("Error completing Kings lesson:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
