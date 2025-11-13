"use client";

import { Header } from "@/components/Header";
import { FloatingCoin } from "@/components/FloatingCoin";
import { useState, useRef } from "react";
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
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      setError("Please enter a prompt to generate an image");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl);
      setImagePreview(data.imageUrl);

      // Set the generated image URL as metadata URI
      setFormData({ ...formData, metadataUri: data.imageUrl });
      setImagePrompt("");
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("media", imageFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

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

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Coin image" className="w-full h-64 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                      setGeneratedImageUrl("");
                      setFormData({ ...formData, metadataUri: "" });
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Image Upload & AI Generator */}
              {!imagePreview && (
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-2">
                      Coin Image
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-indigo-500/30 rounded-lg text-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Image
                    </button>
                  </div>

                  {/* AI Image Generator */}
                  <div className="p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-medium text-purple-300">AI Image Generator</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Describe your coin image..."
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
                        disabled={isGenerating}
                      />
                      <button
                        type="button"
                        onClick={generateImage}
                        disabled={isGenerating || !imagePrompt.trim()}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-all"
                      >
                        {isGenerating ? "Generating..." : "Generate"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Powered by DALL-E 3 - Generate unique coin artwork
                    </p>
                  </div>
                </div>
              )}

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
