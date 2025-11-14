/**
 * TESTNET Deployment script for Rewards System
 *
 * Deploy to Base Sepolia testnet for FREE testing!
 *
 * Prerequisites:
 * 1. Get FREE testnet ETH from: https://www.alchemy.com/faucets/base-sepolia
 * 2. Add your testnet wallet private key to .env as TESTNET_PRIVATE_KEY
 * 3. Make sure you're using testnet token address (or your real token on testnet)
 *
 * Usage:
 * npx hardhat run scripts/deploy-rewards-testnet.js --network baseSepolia
 */

const { ethers } = require('hardhat');

async function main() {
  console.log('🧪 Starting TESTNET Rewards System Deployment...\n');
  console.log('⚠️  This is TESTNET - no real money involved!\n');

  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', ethers.utils.formatEther(await deployer.getBalance()), 'ETH\n');

  // Configuration
  const TOKEN_ADDRESS = process.env.TESTNET_TOKEN_ADDRESS || process.env.TOKEN_ADDRESS;

  if (!TOKEN_ADDRESS || TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    console.error('❌ Error: TESTNET_TOKEN_ADDRESS not set in .env');
    console.log('Please set TESTNET_TOKEN_ADDRESS in your .env file');
    console.log('You can use your real token address or deploy a test token first');
    process.exit(1);
  }

  console.log('Configuration:');
  console.log('- Network: Base Sepolia Testnet');
  console.log('- Token Address:', TOKEN_ADDRESS);
  console.log('- Deployer:', deployer.address);
  console.log('');

  // Deploy RewardsManager
  console.log('📦 Deploying RewardsManager to TESTNET...');
  const RewardsManager = await ethers.getContractFactory('RewardsManager');
  const rewardsManager = await RewardsManager.deploy(TOKEN_ADDRESS);
  await rewardsManager.deployed();
  console.log('✅ RewardsManager deployed to:', rewardsManager.address);
  console.log('');

  // Check default tier amounts
  console.log('📊 Default Reward Tiers:');
  const bronze = await rewardsManager.tierAmounts(0);
  const silver = await rewardsManager.tierAmounts(1);
  const gold = await rewardsManager.tierAmounts(2);
  const platinum = await rewardsManager.tierAmounts(3);

  console.log('  🥉 Bronze:   ', ethers.utils.formatEther(bronze), 'tokens');
  console.log('  🥈 Silver:   ', ethers.utils.formatEther(silver), 'tokens');
  console.log('  🥇 Gold:     ', ethers.utils.formatEther(gold), 'tokens');
  console.log('  💎 Platinum: ', ethers.utils.formatEther(platinum), 'tokens');
  console.log('');

  // Deployment Summary
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 TESTNET DEPLOYMENT COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('Contract Address (TESTNET):');
  console.log('-----------------------------------------------------------');
  console.log('RewardsManager: ', rewardsManager.address);
  console.log('');
  console.log('View on BaseScan Testnet:');
  console.log(`https://sepolia.basescan.org/address/${rewardsManager.address}`);
  console.log('');
  console.log('Next Steps:');
  console.log('-----------------------------------------------------------');
  console.log('1. Add to .env:');
  console.log(`   TESTNET_REWARDS_MANAGER_ADDRESS=${rewardsManager.address}`);
  console.log('');
  console.log('2. For testing, update frontend files to use testnet:');
  console.log('   - components/RewardsAdmin.tsx');
  console.log('   - components/UserRewards.tsx');
  console.log('   - components/RewardsLeaderboard.tsx');
  console.log('');
  console.log('3. Send test tokens to the RewardsManager:');
  console.log(`   Contract: ${rewardsManager.address}`);
  console.log('');
  console.log('4. Test the system at http://localhost:3000/rewards');
  console.log('   - Make sure wallet is on Base Sepolia testnet');
  console.log('   - Test distributing rewards');
  console.log('   - Test all features');
  console.log('');
  console.log('5. Once everything works, deploy to mainnet:');
  console.log('   npx hardhat run scripts/deploy-rewards.js --network base');
  console.log('');
  console.log('💡 This is TESTNET - experiment freely! No real money involved.');
  console.log('═══════════════════════════════════════════════════════════');

  // Save deployment info to file
  const fs = require('fs');
  const deploymentInfo = {
    network: 'base-sepolia-testnet',
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      RewardsManager: rewardsManager.address,
      RewardToken: TOKEN_ADDRESS,
    },
    tiers: {
      bronze: ethers.utils.formatEther(bronze),
      silver: ethers.utils.formatEther(silver),
      gold: ethers.utils.formatEther(gold),
      platinum: ethers.utils.formatEther(platinum),
    },
    basescanUrl: `https://sepolia.basescan.org/address/${rewardsManager.address}`,
  };

  fs.writeFileSync(
    'rewards-testnet-deployment.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log('💾 Deployment info saved to rewards-testnet-deployment.json');
  console.log('');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
