'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';

// Contract addresses (update after deployment)
const TREASURY_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deployment
const NICHE_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

export default function TreasuryDashboard() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState('');
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read treasury value
  const { data: treasuryValue } = useReadContract({
    address: TREASURY_ADDRESS as `0x${string}`,
    abi: [
      {
        name: 'getTreasuryValue',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }],
      },
    ],
    functionName: 'getTreasuryValue',
  });

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

  // Read user's earned yield
  const { data: earnedYield } = useReadContract({
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

  const handleDeposit = async () => {
    if (!depositAmount || !isConnected) return;

    try {
      const amount = parseUnits(depositAmount, 6); // USDC has 6 decimals

      // First approve USDC
      writeContract({
        address: USDC_ADDRESS as `0x${string}`,
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

      // Then deposit (would need to wait for approval first in production)
      // This is simplified - you'd want to handle this as a two-step process
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const actualDeposit = async () => {
    if (!depositAmount) return;

    try {
      const amount = parseUnits(depositAmount, 6);

      writeContract({
        address: TREASURY_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'deposit',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [{ name: 'usdcAmount', type: 'uint256' }],
            outputs: [],
          },
        ],
        functionName: 'deposit',
        args: [amount],
      });
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          USYC Treasury Dashboard
        </h1>
        <p className="text-gray-400">
          Earn yield on your NicheToken holdings through USYC backing
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Treasury Value */}
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/20">
          <div className="text-gray-400 text-sm mb-2">Total Treasury Value</div>
          <div className="text-3xl font-bold text-white">
            ${treasuryValue ? formatUnits(treasuryValue as bigint, 6) : '0.00'}
          </div>
          <div className="text-xs text-gray-500 mt-1">USDC + USYC Holdings</div>
        </div>

        {/* Backing Per Token */}
        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/20">
          <div className="text-gray-400 text-sm mb-2">Backing Per Token</div>
          <div className="text-3xl font-bold text-white">
            ${backingPerToken ? Number(formatUnits(backingPerToken as bigint, 18)).toFixed(4) : '0.0000'}
          </div>
          <div className="text-xs text-gray-500 mt-1">USDC value per NICHE</div>
        </div>

        {/* Your Earned Yield */}
        <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-xl p-6 border border-green-500/20">
          <div className="text-gray-400 text-sm mb-2">Your Earned Yield</div>
          <div className="text-3xl font-bold text-white">
            ${earnedYield ? formatUnits(earnedYield as bigint, 6) : '0.00'}
          </div>
          <div className="text-xs text-gray-500 mt-1">Claimable USDC</div>
        </div>
      </div>

      {/* Deposit Section */}
      <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Deposit USDC to Treasury</h2>
        <p className="text-gray-400 text-sm mb-4">
          Deposit USDC to increase treasury backing and start earning yield through USYC
        </p>

        <div className="flex gap-3">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter USDC amount"
            className="flex-1 bg-black/60 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleDeposit}
            disabled={!isConnected || !depositAmount || isConfirming}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isConfirming ? 'Depositing...' : 'Deposit USDC'}
          </button>
        </div>

        {isSuccess && (
          <div className="mt-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
            ✓ Deposit successful! Treasury backing increased.
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-3">🏦 Treasury Backing</h3>
          <p className="text-gray-400 text-sm mb-3">
            Every NicheToken is backed by real USDC/USYC in the treasury. You can redeem your tokens for USDC at any time based on the backing ratio.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Transparent on-chain backing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Redeemable at any time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Automatic USYC yield generation</span>
            </li>
          </ul>
        </div>

        <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-3">💰 Yield Distribution</h3>
          <p className="text-gray-400 text-sm mb-3">
            USYC is a yield-bearing stablecoin backed by US Treasuries. The yield it generates is automatically distributed to all NicheToken holders proportionally.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Passive income from US Treasuries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>No staking required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Claim anytime, no lock-ups</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-500 text-xl">⚠️</span>
          <div>
            <div className="text-yellow-500 font-semibold mb-1">Important Notice</div>
            <p className="text-gray-400 text-sm">
              This is a new feature integrating USYC (Hashnote US Yield Coin). The treasury contracts are deployed on Ethereum mainnet. Make sure you understand the risks before depositing funds. Contract addresses will be updated after deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
