# 🚀 Quick Start - Deploy NICHE Token in 5 Minutes

## Using Your Smart Wallet on Base (Recommended)

### Step 1: Open Remix (30 seconds)
Go to: **https://remix.ethereum.org**

### Step 2: Load the Contract (1 minute)
1. Click the **📄 "Create new file"** icon (top left)
2. Name it: `NicheToken.sol`
3. Copy **ALL** the code from `contracts/NicheToken.sol`
4. Paste it into Remix

### Step 3: Compile (30 seconds)
1. Click **"Solidity Compiler"** tab (left sidebar, looks like "S")
2. Select version: **0.8.20**
3. Click the blue **"Compile NicheToken.sol"** button

### Step 4: Connect Your Wallet (30 seconds)
1. Click **"Deploy & Run Transactions"** tab (left sidebar, looks like Ethereum logo)
2. In the **"ENVIRONMENT"** dropdown, select:
   - **"Injected Provider - Coinbase Wallet"** (if using Coinbase Wallet)
   - **"Injected Provider - MetaMask"** (if using MetaMask)
3. Your wallet will pop up - click **"Connect"**
4. Make sure your wallet shows **"Base"** network (not Ethereum!)

### Step 5: Deploy (2 minutes)
Fill in these parameters (one per line):

```
NAME: Niche Coin
SYMBOL: NICHE
INITIALSUPPLY: 1000000
_CREATOR: [YOUR_WALLET_ADDRESS - copy from your wallet]
_POSTID: 1
DESCRIPTION: The Future of Creator Economy
```

Click the orange **"Deploy"** button → Approve in your wallet → Wait for confirmation

**🎉 Copy the contract address that appears!**

### Step 6: Update Your Project (1 minute)

Run this command and paste your contract address when prompted:

```bash
npx tsx scripts/deploy-and-setup.ts
```

### Step 7: Configure & Deploy (2 minutes)

```bash
# Add your wallet's private key to Vercel
npx vercel env add NICHE_TOKEN_OWNER_PRIVATE_KEY production

# Deploy to production
npx vercel --prod --yes --archive=tgz
```

## ✅ Done!

Your NICHE token will now automatically reward users for:
- 📖 Completing Bible study lessons (5-20 NICHE)
- ⚔️ Completing mythology lessons (5-20 NICHE)
- ✝️ Sharing testimonies (5 NICHE)
- ❤️ Receiving testimony likes (0.5 NICHE)

## 🆘 Need Help?

**"I don't see my wallet in Remix"**
- Make sure you have Coinbase Wallet or MetaMask installed
- Refresh the Remix page
- Try a different browser

**"Wrong network"**
- Open your wallet
- Switch to "Base" network
- If you don't see Base, add it: https://chainlist.org/?search=base

**"Not enough ETH"**
- You need ~$0.50 worth of ETH on Base for gas
- Bridge ETH to Base: https://bridge.base.org

**"Contract deployment failed"**
- Check you filled in all 6 parameters correctly
- Make sure INITIALSUPPLY is just `1000000` (no commas or decimals)
- Your wallet address should start with `0x`

## 📖 Full Documentation

See `DEPLOYMENT_GUIDE.md` for complete instructions and troubleshooting.
