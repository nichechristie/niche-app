const API_KEY = "80a3db48-a362-46fa-82f5-aef8e0732b25";
const CONTRACT_ADDRESS = "0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf";
const CHAIN_ID = 8453; // Base

async function fetchCoinFromAPI() {
  try {
    console.log("Fetching coin data from Niche API...");

    const url = `https://api.zora.co/coins/${CHAIN_ID}/${CONTRACT_ADDRESS}`;

    console.log("URL:", url);

    const response = await fetch(url, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      const text = await response.text();
      console.error("Response:", text);
      return;
    }

    const data = await response.json();
    console.log("Coin Data:", JSON.stringify(data, null, 2));

    // Look for image in various places
    if (data.metadata?.image) {
      console.log("\n✅ NICHE COIN IMAGE URL:", data.metadata.image);
    } else if (data.image) {
      console.log("\n✅ NICHE COIN IMAGE URL:", data.image);
    } else if (data.icon) {
      console.log("\n✅ NICHE COIN IMAGE URL:", data.icon);
    } else {
      console.log("\n❌ No image found in API response");
    }
  } catch (error) {
    console.error("Error fetching from API:", error);
  }
}

fetchCoinFromAPI();
