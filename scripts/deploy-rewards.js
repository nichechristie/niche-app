/**
 * Deployment script for Rewards System
 *
 * This script deploys the RewardsManager contract on Base network
 *
 * Prerequisites:
 * 1. Install dependencies: npm install ethers hardhat @nomiclabs/hardhat-ethers
 * 2. Set up hardhat.config.js with Base configuration
 * 3. Set PRIVATE_KEY and TOKEN_ADDRESS in .env
 * 4. Have ETH for gas fees on Base
 *
 * Usage:
 * npx hardhat run scripts/deploy-rewards.js --network base
 */

const { ethers } = require('hardhat');

async function main() {
  console.log('🚀 Starting Rewards System Deployment...\n');

  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', ethers.utils.formatEther(await deployer.getBalance()), 'ETH\n');

  // Configuration
  const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS || process.env.NICHE_TOKEN_ADDRESS;

  if (!TOKEN_ADDRESS || TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    console.error('❌ Error: TOKEN_ADDRESS not set in environment variables');
    console.log('Please set TOKEN_ADDRESS (your Clanker token address) in your .env file');
    process.exit(1);
  }

  console.log('Configuration:');
  console.log('- Reward Token Address:', TOKEN_ADDRESS);
  console.log('- Deployer:', deployer.address);
  console.log('');

  // Deploy RewardsManager
  console.log('📦 Deploying RewardsManager...');
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
  console.log('🎉 DEPLOYMENT COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('Contract Address:');
  console.log('-----------------------------------------------------------');
  console.log('RewardsManager: ', rewardsManager.address);
  console.log('');
  console.log('Contract ABI saved to:');
  console.log('- artifacts/contracts/RewardsManager.sol/RewardsManager.json');
  console.log('');
  console.log('Next Steps:');
  console.log('-----------------------------------------------------------');
  console.log('1. Update contract address in frontend files:');
  console.log('   - components/RewardsAdmin.tsx');
  console.log('   - components/UserRewards.tsx');
  console.log('   - components/RewardsLeaderboard.tsx');
  console.log('   - app/api/rewards/distribute/route.ts');
  console.log('');
  console.log('2. Update .env with:');
  console.log(`   REWARDS_MANAGER_ADDRESS=${rewardsManager.address}`);
  console.log('   REWARDS_API_KEY=your_secret_api_key_here');
  console.log('   REWARDS_PRIVATE_KEY=your_private_key_for_distributing_rewards');
  console.log('');
  console.log('3. Fund the rewards pool:');
  console.log('   Send tokens to the RewardsManager contract');
  console.log(`   Contract: ${rewardsManager.address}`);
  console.log('');
  console.log('4. Verify contract on BaseScan:');
  console.log(`   npx hardhat verify --network base ${rewardsManager.address} ${TOKEN_ADDRESS}`);
  console.log('');
  console.log('5. Test the system:');
  console.log('   - Visit /rewards to see the dashboard');
  console.log('   - Distribute a test reward from admin panel');
  console.log('   - Check user rewards display');
  console.log('   - View leaderboard');
  console.log('');
  console.log('6. Integrate automatic rewards:');
  console.log('   - Call /api/rewards/distribute when users take actions');
  console.log('   - Set up proper API key authentication');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');

  // Save deployment info to file
  const fs = require('fs');
  const deploymentInfo = {
    network: 'base',
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
  };

  fs.writeFileSync(
    'rewards-deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log('💾 Deployment info saved to rewards-deployment-info.json');
  console.log('');

  // Example code for funding the pool
  console.log('Example: Fund Rewards Pool');
  console.log('-----------------------------------------------------------');
  console.log('// Using ethers.js');
  console.log(`const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, signer);`);
  console.log(`const amount = ethers.utils.parseEther("10000"); // 10,000 tokens`);
  console.log(`await tokenContract.transfer("${rewardsManager.address}", amount);`);
  console.log('');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
