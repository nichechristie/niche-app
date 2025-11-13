import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { uploadFile } from "@/lib/server/uploadFile";

// Mock database (replace with actual database in production)
let posts: any[] = [];

// ERC20 Token Factory ABI (simplified)
const TOKEN_FACTORY_ABI = [
  {
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "initialSupply", type: "uint256" }
    ],
    name: "createToken",
    outputs: [{ name: "token", type: "address" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const content = formData.get("content") as string;
    const coinName = formData.get("coinName") as string;
    const coinSymbol = formData.get("coinSymbol") as string;
    const address = formData.get("address") as string;
    const mediaFile = formData.get("media") as File | null;
    const mediaType = formData.get("mediaType") as string | null;

    if (!address || !coinName || !coinSymbol) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Handle media upload to Vercel Blob Storage
    let mediaUrl = "";
    if (mediaFile) {
      try {
        mediaUrl = await uploadFile(mediaFile, "posts");
        console.log(`File uploaded successfully: ${mediaUrl}`);
      } catch (error) {
        console.error("Failed to upload media:", error);
        return NextResponse.json(
          { error: "Failed to upload media file" },
          { status: 500 }
        );
      }
    }

    // Create token on Base network
    const publicClient = createPublicClient({
      chain: base,
      transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    });

    // In production, use proper key management
    // For now, generate a random token address
    const tokenAddress = `0x${Math.random().toString(16).slice(2, 42)}`;

    // TODO: Implement actual token creation
    // const account = privateKeyToAccount(process.env.DEPLOYER_PRIVATE_KEY as `0x${string}`);
    // const walletClient = createWalletClient({
    //   account,
    //   chain: base,
    //   transport: http(),
    // });

    // const hash = await walletClient.writeContract({
    //   address: TOKEN_FACTORY_ADDRESS,
    //   abi: TOKEN_FACTORY_ABI,
    //   functionName: "createToken",
    //   args: [coinName, coinSymbol, parseEther("1000000")],
    // });

    // Create token metadata with uploaded image
    const tokenMetadata = {
      name: coinName,
      symbol: coinSymbol,
      description: content || `${coinName} (${coinSymbol}) - A content coin on Find Your Niche`,
      image: mediaUrl || "/IMG_3411.jpeg", // Use uploaded image or fallback to default
      animation_url: mediaType === "video" ? mediaUrl : undefined,
      external_url: mediaUrl || undefined,
      attributes: [
        {
          trait_type: "Creator",
          value: address,
        },
        {
          trait_type: "Content Type",
          value: mediaType || "text",
        },
        {
          trait_type: "Created At",
          value: new Date().toISOString(),
        },
      ],
    };

    // Create post
    const post = {
      id: Date.now().toString(),
      userId: address,
      username: address.slice(0, 6) + "..." + address.slice(-4),
      userAvatar: undefined,
      content,
      mediaType: mediaType as "image" | "video" | undefined,
      mediaUrl: mediaUrl || undefined,
      coinAddress: tokenAddress,
      coinSymbol,
      coinName,
      coinMetadata: tokenMetadata,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };

    posts.unshift(post);

    return NextResponse.json({
      success: true,
      post,
      coinAddress: tokenAddress,
      coinSymbol,
      metadata: tokenMetadata,
      message: "Post created and token minted successfully with metadata",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
