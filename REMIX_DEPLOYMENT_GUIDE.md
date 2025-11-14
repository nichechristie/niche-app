# Deploy RewardsManager Using Remix IDE (Smart Wallet Compatible)

This guide shows you how to deploy the RewardsManager contract using Remix, which works with smart wallets (no private key needed).

## 📋 Prerequisites

- Your smart wallet with ETH on Base network (~$20-30 for gas)
- Your Clanker token contract address on Base

## 🚀 Step-by-Step Deployment

### Step 1: Open Remix IDE

Go to: **https://remix.ethereum.org/**

### Step 2: Create Contract Files

**File 1: Create `IERC20.sol`**
1. Click "File Explorer" (📁 icon on left)
2. Click "+" to create new file
3. Name it: `IERC20.sol`
4. Copy and paste the code from: `contracts/IERC20.sol`

**File 2: Create `RewardsManager.sol`**
1. Create another new file
2. Name it: `RewardsManager.sol`
3. Copy and paste the code from: `contracts/RewardsManager.sol`

### Step 3: Compile Contracts

1. Click "Solidity Compiler" icon (📜) on left sidebar
2. Select compiler version: **0.8.20**
3. Click "Compile RewardsManager.sol"
4. Wait for green checkmark ✅

### Step 4: Connect Your Smart Wallet

1. Click "Deploy & Run Transactions" icon (🚀) on left sidebar
2. In "ENVIRONMENT" dropdown, select: **Injected Provider - MetaMask**
3. Your smart wallet will prompt you to connect
4. **Make sure your wallet is on Base network!**
   - Network: Base (not Ethereum mainnet)
   - Chain ID: 8453
5. Approve the connection

### Step 5: Deploy Contract

1. In the "CONTRACT" dropdown, select: **RewardsManager**
2. Next to "Deploy" button, you'll see a field for constructor parameters
3. Enter your **Clanker token address** in the field
   - Format: `0xYourTokenAddressHere`
   - Example: `0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf`
4. Click **"Deploy"** (orange button)
5. Your smart wallet will ask you to approve the transaction
6. Approve and wait for confirmation

### Step 6: Get Your Contract Address

1. After deployment, look in the "Deployed Contracts" section (bottom of right panel)
2. You'll see: `REWARDSMANAGER AT 0x...`
3. **Copy this address** - this is your RewardsManager contract!
4. Click the copy icon to copy the full address

### Step 7: Verify on BaseScan

1. Go to: https://basescan.org/
2. Paste your contract address in search
3. You should see your deployed contract
4. Click "Contract" tab → "Verify and Publish"
5. Follow BaseScan's verification steps (optional but recommended)

## ✅ After Deployment

### Update Your Frontend

Add the RewardsManager address to your `.env` file:
```bash
REWARDS_MANAGER_ADDRESS=0xYourDeployedRewardsManagerAddress
```

Then update these 4 files (replace `0x0000...` with your address):
- `components/RewardsAdmin.tsx` (line 7)
- `components/UserRewards.tsx` (line 5)
- `components/RewardsLeaderboard.tsx` (line 5)
- `app/api/rewards/distribute/route.ts` (line 6)

### Fund the Rewards Pool

Send your Clanker tokens to the RewardsManager address:
1. Open your wallet
2. Send tokens to: `0xYourRewardsManagerAddress`
3. Recommended starting amount: 10,000-50,000 tokens

### Test It!

1. Run: `npm run dev`
2. Visit: `http://localhost:3000/rewards`
3. Connect your wallet
4. Try distributing a test reward
5. Check if it works!

## 🎉 You're Done!

Your RewardsManager is deployed and ready to distribute rewards to users!

## 💡 Pro Tips

- **Save your contract address** - you'll need it for frontend updates
- **Verify on BaseScan** - makes it easier to interact with and builds trust
- **Test with small amounts first** - make sure everything works before sending lots of tokens
- **Smart wallet is the owner** - all admin functions can only be called by your smart wallet

## ❓ Troubleshooting

**"Gas estimation failed"**
- Make sure you have enough ETH in your wallet (~$20-30)
- Check you're on Base network, not Ethereum mainnet

**"Constructor parameter error"**
- Double-check your token address is correct
- Make sure it's a valid Base address (starts with 0x)

**"Transaction failed"**
- Try increasing gas limit in wallet
- Make sure token address is valid on Base

**Can't connect wallet**
- Refresh Remix page
- Try disconnecting and reconnecting wallet
- Make sure MetaMask is unlocked
