"use client";

import { useEffect, useRef, useState } from "react";

export function Niche3DAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animation, setAnimation] = useState<"idle" | "spin" | "dance" | "jump">("idle");
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 400;

    // Load avatar image
    const avatarImg = new Image();
    avatarImg.src = "/IMG_3411.jpeg";

    // Animation variables
    let rotation = 0;
    let bounceY = 0;
    let bounceDirection = 1;
    let jumpY = 0;
    let jumpVelocity = 0;
    const gravity = 0.5;

    // Avatar body parts
    const drawAvatar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Center point
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Apply animations
      let translateY = 0;
      let scale = 1;
      let currentRotation = 0;

      if (animation === "spin") {
        currentRotation = rotation;
        rotation += 0.05;
      } else if (animation === "dance") {
        bounceY += bounceDirection * 2;
        if (bounceY > 20 || bounceY < 0) bounceDirection *= -1;
        translateY = -Math.abs(bounceY);
        scale = 1 + Math.sin(rotation) * 0.1;
        rotation += 0.1;
      } else if (animation === "jump") {
        jumpY += jumpVelocity;
        jumpVelocity += gravity;
        if (jumpY >= 0) {
          jumpY = 0;
          jumpVelocity = -15;
        }
        translateY = jumpY;
      } else {
        // Idle: gentle floating
        translateY = Math.sin(Date.now() * 0.001) * 5;
      }

      // Draw shadow
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.ellipse(centerX, canvas.height - 20, 60, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Transform to center
      ctx.translate(centerX, centerY + translateY);
      ctx.rotate(currentRotation);
      ctx.scale(scale, scale);

      // Draw body (simple dress shape)
      ctx.save();
      ctx.fillStyle = "#ff69b4";
      ctx.beginPath();
      ctx.moveTo(-40, 20);
      ctx.lineTo(40, 20);
      ctx.lineTo(60, 100);
      ctx.lineTo(-60, 100);
      ctx.closePath();
      ctx.fill();

      // Dress shine
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.moveTo(-35, 25);
      ctx.lineTo(0, 25);
      ctx.lineTo(-20, 60);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw head with avatar image
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, -30, 50, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      if (avatarImg.complete) {
        ctx.drawImage(avatarImg, -50, -80, 100, 100);
      } else {
        ctx.fillStyle = "#ffb6c1";
        ctx.fill();
      }
      ctx.restore();

      // Draw hair accessory (bow)
      ctx.save();
      ctx.fillStyle = "#ff1493";
      ctx.beginPath();
      ctx.arc(-35, -55, 12, 0, Math.PI * 2);
      ctx.arc(35, -55, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw arms
      ctx.save();
      ctx.strokeStyle = "#ffb6c1";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";

      // Left arm
      const leftArmAngle = Math.sin(Date.now() * 0.003) * 0.3;
      ctx.beginPath();
      ctx.moveTo(-40, 30);
      ctx.lineTo(-70 + Math.cos(leftArmAngle) * 20, 60 + Math.sin(leftArmAngle) * 20);
      ctx.stroke();

      // Right arm
      const rightArmAngle = Math.sin(Date.now() * 0.003 + Math.PI) * 0.3;
      ctx.beginPath();
      ctx.moveTo(40, 30);
      ctx.lineTo(70 + Math.cos(rightArmAngle) * 20, 60 + Math.sin(rightArmAngle) * 20);
      ctx.stroke();
      ctx.restore();

      // Draw sparkles
      if (animation !== "idle") {
        ctx.save();
        for (let i = 0; i < 5; i++) {
          const sparkleX = Math.sin(Date.now() * 0.005 + i) * 100;
          const sparkleY = Math.cos(Date.now() * 0.007 + i) * 80;
          const sparkleSize = Math.abs(Math.sin(Date.now() * 0.01 + i)) * 3 + 1;

          ctx.fillStyle = i % 2 === 0 ? "#ff69b4" : "#ffd700";
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      drawAvatar();
      animationRef.current = requestAnimationFrame(animate);
    };

    avatarImg.onload = () => {
      animate();
    };

    // Start animation even if image hasn't loaded
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animation]);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center">
      {/* Canvas for 3D avatar */}
      <canvas
        ref={canvasRef}
        className="rounded-2xl glass border-4 border-pink-500 shadow-2xl shadow-pink-500/50"
      />

      {/* Animation controls */}
      <div className="mt-4 flex gap-2 glass p-3 rounded-xl border border-pink-500/50">
        <button
          onClick={() => setAnimation("idle")}
          className={`px-3 py-2 rounded-lg transition-all text-sm font-medium ${
            animation === "idle"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "text-pink-300 hover:bg-pink-500/20"
          }`}
          title="Idle"
        >
          😌
        </button>
        <button
          onClick={() => setAnimation("spin")}
          className={`px-3 py-2 rounded-lg transition-all text-sm font-medium ${
            animation === "spin"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "text-pink-300 hover:bg-pink-500/20"
          }`}
          title="Spin"
        >
          🌀
        </button>
        <button
          onClick={() => setAnimation("dance")}
          className={`px-3 py-2 rounded-lg transition-all text-sm font-medium ${
            animation === "dance"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "text-pink-300 hover:bg-pink-500/20"
          }`}
          title="Dance"
        >
          💃
        </button>
        <button
          onClick={() => setAnimation("jump")}
          className={`px-3 py-2 rounded-lg transition-all text-sm font-medium ${
            animation === "jump"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "text-pink-300 hover:bg-pink-500/20"
          }`}
          title="Jump"
        >
          🦘
        </button>
      </div>

      {/* Name tag */}
      <div className="mt-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg">
        💕 Niche-chan 💕
      </div>
    </div>
  );
}
