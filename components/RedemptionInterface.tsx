'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';

const TREASURY_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deployment
const NICHE_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update

export default function RedemptionInterface() {
  const { address, isConnected } = useAccount();
  const [redeemAmount, setRedeemAmount] = useState('');
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read backing per token
  const { data: backingPerToken } = useReadContract({
    address: TREASURY_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'getBackingPerToken',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }],
      },
    ],
    functionName: 'getBackingPerToken',
  });

  // Read redemption fee
  const { data: redemptionFee } = useReadContract({
    address: TREASURY_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'redemptionFee',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }],
      },
    ],
    functionName: 'redemptionFee',
  });

  // Get user's NICHE balance
  const { data: nicheBalance } = useBalance({
    address: address,
    token: NICHE_TOKEN_ADDRESS as `0x${string}`,
  });

  const handleRedeem = async () => {
    if (!isConnected || !redeemAmount) return;

    try {
      const amount = parseUnits(redeemAmount, 18); // NicheToken has 18 decimals

      // First approve NicheToken
      writeContract({
        address: NICHE_TOKEN_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'approve',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'spender', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ type: 'bool' }],
          },
        ],
        functionName: 'approve',
        args: [TREASURY_ADDRESS, amount],
      });

      // Then redeem (would need proper flow in production)
    } catch (error) {
      console.error('Redemption failed:', error);
    }
  };

  const actualRedeem = async () => {
    if (!redeemAmount) return;

    try {
      const amount = parseUnits(redeemAmount, 18);

      writeContract({
        address: TREASURY_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'redeem',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [{ name: 'nicheAmount', type: 'uint256' }],
            outputs: [],
          },
        ],
        functionName: 'redeem',
        args: [amount],
      });
    } catch (error) {
      console.error('Redemption failed:', error);
    }
  };

  const backingPrice = backingPerToken ? Number(formatUnits(backingPerToken as bigint, 18)) : 0;
  const feePercent = redemptionFee ? Number(redemptionFee as bigint) / 100 : 0.5;
  const redeemValue = redeemAmount ? Number(redeemAmount) * backingPrice : 0;
  const feeAmount = redeemValue * (feePercent / 100);
  const receiveAmount = redeemValue - feeAmount;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-2xl p-8 border border-purple-500/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🔄</div>
          <h2 className="text-3xl font-bold text-white mb-2">Redeem NicheToken</h2>
          <p className="text-gray-400">
            Convert your NicheToken back to USDC at the current backing price
          </p>
        </div>

        {/* Your Balance */}
        <div className="bg-black/40 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Your NICHE Balance</span>
            <span className="text-white font-bold">
              {nicheBalance ? Number(formatUnits(nicheBalance.value, 18)).toFixed(4) : '0.0000'} NICHE
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400 text-sm">Current Backing Price</span>
            <span className="text-green-400 font-bold">${backingPrice.toFixed(4)} USDC</span>
          </div>
        </div>

        {/* Redeem Input */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Amount to Redeem</label>
          <div className="relative">
            <input
              type="number"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/60 border border-purple-500/30 rounded-lg px-4 py-4 text-white text-2xl placeholder-gray-600 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => {
                if (nicheBalance) {
                  setRedeemAmount(formatUnits(nicheBalance.value, 18));
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded text-sm text-purple-300 transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Redemption Preview */}
        {redeemAmount && Number(redeemAmount) > 0 && (
          <div className="bg-black/60 rounded-xl p-6 mb-6 space-y-3">
            <h3 className="text-white font-semibold mb-3">Redemption Preview</h3>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">NICHE Value</span>
              <span className="text-white font-mono">${redeemValue.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Redemption Fee ({feePercent}%)</span>
              <span className="text-red-400 font-mono">-${feeAmount.toFixed(2)}</span>
            </div>

            <div className="h-px bg-gray-700 my-2"></div>

            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">You Receive</span>
              <span className="text-green-400 font-bold font-mono text-xl">
                ${receiveAmount.toFixed(2)} USDC
              </span>
            </div>
          </div>
        )}

        {/* Redeem Button */}
        <button
          onClick={handleRedeem}
          disabled={!isConnected || !redeemAmount || Number(redeemAmount) === 0 || isConfirming}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-red-600 rounded-xl font-semibold text-white text-lg hover:from-purple-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Redeeming...
            </span>
          ) : (
            'Redeem for USDC'
          )}
        </button>

        {isSuccess && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-center">
            ✓ Redemption successful! USDC sent to your wallet.
          </div>
        )}

        {!isConnected && (
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-center text-sm">
            Please connect your wallet to redeem tokens
          </div>
        )}

        {/* Info Section */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h3 className="text-white font-semibold mb-3">Important Information</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Redemption is based on the current treasury backing per token</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>A small fee ({feePercent}%) is charged to maintain treasury stability</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Your NicheToken will be burned and USDC sent to your wallet</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Consider claiming pending yield before redeeming</span>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <div className="text-red-400 font-semibold mb-1">Irreversible Action</div>
              <p className="text-gray-400 text-xs">
                Redemption permanently burns your NicheToken. Make sure this is what you want to do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
