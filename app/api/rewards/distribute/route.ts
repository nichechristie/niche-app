import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, http, parseUnits } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const REWARDS_MANAGER_ADDRESS = process.env.REWARDS_MANAGER_ADDRESS as `0x${string}`;
const PRIVATE_KEY = process.env.REWARDS_PRIVATE_KEY as `0x${string}`;

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

const REWARDS_MANAGER_ABI = [{
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
}];

/**
 * POST /api/rewards/distribute
 *
 * Distribute rewards to a user
 *
 * Body:
 * {
 *   "userAddress": "0x...",
 *   "action": "POST_CREATED" | "COMMENT_ADDED" | etc,
 *   "tier": "BRONZE" | "SILVER" | "GOLD" | "PLATINUM",
 *   "reason": "Created awesome post"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Check API key for security
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.REWARDS_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userAddress, action, tier, reason } = await request.json();

    // Validate inputs
    if (!userAddress || !action || !tier || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!ACTIONS[action as keyof typeof ACTIONS]) {
      return NextResponse.json({ error: 'Invalid action type' }, { status: 400 });
    }

    if (!TIERS[tier as keyof typeof TIERS]) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Create wallet client
    const account = privateKeyToAccount(PRIVATE_KEY);
    const walletClient = createWalletClient({
      account,
      chain: base,
      transport: http(),
    });

    // Distribute reward
    const hash = await walletClient.writeContract({
      address: REWARDS_MANAGER_ADDRESS,
      abi: REWARDS_MANAGER_ABI,
      functionName: 'distributeReward',
      args: [
        userAddress as `0x${string}`,
        TIERS[tier as keyof typeof TIERS],
        ACTIONS[action as keyof typeof ACTIONS],
        reason,
      ],
    });

    return NextResponse.json({
      success: true,
      transactionHash: hash,
      userAddress,
      action,
      tier,
      reason,
    });
  } catch (error) {
    console.error('Reward distribution error:', error);
    return NextResponse.json(
      { error: 'Failed to distribute reward', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Example usage:
 *
 * // When user creates a post
 * fetch('/api/rewards/distribute', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'x-api-key': process.env.REWARDS_API_KEY,
 *   },
 *   body: JSON.stringify({
 *     userAddress: '0x123...',
 *     action: 'POST_CREATED',
 *     tier: 'BRONZE',
 *     reason: 'Created new post',
 *   }),
 * });
 */
