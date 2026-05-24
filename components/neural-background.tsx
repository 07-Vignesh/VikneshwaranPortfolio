"use client";

import { useEffect, useRef } from "react";

interface Props {
  /**
   * "light" → warm terracotta/slate nodes on cream background
   * "dark"  → teal/cyan nodes on black (your original look)
   */
  variant?: "light" | "dark";
  nodeCount?: number;
  connectDist?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function NeuralBackground({
  variant = "light",
  nodeCount = 60,
  connectDist = 160,
  speed = 1,
  className = "",
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    /* ── Fit canvas to parent every time parent resizes ── */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = canvas.width  = rect.width  || window.innerWidth;
      H = canvas.height = rect.height || window.innerHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ─────────────────────────────────────────────────────
       COLOUR PALETTES
       light: strong warm tones — clearly visible on #faf8f4
       dark:  bright teal/cyan — your original neural style
       ───────────────────────────────────────────────────── */
    const isDark = variant === "dark";

    // Each entry is an RGB string used inside rgba(R,G,B, alpha)
    const NODE_COLORS = isDark
      ? [
          "20,230,190",   // bright teal
          "0,200,170",    // medium teal
          "60,210,220",   // cyan-teal
          "30,170,210",   // blue-teal
        ]
      : [
          "180,45,30",    // deep terracotta — strong on cream
          "38,82,128",    // rich slate blue
          "160,90,30",    // amber-brown
          "80,50,30",     // dark warm brown
        ];

    /* Alpha values — high enough to be clearly visible */
    const NODE_ALPHA_BASE = isDark ? 0.75 : 0.65;

    /* Line colour & max alpha */
    const LINE_RGB       = isDark ? "20,200,180"  : "120,70,40";
    const LINE_ALPHA_MAX = isDark ? 0.50          : 0.40;
    const LINE_WIDTH     = isDark ? 0.8           : 1.0;

    /* ── Build nodes with a fixed direction + speed ── */
    const nodes = Array.from({ length: nodeCount }, () => {
      const angle  = Math.random() * Math.PI * 2;
      const baseSpd = (0.25 + Math.random() * 0.40) * speed;
      return {
        x:        Math.random() * (W || window.innerWidth),
        y:        Math.random() * (H || window.innerHeight),
        vx:       Math.cos(angle) * baseSpd,
        vy:       Math.sin(angle) * baseSpd,
        baseSpd,
        r:        Math.random() * 2.0 + 1.2,      // radius 1.2 – 3.2 px
        alpha:    NODE_ALPHA_BASE + Math.random() * 0.20,
        color:    NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulse:    Math.random() * Math.PI * 2,
        pulseSpd: 0.012 + Math.random() * 0.018,
      };
    });

    /* ── Animation loop — NO mouse interaction ── */
    const draw = () => {
      if (!W || !H) { raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      /* Update positions */
      nodes.forEach(n => {
        /* Very gentle damping — just enough to stop runaway acceleration */
        n.vx *= 0.9995;
        n.vy *= 0.9995;

        /* Enforce minimum speed so nodes never drift to a stop */
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd < n.baseSpd * 0.5 && spd > 0) {
          const scale = (n.baseSpd * 0.5) / spd;
          n.vx *= scale;
          n.vy *= scale;
        }
        /* Completely stopped → assign new random direction */
        if (spd === 0) {
          const a = Math.random() * Math.PI * 2;
          n.vx = Math.cos(a) * n.baseSpd;
          n.vy = Math.sin(a) * n.baseSpd;
        }

        /* Wrap around edges */
        n.x = (n.x + n.vx + W) % W;
        n.y = (n.y + n.vy + H) % H;

        /* Advance pulse phase */
        n.pulse += n.pulseSpd;
      });

      /* ── Draw connection lines ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            /* Fade linearly from LINE_ALPHA_MAX at 0px → 0 at connectDist */
            const alpha = (1 - dist / connectDist) * LINE_ALPHA_MAX;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${LINE_RGB},${alpha})`;
            ctx.lineWidth   = LINE_WIDTH;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* ── Draw nodes ── */
      nodes.forEach(n => {
        const pulseFactor = 1 + 0.16 * Math.sin(n.pulse);
        const r     = n.r * pulseFactor;
        const alpha = n.alpha * (0.88 + 0.12 * Math.sin(n.pulse));

        /* Outer soft glow */
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${alpha * 0.12})`;
        ctx.fill();

        /* Mid glow */
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${alpha * 0.35})`;
        ctx.fill();

        /* Core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    /* ── Cleanup ── */
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [variant, nodeCount, connectDist, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",   // never intercepts clicks/touches
        ...style,
      }}
    />
  );
}