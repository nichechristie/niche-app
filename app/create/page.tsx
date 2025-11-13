"use client";

import { Header } from "@/components/Header";
import { FloatingCoin } from "@/components/FloatingCoin";
import { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { createCoin, CreateConstants } from "@/lib/niche-sdk";
import { base } from "viem/chains";

export default function CreatePage() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    metadataUri: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address || !walletClient || !publicClient) {
      setError("Please connect your wallet first");
      return;
    }

    setIsCreating(true);
    setError("");
    setResult(null);

    try {
      const coinResult = await createCoin({
        call: {
          creator: address,
          name: formData.name,
          symbol: formData.symbol,
          metadata: {
            type: "RAW_URI" as const,
            uri: formData.metadataUri,
          },
          currency: CreateConstants.ContentCoinCurrencies.ETH,
          chainId: base.id,
          startingMarketCap: CreateConstants.StartingMarketCaps.LOW,
        },
        walletClient,
        publicClient,
      });

      setResult(coinResult);
    } catch (err: any) {
      setError(err.message || "Failed to create coin");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full p-8 relative overflow-hidden">
        {/* 3D Background Elements */}
        <FloatingCoin
          size={60}
          className="absolute top-20 right-10 animate-rotate-3d"
          animationDelay="0s"
        />
        <FloatingCoin
          size={50}
          className="absolute bottom-32 left-10 animate-float-diagonal"
          animationDelay="1.5s"
        />
        <FloatingCoin
          size={75}
          className="absolute top-1/2 right-1/4 animate-float"
          animationDelay="2.5s"
        />
        <div className="absolute top-1/3 left-20 geometric-cube animate-spin-slow" style={{ animationDelay: "2s", width: "70px", height: "70px" }}></div>
        <div className="absolute bottom-1/4 right-20 geometric-pyramid animate-float" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="glass rounded-xl p-8 relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-white glow-text">Create a New Coin</h1>

          {!isConnected ? (
            <div className="text-center py-12">
              <p className="text-gray-300 mb-4">
                Please connect your wallet to create a coin
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">
                  Coin Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                  placeholder="My Awesome Coin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">
                  Symbol
                </label>
                <input
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      symbol: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                  placeholder="COIN"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">
                  Metadata URI
                </label>
                <input
                  type="url"
                  required
                  value={formData.metadataUri}
                  onChange={(e) =>
                    setFormData({ ...formData, metadataUri: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-indigo-500/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
                  placeholder="ipfs://..."
                />
                <p className="text-sm text-gray-400 mt-1">
                  IPFS or HTTP URL to your coin metadata
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              {result && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <p className="font-medium text-green-400 mb-2">
                    Coin created successfully!
                  </p>
                  <p className="text-sm text-green-300">
                    Address: {result.address}
                  </p>
                  <p className="text-sm text-green-300">
                    Transaction: {result.hash}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isCreating}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all font-medium glow"
              >
                {isCreating ? "Creating Coin..." : "Create Coin"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
