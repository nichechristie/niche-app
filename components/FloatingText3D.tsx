"use client";

import { useEffect, useRef } from "react";

export function FloatingText3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const texts = [
      { text: "find your NICHE", color: "#818cf8" }, // indigo-400
      { text: "find your FAITH", color: "#a78bfa" }, // violet-400
    ];

    // Create floating text particles
    class TextParticle {
      text: string;
      x: number;
      y: number;
      z: number;
      baseZ: number;
      speed: number;
      angle: number;
      angleSpeed: number;
      scale: number;
      opacity: number;
      color: string;

      constructor(text: string, color: string) {
        this.text = text;
        this.color = color;
        this.x = Math.random() * (canvas?.width || 1000) - 100;
        this.y = Math.random() * (canvas?.height || 800);
        this.z = Math.random() * 1000;
        this.baseZ = this.z;
        this.speed = 0.2 + Math.random() * 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.002;
        this.scale = 1;
        this.opacity = 0.15 + Math.random() * 0.15;
      }

      update() {
        // Gentle floating motion
        this.y -= this.speed;
        this.angle += this.angleSpeed;
        this.x += Math.sin(this.angle) * 0.5;

        // 3D depth effect
        this.z = this.baseZ + Math.sin(Date.now() * 0.001 + this.baseZ) * 50;
        this.scale = 1 + (1000 - this.z) / 1000;

        // Reset when off screen
        if (this.y < -100) {
          this.y = (canvas?.height || 800) + 100;
          this.x = Math.random() * (canvas?.width || 1000);
        }
      }

      draw() {
        if (!ctx || !canvas) return;

        ctx.save();

        // Apply 3D transformation
        const perspective = 1000 / (1000 + this.z);
        const screenX = this.x * perspective + canvas.width / 2 * (1 - perspective);
        const screenY = this.y * perspective + canvas.height / 2 * (1 - perspective);

        ctx.globalAlpha = this.opacity * perspective;
        ctx.font = `bold ${60 * this.scale * perspective}px sans-serif`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Add text shadow for depth
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20 * perspective;

        // Slight rotation for 3D effect
        ctx.translate(screenX, screenY);
        ctx.rotate(Math.sin(this.angle) * 0.1);
        ctx.fillText(this.text, 0, 0);

        ctx.restore();
      }
    }

    // Create particles
    const particles: TextParticle[] = [];
    for (let i = 0; i < 8; i++) {
      const text = texts[i % texts.length];
      particles.push(new TextParticle(text.text, text.color));
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sort by z-index (furthest first)
      particles.sort((a, b) => b.z - a.z);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
}
