'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';

const LIQUIDITY_MANAGER_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deployment
const NICHE_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

export default function LiquidityProvision() {
  const { address, isConnected } = useAccount();
  const [nicheAmount, setNicheAmount] = useState('');
  const [usdcAmount, setUsdcAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read user's position
  const { data: position } = useReadContract({
    address: LIQUIDITY_MANAGER_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'getPosition',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ type: 'address' }],
        outputs: [
          { name: 'nicheAmount', type: 'uint256' },
          { name: 'usdcAmount', type: 'uint256' },
          { name: 'lockedUntil', type: 'uint256' },
          { name: 'pendingYield', type: 'uint256' },
        ],
      },
    ],
    functionName: 'getPosition',
    args: address ? [address] : undefined,
  });

  // Read TVL
  const { data: tvl } = useReadContract({
    address: LIQUIDITY_MANAGER_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'getTVL',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [
          { name: 'nicheValue', type: 'uint256' },
          { name: 'usdcValue', type: 'uint256' },
          { name: 'usycValue', type: 'uint256' },
        ],
      },
    ],
    functionName: 'getTVL',
  });

  const handleAddLiquidity = async () => {
    if (!isConnected || !nicheAmount || !usdcAmount) return;

    try {
      const niche = parseUnits(nicheAmount, 18);
      const usdc = parseUnits(usdcAmount, 6);

      // This would need proper approval flow
      writeContract({
        address: LIQUIDITY_MANAGER_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'addLiquidity',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'nicheAmount', type: 'uint256' },
              { name: 'usdcAmount', type: 'uint256' },
            ],
            outputs: [],
          },
        ],
        functionName: 'addLiquidity',
        args: [niche, usdc],
      });
    } catch (error) {
      console.error('Add liquidity failed:', error);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!isConnected || !nicheAmount || !usdcAmount) return;

    try {
      const niche = parseUnits(nicheAmount, 18);
      const usdc = parseUnits(usdcAmount, 6);

      writeContract({
        address: LIQUIDITY_MANAGER_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'removeLiquidity',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'nicheAmount', type: 'uint256' },
              { name: 'usdcAmount', type: 'uint256' },
            ],
            outputs: [],
          },
        ],
        functionName: 'removeLiquidity',
        args: [niche, usdc],
      });
    } catch (error) {
      console.error('Remove liquidity failed:', error);
    }
  };

  const userPosition = position ? {
    niche: Number(formatUnits((position as any)[0] as bigint, 18)),
    usdc: Number(formatUnits((position as any)[1] as bigint, 6)),
    lockedUntil: Number((position as any)[2]),
    pendingYield: Number(formatUnits((position as any)[3] as bigint, 6)),
  } : null;

  const totalTVL = tvl ? {
    niche: Number(formatUnits((tvl as any)[0] as bigint, 18)),
    usdc: Number(formatUnits((tvl as any)[1] as bigint, 6)),
    usyc: Number(formatUnits((tvl as any)[2] as bigint, 6)),
  } : null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">💧</div>
          <h2 className="text-3xl font-bold text-white mb-2">Liquidity Provision</h2>
          <p className="text-gray-400">
            Provide liquidity and earn a share of USYC yield
          </p>
        </div>

        {/* TVL Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black/40 rounded-xl p-4 text-center">
            <div className="text-gray-400 text-xs mb-1">Total NICHE</div>
            <div className="text-white font-bold">{totalTVL?.niche.toFixed(2) || '0.00'}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 text-center">
            <div className="text-gray-400 text-xs mb-1">Total USDC</div>
            <div className="text-white font-bold">${totalTVL?.usdc.toFixed(2) || '0.00'}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 text-center">
            <div className="text-gray-400 text-xs mb-1">Total USYC</div>
            <div className="text-white font-bold">${totalTVL?.usyc.toFixed(2) || '0.00'}</div>
          </div>
        </div>

        {/* Your Position */}
        {userPosition && userPosition.niche > 0 && (
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-6 mb-6 border border-green-500/20">
            <h3 className="text-white font-semibold mb-4">Your Position</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm">NICHE Provided</div>
                <div className="text-white font-bold text-xl">{userPosition.niche.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">USDC Provided</div>
                <div className="text-white font-bold text-xl">${userPosition.usdc.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Pending Yield</div>
                <div className="text-green-400 font-bold text-xl">${userPosition.pendingYield.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Lock Status</div>
                <div className="text-white font-bold">
                  {userPosition.lockedUntil > Date.now() / 1000 ? (
                    <span className="text-yellow-400">🔒 Locked</span>
                  ) : (
                    <span className="text-green-400">✓ Unlocked</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-black/40 text-gray-400 hover:bg-black/60'
            }`}
          >
            Add Liquidity
          </button>
          <button
            onClick={() => setActiveTab('remove')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'remove'
                ? 'bg-purple-600 text-white'
                : 'bg-black/40 text-gray-400 hover:bg-black/60'
            }`}
          >
            Remove Liquidity
          </button>
        </div>

        {/* Input Forms */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">NICHE Amount</label>
            <input
              type="number"
              value={nicheAmount}
              onChange={(e) => setNicheAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">USDC Amount</label>
            <input
              type="number"
              value={usdcAmount}
              onChange={(e) => setUsdcAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/60 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={activeTab === 'add' ? handleAddLiquidity : handleRemoveLiquidity}
          disabled={!isConnected || !nicheAmount || !usdcAmount || isConfirming}
          className={`w-full py-4 rounded-xl font-semibold text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 ${
            activeTab === 'add'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
          }`}
        >
          {isConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Processing...
            </span>
          ) : activeTab === 'add' ? (
            'Add Liquidity'
          ) : (
            'Remove Liquidity'
          )}
        </button>

        {isSuccess && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-center">
            ✓ Transaction successful!
          </div>
        )}

        {/* Benefits */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h3 className="text-white font-semibold mb-3">Liquidity Provider Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2 text-gray-400">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Earn 50% of USYC yield generated</span>
            </div>
            <div className="flex items-start gap-2 text-gray-400">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Help stabilize NicheToken price</span>
            </div>
            <div className="flex items-start gap-2 text-gray-400">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Passive income from US Treasuries</span>
            </div>
            <div className="flex items-start gap-2 text-gray-400">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>7-day lock period for full rewards</span>
            </div>
          </div>
        </div>

        {/* APY Display */}
        <div className="mt-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-400 text-sm">Estimated LP APY</div>
              <div className="text-xs text-gray-500">From USYC yield share</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 font-bold text-2xl">~2-2.5%</div>
              <div className="text-xs text-gray-500">Plus trading fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
