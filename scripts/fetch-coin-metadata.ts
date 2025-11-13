import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const CONTRACT_ADDRESS = "0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf";

// ERC20 ABI for name, symbol, and common metadata functions
const ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uri",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

async function fetchCoinMetadata() {
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  try {
    console.log("Fetching coin metadata from contract:", CONTRACT_ADDRESS);

    // Try to get name and symbol
    const [name, symbol] = await Promise.all([
      client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "name",
      }),
      client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "symbol",
      }),
    ]);

    console.log("Name:", name);
    console.log("Symbol:", symbol);

    // Try to get metadata URI
    let metadataUri = "";
    try {
      metadataUri = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: ABI,
        functionName: "uri",
      });
    } catch (e) {
      try {
        metadataUri = await client.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: ABI,
          functionName: "contractURI",
        });
      } catch (e2) {
        console.log("No metadata URI found");
      }
    }

    if (metadataUri) {
      console.log("Metadata URI:", metadataUri);

      // Fetch the metadata JSON
      const response = await fetch(metadataUri);
      const metadata = await response.json();
      console.log("Metadata:", JSON.stringify(metadata, null, 2));

      if (metadata.image) {
        console.log("\n✅ NICHE COIN IMAGE URL:", metadata.image);
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
}

fetchCoinMetadata();
