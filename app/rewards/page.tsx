'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import UserRewards from '@/components/UserRewards';
import RewardsLeaderboard from '@/components/RewardsLeaderboard';
import RewardsAdmin from '@/components/RewardsAdmin';

export default function RewardsPage() {
  const { address } = useAccount();
  const [activeView, setActiveView] = useState<'rewards' | 'leaderboard' | 'admin'>('rewards');

  // Check if user is admin (you can replace this with actual admin check)
  const isAdmin = address === '0xYourAdminAddress'; // TODO: Update with actual admin address

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Rewards System
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Earn tokens for your contributions and climb the leaderboard
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveView('rewards')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'rewards'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
            }`}
          >
            💰 My Rewards
          </button>
          <button
            onClick={() => setActiveView('leaderboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'leaderboard'
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/50'
                : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
            }`}
          >
            🏆 Leaderboard
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveView('admin')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeView === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
              }`}
            >
              ⚙️ Admin
            </button>
          )}
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeView === 'rewards' && <UserRewards />}
          {activeView === 'leaderboard' && <RewardsLeaderboard />}
          {activeView === 'admin' && isAdmin && <RewardsAdmin />}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/20 text-center">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="text-white font-bold mb-2">Earn Rewards</h3>
            <p className="text-gray-400 text-sm">
              Get tokens for creating content, engaging, and achieving milestones
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/20 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-white font-bold mb-2">Climb Rankings</h3>
            <p className="text-gray-400 text-sm">
              Compete with others and become a top earner in the community
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-4xl mb-3">💎</div>
            <h3 className="text-white font-bold mb-2">Multiple Tiers</h3>
            <p className="text-gray-400 text-sm">
              Bronze, Silver, Gold, and Platinum rewards for different achievements
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-black/40 rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
                1️⃣
              </div>
              <h3 className="text-white font-bold mb-2">Take Action</h3>
              <p className="text-gray-400 text-sm">
                Create posts, engage with content, refer friends
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
                2️⃣
              </div>
              <h3 className="text-white font-bold mb-2">Earn Rewards</h3>
              <p className="text-gray-400 text-sm">
                Receive tokens automatically based on your actions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
                3️⃣
              </div>
              <h3 className="text-white font-bold mb-2">Track Progress</h3>
              <p className="text-gray-400 text-sm">
                See your total earnings and reward history
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
                4️⃣
              </div>
              <h3 className="text-white font-bold mb-2">Climb Ranks</h3>
              <p className="text-gray-400 text-sm">
                Compete on the leaderboard and earn prestige
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-bold text-white mb-4">💡 Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <div className="text-white font-semibold mb-1">How do I earn rewards?</div>
              <div className="text-gray-400 text-sm">
                Rewards are distributed automatically when you create posts, comment, like content, share, refer friends, and complete achievements.
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">What are the different tiers?</div>
              <div className="text-gray-400 text-sm">
                Bronze (10 tokens), Silver (50 tokens), Gold (200 tokens), and Platinum (1000 tokens). Higher tiers are awarded for more impactful actions.
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">How often is the leaderboard updated?</div>
              <div className="text-gray-400 text-sm">
                The leaderboard updates in real-time as rewards are distributed.
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Can I see my reward history?</div>
              <div className="text-gray-400 text-sm">
                Yes! Check the "My Rewards" tab to see all your past rewards and the reasons you earned them.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
