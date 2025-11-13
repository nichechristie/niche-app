import { createWalletClient, createPublicClient, http, parseEther, encodeFunctionData } from 'viem';
import { base } from 'viem/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import * as readline from 'readline';

// Your NicheToken contract - we'll use a deployment proxy
const DEPLOY_PARAMS = {
  name: 'Niche Coin',
  symbol: 'NICHE',
  initialSupply: 1000000, // 1 million tokens
  postId: 1,
  description: 'The Future of Creator Economy - Earn tokens through Bible study, mythology lessons, and sharing testimonies',
};

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║   🚀 Deploy NICHE Token from Your Smart Wallet on Base       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('📱 This script will help you deploy from your Coinbase Smart Wallet\n');

  console.log('⚠️  Due to the complexity of deploying contracts programmatically,');
  console.log('   I recommend using the Coinbase Wallet browser extension:\n');

  console.log('🌐 EASIEST METHOD - Use Remix with Coinbase Wallet:\n');
  console.log('1. Install Coinbase Wallet extension: https://www.coinbase.com/wallet');
  console.log('2. Go to: https://remix.ethereum.org');
  console.log('3. Create new file: NicheToken.sol');
  console.log('4. Copy contract from: contracts/NicheToken.sol');
  console.log('5. Click "Solidity Compiler" → Compile');
  console.log('6. Click "Deploy & Run"');
  console.log('7. Environment: "Injected Provider - Coinbase Wallet"');
  console.log('8. Make sure you\'re on Base network in your wallet');
  console.log('9. Fill in deployment parameters:');
  console.log(`   - NAME: "${DEPLOY_PARAMS.name}"`);
  console.log(`   - SYMBOL: "${DEPLOY_PARAMS.symbol}"`);
  console.log(`   - INITIALSUPPLY: ${DEPLOY_PARAMS.initialSupply}`);
  console.log('   - _CREATOR: [Your wallet address]');
  console.log(`   - _POSTID: ${DEPLOY_PARAMS.postId}`);
  console.log(`   - DESCRIPTION: "${DEPLOY_PARAMS.description}"`);
  console.log('10. Click "Deploy" and approve in wallet\n');

  console.log('📦 ALTERNATIVE - Use Base\'s Contract Deployer:\n');
  console.log('1. Go to: https://basescan.org/contractsVerified');
  console.log('2. Find a verified NicheToken or ERC20 contract');
  console.log('3. Click "Write Contract" → Connect your wallet');
  console.log('4. Use the contract\'s deployment interface\n');

  const useRemix = await prompt('Press Enter when you\'ve deployed via Remix, or type "skip" to exit: ');

  if (useRemix.toLowerCase() === 'skip') {
    console.log('\n👋 No problem! Deploy when you\'re ready and run:');
    console.log('   npx tsx scripts/deploy-and-setup.ts\n');
    process.exit(0);
  }

  const contractAddress = await prompt('\n📝 Enter your deployed contract address: ');

  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    console.error('\n❌ Invalid address format');
    process.exit(1);
  }

  console.log('\n✅ Contract address:', contractAddress);
  console.log('\n🎉 Perfect! Now let\'s update your project...\n');

  // Run the setup script
  const { execSync } = require('child_process');
  execSync(`echo "${contractAddress}" | npx tsx scripts/deploy-and-setup.ts`, { stdio: 'inherit' });
}

main().catch(console.error);
