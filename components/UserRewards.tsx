'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';

const REWARDS_MANAGER_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deployment

const ACTION_NAMES = [
  'Posts Created',
  'Comments Added',
  'Content Liked',
  'Content Shared',
  'Referrals',
  'Daily Logins',
  'Weekly Active',
  'Achievements',
  'Custom Rewards',
];

export default function UserRewards() {
  const { address, isConnected } = useAccount();

  // Read total earned
  const { data: totalEarned } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'totalEarned',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'address' }],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'totalEarned',
    args: address ? [address] : undefined,
  });

  // Read user claims
  const { data: userClaimsData } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'getUserClaims',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'address' }],
      outputs: [{ type: 'uint256[]' }],
    }],
    functionName: 'getUserClaims',
    args: address ? [address] : undefined,
  });

  const totalEarnedFormatted = totalEarned ? Number(formatUnits(totalEarned as bigint, 18)).toFixed(2) : '0.00';
  const claimCount = userClaimsData ? (userClaimsData as bigint[]).length : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
          Your Rewards
        </h1>
        <p className="text-gray-400">
          Track your earned rewards and achievements
        </p>
      </div>

      {!isConnected ? (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 text-center">
          <p className="text-yellow-400">Please connect your wallet to view your rewards</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Total Earned */}
            <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-xl p-8 border border-green-500/20 text-center">
              <div className="text-5xl mb-3">💰</div>
              <div className="text-gray-400 text-sm mb-2">Total Rewards Earned</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {totalEarnedFormatted}
              </div>
              <div className="text-gray-500 text-sm mt-1">Tokens</div>
            </div>

            {/* Total Claims */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-500/20 text-center">
              <div className="text-5xl mb-3">🎁</div>
              <div className="text-gray-400 text-sm mb-2">Total Rewards Received</div>
              <div className="text-4xl font-bold text-white">
                {claimCount}
              </div>
              <div className="text-gray-500 text-sm mt-1">Claims</div>
            </div>
          </div>

          {/* Recent Rewards */}
          <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Rewards</h2>

            {claimCount === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <div className="text-gray-400 mb-2">No rewards yet</div>
                <div className="text-gray-500 text-sm">
                  Start creating content, engaging with the community, and completing achievements to earn rewards!
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <RewardsList claims={userClaimsData as bigint[] || []} />
              </div>
            )}
          </div>

          {/* How to Earn More */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4">💡 How to Earn More Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                <span className="text-2xl">📝</span>
                <div>
                  <div className="text-white font-semibold">Create Posts</div>
                  <div className="text-gray-400">Share quality content</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="text-white font-semibold">Engage</div>
                  <div className="text-gray-400">Comment and interact</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <div className="text-white font-semibold">Like Content</div>
                  <div className="text-gray-400">Support creators</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="text-white font-semibold">Share</div>
                  <div className="text-gray-400">Spread the word</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                <span className="text-2xl">👥</span>
                <div>
                  <div className="text-white font-semibold">Refer Friends</div>
                  <div className="text-gray-400">Grow the community</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="text-white font-semibold">Achievements</div>
                  <div className="text-gray-400">Complete milestones</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reward Tiers Info */}
          <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">🎖️ Reward Tiers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 rounded-lg p-4 border border-orange-500/20 text-center">
                <div className="text-3xl mb-2">🥉</div>
                <div className="text-orange-400 font-bold">Bronze</div>
                <div className="text-gray-400 text-xs mt-1">Small rewards</div>
              </div>
              <div className="bg-gradient-to-br from-gray-700/30 to-gray-900/30 rounded-lg p-4 border border-gray-500/20 text-center">
                <div className="text-3xl mb-2">🥈</div>
                <div className="text-gray-400 font-bold">Silver</div>
                <div className="text-gray-400 text-xs mt-1">Medium rewards</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-700/30 to-yellow-900/30 rounded-lg p-4 border border-yellow-500/20 text-center">
                <div className="text-3xl mb-2">🥇</div>
                <div className="text-yellow-400 font-bold">Gold</div>
                <div className="text-gray-400 text-xs mt-1">Large rewards</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg p-4 border border-cyan-500/20 text-center">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-cyan-400 font-bold">Platinum</div>
                <div className="text-gray-400 text-xs mt-1">Epic rewards</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function RewardsList({ claims }: { claims: bigint[] }) {
  const recentClaims = claims.slice(-10).reverse(); // Show last 10, most recent first

  return (
    <>
      {recentClaims.map((claimId, index) => (
        <RewardItem key={index} claimId={Number(claimId)} />
      ))}
    </>
  );
}

function RewardItem({ claimId }: { claimId: number }) {
  const { data: claimData } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'getClaim',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'uint256' }],
      outputs: [
        { name: 'user', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'tier', type: 'uint8' },
        { name: 'actionType', type: 'uint8' },
        { name: 'reason', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
      ],
    }],
    functionName: 'getClaim',
    args: [BigInt(claimId)],
  });

  if (!claimData) return null;

  const [, amount, tier, actionType, reason, timestamp] = claimData as [string, bigint, number, number, string, bigint];

  const tierEmojis = ['🥉', '🥈', '🥇', '💎'];
  const tierNames = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const tierColors = ['text-orange-400', 'text-gray-400', 'text-yellow-400', 'text-cyan-400'];

  const date = new Date(Number(timestamp) * 1000);
  const formattedDate = date.toLocaleDateString();

  return (
    <div className="bg-black/60 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-3xl">{tierEmojis[tier]}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold ${tierColors[tier]}`}>
                {tierNames[tier]}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 text-sm">{ACTION_NAMES[actionType]}</span>
            </div>
            <div className="text-white text-sm mb-1">{reason}</div>
            <div className="text-gray-500 text-xs">{formattedDate}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-green-400 font-bold text-lg">
            +{Number(formatUnits(amount, 18)).toFixed(2)}
          </div>
          <div className="text-gray-500 text-xs">Tokens</div>
        </div>
      </div>
    </div>
  );
}
