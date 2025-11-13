"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { TestimonyCategory } from "@/types/testimony";

const CATEGORIES: TestimonyCategory[] = [
  "Salvation",
  "Healing",
  "Provision",
  "Answered Prayer",
  "Deliverance",
  "Restored Relationship",
  "Spiritual Growth",
  "Miracle",
  "Other",
];

export function WriteTestimony({ onTestimonyCreated }: { onTestimonyCreated: () => void }) {
  const { address } = useAccount();
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<TestimonyCategory>("Salvation");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !title.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/testimony/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          title: title.trim(),
          content: content.trim(),
          category,
          tags: tags.split(",").map(t => t.trim()).filter(t => t),
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Testimony shared! You earned ${data.reward} NICHE tokens for sharing your faith!`);
        setTitle("");
        setContent("");
        setTags("");
        setCategory("Salvation");
        setIsWriting(false);
        onTestimonyCreated();
      } else {
        alert("Failed to share testimony. Please try again.");
      }
    } catch (error) {
      console.error("Error creating testimony:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!address) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-gray-400">Connect your wallet to share your testimony and earn NICHE tokens</p>
      </div>
    );
  }

  if (!isWriting) {
    return (
      <button
        onClick={() => setIsWriting(true)}
        className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all shadow-lg"
      >
        ✍️ Share Your Testimony & Earn 5 NICHE
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Share Your Testimony</h3>
        <button
          type="button"
          onClick={() => setIsWriting(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your testimony a title..."
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          maxLength={100}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TestimonyCategory)}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Your Testimony
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share how God has worked in your life..."
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-48 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Tags (optional, comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="faith, healing, miracle..."
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsWriting(false)}
          className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !title.trim() || !content.trim()}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Sharing..." : "Share Testimony"}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        💎 Earn 5 NICHE tokens for sharing your testimony + get likes from the community
      </p>
    </form>
  );
}
