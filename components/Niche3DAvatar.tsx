"use client";

import { useEffect, useRef, useState } from "react";

export function Niche3DAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down more than 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY - 50) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  if (isClosed) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 flex flex-col items-center transition-all duration-500 ${
        isHidden ? "translate-y-[120%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Control Buttons */}
      <div className="absolute -top-3 -right-3 flex gap-2 z-50">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all"
          title={isMinimized ? "Maximize" : "Minimize"}
        >
          {isMinimized ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )}
        </button>
        <button
          onClick={() => setIsClosed(true)}
          className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all"
          title="Close"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Video avatar */}
      <div
        className={`relative rounded-2xl overflow-hidden glass border-4 border-pink-500 shadow-2xl shadow-pink-500/50 transition-all duration-300 ${
          isMinimized ? "w-[100px] h-[100px]" : "w-[300px] h-[400px]"
        }`}
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
      </div>

      {/* Name tag */}
      {!isMinimized && (
        <div className="mt-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg">
          💕 Niche-chan 💕
        </div>
      )}
    </div>
  );
}
