# Rewards System - Complete Guide

## 🎯 Overview

A comprehensive token rewards system for your Clanker coin that:
- ✅ Distributes rewards for user actions
- ✅ Supports multiple reward tiers (Bronze, Silver, Gold, Platinum)
- ✅ Tracks all rewards on-chain
- ✅ Features admin dashboard for manual distribution
- ✅ API for automatic rewards
- ✅ User rewards display and leaderboard

---

## 📦 What's Included

### Smart Contract
**`RewardsManager.sol`** - Main contract managing all rewards
- Multiple reward tiers with configurable amounts
- Track rewards by user and action type
- Batch distribution for multiple users
- Admin controls and emergency functions
- Complete claim history on-chain

### Frontend Components

1. **`RewardsAdmin.tsx`** - Admin dashboard
   - Distribute single rewards
   - Custom reward amounts
   - Batch distribution
   - View tier amounts and pool balance

2. **`UserRewards.tsx`** - User rewards display
   - Total earnings
   - Claim history
   - Action breakdown
   - How to earn more tips

3. **`RewardsLeaderboard.tsx`** - Leaderboard
   - Top 10 earners
   - Podium display for top 3
   - Stats and rankings

4. **`/app/rewards/page.tsx`** - Main rewards page
   - Navigation between views
   - Feature highlights
   - FAQ section

### API Endpoint
**`/api/rewards/distribute`** - Automatic reward distribution
- Secure API key authentication
- Distribute rewards programmatically
- Used when users take actions

---

## 🚀 Deployment Guide

### 1. Prerequisites

Install Hardhat (if not already installed):
```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
```

Create `hardhat.config.js`:
```javascript
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8453,
    },
  },
};
```

### 2. Configure Environment

Update your `.env`:
```bash
# Your Clanker token address
TOKEN_ADDRESS=0xYourClankerTokenAddress

# Deployer private key
PRIVATE_KEY=your_deployer_private_key

# After deployment, add these:
REWARDS_MANAGER_ADDRESS=deployed_contract_address
REWARDS_API_KEY=generate_a_secure_random_key
REWARDS_PRIVATE_KEY=private_key_for_distributing_rewards
```

### 3. Deploy Contract

```bash
npx hardhat run scripts/deploy-rewards.js --network base
```

This will:
- Deploy RewardsManager contract
- Set default tier amounts
- Output contract address
- Save deployment info to `rewards-deployment-info.json`

### 4. Update Frontend

Replace `0x0000000000000000000000000000000000000000` with your deployed address in:
- `components/RewardsAdmin.tsx`
- `components/UserRewards.tsx`
- `components/RewardsLeaderboard.tsx`
- `app/api/rewards/distribute/route.ts`

### 5. Fund Rewards Pool

Send tokens to the RewardsManager contract:

```javascript
// Using ethers.js
const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, signer);
const amount = ethers.utils.parseEther("10000"); // 10,000 tokens
await tokenContract.transfer(REWARDS_MANAGER_ADDRESS, amount);
```

Or use your wallet to send tokens directly to the RewardsManager address.

### 6. Verify Contract

```bash
npx hardhat verify --network base <REWARDS_MANAGER_ADDRESS> <TOKEN_ADDRESS>
```

---

## 💡 How to Use

### Admin Dashboard

Visit `/rewards` and switch to "Admin" tab (only visible to admins):

1. **Single Reward**: Reward one user
   - Enter user address
   - Select tier (Bronze/Silver/Gold/Platinum)
   - Choose action type
   - Add reason
   - Click "Distribute Reward"

2. **Custom Amount**: Give custom token amount
   - Enter user address and custom amount
   - Select action type and reason
   - Click "Distribute Custom Reward"

3. **Batch Distribution**: Reward multiple users at once
   - Paste addresses (one per line)
   - Select tier and action
   - Click "Batch Distribute"

### Automatic Rewards

Call the API endpoint when users take actions:

```typescript
// Example: Reward user for creating a post
async function rewardPostCreation(userAddress: string) {
  const response = await fetch('/api/rewards/distribute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REWARDS_API_KEY!,
    },
    body: JSON.stringify({
      userAddress,
      action: 'POST_CREATED',
      tier: 'BRONZE',
      reason: 'Created new post',
    }),
  });

  return response.json();
}
```

### Integration Examples

**When User Creates Post:**
```typescript
// In your post creation handler
await rewardPostCreation(user.address);
```

**When User Comments:**
```typescript
await fetch('/api/rewards/distribute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REWARDS_API_KEY,
  },
  body: JSON.stringify({
    userAddress: user.address,
    action: 'COMMENT_ADDED',
    tier: 'BRONZE',
    reason: 'Added thoughtful comment',
  }),
});
```

**When User Refers Friend:**
```typescript
await fetch('/api/rewards/distribute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REWARDS_API_KEY,
  },
  body: JSON.stringify({
    userAddress: referrer.address,
    action: 'REFERRAL',
    tier: 'SILVER',
    reason: 'Referred new user',
  }),
});
```

---

## 🎖️ Reward Tiers & Actions

### Tiers (Default Amounts - Customizable)

