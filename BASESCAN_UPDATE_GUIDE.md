# How to Update Token Information on Basescan

This guide explains how to update your token's display information on Basescan.org (for Base network tokens).

## Important Notes

- **Basescan API can READ data, not WRITE data**
- To update token display info, you must use the Basescan website
- Your API key: `WIEY248QXG7CC3GQIBBWR26DRTCEZ6CVK6`
- This updates how the token appears on Basescan, NOT the blockchain data

## Prerequisites

1. Be the verified contract owner or have authority
2. Have your token contract address
3. Have a Basescan account

## Step-by-Step Guide

### Option 1: Update Token Info (Recommended)

1. **Go to Basescan Token Update Page**
   - Visit: https://basescan.org/token-updateinfo
   - Or navigate: Basescan.org → More → Submit Info → Update Token Info

2. **Fill Out the Form**
   - **Contract Address**: Your token contract address
   - **Project Name**: Official name of your project
   - **Project Email**: Contact email (must be verifiable)
   - **Project Sector**: Select category (DeFi, NFT, Social, etc.)

3. **Add Logo/Icon**
   - Upload a square logo (recommended: 256x256px or 512x512px)
   - Formats: PNG with transparent background preferred
   - Max file size: usually 100KB

4. **Add Description**
   - Brief description of your token (up to 500 characters)
   - Clearly explain the purpose and utility

5. **Add Social Links** (All optional but recommended)
   - Website URL
   - Twitter/X handle
   - Telegram group
   - Discord server
   - GitHub repository
   - Medium blog
   - Reddit community

6. **Submit for Review**
   - Submit the form
   - Wait for Basescan team review (usually 1-3 business days)
   - You'll receive email confirmation

### Option 2: For Verified Contracts

If your contract is already verified:

1. **Visit Your Token Page**
   - Go to: https://basescan.org/token/YOUR_TOKEN_ADDRESS
   - Replace YOUR_TOKEN_ADDRESS with your actual address

2. **Click "Update"**
   - Look for "Update Token Information" or "Edit" button
   - May require logging in with Basescan account

3. **Update Information**
   - Follow similar steps as Option 1
   - Changes may be instant or require review

### Option 3: Contact Basescan Support

If you need immediate update or have issues:

1. **Email Basescan Support**
   - Email: support@basescan.org
   - Include:
     - Token contract address
     - What you want to update
     - Proof of ownership (transaction hash, signed message, etc.)

2. **Use Basescan Telegram**
   - Join: t.me/etherscan
   - Ask for assistance in the support channel

## What You CAN Update on Basescan

✅ Token Logo/Icon
✅ Project Description
✅ Social Media Links (Twitter, Telegram, Discord, etc.)
✅ Website URL
✅ Official Email
✅ Project Category/Sector
✅ Additional documentation links

## What You CANNOT Update on Basescan

❌ Token Name (this is on-chain)
❌ Token Symbol (this is on-chain)
❌ Total Supply (this is on-chain)
❌ Contract Address (immutable)
❌ Transaction History (immutable)

## To Update On-Chain Data

If you need to update on-chain data like name, symbol, or add metadata:

1. **Use the Smart Contract Functions**
   ```javascript
   // Example using your updatable contract
   await contract.updateDescription("New description");
   await contract.updateSocialLinks(
     "https://website.com",
     "https://twitter.com/handle",
     "https://t.me/group",
     "https://discord.gg/invite"
   );
   ```

2. **Deploy New Contract** (if necessary)
   - If your contract doesn't support updates
   - Migrate to a new updatable contract
   - Announce migration to community

## Using the Basescan API

Your API key can be used to READ token data:

```bash
# Get token info
curl "https://api.basescan.org/api?module=token&action=tokeninfo&contractaddress=YOUR_ADDRESS&apikey=WIEY248QXG7CC3GQIBBWR26DRTCEZ6CVK6"

# Get token holders
curl "https://api.basescan.org/api?module=token&action=tokenholderlist&contractaddress=YOUR_ADDRESS&apikey=WIEY248QXG7CC3GQIBBWR26DRTCEZ6CVK6"

# Get token transfers
curl "https://api.basescan.org/api?module=account&action=tokentx&contractaddress=YOUR_ADDRESS&apikey=WIEY248QXG7CC3GQIBBWR26DRTCEZ6CVK6"
```

## Tips for Success

1. **Use Professional Assets**
   - High-quality logo
   - Clear, concise description
   - Working social media links

2. **Be Accurate**
   - Provide correct information
   - Use official project email
   - Ensure all links work

3. **Be Patient**
   - Review process takes time
   - Don't submit multiple times
   - Follow up if no response after 5 business days

4. **Maintain Information**
   - Keep social links updated
   - Update description if project evolves
   - Remove broken links

## Need Help?

- **Basescan Documentation**: https://docs.basescan.org
- **API Documentation**: https://docs.basescan.org/api-endpoints
- **Support Email**: support@basescan.org
- **Community**: https://t.me/etherscan

## Verification Badge

To get the blue checkmark (verified) badge:

1. Verify your smart contract source code
2. Have significant trading volume
3. Be listed on major DEXs
4. Have active community
5. Meet Basescan's criteria for verification

Note: Verification is at Basescan's discretion and not guaranteed.
