'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits } from 'viem';

const TREASURY_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deployment

export default function YieldClaim() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read earned yield
  const { data: earnedYield, refetch } = useReadContract({
    address: TREASURY_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'earned',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
    ],
    functionName: 'earned',
    args: address ? [address] : undefined,
  });

  const handleClaim = async () => {
    if (!isConnected) return;

    try {
      writeContract({
        address: TREASURY_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'claimYield',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [],
            outputs: [],
          },
        ],
        functionName: 'claimYield',
      });
    } catch (error) {
      console.error('Claim failed:', error);
    }
  };

  const yieldAmount = earnedYield ? Number(formatUnits(earnedYield as bigint, 6)) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">💰</div>
          <h2 className="text-3xl font-bold text-white mb-2">Claim Your Yield</h2>
          <p className="text-gray-400">
            Earn passive income from US Treasury-backed USYC yields
          </p>
        </div>

        {/* Yield Display */}
        <div className="bg-black/60 rounded-xl p-8 mb-6 text-center">
          <div className="text-gray-400 text-sm mb-2">Your Claimable Yield</div>
          <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
            ${yieldAmount.toFixed(2)}
          </div>
          <div className="text-gray-500 text-sm">USDC</div>
        </div>

        {/* Claim Button */}
        <button
          onClick={handleClaim}
          disabled={!isConnected || yieldAmount === 0 || isConfirming}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-semibold text-white text-lg hover:from-green-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Claiming...
            </span>
          ) : yieldAmount === 0 ? (
            'No Yield Available'
          ) : (
            `Claim $${yieldAmount.toFixed(2)} USDC`
          )}
        </button>

        {isSuccess && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-center">
            ✓ Yield claimed successfully! Check your wallet.
          </div>
        )}

        {!isConnected && (
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-center text-sm">
            Please connect your wallet to claim yield
          </div>
        )}

        {/* Info Section */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h3 className="text-white font-semibold mb-3">How Yield Works</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">1.</span>
              <span>Treasury holds USYC, a yield-bearing stablecoin backed by US Treasuries</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">2.</span>
              <span>USYC automatically appreciates as it earns yield from US Treasuries</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">3.</span>
              <span>Yield is distributed proportionally to all NicheToken holders</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">4.</span>
              <span>Claim anytime - no staking or lock-ups required!</span>
            </div>
          </div>
        </div>

        {/* APY Estimate */}
        <div className="mt-4 bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Estimated APY</span>
            <span className="text-blue-400 font-bold">~4-5%</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Based on current US Treasury yields
          </div>
        </div>
      </div>
    </div>
  );
}
