"use client";

import Link from "next/link";
import Image from "next/image";
import { useNicheCoin } from "@/lib/hooks/useNicheCoin";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export function NicheCoinCard() {
  const { address, name, symbol, formattedSupply, isLoading } = useNicheCoin();
  const { address: walletAddress } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="block p-6 glass rounded-xl border border-white/10 animate-pulse">
        <div className="h-24 bg-white/5 rounded"></div>
      </div>
    );
  }

  return (
    <Link
      href={`https://basescan.org/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 glass rounded-xl hover:scale-105 transition-all border border-indigo-500/50 group glow relative overflow-hidden"
    >
      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-400 font-medium">LIVE</span>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/50">
          <Image
            src="/IMG_3411.jpeg"
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {isLoading ? "Loading..." : name}
            </h3>
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded border border-indigo-500/50">
              Official
            </span>
          </div>
          <p className="text-indigo-300 font-mono">${symbol}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Network:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="font-medium text-white">Base</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Total Supply:</span>
          <span className="font-medium text-white tabular-nums">
            {isLoading ? "..." : formattedSupply}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Contract:</span>
          <span className="font-mono text-xs text-indigo-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </Link>
  );
}
