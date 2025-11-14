/**
 * Deployment script for USYC Integration
 *
 * This script deploys the NicheTreasury and NicheLiquidityManager contracts
 *
 * Prerequisites:
 * 1. Install dependencies: npm install ethers hardhat @nomiclabs/hardhat-ethers
 * 2. Set up hardhat.config.js with mainnet configuration
 * 3. Set PRIVATE_KEY in .env
 * 4. Have ETH for gas fees on mainnet
 *
 * Usage:
 * npx hardhat run scripts/deploy-usyc-integration.js --network mainnet
 */

const { ethers } = require('hardhat');

async function main() {
  console.log('🚀 Starting USYC Integration Deployment...\n');

  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', ethers.utils.formatEther(await deployer.getBalance()), 'ETH\n');

  // Configuration
  const NICHE_TOKEN_ADDRESS = process.env.NICHE_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000';

  if (NICHE_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000') {
    console.error('❌ Error: NICHE_TOKEN_ADDRESS not set in environment variables');
    console.log('Please set NICHE_TOKEN_ADDRESS in your .env file');
    process.exit(1);
  }

  console.log('Configuration:');
  console.log('- NicheToken Address:', NICHE_TOKEN_ADDRESS);
  console.log('- Deployer:', deployer.address);
  console.log('');

  // Deploy NicheTreasury
  console.log('📦 Deploying NicheTreasury...');
  const NicheTreasury = await ethers.getContractFactory('NicheTreasury');
  const treasury = await NicheTreasury.deploy(NICHE_TOKEN_ADDRESS);
  await treasury.deployed();
  console.log('✅ NicheTreasury deployed to:', treasury.address);
  console.log('');

  // Deploy NicheLiquidityManager
  console.log('📦 Deploying NicheLiquidityManager...');
  const NicheLiquidityManager = await ethers.getContractFactory('NicheLiquidityManager');
  const liquidityManager = await NicheLiquidityManager.deploy(NICHE_TOKEN_ADDRESS);
  await liquidityManager.deployed();
  console.log('✅ NicheLiquidityManager deployed to:', liquidityManager.address);
  console.log('');

  // Deployment Summary
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 DEPLOYMENT COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('Contract Addresses:');
  console.log('-----------------------------------------------------------');
  console.log('NicheTreasury:          ', treasury.address);
  console.log('NicheLiquidityManager:  ', liquidityManager.address);
  console.log('');
  console.log('Contract ABIs saved to:');
  console.log('- artifacts/contracts/NicheTreasury.sol/NicheTreasury.json');
  console.log('- artifacts/contracts/NicheLiquidityManager.sol/NicheLiquidityManager.json');
  console.log('');
  console.log('Next Steps:');
  console.log('-----------------------------------------------------------');
  console.log('1. Update frontend contract addresses:');
  console.log('   - components/TreasuryDashboard.tsx');
  console.log('   - components/YieldClaim.tsx');
  console.log('   - components/RedemptionInterface.tsx');
  console.log('   - components/LiquidityProvision.tsx');
  console.log('');
  console.log('2. Verify contracts on Etherscan:');
  console.log(`   npx hardhat verify --network mainnet ${treasury.address} ${NICHE_TOKEN_ADDRESS}`);
  console.log(`   npx hardhat verify --network mainnet ${liquidityManager.address} ${NICHE_TOKEN_ADDRESS}`);
  console.log('');
  console.log('3. Fund the treasury with initial USDC to start earning yield');
  console.log('');
  console.log('4. Test all functions:');
  console.log('   - Deposit USDC to treasury');
  console.log('   - Verify USYC purchase');
  console.log('   - Test yield distribution');
  console.log('   - Test redemption');
  console.log('   - Test liquidity provision');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');

  // Save deployment info to file
  const fs = require('fs');
  const deploymentInfo = {
    network: 'mainnet',
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      NicheTreasury: treasury.address,
      NicheLiquidityManager: liquidityManager.address,
      NicheToken: NICHE_TOKEN_ADDRESS,
    },
    configuration: {
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      USYC: '0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b',
      Teller: '0x5C73E1cfdD85b7f1d608F7F7736fC8C653513B7A',
    },
  };

  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log('💾 Deployment info saved to deployment-info.json');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
