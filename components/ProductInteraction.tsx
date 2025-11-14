"use client";

import { Product } from "@/types/store";
import { useCart } from "@/lib/contexts/CartContext";
import { useState } from "react";

interface ProductInteractionProps {
  product: Product;
}

export function ProductInteraction({ product }: ProductInteractionProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[2] // Default to medium
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0] // Default to first color
  );

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <>
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
    </>
  );
}
