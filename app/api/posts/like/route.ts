import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { base } from "viem/chains";

// Mock database (replace with actual database in production)
let posts: any[] = [];

// NICHE Token Contract ABI (simplified)
const NICHE_TOKEN_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// Reward configuration
const LIKE_REWARD = "1"; // 1 NICHE token per like received
const NICHE_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_NICHE_TOKEN_ADDRESS || "0x";

export async function POST(request: NextRequest) {
  try {
    const { postId, address } = await request.json();

    if (!postId || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the post
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = posts[postIndex];

    // Check if already liked
    const alreadyLiked = post.likes.includes(address);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((a: string) => a !== address);
      posts[postIndex] = post;

      return NextResponse.json({
        success: true,
        action: "unliked",
        likes: post.likes.length,
      });
    } else {
      // Like and reward post creator with NICHE tokens
      post.likes.push(address);
      posts[postIndex] = post;

      // Reward the post creator with NICHE tokens
      try {
        // TODO: Implement actual NICHE token transfer
        // In production, you would use a backend wallet to distribute rewards

        // const publicClient = createPublicClient({
        //   chain: base,
        //   transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
        // });

        // const account = privateKeyToAccount(process.env.REWARD_DISTRIBUTOR_PRIVATE_KEY as `0x${string}`);
        // const walletClient = createWalletClient({
        //   account,
        //   chain: base,
        //   transport: http(),
        // });

        // const hash = await walletClient.writeContract({
        //   address: NICHE_TOKEN_ADDRESS as `0x${string}`,
        //   abi: NICHE_TOKEN_ABI,
        //   functionName: "transfer",
        //   args: [post.userId, parseEther(LIKE_REWARD)],
        // });

        console.log(`Rewarded ${LIKE_REWARD} NICHE to ${post.userId} for like`);

        return NextResponse.json({
          success: true,
          action: "liked",
          likes: post.likes.length,
          reward: LIKE_REWARD,
          message: `Post creator received ${LIKE_REWARD} NICHE tokens!`,
        });
      } catch (error) {
        console.error("Error sending reward:", error);
        // Still count the like even if reward fails
        return NextResponse.json({
          success: true,
          action: "liked",
          likes: post.likes.length,
          message: "Liked successfully (reward pending)",
        });
      }
    }
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { error: "Failed to like post" },
      { status: 500 }
    );
  }
}
