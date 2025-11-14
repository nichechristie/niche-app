'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

const REWARDS_MANAGER_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deployment
const TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update with your Clanker token

// Reward tiers
const TIERS = {
  BRONZE: 0,
  SILVER: 1,
  GOLD: 2,
  PLATINUM: 3,
};

// Action types
const ACTIONS = {
  POST_CREATED: 0,
  COMMENT_ADDED: 1,
  CONTENT_LIKED: 2,
  CONTENT_SHARED: 3,
  REFERRAL: 4,
  DAILY_LOGIN: 5,
  WEEKLY_ACTIVE: 6,
  ACHIEVEMENT: 7,
  CUSTOM: 8,
};

export default function RewardsAdmin() {
  const { address, isConnected } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedTier, setSelectedTier] = useState(TIERS.BRONZE);
  const [selectedAction, setSelectedAction] = useState(ACTIONS.POST_CREATED);
  const [reason, setReason] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [batchAddresses, setBatchAddresses] = useState('');

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read tier amounts
  const { data: bronzeAmount } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'tierAmounts',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'uint8' }],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'tierAmounts',
    args: [TIERS.BRONZE],
  });

  const { data: silverAmount } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'tierAmounts',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'uint8' }],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'tierAmounts',
    args: [TIERS.SILVER],
  });

  const { data: goldAmount } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'tierAmounts',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'uint8' }],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'tierAmounts',
    args: [TIERS.GOLD],
  });

  const { data: platinumAmount } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'tierAmounts',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'uint8' }],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'tierAmounts',
    args: [TIERS.PLATINUM],
  });

  const { data: poolBalance } = useReadContract({
    address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
    abi: [{
      name: 'getRewardsPoolBalance',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint256' }],
    }],
    functionName: 'getRewardsPoolBalance',
  });

  const handleDistributeReward = async () => {
    if (!recipientAddress || !reason) return;

    try {
      writeContract({
        address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
        abi: [{
          name: 'distributeReward',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'user', type: 'address' },
            { name: 'tier', type: 'uint8' },
            { name: 'actionType', type: 'uint8' },
            { name: 'reason', type: 'string' },
          ],
          outputs: [],
        }],
        functionName: 'distributeReward',
        args: [recipientAddress as `0x${string}`, selectedTier, selectedAction, reason],
      });
    } catch (error) {
      console.error('Failed to distribute reward:', error);
    }
  };

  const handleDistributeCustom = async () => {
    if (!recipientAddress || !customAmount || !reason) return;

    try {
      const amount = parseUnits(customAmount, 18);

      writeContract({
        address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
        abi: [{
          name: 'distributeCustomReward',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'user', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'actionType', type: 'uint8' },
            { name: 'reason', type: 'string' },
          ],
          outputs: [],
        }],
        functionName: 'distributeCustomReward',
        args: [recipientAddress as `0x${string}`, amount, selectedAction, reason],
      });
    } catch (error) {
      console.error('Failed to distribute custom reward:', error);
    }
  };

  const handleBatchDistribute = async () => {
    if (!batchAddresses || !reason) return;

    try {
      const addresses = batchAddresses.split('\n').map(addr => addr.trim()).filter(addr => addr);

      writeContract({
        address: REWARDS_MANAGER_ADDRESS as `0x${string}`,
        abi: [{
          name: 'batchDistributeRewards',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'users', type: 'address[]' },
            { name: 'tier', type: 'uint8' },
            { name: 'actionType', type: 'uint8' },
            { name: 'reason', type: 'string' },
          ],
          outputs: [],
        }],
        functionName: 'batchDistributeRewards',
        args: [addresses as `0x${string}`[], selectedTier, selectedAction, reason],
      });
    } catch (error) {
      console.error('Failed to batch distribute:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Rewards Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Distribute token rewards to your users
        </p>
      </div>

      {/* Pool Balance */}
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/20">
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-2">Rewards Pool Balance</div>
          <div className="text-4xl font-bold text-white">
            {poolBalance ? formatUnits(poolBalance as bigint, 18) : '0'} Tokens
          </div>
        </div>
      </div>

      {/* Tier Amounts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 rounded-xl p-4 border border-orange-500/20">
          <div className="text-orange-400 text-sm mb-1">🥉 Bronze</div>
          <div className="text-white font-bold">
            {bronzeAmount ? formatUnits(bronzeAmount as bigint, 18) : '0'} Tokens
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-700/30 to-gray-900/30 rounded-xl p-4 border border-gray-500/20">
          <div className="text-gray-400 text-sm mb-1">🥈 Silver</div>
          <div className="text-white font-bold">
            {silverAmount ? formatUnits(silverAmount as bigint, 18) : '0'} Tokens
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-700/30 to-yellow-900/30 rounded-xl p-4 border border-yellow-500/20">
          <div className="text-yellow-400 text-sm mb-1">🥇 Gold</div>
          <div className="text-white font-bold">
            {goldAmount ? formatUnits(goldAmount as bigint, 18) : '0'} Tokens
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/20">
          <div className="text-cyan-400 text-sm mb-1">💎 Platinum</div>
          <div className="text-white font-bold">
            {platinumAmount ? formatUnits(platinumAmount as bigint, 18) : '0'} Tokens
          </div>
        </div>
      </div>

      {/* Single Reward Distribution */}
      <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Distribute Single Reward</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Recipient Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black/60 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Reward Tier</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(Number(e.target.value))}
                className="w-full bg-black/60 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value={TIERS.BRONZE}>🥉 Bronze</option>
                <option value={TIERS.SILVER}>🥈 Silver</option>
                <option value={TIERS.GOLD}>🥇 Gold</option>
                <option value={TIERS.PLATINUM}>💎 Platinum</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Action Type</label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(Number(e.target.value))}
                className="w-full bg-black/60 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value={ACTIONS.POST_CREATED}>Post Created</option>
                <option value={ACTIONS.COMMENT_ADDED}>Comment Added</option>
                <option value={ACTIONS.CONTENT_LIKED}>Content Liked</option>
                <option value={ACTIONS.CONTENT_SHARED}>Content Shared</option>
                <option value={ACTIONS.REFERRAL}>Referral</option>
                <option value={ACTIONS.DAILY_LOGIN}>Daily Login</option>
                <option value={ACTIONS.WEEKLY_ACTIVE}>Weekly Active</option>
                <option value={ACTIONS.ACHIEVEMENT}>Achievement</option>
                <option value={ACTIONS.CUSTOM}>Custom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Created amazing post"
              className="w-full bg-black/60 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={handleDistributeReward}
            disabled={!isConnected || !recipientAddress || !reason || isConfirming}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isConfirming ? 'Distributing...' : 'Distribute Reward'}
          </button>
        </div>
      </div>

      {/* Custom Amount */}
      <div className="bg-black/40 rounded-xl p-6 border border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Distribute Custom Amount</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Custom Amount (Tokens)</label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="100"
              className="w-full bg-black/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleDistributeCustom}
            disabled={!isConnected || !recipientAddress || !customAmount || !reason || isConfirming}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isConfirming ? 'Distributing...' : 'Distribute Custom Reward'}
          </button>
        </div>
      </div>

      {/* Batch Distribution */}
      <div className="bg-black/40 rounded-xl p-6 border border-green-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Batch Distribute</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Addresses (one per line)</label>
            <textarea
              value={batchAddresses}
              onChange={(e) => setBatchAddresses(e.target.value)}
              placeholder="0x123...&#10;0x456...&#10;0x789..."
              rows={5}
              className="w-full bg-black/60 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 font-mono text-sm"
            />
          </div>

          <button
            onClick={handleBatchDistribute}
            disabled={!isConnected || !batchAddresses || !reason || isConfirming}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-semibold text-white hover:from-green-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isConfirming ? 'Distributing...' : 'Batch Distribute'}
          </button>
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-center">
          ✓ Rewards distributed successfully!
        </div>
      )}
    </div>
  );
}
