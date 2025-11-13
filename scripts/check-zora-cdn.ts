const CONTRACT_ADDRESS = "0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf";

// Common image URL patterns for tokens
const possibleUrls = [
  // Local hosted image
  `http://localhost:3003/IMG_3411.jpeg`,
  `http://localhost:3003/niche-metadata.json`,
  `https://zora.co/api/thumbnail/${CONTRACT_ADDRESS}`,
  `https://zora.co/assets/${CONTRACT_ADDRESS}`,
  `https://remote-image.decentralized-content.com/image?url=https://zora.co/${CONTRACT_ADDRESS}`,
  `https://magic.decentralized-content.com/v0/images/${CONTRACT_ADDRESS}`,
  // Standard token logo CDNs
  `https://assets.coingecko.com/coins/images/niche/large.png`,
  // Try Zora's coin image endpoint
  `https://zora.co/api/coins/image/${CONTRACT_ADDRESS}`,
];

async function checkImageUrls() {
  console.log("Checking possible NICHE coin image URLs...\n");

  for (const url of possibleUrls) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      console.log(`${url}`);
      console.log(`  Status: ${response.status} ${response.statusText}`);
      console.log(`  Content-Type: ${response.headers.get("content-type")}`);

      if (response.ok && response.headers.get("content-type")?.includes("image")) {
        console.log(`  ✅ FOUND IMAGE!\n`);
      } else {
        console.log();
      }
    } catch (error: any) {
      console.log(`${url}`);
      console.log(`  ❌ Error: ${error.message}\n`);
    }
  }
}

checkImageUrls();
