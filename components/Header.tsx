"use client";

import Link from "next/link";
import { useState } from "react";
import { WalletButton } from "./WalletButton";
import { Avatar3D } from "./Avatar3D";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Avatar3D size={40} />
              <span className="text-2xl font-bold glow-text text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Find your NICHE
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/feed"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group"
              >
                Feed
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
              <Link
                href="/explore"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group"
              >
                Explore
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
              <Link
                href="/buy"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group"
              >
                Buy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
              <Link
                href="/create"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group"
              >
                Create
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
              <Link
                href="/bible"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group flex items-center gap-1"
              >
                📖 Bible Study
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
              <Link
                href="/blackjack"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group flex items-center gap-1"
              >
                🎰 Blackjack
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Earn NICHE Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full animate-pulse">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs font-semibold text-yellow-500">Earn NICHE</span>
            </div>

            <a
              href="https://twitter.com/creatorniche"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-gray-300 hover:text-indigo-400 transition-colors items-center gap-2 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="hidden lg:inline">@creatorniche</span>
            </a>
            <WalletButton />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-indigo-400 transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <Link
                href="/feed"
                className="text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Feed
              </Link>
              <Link
                href="/explore"
                className="text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/buy"
                className="text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Buy
              </Link>
              <Link
                href="/create"
                className="text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create
              </Link>
              <Link
                href="/bible"
                className="text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                📖 Bible Study
              </Link>
              <Link
                href="/blackjack"
                className="text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🎰 Blackjack
              </Link>
              <a
                href="https://twitter.com/creatorniche"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden text-gray-300 hover:text-indigo-400 transition-colors px-2 py-2 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                @creatorniche
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
