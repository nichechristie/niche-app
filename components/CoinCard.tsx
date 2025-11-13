import Link from "next/link";
import Image from "next/image";

interface CoinCardProps {
  address: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  marketCap?: string;
  volume?: string;
  priceChange?: number;
}

export function CoinCard({
  address,
  name,
  symbol,
  imageUrl,
  marketCap,
  volume,
  priceChange,
}: CoinCardProps) {
  return (
    <Link
      href={`/coin/${address}`}
      className="block p-6 glass rounded-xl hover:scale-105 transition-all border border-white/10 hover:border-indigo-500/50 group glow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {imageUrl && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
            <p className="text-indigo-300 font-mono">${symbol}</p>
          </div>
        </div>
        {priceChange !== undefined && (
          <span
            className={`px-3 py-1 rounded-lg text-sm font-medium glass ${
              priceChange >= 0
                ? "text-green-400 border border-green-500/50"
                : "text-red-400 border border-red-500/50"
            }`}
          >
            {priceChange >= 0 ? "↗" : "↘"} {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        {marketCap && (
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap:</span>
            <span className="font-medium text-white">{marketCap}</span>
          </div>
        )}
        {volume && (
          <div className="flex justify-between">
            <span className="text-gray-400">Volume:</span>
            <span className="font-medium text-white">{volume}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-400">Address:</span>
          <span className="font-mono text-xs text-indigo-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      </div>
    </Link>
  );
}
