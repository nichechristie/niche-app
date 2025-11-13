import Image from "next/image";

interface FloatingCoinProps {
  size?: number;
  className?: string;
  animationDelay?: string;
  style?: React.CSSProperties;
}

export function FloatingCoin({
  size = 80,
  className = "",
  animationDelay = "0s",
  style = {}
}: FloatingCoinProps) {
  return (
    <div
      className={`coin-3d ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDelay,
        ...style,
      }}
    >
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Image
          src="/IMG_3411.jpeg"
          alt="Niche Coin"
          fill
          className="object-cover"
          style={{ opacity: 0.95 }}
        />
      </div>
    </div>
  );
}
