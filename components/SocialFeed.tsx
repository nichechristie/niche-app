"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Post } from "@/types/social";
import Link from "next/link";

export function SocialFeed() {
  const { address } = useAccount();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "following">("all");

  useEffect(() => {
    loadPosts();
  }, [filter, address]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const url = filter === "following" && address
        ? `/api/posts?filter=following&address=${address}`
        : "/api/posts";

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load posts");

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!address) {
      alert("Please connect your wallet to like posts");
      return;
    }

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, address }),
      });

      if (!response.ok) throw new Error("Failed to like post");

      // Refresh posts
      loadPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 font-medium transition-colors relative ${
            filter === "all"
              ? "text-indigo-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          All Posts
          {filter === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400"></div>
          )}
        </button>
        <button
          onClick={() => setFilter("following")}
          className={`px-4 py-2 font-medium transition-colors relative ${
            filter === "following"
              ? "text-indigo-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Following
          {filter === "following" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400"></div>
          )}
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">
            {filter === "following"
              ? "No posts from people you follow yet"
              : "No posts yet. Be the first to create one!"}
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="glass rounded-xl p-6 space-y-4">
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href={`/profile/${post.userId}`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform">
                    {post.userAvatar ? (
                      <img
                        src={post.userAvatar}
                        alt={post.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      post.username.charAt(0).toUpperCase()
                    )}
                  </div>
                </Link>
                <div>
                  <Link href={`/profile/${post.userId}`}>
                    <p className="font-semibold text-white hover:text-indigo-400 transition-colors cursor-pointer">
                      {post.username}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-500">
                    {formatTimeAgo(post.createdAt)}
                  </p>
                </div>
              </div>

              {/* Token Badge */}
              {post.coinSymbol && (
                <Link href={`/token/${post.coinAddress}`}>
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold cursor-pointer hover:scale-105 transition-transform">
                    ${post.coinSymbol}
                  </div>
                </Link>
              )}
            </div>

            {/* Post Content */}
            {post.content && (
              <p className="text-white text-lg leading-relaxed">{post.content}</p>
            )}

            {/* Post Media */}
            {post.mediaUrl && (
              <div className="rounded-lg overflow-hidden">
                {post.mediaType === "image" ? (
                  <img
                    src={post.mediaUrl}
                    alt="Post media"
                    className="w-full max-h-96 object-cover"
                  />
                ) : (
                  <video
                    src={post.mediaUrl}
                    controls
                    className="w-full max-h-96 object-cover"
                  />
                )}
              </div>
            )}

            {/* Token Info */}
            {post.coinName && (
              <div className="glass-inner rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Post Token</p>
                    <p className="font-semibold text-white">{post.coinName}</p>
                  </div>
                  <Link href={`/token/${post.coinAddress}`}>
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-semibold rounded-lg transition-all">
                      Trade
                    </button>
                  </Link>
                </div>
                <p className="text-xs text-gray-500">
                  Paired with NICHE & ETH
                </p>
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-2 border-t border-white/10">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  address && post.likes.includes(address)
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                <svg className="w-6 h-6" fill={address && post.likes.includes(address) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">{post.likes.length}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-medium">{post.comments.length}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors ml-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
