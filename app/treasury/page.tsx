'use client';

import { useState } from 'react';
import TreasuryDashboard from '@/components/TreasuryDashboard';
import YieldClaim from '@/components/YieldClaim';
import RedemptionInterface from '@/components/RedemptionInterface';
import LiquidityProvision from '@/components/LiquidityProvision';

export default function TreasuryPage() {
  const [activeView, setActiveView] = useState<'dashboard' | 'yield' | 'redeem' | 'liquidity'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            USYC Treasury
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Earn yield from US Treasuries through USYC backing, redeem tokens for USDC, and provide liquidity
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveView('yield')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'yield'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
            }`}
          >
            💰 Claim Yield
          </button>
          <button
            onClick={() => setActiveView('redeem')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'redeem'
                ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
            }`}
          >
            🔄 Redeem
          </button>
          <button
            onClick={() => setActiveView('liquidity')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeView === 'liquidity'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-black/40 text-gray-400 hover:bg-black/60 border border-gray-700'
            }`}
          >
            💧 Liquidity
          </button>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeView === 'dashboard' && <TreasuryDashboard />}
          {activeView === 'yield' && <YieldClaim />}
          {activeView === 'redeem' && <RedemptionInterface />}
          {activeView === 'liquidity' && <LiquidityProvision />}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-4xl mb-3">🏦</div>
            <h3 className="text-white font-bold mb-2">Treasury Backing</h3>
            <p className="text-gray-400 text-sm">
              Every token backed by real USDC/USYC in treasury
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/20 text-center">
            <div className="text-4xl mb-3">💸</div>
            <h3 className="text-white font-bold mb-2">Passive Yield</h3>
            <p className="text-gray-400 text-sm">
              Earn ~4-5% APY from US Treasury yields
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20 text-center">
            <div className="text-4xl mb-3">🔓</div>
            <h3 className="text-white font-bold mb-2">No Lock-ups</h3>
            <p className="text-gray-400 text-sm">
              Redeem tokens or claim yield anytime
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-xl p-6 border border-pink-500/20 text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-white font-bold mb-2">Deep Liquidity</h3>
            <p className="text-gray-400 text-sm">
              Stable liquidity backed by USYC treasury
            </p>
          </div>
        </div>

        {/* What is USYC Section */}
        <div className="mt-12 bg-black/40 rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">What is USYC?</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
            <p>
              <strong className="text-purple-400">USYC (Hashnote US Yield Coin)</strong> is a yield-bearing stablecoin
              backed by short-term US Treasury securities. It combines the stability of the US dollar with the yield
              generation of US Treasuries.
            </p>
            <p>
              By integrating USYC into the NicheToken treasury, we create a sustainable yield source that benefits
              all token holders without requiring staking or lock-ups.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-1">Backed by US Treasuries</div>
                <div className="text-sm text-gray-400">Real-world assets, not crypto speculation</div>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-1">Automatic Yield</div>
                <div className="text-sm text-gray-400">Appreciates in value over time</div>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-bold mb-1">Redeemable for USDC</div>
                <div className="text-sm text-gray-400">Exit to stablecoin anytime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <span className="text-yellow-500 text-3xl">⚠️</span>
            <div>
              <h3 className="text-yellow-500 font-bold text-lg mb-2">Security & Risk Notice</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Smart contracts are audited but use at your own risk</li>
                <li>• USYC is subject to regulatory and market risks</li>
                <li>• Yield rates are not guaranteed and may fluctuate</li>
                <li>• Always DYOR (Do Your Own Research) before investing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
