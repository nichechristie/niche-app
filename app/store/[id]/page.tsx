"use client";

import { Header } from "@/components/Header";
import { getProductById, products } from "@/lib/products";
import { useCart } from "@/lib/contexts/CartContext";
import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[2] // Default to medium
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0] // Default to first color
  );

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/store" className="hover:text-indigo-400 transition-colors">
            Store
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center relative">
              <div className="text-9xl">
                {product.category === "apparel" ? "👕" : "🎒"}
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.featured && (
              <div className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
                ⭐ Featured Product
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="glass p-6 rounded-xl mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-white">${product.price}</span>
                {product.priceInETH && (
                  <span className="text-xl text-gray-400">or {product.priceInETH} ETH</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-2">💰 Crypto payments accepted!</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-white font-semibold mb-3 block">Select Size:</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                          : "glass border border-gray-700 text-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="text-white font-semibold mb-3 block">Select Color:</label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedColor === color
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white glow"
                          : "glass border border-gray-700 text-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-white font-semibold mb-3 block">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg glass border border-gray-700 hover:border-indigo-500 text-white font-bold transition-all"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-white w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg glass border border-gray-700 hover:border-indigo-500 text-white font-bold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed glow mb-4"
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <Link
              href="/store"
              className="block w-full py-4 glass border border-gray-700 text-gray-300 text-center rounded-xl hover:bg-gray-800 transition-all font-semibold"
            >
              Continue Shopping
            </Link>

            {/* Product Features */}
            <div className="mt-12 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-white font-semibold">Fast Shipping</h3>
                  <p className="text-gray-400 text-sm">Ships in 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💎</span>
                <div>
                  <h3 className="text-white font-semibold">Premium Quality</h3>
                  <p className="text-gray-400 text-sm">High-quality materials built to last</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="text-white font-semibold">30-Day Returns</h3>
                  <p className="text-gray-400 text-sm">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
