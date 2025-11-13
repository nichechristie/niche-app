const { createPublicClient, http } = require('viem');
const { base } = require('viem/chains');

const NICHE_ADDRESS = '0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf';

const OWNER_ABI = [
  {
    inputs: [],
    name: 'owner',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

async function checkOwner() {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  const owner = await client.readContract({
    address: NICHE_ADDRESS,
    abi: OWNER_ABI,
    functionName: 'owner',
  });

  console.log('Contract Address:', NICHE_ADDRESS);
  console.log('Owner Address:', owner);
  console.log('\nYou need the private key from this owner address:', owner);
}

checkOwner().catch(console.error);
