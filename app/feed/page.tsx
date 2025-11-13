"use client";

import { Header } from "@/components/Header";
import { RewardsBanner } from "@/components/RewardsBanner";
import { CreatePost } from "@/components/CreatePost";
import { SocialFeed } from "@/components/SocialFeed";
import { useState } from "react";

export default function FeedPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    // Refresh the feed
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen grid-bg">
      <Header />
      <RewardsBanner />
      <main className="pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold glow-text">
              <span className="gradient-text">Social Feed</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Create posts, mint tokens, earn NICHE rewards
            </p>
          </div>

          {/* Create Post */}
          <CreatePost onPostCreated={handlePostCreated} />

          {/* Social Feed */}
          <SocialFeed key={refreshKey} />
        </div>
      </div>
    </main>
    </div>
  );
}
