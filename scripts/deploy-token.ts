import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as readline from 'readline';

// NicheToken contract bytecode and ABI
// This is a simplified version - you'll need the actual compiled contract
const NICHE_TOKEN_BYTECODE = ''; // We'll need to compile the contract first

async function promptForPrivateKey(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter your private key (it will not be displayed): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function deployNicheToken() {
  console.log('🚀 Niche Token Deployment Script\n');
  console.log('Network: Base Mainnet');
  console.log('⚠️  Make sure you have ETH on Base for gas fees\n');

  // Get private key from user
  const privateKey = await promptForPrivateKey();

  if (!privateKey.startsWith('0x')) {
    console.error('❌ Private key must start with 0x');
    process.exit(1);
  }

  const account = privateKeyToAccount(privateKey as `0x${string}`);
  console.log('\n✅ Deploying from address:', account.address);

  // Create clients
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  // Check balance
  const balance = await publicClient.getBalance({ address: account.address });
  console.log('💰 Balance:', Number(balance) / 1e18, 'ETH\n');

  if (balance < parseEther('0.001')) {
    console.error('❌ Insufficient balance. You need at least 0.001 ETH for deployment');
    process.exit(1);
  }

  console.log('📝 Token Parameters:');
  console.log('   Name: Niche Coin');
  console.log('   Symbol: NICHE');
  console.log('   Initial Supply: 1,000,000 NICHE');
  console.log('   Decimals: 18\n');

  console.log('⚠️  This script requires the compiled contract bytecode.');
  console.log('Please deploy using one of these methods:\n');
  console.log('1. Use Remix IDE: https://remix.ethereum.org');
  console.log('   - Copy contracts/NicheToken.sol');
  console.log('   - Compile with Solidity 0.8.20');
  console.log('   - Deploy to Base network with MetaMask\n');

  console.log('2. Use Hardhat:');
  console.log('   - npx hardhat run scripts/deploy-hardhat.ts --network base\n');

  console.log('3. Use Foundry:');
  console.log('   - forge create --rpc-url https://mainnet.base.org \\');
  console.log('     --private-key YOUR_KEY \\');
  console.log('     contracts/NicheToken.sol:NicheToken \\');
  console.log('     --constructor-args "Niche Coin" "NICHE" 1000000000000000000000000 YOUR_ADDRESS 1 "The Future of Creator Economy"\n');

  console.log('After deployment, update lib/nicheToken.ts with the new contract address.');
}

deployNicheToken().catch(console.error);
