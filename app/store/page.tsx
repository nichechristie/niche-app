"use client";

import { Header } from "@/components/Header";
import { products, featuredProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

type FilterType = "all" | "apparel" | "accessories";

export default function StorePage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProducts = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="relative z-10">
            <div className="inline-block glass px-4 py-2 rounded-full text-indigo-400 text-sm font-medium mb-4">
              🛍️ Official Merch Store
            </div>
            <h1 className="text-5xl md:text-6xl font-bold glow-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6">
              Find Your Niche Merch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              Rep the revolution. Premium gear for creators building the future on Base.
            </p>
            <div className="glass inline-block px-6 py-3 rounded-lg border border-indigo-500/50">
              <p className="text-indigo-400 font-semibold">💰 We Accept Crypto!</p>
              <p className="text-gray-400 text-sm">Pay with ETH, USDC, or card</p>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-yellow-500">⭐</span>
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                : "glass border border-gray-700 text-gray-300 hover:border-indigo-500"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilter("apparel")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === "apparel"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                : "glass border border-gray-700 text-gray-300 hover:border-indigo-500"
            }`}
          >
            👕 Apparel
          </button>
          <button
            onClick={() => setFilter("accessories")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === "accessories"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                : "glass border border-gray-700 text-gray-300 hover:border-indigo-500"
            }`}
          >
            🎒 Accessories
          </button>
        </div>

        {/* All Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Store Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Fast Shipping</h3>
            <p className="text-gray-400">
              Your merch ships in 2-3 business days. Track your package like you track your portfolio.
            </p>
          </div>
          <div className="glass p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold text-white mb-2">30-Day Returns</h3>
            <p className="text-gray-400">
              Our return policy is as transparent as the blockchain. 30-day returns, no questions asked.
            </p>
          </div>
          <div className="glass p-8 rounded-xl text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
            <p className="text-gray-400">
              Built different. High-quality materials for creators who never stop grinding.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
