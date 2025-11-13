import { NextRequest, NextResponse } from "next/server";

// Mock database (replace with actual database in production)
const users: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // Find user by ID/address
    let user = users.find(
      (u) => u.id === userId || u.address.toLowerCase() === userId.toLowerCase()
    );

    // If user doesn't exist, create a default one
    if (!user) {
      user = {
        id: userId,
        address: userId,
        username: userId.slice(0, 6) + "..." + userId.slice(-4),
        displayName: userId.slice(0, 6) + "..." + userId.slice(-4),
        avatar: undefined,
        bio: "New to Niche Coin",
        followers: [],
        following: [],
        createdAt: new Date(),
      };
      users.push(user);
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
