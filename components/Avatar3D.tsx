"use client";

import { useEffect, useRef } from "react";

interface Avatar3DProps {
  size?: number;
  className?: string;
}

export function Avatar3D({ size = 40, className = "" }: Avatar3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/50 group-hover:shadow-indigo-500/80 transition-all group-hover:scale-110 avatar-3d ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
      >
        <source src="/avatar.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

      <style jsx>{`
        .avatar-3d {
          transform-style: preserve-3d;
          animation: float-rotate 6s ease-in-out infinite;
        }

        @keyframes float-rotate {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg);
          }
          25% {
            transform: translateY(-5px) rotateY(5deg);
          }
          50% {
            transform: translateY(0px) rotateY(0deg);
          }
          75% {
            transform: translateY(-5px) rotateY(-5deg);
          }
        }

        .avatar-3d:hover {
          animation: spin-3d 2s ease-in-out infinite;
        }

        @keyframes spin-3d {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
