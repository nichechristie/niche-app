"use client";

import { useState, useRef } from "react";
import { useAccount } from "wagmi";

interface CreatePostProps {
  onPostCreated?: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { address } = useAccount();
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [coinName, setCoinName] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const type = file.type.startsWith("image/") ? "image" : "video";
    setMediaFile(file);
    setMediaType(type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
      setMediaFile(file);
      setMediaType("image");
      setMediaPreview(canvas.toDataURL("image/jpeg"));
      stopCamera();
    }, "image/jpeg");
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview("");
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreatePost = async () => {
    if (!address || (!content.trim() && !mediaFile)) {
      alert("Please connect your wallet and add content or media");
      return;
    }

    if (!coinName.trim() || !coinSymbol.trim()) {
      alert("Please provide a coin name and symbol for your post");
      return;
    }

    setIsCreating(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("content", content);
      formData.append("coinName", coinName);
      formData.append("coinSymbol", coinSymbol);
      formData.append("address", address);
      if (mediaFile) {
        formData.append("media", mediaFile);
        formData.append("mediaType", mediaType || "");
      }

      // Upload post and create token
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();

      // Reset form
      setContent("");
      setCoinName("");
      setCoinSymbol("");
      removeMedia();

      if (onPostCreated) {
        onPostCreated();
      }

      alert(`Post created! Token ${data.coinSymbol} minted at ${data.coinAddress}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  if (!address) {
    return (
      <div className="glass rounded-xl p-6 text-center">
        <p className="text-gray-400">Connect your wallet to create posts</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-indigo-400">Create Post & Mint Token</h2>

      {/* Post Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
        rows={4}
      />

      {/* Coin Details */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
          placeholder="Token Name (e.g., My Epic Post)"
          className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          value={coinSymbol}
          onChange={(e) => setCoinSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol (e.g., MYPOST)"
          maxLength={10}
          className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Media Preview */}
      {mediaPreview && (
        <div className="relative rounded-lg overflow-hidden">
          {mediaType === "image" ? (
            <img src={mediaPreview} alt="Preview" className="w-full h-64 object-cover" />
          ) : (
            <video src={mediaPreview} controls className="w-full h-64 object-cover" />
          )}
          <button
            onClick={removeMedia}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Camera View */}
      {showCamera && (
        <div className="relative rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={capturePhoto}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-4 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Media Upload Buttons */}
      {!mediaPreview && !showCamera && (
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 rounded-lg text-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload Photo/Video
          </button>
          <button
            onClick={startCamera}
            className="flex-1 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 rounded-lg text-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Take Photo
          </button>
        </div>
      )}

      {/* Create Post Button */}
      <button
        onClick={handleCreatePost}
        disabled={isCreating || (!content.trim() && !mediaFile) || !coinName.trim() || !coinSymbol.trim()}
        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
      >
        {isCreating ? "Creating Post & Minting Token..." : "Create Post & Mint Token"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Each post creates a unique token paired with NICHE and ETH
      </p>
    </div>
  );
}
