import { NextRequest, NextResponse } from "next/server";
import { bibleLessons } from "@/lib/bibleLessons";

// Mock database (replace with actual database in production)
const userProgress: Map<string, {
  completedLessons: string[];
  totalRewardsEarned: string;
  currentStreak: number;
  lastStudyDate?: Date;
}> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, lessonId, score } = body;

    if (!address || !lessonId || score === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if score is passing (70% or higher)
    if (score < 70) {
      return NextResponse.json(
        { error: "Score must be at least 70% to complete the lesson" },
        { status: 400 }
      );
    }

    // Find the lesson
    const lesson = bibleLessons.find(l => l.id === lessonId);
    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
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
    }

    // Check if lesson already completed
    if (progress.completedLessons.includes(lessonId)) {
      return NextResponse.json(
        { error: "Lesson already completed" },
        { status: 400 }
      );
    }

    // Add lesson to completed
    progress.completedLessons.push(lessonId);

    // Add reward to total
    const currentTotal = parseFloat(progress.totalRewardsEarned);
    const lessonReward = parseFloat(lesson.reward);
    progress.totalRewardsEarned = (currentTotal + lessonReward).toString();

    // Update streak
    const today = new Date();
    const lastStudy = progress.lastStudyDate;

    if (lastStudy) {
      const daysDiff = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        progress.currentStreak += 1;
      } else if (daysDiff > 1) {
        progress.currentStreak = 1;
      }
    } else {
      progress.currentStreak = 1;
    }

    progress.lastStudyDate = today;

    // Save progress
    userProgress.set(address.toLowerCase(), progress);

    // Mint NICHE tokens to user's wallet
    const { mintNicheTokens } = await import("@/lib/server/mintTokens");
    const mintResult = await mintNicheTokens(address, lesson.reward);

    if (!mintResult.success) {
      console.warn("Token minting failed:", mintResult.error);
      // Continue anyway - we still want to track progress even if minting fails
    } else {
      console.log(`Minted ${lesson.reward} NICHE to ${address} for completing ${lesson.title}. TX: ${mintResult.txHash}`);
    }

    return NextResponse.json({
      success: true,
      message: `Congratulations! You earned ${lesson.reward} NICHE tokens!`,
      reward: lesson.reward,
      totalRewards: progress.totalRewardsEarned,
      completedLessons: progress.completedLessons,
      streak: progress.currentStreak,
      txHash: mintResult.txHash,
      mintingEnabled: mintResult.success,
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
