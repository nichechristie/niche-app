"use client";

import { Product } from "@/types/store";
import Link from "next/link";
import { useCart } from "@/lib/contexts/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[2] // Default to medium size
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0] // Default to first color
  );

  const handleQuickAdd = () => {
    addToCart(product, 1, selectedSize, selectedColor);
  };

  return (
    <div className="glass rounded-xl overflow-hidden hover:scale-105 transition-all group relative">
      {product.featured && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
          ⭐ Featured
        </div>
      )}

      {/* Product Image Placeholder */}
      <Link href={`/store/${product.id}`} className="block">
        <div className="relative h-64 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center overflow-hidden">
          <div className="text-8xl group-hover:scale-110 transition-transform">
            {product.category === "apparel" ? "👕" : "🎒"}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-white font-bold text-xl">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/store/${product.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <label className="text-xs text-gray-400 mb-2 block">Size:</label>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    selectedSize === size
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-2 block">Color:</label>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    selectedColor === color
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-white">${product.price}</p>
            {product.priceInETH && (
              <p className="text-sm text-gray-400">{product.priceInETH} ETH</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/store/${product.id}`}
            className="flex-1 py-3 glass border border-indigo-500 text-indigo-300 rounded-lg hover:bg-indigo-500/20 transition-all text-center font-semibold text-sm"
          >
            View Details
          </Link>
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed glow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
