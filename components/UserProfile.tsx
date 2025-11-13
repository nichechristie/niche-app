"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { User } from "@/types/social";

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { address } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, [userId, address]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to load user");

      const data = await response.json();
      setUser(data.user);

      // Check if current user is following this user
      if (address && data.user) {
        setIsFollowing(data.user.followers.includes(address));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    try {
      setFollowLoading(true);
      const response = await fetch("/api/users/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followerAddress: address,
          followeeId: userId,
        }),
      });

      if (!response.ok) throw new Error("Failed to follow user");

      setIsFollowing(!isFollowing);
      loadUser();
    } catch (error) {
      console.error("Error following user:", error);
      alert("Failed to follow user");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <p className="text-gray-400 text-lg">User not found</p>
      </div>
    );
  }

  const isOwnProfile = address?.toLowerCase() === userId.toLowerCase();

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            user.username.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
            <p className="text-gray-400">@{user.username}</p>
          </div>

          {user.bio && <p className="text-gray-300">{user.bio}</p>}

          {/* Stats */}
          <div className="flex gap-6">
            <div>
              <span className="text-white font-bold">{user.followers.length}</span>
              <span className="text-gray-400 ml-1">Followers</span>
            </div>
            <div>
              <span className="text-white font-bold">{user.following.length}</span>
              <span className="text-gray-400 ml-1">Following</span>
            </div>
          </div>

          {/* Follow Button */}
          {!isOwnProfile && address && (
            <button
              onClick={handleFollow}
              disabled={followLoading}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                isFollowing
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {followLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