| Tier | Emoji | Amount | Use Case |
|------|-------|---------|----------|
| Bronze | 🥉 | 10 tokens | Small actions (posts, comments) |
| Silver | 🥈 | 50 tokens | Medium impact (quality content, engagement) |
| Gold | 🥇 | 200 tokens | High impact (viral content, achievements) |
| Platinum | 💎 | 1,000 tokens | Epic milestones (major achievements) |

### Action Types

1. **POST_CREATED** - User creates a post
2. **COMMENT_ADDED** - User adds a comment
3. **CONTENT_LIKED** - User likes content
4. **CONTENT_SHARED** - User shares content
5. **REFERRAL** - User refers a friend
6. **DAILY_LOGIN** - Daily login bonus
7. **WEEKLY_ACTIVE** - Weekly activity bonus
8. **ACHIEVEMENT** - Special achievements
9. **CUSTOM** - Any custom action

---

## 🔧 Customization

### Change Tier Amounts

Call `updateTierAmount` from owner account:

```solidity
// Update Gold tier to 300 tokens
await rewardsManager.updateTierAmount(2, ethers.utils.parseEther("300"));
```

### Add Reward Managers

Allow other addresses to distribute rewards:

```solidity
await rewardsManager.addRewardManager("0xManagerAddress");
```

### Pause/Unpause Rewards

Emergency pause:

```solidity
await rewardsManager.setPaused(true); // Pause
await rewardsManager.setPaused(false); // Unpause
```

---

## 📊 Monitoring & Analytics

### Check Pool Balance

```javascript
const balance = await rewardsManager.getRewardsPoolBalance();
console.log('Rewards pool:', ethers.utils.formatEther(balance), 'tokens');
```

### Get User Stats

```javascript
const totalEarned = await rewardsManager.totalEarned(userAddress);
const claims = await rewardsManager.getUserClaims(userAddress);
console.log('User earned:', ethers.utils.formatEther(totalEarned));
console.log('Total claims:', claims.length);
```

### Get Specific Claim

```javascript
const claim = await rewardsManager.getClaim(claimId);
console.log('Claim details:', {
  user: claim.user,
  amount: ethers.utils.formatEther(claim.amount),
  tier: claim.tier,
  actionType: claim.actionType,
  reason: claim.reason,
  timestamp: new Date(claim.timestamp * 1000),
});
```

---

## 🔒 Security Best Practices

### API Key Security
1. Generate strong API key: `openssl rand -hex 32`
2. Store in environment variables
3. Never commit to version control
4. Rotate regularly

### Private Key Security
1. Use separate wallet for rewards distribution
2. Fund with minimum required ETH
3. Store securely in environment variables
4. Consider using a multisig for admin functions

### Rate Limiting
Add rate limiting to prevent abuse:

```typescript
// Example using Upstash Rate Limit
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
});

// In your API route
const { success } = await ratelimit.limit(userAddress);
if (!success) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

---

## 🎯 Suggested Reward Strategy

### Posts & Content
- **First Post**: Bronze (10 tokens)
- **Quality Post (>100 words)**: Silver (50 tokens)
- **Viral Post (>100 likes)**: Gold (200 tokens)
- **Featured Post**: Platinum (1000 tokens)

### Engagement
- **Comment**: Bronze (10 tokens)
- **Helpful Comment (upvoted)**: Silver (50 tokens)
- **Like/Share**: Small Bronze reward

### Milestones
- **10 Posts**: Silver (50 tokens)
- **50 Posts**: Gold (200 tokens)
- **100 Posts**: Platinum (1000 tokens)

### Referrals
- **1 Referral**: Silver (50 tokens)
- **5 Referrals**: Gold (200 tokens)
- **10 Referrals**: Platinum (1000 tokens)

### Daily/Weekly
- **Daily Login**: Bronze (10 tokens)
- **7-Day Streak**: Silver (50 tokens)
- **30-Day Streak**: Gold (200 tokens)

---

## 🐛 Troubleshooting

### "Insufficient reward tokens" Error
**Solution**: Fund the rewards pool with more tokens

### "Not a reward manager" Error
**Solution**: Add the address as a reward manager using `addRewardManager()`

### "Rewards are paused" Error
**Solution**: Unpause rewards using `setPaused(false)`

### API Returns 401
**Solution**: Check your API key in headers

### Transaction Fails
**Solutions**:
- Check contract has tokens in pool
- Verify user address is valid
- Ensure caller is reward manager
- Check rewards aren't paused

---

## 📈 Growth Tips

1. **Promote the System**
   - Announce rewards in community
   - Share leaderboard updates
   - Highlight top earners

2. **Seasonal Events**
   - Double rewards weekends
   - Special challenges
   - Limited-time tier bonuses

3. **Gamification**
   - Badges for achievements
   - Streak bonuses
   - Tier progression system

4. **Community Building**
   - Feature top contributors
   - Reward helpful community members
   - Incentivize quality over quantity

---

## 🤝 Support

For issues or questions:
- Check contract on BaseScan
- Review transaction logs
- Test with small amounts first
- Join community Discord/Telegram

---

**Built with ❤️ for your community**
