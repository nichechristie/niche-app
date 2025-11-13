"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Testimony } from "@/types/testimony";
import { WriteTestimony } from "./WriteTestimony";

export function TestimonyBlog() {
  const { address } = useAccount();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadTestimonies();
  }, []);

  const loadTestimonies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/testimony");
      if (response.ok) {
        const data = await response.json();
        setTestimonies(data.testimonies || []);
      }
    } catch (error) {
      console.error("Error loading testimonies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (testimonyId: string) => {
    if (!address) {
      alert("Please connect your wallet to like testimonies");
      return;
    }

    try {
      const response = await fetch("/api/testimony/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonyId, address }),
      });

      if (response.ok) {
        loadTestimonies();
      }
    } catch (error) {
      console.error("Error liking testimony:", error);
    }
  };

  const filteredTestimonies = filter === "all"
    ? testimonies
    : testimonies.filter(t => t.category === filter);

  const categories = ["all", ...Array.from(new Set(testimonies.map(t => t.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-xl p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Testimony Blog</h1>
        <p className="text-gray-400">Share your faith journey and inspire others</p>
      </div>

      {/* Write Testimony */}
      <WriteTestimony onTestimonyCreated={loadTestimonies} />

      {/* Filter */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
            >
              {cat === "all" ? "All Testimonies" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonies */}
      {loading ? (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-gray-400">Loading testimonies...</p>
        </div>
      ) : filteredTestimonies.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-gray-400">No testimonies yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTestimonies.map((testimony) => (
            <div key={testimony.id} className="glass rounded-xl p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{testimony.title}</h3>
                    <span className="px-2 py-1 bg-indigo-500/20 border border-indigo-500 rounded-full text-xs font-semibold text-indigo-400">
                      {testimony.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    By {testimony.username} • {new Date(testimony.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 whitespace-pre-wrap mb-4">{testimony.content}</p>

              {/* Tags */}
              {testimony.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {testimony.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-700 text-gray-400 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
                <button
                  onClick={() => handleLike(testimony.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    address && testimony.likes.includes(address)
                      ? "bg-pink-500 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{testimony.likes.length}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-gray-300 hover:bg-slate-600 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{testimony.comments.length}</span>
                </button>

                <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-slate-700 text-gray-300 hover:bg-slate-600 rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
