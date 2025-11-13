"use client";

import { Header } from "@/components/Header";
import { FloatingCoin } from "@/components/FloatingCoin";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";

const NICHE_ADDRESS = "0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf";

export default function BuyPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full p-8 relative overflow-hidden">
        {/* 3D Background Elements */}
        {/* Floating Coins */}
        <FloatingCoin size={90} className="absolute top-10 right-10 animate-spin-slow" animationDelay="0s" />
        <FloatingCoin size={65} className="absolute bottom-20 left-10 animate-rotate-3d" animationDelay="2s" />
        <FloatingCoin size={75} className="absolute top-1/3 left-20 animate-float" animationDelay="1.5s" />
        <FloatingCoin size={55} className="absolute bottom-1/3 right-1/4 animate-float-diagonal" animationDelay="3.5s" />
        <FloatingCoin size={70} className="absolute top-2/3 right-1/3 animate-rotate-3d" animationDelay="1s" />
        <FloatingCoin size={60} className="absolute top-1/2 left-1/3 animate-spin-slow" animationDelay="4s" />

        {/* Geometric Shapes */}
        <div className="absolute top-40 right-1/3 geometric-cube animate-spin-slow" style={{ animationDelay: "0s", width: "70px", height: "70px" }}></div>
        <div className="absolute bottom-40 left-1/4 geometric-cube animate-rotate-3d" style={{ animationDelay: "2s", width: "60px", height: "60px" }}></div>
        <div className="absolute top-1/4 right-20 geometric-pyramid animate-float" style={{ animationDelay: "1s" }}></div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="absolute top-1/2 right-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>

        <div className="mb-8 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4 glow-text">Buy Crypto</h1>
          <p className="text-gray-300">
            Purchase NICHE tokens and ETH on Base network
          </p>
        </div>

        {!isConnected && (
          <div className="glass rounded-xl p-8 text-center relative z-10 mb-8">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-gray-300">
              Please connect your wallet to start buying crypto
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Buy NICHE */}
          <div className="glass rounded-xl p-8 border border-indigo-500/50 hover:border-indigo-500 transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/50">
                <Image src="/IMG_3411.jpeg" alt="NICHE Coin" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Buy NICHE
                </h2>
                <p className="text-indigo-300">Official Token</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Purchase NICHE tokens directly on Uniswap V3 on Base network
            </p>

            <div className="space-y-3">
              <Link
                href={`https://app.uniswap.org/swap?outputCurrency=${NICHE_ADDRESS}&chain=base`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all font-medium text-center glow"
              >
                🦄 Swap on Uniswap
              </Link>

              <Link
                href={`https://rainbow.me/token/base/${NICHE_ADDRESS.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium text-center glow"
              >
                🌈 Buy on Rainbow
              </Link>

              <Link
                href={`https://basescan.org/address/${NICHE_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 glass border border-indigo-500 text-indigo-300 rounded-lg hover:bg-indigo-500/20 transition-all font-medium text-center"
              >
                View on BaseScan
              </Link>
            </div>

            <div className="mt-6 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-white font-medium">Base</span>
                </div>
                <div className="flex justify-between">
                  <span>Contract:</span>
                  <span className="text-indigo-300 font-mono text-xs">
                    {NICHE_ADDRESS.slice(0, 6)}...{NICHE_ADDRESS.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buy ETH */}
          <div className="glass rounded-xl p-8 border border-purple-500/50 hover:border-purple-500 transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50">
                💎
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  Buy ETH on Base
                </h2>
                <p className="text-purple-300">Gas & Trading</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Get ETH on Base network for gas fees and trading
            </p>

            <div className="space-y-3">
              <Link
                href="https://www.coinbase.com/buy"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium text-center glow"
              >
                💳 Buy with Coinbase
              </Link>

              <Link
                href="https://bridge.base.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 glass border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-all font-medium text-center"
              >
                🌉 Bridge to Base
              </Link>

              <Link
                href="https://app.uniswap.org/swap?chain=base"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 glass border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-all font-medium text-center"
              >
                🦄 Swap on Uniswap
              </Link>
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-white font-medium">Base</span>
                </div>
                <div className="flex justify-between">
                  <span>Chain ID:</span>
                  <span className="text-purple-300 font-mono">8453</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Guide */}
        <div className="mt-8 glass rounded-xl p-8 relative z-10">
          <h3 className="text-2xl font-bold text-white mb-4">How to Buy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold mb-2">
                1
              </div>
              <h4 className="font-semibold text-white">Connect Wallet</h4>
              <p className="text-sm text-gray-400">
                Connect your wallet using Coinbase Wallet, MetaMask, or WalletConnect
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold mb-2">
                2
              </div>
              <h4 className="font-semibold text-white">Get ETH on Base</h4>
              <p className="text-sm text-gray-400">
                Buy ETH with fiat or bridge from Ethereum mainnet to Base
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold mb-2">
                3
              </div>
              <h4 className="font-semibold text-white">Swap for NICHE</h4>
              <p className="text-sm text-gray-400">
                Use Uniswap to swap your ETH for NICHE tokens
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-6 glass rounded-xl p-6 border border-yellow-500/50 relative z-10">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Important Notice</h4>
              <p className="text-sm text-gray-300">
                Always verify contract addresses before making transactions. Make sure you're on the official Base network (Chain ID: 8453).
                Never share your private keys or seed phrases with anyone.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
