import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import * as readline from 'readline';

const OLD_ADDRESS = '0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf';

async function promptForAddress(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter your new NICHE token contract address: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

async function updateContractAddress() {
  console.log('📝 NICHE Contract Address Updater\n');
  console.log('Current address:', OLD_ADDRESS);

  const newAddress = await promptForAddress();

  if (!isValidAddress(newAddress)) {
    console.error('❌ Invalid Ethereum address format');
    console.error('   Address must start with 0x followed by 40 hexadecimal characters');
    process.exit(1);
  }

  console.log('\n✅ New address:', newAddress);
  console.log('\n🔍 Searching for files to update...\n');

  // Find all files that might contain the contract address
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
  const updatedFiles: string[] = [];

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');

      // Check if file contains the old address (case insensitive)
      if (content.toLowerCase().includes(OLD_ADDRESS.toLowerCase())) {
        // Replace all occurrences (case insensitive)
        const updatedContent = content.replace(
          new RegExp(OLD_ADDRESS, 'gi'),
          newAddress
        );

        // Count replacements
        const matches = content.match(new RegExp(OLD_ADDRESS, 'gi'));
        const count = matches ? matches.length : 0;

        if (count > 0) {
          writeFileSync(file, updatedContent, 'utf-8');
          updatedFiles.push(file);
          totalReplacements += count;
          console.log(`✅ ${file} (${count} replacement${count > 1 ? 's' : ''})`);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Files updated: ${updatedFiles.length}`);
  console.log(`   Total replacements: ${totalReplacements}`);

  if (updatedFiles.length > 0) {
    console.log('\n✨ Success! Contract address updated throughout the project.');
    console.log('\n📝 Next steps:');
    console.log('   1. Review the changes with: git diff');
    console.log('   2. Test locally: npm run dev');
    console.log('   3. Commit changes: git add . && git commit -m "Update NICHE contract address"');
    console.log('   4. Deploy: npx vercel --prod --yes --archive=tgz');
    console.log('\n⚠️  Don\'t forget to add your private key to Vercel:');
    console.log('   npx vercel env add NICHE_TOKEN_OWNER_PRIVATE_KEY production');
  } else {
    console.log('\n⚠️  No files were updated. The old address might not exist in the project.');
  }
}

updateContractAddress().catch(console.error);
