import { useReadContract, useBlockNumber } from "wagmi";
import { base } from "viem/chains";
import { useEffect, useState } from "react";

const NICHE_ADDRESS = "0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf" as const;

// ERC20 ABI
const ERC20_ABI = [
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
] as const;

export function useNicheCoin() {
  const { data: blockNumber } = useBlockNumber({ watch: true, chainId: base.id });

  // Fetch token name
  const { data: name, refetch: refetchName } = useReadContract({
    address: NICHE_ADDRESS,
    abi: ERC20_ABI,
    functionName: "name",
    chainId: base.id,
  });

  // Fetch token symbol
  const { data: symbol, refetch: refetchSymbol } = useReadContract({
    address: NICHE_ADDRESS,
    abi: ERC20_ABI,
    functionName: "symbol",
    chainId: base.id,
  });

  // Fetch decimals
  const { data: decimals, refetch: refetchDecimals } = useReadContract({
    address: NICHE_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
    chainId: base.id,
  });

  // Fetch total supply
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: NICHE_ADDRESS,
    abi: ERC20_ABI,
    functionName: "totalSupply",
    chainId: base.id,
  });

  // Refetch on new blocks
  useEffect(() => {
    if (blockNumber) {
      refetchName();
      refetchSymbol();
      refetchDecimals();
      refetchTotalSupply();
    }
  }, [blockNumber, refetchName, refetchSymbol, refetchDecimals, refetchTotalSupply]);

  // Format total supply
  const formattedSupply = totalSupply && decimals
    ? (Number(totalSupply) / Math.pow(10, Number(decimals))).toLocaleString()
    : "Loading...";

  return {
    address: NICHE_ADDRESS,
    name: name || "Niche Coin",
    symbol: symbol || "NICHE",
    decimals: decimals || 18,
    totalSupply,
    formattedSupply,
    isLoading: !name || !symbol || !decimals || !totalSupply,
  };
}

export function useTokenBalance(tokenAddress: `0x${string}`, walletAddress?: `0x${string}`) {
  const { data: blockNumber } = useBlockNumber({ watch: true, chainId: base.id });

  const { data: balance, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: walletAddress ? [walletAddress] : undefined,
    chainId: base.id,
    query: {
      enabled: !!walletAddress,
    },
  });

  useEffect(() => {
    if (blockNumber && walletAddress) {
      refetch();
    }
  }, [blockNumber, walletAddress, refetch]);

  return {
    balance,
    formattedBalance: balance ? Number(balance).toLocaleString() : "0",
  };
}
