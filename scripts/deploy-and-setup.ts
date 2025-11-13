import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { glob } from 'glob';
import * as readline from 'readline';

const OLD_ADDRESS = '0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf';

// Compiled NicheToken contract bytecode
// You'll need to compile contracts/NicheToken.sol first
const NICHE_TOKEN_ABI = [
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'initialSupply', type: 'uint256' },
      { name: '_creator', type: 'address' },
      { name: '_postId', type: 'uint256' },
      { name: 'description', type: 'string' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

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

async function updateContractAddress(newAddress: string) {
  console.log('\n🔄 Updating contract address throughout the project...\n');

  const patterns = [
    'lib/**/*.{ts,tsx,js,jsx}',
    'app/**/*.{ts,tsx,js,jsx}',
    'components/**/*.{ts,tsx,js,jsx}',
    'scripts/**/*.{ts,tsx,js,jsx}',
    'public/**/*.json',
  ];

  const files: string[] = [];
  for (const pattern of patterns) {
    const matches = await glob(pattern, { ignore: ['node_modules/**', '.next/**', 'dist/**'] });
    files.push(...matches);
  }

  let totalReplacements = 0;

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      if (content.toLowerCase().includes(OLD_ADDRESS.toLowerCase())) {
        const updatedContent = content.replace(
          new RegExp(OLD_ADDRESS, 'gi'),
          newAddress
        );
        const matches = content.match(new RegExp(OLD_ADDRESS, 'gi'));
        const count = matches ? matches.length : 0;

        if (count > 0) {
          writeFileSync(file, updatedContent, 'utf-8');
          totalReplacements += count;
          console.log(`✅ ${file} (${count} replacement${count > 1 ? 's' : ''})`);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  console.log(`\n✨ Updated ${totalReplacements} occurrences across the project\n`);
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║     🚀 NICHE Token Complete Deployment & Setup Script        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('⚠️  IMPORTANT: This script requires compiled contract bytecode.');
  console.log('Please compile the contract first using one of these methods:\n');
  console.log('Option 1: Use Remix (Recommended - Easiest)');
  console.log('  1. Go to https://remix.ethereum.org');
  console.log('  2. Copy contracts/NicheToken.sol');
  console.log('  3. Compile with Solidity 0.8.20');
  console.log('  4. Connect MetaMask to Base network');
  console.log('  5. Deploy with these parameters:');
  console.log('     - NAME: "Find Your Niche"');
  console.log('     - SYMBOL: "NICHE"');
  console.log('     - INITIALSUPPLY: 1000000');
  console.log('     - _CREATOR: [Your wallet address]');
  console.log('     - _POSTID: 1');
  console.log('     - DESCRIPTION: "The Future of Creator Economy"');
  console.log('  6. Copy the deployed contract address\n');

  console.log('Option 2: Use Foundry (Advanced)');
  console.log('  forge create --rpc-url https://mainnet.base.org \\');
  console.log('    --private-key YOUR_KEY \\');
  console.log('    contracts/NicheToken.sol:NicheToken \\');
  console.log('    --constructor-args "Find Your Niche" "NICHE" 1000000000000000000000000 YOUR_ADDRESS 1 "Description"\n');

  const proceed = await prompt('Have you deployed the contract? (yes/no): ');

  if (proceed.toLowerCase() !== 'yes' && proceed.toLowerCase() !== 'y') {
    console.log('\n👋 Please deploy the contract first, then run this script again.');
    process.exit(0);
  }

  const newAddress = await prompt('\n📝 Enter your deployed NICHE contract address: ');

  if (!/^0x[a-fA-F0-9]{40}$/.test(newAddress)) {
    console.error('\n❌ Invalid address format. Must be 0x followed by 40 hex characters.');
    process.exit(1);
  }

  console.log('\n✅ Contract address:', newAddress);

  // Verify the contract on Base
  console.log('\n🔍 Verifying contract on Base network...');

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  try {
    const code = await publicClient.getBytecode({ address: newAddress as `0x${string}` });
    if (!code || code === '0x') {
      console.error('❌ No contract found at this address on Base network.');
      process.exit(1);
    }
    console.log('✅ Contract verified on Base network');
  } catch (error) {
    console.error('❌ Error verifying contract:', error);
    process.exit(1);
  }

  // Update all files
  await updateContractAddress(newAddress);

  // Commit changes
  console.log('📦 Committing changes to git...\n');
  try {
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Update NICHE contract address to ' + newAddress + '"', { stdio: 'inherit' });
    console.log('\n✅ Changes committed\n');
  } catch (error) {
    console.log('⚠️  Git commit failed (this is okay if there are no changes)');
  }

  // Instructions for final steps
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                  🎉 Setup Complete!                           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('📋 Final Steps:\n');
  console.log('1. Add your private key to Vercel:');
  console.log('   npx vercel env add NICHE_TOKEN_OWNER_PRIVATE_KEY production\n');
  console.log('   (Use the same wallet that deployed the contract)\n');

  console.log('2. Deploy to production:');
  console.log('   npx vercel --prod --yes --archive=tgz\n');

  console.log('3. Test the rewards:');
  console.log('   - Complete a Bible lesson');
  console.log('   - Share a testimony');
  console.log('   - Check your wallet for NICHE tokens!\n');

  console.log('🔗 Your contract: https://basescan.org/address/' + newAddress);
  console.log('\n✨ All done! Your NICHE token is ready to reward users!\n');
}

main().catch(console.error);
