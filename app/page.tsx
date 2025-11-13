import { Header } from "@/components/Header";
import { RewardsBanner } from "@/components/RewardsBanner";
import { FloatingCoin } from "@/components/FloatingCoin";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <RewardsBanner />
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-12 relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

        {/* 3D Crypto Elements */}
        {/* Floating Coins - Using custom Niche Coin image */}
        <FloatingCoin
          size={100}
          className="absolute top-32 right-1/4 animate-rotate-3d"
          animationDelay="0s"
        />
        <FloatingCoin
          size={70}
          className="absolute bottom-32 left-1/4 animate-rotate-3d"
          animationDelay="3s"
        />
        <FloatingCoin
          size={60}
          className="absolute top-1/2 right-20 animate-float-diagonal"
          animationDelay="1.5s"
        />
        <FloatingCoin
          size={85}
          className="absolute top-1/4 left-1/2 animate-float"
          animationDelay="2s"
        />
        <FloatingCoin
          size={65}
          className="absolute bottom-1/4 right-1/3 animate-spin-slow"
          animationDelay="4s"
        />
        <FloatingCoin
          size={55}
          className="absolute top-2/3 left-1/4 animate-rotate-3d"
          animationDelay="1s"
        />

        {/* Geometric Shapes */}
        <div className="absolute top-40 left-20 geometric-cube animate-spin-slow" style={{ animationDelay: "0s" }}></div>
        <div className="absolute bottom-40 right-32 geometric-cube animate-rotate-3d" style={{ animationDelay: "2s", width: "80px", height: "80px" }}></div>
        <div className="absolute top-1/3 right-40 geometric-pyramid animate-float" style={{ animationDelay: "1s" }}></div>

        {/* Blockchain Network Nodes */}
        <div className="absolute top-1/4 left-1/3 blockchain-node animate-blockchain-pulse" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-1/3 left-1/2 blockchain-node animate-blockchain-pulse" style={{ animationDelay: "0.3s" }}></div>
        <div className="absolute top-1/2 left-2/3 blockchain-node animate-blockchain-pulse" style={{ animationDelay: "0.6s" }}></div>
        <div className="absolute bottom-1/3 right-1/3 blockchain-node animate-blockchain-pulse" style={{ animationDelay: "0.9s" }}></div>
        <div className="absolute bottom-1/4 right-1/2 blockchain-node animate-blockchain-pulse" style={{ animationDelay: "1.2s" }}></div>

        <div className="text-center space-y-6 relative z-10">
          <div className="inline-block glass px-4 py-2 rounded-full text-indigo-400 text-sm font-medium mb-4">
            🚀 The Future of Creator Economy
          </div>
          <h1 className="text-6xl md:text-7xl font-bold glow-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Welcome to Niche Coin
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trade creator coins and content coins. Every post becomes an{" "}
            <span className="text-indigo-400 font-semibold">instantly tradeable</span>{" "}
            cryptocurrency token on Base.
          </p>
        </div>

        <div className="flex gap-6 relative z-10">
          <Link
            href="/explore"
            className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all font-medium glow relative overflow-hidden"
          >
            <span className="relative z-10">Explore Coins</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </Link>
          <Link
            href="/create"
            className="group px-8 py-4 glass border-2 border-indigo-500 text-indigo-300 rounded-xl hover:bg-indigo-500/20 transition-all font-medium glow"
          >
            Create Coin
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10 max-w-4xl">
          <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Instant Trading</h3>
            <p className="text-gray-400 text-sm">Trade coins instantly on Uniswap V4 with automated rewards</p>
          </div>
          <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Creator Rewards</h3>
            <p className="text-gray-400 text-sm">Earn $NICHE on every trade of your coins</p>
          </div>
          <div className="glass p-6 rounded-xl hover:scale-105 transition-transform">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold text-pink-400 mb-2">Secure & Decentralized</h3>
            <p className="text-gray-400 text-sm">Built on Base with smart contract security</p>
          </div>
        </div>
      </main>
    </div>
  );
}
