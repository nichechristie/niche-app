import { NextRequest, NextResponse } from "next/server";
import { Testimony } from "@/types/testimony";

// Mock database (replace with actual database in production)
const testimonies: Testimony[] = [];

const TESTIMONY_REWARD = "5"; // 5 NICHE tokens for sharing testimony

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, title, content, category, tags } = body;

    if (!address || !title || !content || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new testimony
    const testimony: Testimony = {
      id: `testimony-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: address,
      username: `${address.slice(0, 6)}...${address.slice(-4)}`,
      title,
      content,
      category,
      tags: tags || [],
      likes: [],
      comments: [],
      createdAt: new Date(),
    };

    testimonies.push(testimony);

    // Mint NICHE tokens to user's wallet for sharing testimony
    const { mintNicheTokens } = await import("@/lib/server/mintTokens");
    const mintResult = await mintNicheTokens(address, TESTIMONY_REWARD);

    if (!mintResult.success) {
      console.warn("Token minting failed:", mintResult.error);
      // Continue anyway - testimony is still saved
    } else {
      console.log(`Minted ${TESTIMONY_REWARD} NICHE to ${address} for sharing testimony: ${title}. TX: ${mintResult.txHash}`);
    }

    return NextResponse.json({
      success: true,
      testimony,
      reward: TESTIMONY_REWARD,
      message: `Testimony shared! You earned ${TESTIMONY_REWARD} NICHE tokens!`,
      txHash: mintResult.txHash,
      mintingEnabled: mintResult.success,
    });
  } catch (error) {
    console.error("Error creating testimony:", error);
    return NextResponse.json(
      { error: "Failed to create testimony" },
      { status: 500 }
    );
  }
}
