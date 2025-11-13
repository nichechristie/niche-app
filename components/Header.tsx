"use client";

import Link from "next/link";
import { WalletButton } from "./WalletButton";
import { Avatar3D } from "./Avatar3D";

export function Header() {
  return (
    <header className="glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Avatar3D size={40} />
              <span className="text-2xl font-bold glow-text text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Niche Coin
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
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
                href="/blackjack"
                className="text-gray-300 hover:text-indigo-400 transition-colors relative group flex items-center gap-1"
              >
                🎰 Blackjack
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/creatorniche"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="hidden lg:inline">@creatorniche</span>
            </a>
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
