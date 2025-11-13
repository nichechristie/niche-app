import { NextRequest, NextResponse } from "next/server";

// Mock database (replace with actual database in production)
const users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { followerAddress, followeeId } = await request.json();

    if (!followerAddress || !followeeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create follower
    let follower = users.find(
      (u) => u.address.toLowerCase() === followerAddress.toLowerCase()
    );
    if (!follower) {
      follower = {
        id: followerAddress,
        address: followerAddress,
        username: followerAddress.slice(0, 6) + "..." + followerAddress.slice(-4),
        displayName: followerAddress.slice(0, 6) + "..." + followerAddress.slice(-4),
        followers: [],
        following: [],
        createdAt: new Date(),
      };
      users.push(follower);
    }

    // Find or create followee
    let followee = users.find(
      (u) => u.id === followeeId || u.address.toLowerCase() === followeeId.toLowerCase()
    );
    if (!followee) {
      followee = {
        id: followeeId,
        address: followeeId,
        username: followeeId.slice(0, 6) + "..." + followeeId.slice(-4),
        displayName: followeeId.slice(0, 6) + "..." + followeeId.slice(-4),
        followers: [],
        following: [],
        createdAt: new Date(),
      };
      users.push(followee);
    }

    // Check if already following
    const isFollowing = follower.following.includes(followeeId);

    if (isFollowing) {
      // Unfollow
      follower.following = follower.following.filter((id: string) => id !== followeeId);
      followee.followers = followee.followers.filter(
        (addr: string) => addr.toLowerCase() !== followerAddress.toLowerCase()
      );

      return NextResponse.json({
        success: true,
        action: "unfollowed",
        follower,
        followee,
      });
    } else {
      // Follow
      follower.following.push(followeeId);
      followee.followers.push(followerAddress);

      return NextResponse.json({
        success: true,
        action: "followed",
        follower,
        followee,
      });
    }
  } catch (error) {
    console.error("Error following user:", error);
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}
