"use client";

import { useState, useEffect } from "react";
import { formatUnits } from "viem";

interface TokenInfoProps {
  contractAddress: string;
}

interface TokenData {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  divisor: string;
  tokenType: string;
  totalSupply: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  github?: string;
  tokenPriceUSD?: string;
  verified?: boolean;
  basescanUrl?: string;
}

export function TokenInfo({ contractAddress }: TokenInfoProps) {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTokenData();
  }, [contractAddress]);

  const loadTokenData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/token/${contractAddress}`);

      if (!response.ok) {
        throw new Error("Failed to load token data");
      }

      const data = await response.json();
      setTokenData(data.token);
    } catch (err) {
      console.error("Error loading token data:", err);
      setError("Unable to load token information");
    } finally {
      setLoading(false);
    }
  };

  const formatSupply = (supply: string, decimals: string) => {
    try {
      const formatted = formatUnits(BigInt(supply), parseInt(decimals));
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(parseFloat(formatted));
    } catch {
      return supply;
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
      </div>
    );
  }

  if (error || !tokenData) {
    return (
      <div className="glass rounded-xl p-6 border-2 border-red-500/50">
        <p className="text-red-400">{error || "Token not found"}</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">{tokenData.tokenName}</h2>
            {tokenData.verified && (
              <span className="px-2 py-1 bg-green-500/20 border border-green-500 rounded-full text-xs font-semibold text-green-400">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-gray-400">${tokenData.symbol} • {tokenData.tokenType}</p>
        </div>
        {tokenData.tokenPriceUSD && (
          <div className="text-right">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-2xl font-bold text-green-400">
              ${parseFloat(tokenData.tokenPriceUSD).toFixed(6)}
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      {tokenData.description && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
          <p className="text-white">{tokenData.description}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-inner rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Total Supply</p>
          <p className="text-lg font-bold text-white">
            {formatSupply(tokenData.totalSupply, tokenData.divisor)}
          </p>
        </div>
        <div className="glass-inner rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Contract Address</p>
          <p className="text-sm font-mono text-indigo-400 truncate">
            {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
          </p>
        </div>
      </div>

      {/* Social Links */}
      {(tokenData.website || tokenData.twitter || tokenData.telegram || tokenData.discord || tokenData.github) && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Links</h3>
          <div className="flex flex-wrap gap-3">
            {tokenData.website && (
              <a
                href={tokenData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                🌐 Website
              </a>
            )}
            {tokenData.twitter && (
              <a
                href={tokenData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </a>
            )}
            {tokenData.telegram && (
              <a
                href={tokenData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                ✈️ Telegram
              </a>
            )}
            {tokenData.discord && (
              <a
                href={tokenData.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                💬 Discord
              </a>
            )}
            {tokenData.github && (
              <a
                href={tokenData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                💻 GitHub
              </a>
            )}
            {tokenData.basescanUrl && (
              <a
                href={tokenData.basescanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                🔍 View on Basescan
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
