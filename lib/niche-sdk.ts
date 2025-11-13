import { setApiKey } from "@zoralabs/coins-sdk";

// Initialize Niche Coin SDK with API key
if (process.env.NEXT_PUBLIC_NICHE_API_KEY) {
  setApiKey(process.env.NEXT_PUBLIC_NICHE_API_KEY);
}

export * from "@zoralabs/coins-sdk";
