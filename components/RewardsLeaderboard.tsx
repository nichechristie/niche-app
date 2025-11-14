'use client';

import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

const REWARDS_MANAGER_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';

interface LeaderboardEntry {
  address: string;
  totalEarned: string;
  rank: number;
}

export default function RewardsLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Read total claims to get all users
  const { data: totalClaims } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'getTotalClaims',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'getTotalClaims',
  });

  useEffect(() => {
    // In a real implementation, you'd fetch this from an API or indexer
    // For now, we'll show a placeholder leaderboard
    const mockLeaderboard: LeaderboardEntry[] = [
      { address: '0x1234...5678', totalEarned: '15,420.50', rank: 1 },
      { address: '0x2345...6789', totalEarned: '12,350.25', rank: 2 },
      { address: '0x3456...7890', totalEarned: '10,200.75', rank: 3 },
      { address: '0x4567...8901', totalEarned: '8,500.00', rank: 4 },
      { address: '0x5678...9012', totalEarned: '7,250.50', rank: 5 },
      { address: '0x6789...0123', totalEarned: '6,100.25', rank: 6 },
      { address: '0x7890...1234', totalEarned: '5,420.75', rank: 7 },
      { address: '0x8901...2345', totalEarned: '4,850.00', rank: 8 },
      { address: '0x9012...3456', totalEarned: '4,200.50', rank: 9 },
      { address: '0x0123...4567', totalEarned: '3,750.25', rank: 10 },
    ];

    setLeaderboard(mockLeaderboard);
    setLoading(false);
  }, [totalClaims]);

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-500 to-yellow-700';
      case 2: return 'from-gray-400 to-gray-600';
      case 3: return 'from-orange-500 to-orange-700';
      default: return 'from-purple-500 to-blue-500';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-gray-400">
          Top earners in the community
        </p>
      </div>

      {/* Podium (Top 3) */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* 2nd Place */}
        <div className="flex flex-col items-center pt-12">
          <div className="bg-gradient-to-br from-gray-700/50 to-gray-900/50 rounded-xl p-6 border border-gray-500/20 text-center w-full transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-2">🥈</div>
            <div className="text-white font-bold text-lg mb-1">2nd</div>
            <div className="text-gray-400 text-sm mb-2 font-mono">{leaderboard[1]?.address}</div>
            <div className="text-2xl font-bold text-gray-300">
              {leaderboard[1]?.totalEarned}
            </div>
            <div className="text-gray-500 text-xs">Tokens</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-br from-yellow-700/50 to-yellow-900/50 rounded-xl p-6 border border-yellow-500/30 text-center w-full transform hover:scale-105 transition-transform">
            <div className="text-6xl mb-2 animate-bounce">🥇</div>
            <div className="text-yellow-400 font-bold text-2xl mb-1">1st</div>
            <div className="text-gray-400 text-sm mb-2 font-mono">{leaderboard[0]?.address}</div>
            <div className="text-3xl font-bold text-yellow-400">
              {leaderboard[0]?.totalEarned}
            </div>
            <div className="text-gray-500 text-xs">Tokens</div>
          </div>
          <div className="text-4xl mt-2">👑</div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center pt-16">
          <div className="bg-gradient-to-br from-orange-700/50 to-orange-900/50 rounded-xl p-6 border border-orange-500/20 text-center w-full transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-2">🥉</div>
            <div className="text-white font-bold text-lg mb-1">3rd</div>
            <div className="text-gray-400 text-sm mb-2 font-mono">{leaderboard[2]?.address}</div>
            <div className="text-2xl font-bold text-orange-300">
              {leaderboard[2]?.totalEarned}
            </div>
            <div className="text-gray-500 text-xs">Tokens</div>
          </div>
        </div>
      </div>

      {/* Rest of Leaderboard */}
      <div className="bg-black/40 rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 border-b border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Top 10 Earners</h2>
        </div>

        <div className="divide-y divide-gray-800">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center justify-between p-4 hover:bg-purple-900/20 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Rank */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(entry.rank)} flex items-center justify-center font-bold text-white text-lg`}>
                  {entry.rank <= 3 ? getMedalEmoji(entry.rank) : `#${entry.rank}`}
                </div>

                {/* Address */}
                <div className="flex-1">
                  <div className="text-white font-mono text-sm">{entry.address}</div>
                  {entry.rank === 1 && (
                    <div className="text-yellow-400 text-xs mt-1">🔥 Top Earner</div>
                  )}
                  {entry.rank === 2 && (
                    <div className="text-gray-400 text-xs mt-1">⭐ Runner-up</div>
                  )}
                  {entry.rank === 3 && (
                    <div className="text-orange-400 text-xs mt-1">🎯 Rising Star</div>
                  )}
                </div>

                {/* Earnings */}
                <div className="text-right">
                  <div className="text-green-400 font-bold text-xl">
                    {entry.totalEarned}
                  </div>
                  <div className="text-gray-500 text-xs">Tokens Earned</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-white">{leaderboard.length}</div>
            <div className="text-gray-400 text-sm">Total Participants</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{totalClaims ? Number(totalClaims).toLocaleString() : '0'}</div>
            <div className="text-gray-400 text-sm">Total Rewards</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">
              {leaderboard.length > 0 ? leaderboard[0].totalEarned : '0'}
            </div>
            <div className="text-gray-400 text-sm">Top Earner</div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-xl">ℹ️</span>
          <div>
            <div className="text-blue-400 font-semibold mb-1">Leaderboard Updates</div>
            <p className="text-gray-400 text-sm">
              The leaderboard updates in real-time as rewards are distributed. Keep earning to climb the ranks!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
