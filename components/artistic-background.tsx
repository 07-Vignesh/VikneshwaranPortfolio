"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ArtisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Warm ink / watercolor palette — works on paper backgrounds
    const colors = [
      "rgba(192, 57,  43,  0.12)",   // vermillion
      "rgba(160, 82,  45,  0.10)",   // sienna
      "rgba(44,  95,  138, 0.10)",   // slate blue
      "rgba(90,  72,  54,  0.08)",   // sepia
      "rgba(200, 140, 80,  0.10)",   // amber
      "rgba(101, 67,  33,  0.07)",   // umber
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        // Soft glow — mimics ink spreading on paper
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Paper base */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--paper)" }}
      />

      {/* Vermillion ink wash — top left */}
      <motion.div
        className="absolute w-[680px] h-[680px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,57,43,0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{ x: ["-8%", "12%", "-8%"], y: ["-4%", "10%", "-4%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        initial={{ top: "-12%", left: "-8%" }}
      />

      {/* Slate blue wash — right */}
      <motion.div
        className="absolute w-[560px] h-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(44,95,138,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: ["8%", "-18%", "8%"], y: ["4%", "-12%", "4%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        initial={{ top: "45%", right: "-8%" }}
      />

      {/* Amber wash — bottom center */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,140,80,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: ["-4%", "20%", "-4%"], y: ["8%", "-8%", "8%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        initial={{ bottom: "8%", left: "18%" }}
      />

      {/* Sienna accent — mid */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(160,82,45,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: ["4%", "-14%", "4%"], y: ["-8%", "12%", "-8%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        initial={{ top: "38%", left: "48%" }}
      />

      {/* Sepia center accent */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(90,72,54,0.05) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
        animate={{ x: ["-6%", "10%", "-6%"], y: ["6%", "-10%", "6%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        initial={{ bottom: "28%", right: "28%" }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ruled lines — editorial grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 79px,
            rgba(26,22,18,1) 79px,
            rgba(26,22,18,1) 80px
          )`,
        }}
      />

      {/* Soft cream vignette — pulls edges inward */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(237,231,217,0.5) 100%)",
        }}
      />
    </div>
  );
}