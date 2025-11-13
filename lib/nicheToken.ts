import { Address } from "viem";

// NICHE Token contract address on Base
export const NICHE_TOKEN_ADDRESS: Address = "0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf";

// NICHE Token ABI with mint function
export const NICHE_TOKEN_ABI = [
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
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Helper function to convert NICHE tokens to wei (18 decimals)
export function parseNicheTokens(amount: string): bigint {
  return BigInt(amount) * BigInt(10 ** 18);
}

// Helper function to convert wei to NICHE tokens
export function formatNicheTokens(amount: bigint): string {
  return (Number(amount) / 10 ** 18).toString();
}
