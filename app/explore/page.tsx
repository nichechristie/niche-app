"use client";

import { Header } from "@/components/Header";
import { CoinCard } from "@/components/CoinCard";
import { FloatingCoin } from "@/components/FloatingCoin";
import { NicheCoinCard } from "@/components/NicheCoinCard";
import { useState } from "react";

// Mock data for example coins
const MOCK_COINS = [
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "Example Coin",
    symbol: "EXAMPLE",
    marketCap: "$1.2M",
    volume: "$245K",
    priceChange: 12.5,
  },
  {
    address: "0x0987654321098765432109876543210987654321",
    name: "Test Token",
    symbol: "TEST",
    marketCap: "$850K",
    volume: "$120K",
    priceChange: -5.2,
  },
  {
    address: "0xabcdef123456abcdef123456abcdef123456abcd",
    name: "Demo Coin",
    symbol: "DEMO",
    marketCap: "$2.5M",
    volume: "$500K",
    priceChange: 8.7,
  },
];

export default function ExplorePage() {
  const [filter, setFilter] = useState<"all" | "trending" | "new">("all");

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full p-8 relative overflow-hidden">
        {/* 3D Background Elements */}
        <FloatingCoin
          size={70}
          className="absolute top-10 right-10 animate-spin-slow"
          animationDelay="0s"
        />
        <FloatingCoin
          size={50}
          className="absolute bottom-20 left-10 animate-rotate-3d"
          animationDelay="2s"
        />
        <FloatingCoin
          size={65}
          className="absolute top-1/3 left-20 animate-float"
          animationDelay="1.5s"
        />
        <FloatingCoin
          size={80}
          className="absolute bottom-1/2 right-1/3 animate-float-diagonal"
          animationDelay="3.5s"
        />
        <div className="absolute top-1/2 right-1/4 geometric-cube animate-float" style={{ animationDelay: "1s", width: "60px", height: "60px" }}></div>
        <div className="absolute bottom-1/3 left-1/3 geometric-pyramid animate-float-diagonal" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="mb-8 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4 glow-text">Explore Coins</h1>
          <p className="text-gray-300">
            Discover and trade creator coins and content coins
          </p>
        </div>

        {/* Featured NICHE Coin with Real-time Data */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-white">Official Token</h2>
            <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-full glow">
              Real-time Data
            </div>
          </div>
          <NicheCoinCard />
        </div>

        <div className="mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4">Other Coins</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                filter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                  : "glass text-indigo-300 hover:bg-indigo-500/20"
              }`}
            >
              All Coins
            </button>
            <button
              onClick={() => setFilter("trending")}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                filter === "trending"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                  : "glass text-indigo-300 hover:bg-indigo-500/20"
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setFilter("new")}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                filter === "new"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                  : "glass text-indigo-300 hover:bg-indigo-500/20"
              }`}
            >
              New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {MOCK_COINS.map((coin) => (
            <CoinCard key={coin.address} {...coin} />
          ))}
        </div>

        <div className="mt-8 text-center text-gray-300 relative z-10">
          <p>
            Connect your wallet and create coins to see real data from the Niche
            protocol
          </p>
        </div>
      </main>
    </div>
  );
}
