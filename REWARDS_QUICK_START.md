# Rewards System - Quick Start

## 🚀 Get Your Rewards System Running in 5 Steps

### Step 1: Configure Environment

Add your Clanker token address to `.env`:
```bash
TOKEN_ADDRESS=0xYourClankerTokenAddress
```

### Step 2: Deploy Contract

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npx hardhat run scripts/deploy-rewards.js --network base
```

Output will show:
```
✅ RewardsManager deployed to: 0x123...
```

### Step 3: Update Frontend

Replace `0x0000000000000000000000000000000000000000` in these files with your deployed address:
- `components/RewardsAdmin.tsx` (line 7)
- `components/UserRewards.tsx` (line 5)
- `components/RewardsLeaderboard.tsx` (line 5)
- `app/api/rewards/distribute/route.ts` (line 6)

### Step 4: Fund Rewards Pool

Send tokens to the RewardsManager contract:
```javascript
// Using your wallet or ethers.js
// Send tokens to: 0xYourRewardsManagerAddress
```

Recommended starting amount: **10,000 tokens**

### Step 5: Test It!

1. Visit `http://localhost:3000/rewards`
2. Connect wallet (make sure you're on Base network)
3. Go to Admin tab
4. Distribute a test reward to yourself

**Done!** 🎉

---

## 💡 Quick Integration

Reward users automatically when they take actions:

```typescript
// When user creates a post
await fetch('/api/rewards/distribute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REWARDS_API_KEY,
  },
  body: JSON.stringify({
    userAddress: user.address,
    action: 'POST_CREATED',
    tier: 'BRONZE',
    reason: 'Created new post',
  }),
});
```

---

## 📋 Checklist

- [ ] TOKEN_ADDRESS set in .env
- [ ] Contract deployed to Base
- [ ] Frontend addresses updated
- [ ] Rewards pool funded
- [ ] Test reward distributed
- [ ] API key generated (for auto rewards)
- [ ] Contract verified on BaseScan

---

## 🎖️ Default Rewards

| Tier | Amount |
|------|--------|
| 🥉 Bronze | 10 tokens |
| 🥈 Silver | 50 tokens |
| 🥇 Gold | 200 tokens |
| 💎 Platinum | 1,000 tokens |

Customize these amounts anytime via the contract!

---

## 📚 Full Guide

See `REWARDS_SYSTEM_GUIDE.md` for:
- Detailed deployment instructions
- Integration examples
- Security best practices
- Troubleshooting
- Customization options

---

**Happy Rewarding! 🎁**
