import { setApiKey } from "@zoralabs/coins-sdk";

// Initialize Find Your Niche SDK with API key
if (process.env.NEXT_PUBLIC_NICHE_API_KEY) {
  setApiKey(process.env.NEXT_PUBLIC_NICHE_API_KEY);
}

export * from "@zoralabs/coins-sdk";
