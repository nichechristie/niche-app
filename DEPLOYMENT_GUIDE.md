# NICHE Token Deployment Guide

## Quick Deployment with Remix (Easiest Method)

### Step 1: Prepare Your Wallet
1. Make sure you have a wallet with ETH on Base network
2. You'll need approximately 0.001-0.01 ETH for gas fees
3. Get your wallet's private key ready (we'll add it to Vercel later)

### Step 2: Deploy with Remix
1. Go to https://remix.ethereum.org
2. Create a new file: `NicheToken.sol`
3. Copy the contents from `contracts/NicheToken.sol`
4. In the left sidebar, click "Solidity Compiler" (looks like "S")
5. Select compiler version: `0.8.20`
6. Click "Compile NicheToken.sol"

### Step 3: Deploy the Contract
1. Click "Deploy & Run Transactions" in left sidebar
2. Set Environment to "Injected Provider - MetaMask"
3. **IMPORTANT**: Make sure MetaMask is connected to **Base network**
   - Network: Base
   - Chain ID: 8453
   - RPC: https://mainnet.base.org
4. Fill in constructor parameters:
   ```
   NAME: "Find Your Niche"
   SYMBOL: "NICHE"
   INITIALSUPPLY: 1000000 (this is 1 million tokens)
   _CREATOR: [Your wallet address - same one you're deploying from]
   _POSTID: 1
   DESCRIPTION: "The Future of Creator Economy - Earn tokens through Bible study, mythology lessons, and sharing testimonies"
   ```
5. Click "Deploy" and confirm in MetaMask
6. Wait for transaction to confirm
7. **Copy the deployed contract address** - you'll need it!

### Step 4: Update Your App

Run the automated update script:

```bash
npx tsx scripts/update-contract-address.ts
```

This will:
- Prompt you for your new contract address
- Find and replace the old address throughout the entire project
- Show you exactly which files were updated

Then commit the changes:
```bash
git add .
git commit -m "Update NICHE token contract address"
```

### Step 5: Configure Environment Variables

1. Add your private key to Vercel:
   ```bash
   npx vercel env add NICHE_TOKEN_OWNER_PRIVATE_KEY production
   ```
   When prompted, paste your private key (the one from the wallet that deployed the contract)

2. Redeploy:
   ```bash
   npx vercel --prod --yes --archive=tgz
   ```

### Step 6: Verify It Works

After deployment, your app will be able to:
- Mint 5-20 NICHE tokens for Bible lesson completions
- Mint 5-20 NICHE tokens for Mythology lesson completions
- Mint 5 NICHE tokens for testimony submissions
- Mint 0.5 NICHE tokens per testimony like

## Alternative: Deploy with Foundry (Advanced)

If you have Foundry installed:

```bash
forge create --rpc-url https://mainnet.base.org \
  --private-key YOUR_PRIVATE_KEY \
  contracts/NicheToken.sol:NicheToken \
  --constructor-args \
    "Find Your Niche" \
    "NICHE" \
    1000000000000000000000000 \
    YOUR_WALLET_ADDRESS \
    1 \
    "The Future of Creator Economy"
```

## Security Notes

⚠️ **IMPORTANT**:
- Never share your private key with anyone
- Never commit your private key to git
- Keep it only in Vercel's encrypted environment variables
- The deployer wallet will pay gas fees for all token minting
- Make sure this wallet always has some ETH on Base network

## Troubleshooting

**"Insufficient funds" error:**
- Make sure you have ETH on Base network (not Ethereum mainnet)
- You need at least 0.001 ETH for deployment

**"Transaction reverted" error:**
- Check that all constructor parameters are correct
- Make sure you're on Base network (Chain ID: 8453)

**"Only owner can mint" error:**
- Make sure the private key in Vercel matches the deployer wallet
- The wallet that deployed the contract is the only one that can mint

## After Deployment Checklist

- [ ] Contract deployed on Base network
- [ ] Contract address updated in `lib/nicheToken.ts`
- [ ] Private key added to Vercel environment variables
- [ ] App redeployed to Vercel
- [ ] Test by completing a Bible lesson and verify tokens are minted
- [ ] Check transaction on BaseScan to confirm minting worked

## Need Help?

If you run into issues:
1. Check BaseScan: https://basescan.org
2. Verify your wallet has ETH on Base network
3. Make sure you're using the correct network (Base, not Ethereum)
