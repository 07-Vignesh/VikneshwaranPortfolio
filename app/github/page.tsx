"use client";
import { motion } from "framer-motion";
import { FiExternalLink, FiCode, FiTarget } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { useState, useEffect } from "react";
import Head from "next/head";
import NeuralBackground from "@/components/neural-background";
import SnakeCalendar from "@/components/SnakeCalendar";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const USERNAME = "7VikneshVicky";

interface LCStats {
  totalSolved: number;
  acceptanceRate: number;
  streak?: number;
}

export default function LeetCodePage() {
  const [stats,   setStats]   = useState<LCStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FALLBACK: LCStats = {
      totalSolved:    103,
      acceptanceRate: 71.5,
    };

    const tryFetch = async () => {
      const urls = [
        `https://leetcode-stats-api.herokuapp.com/${USERNAME}`,
        `https://alfa-leetcode-api.onrender.com/${USERNAME}`,
      ];
      for (const url of urls) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(7000) });
          if (!res.ok) continue;
          const d = await res.json();
          if (d.totalSolved !== undefined) {
            setStats({
              totalSolved:    d.totalSolved    || FALLBACK.totalSolved,
              acceptanceRate: d.acceptanceRate || FALLBACK.acceptanceRate,
            });
            setLoading(false);
            return;
          }
        } catch { continue; }
      }
      setStats(FALLBACK);
      setLoading(false);
    };

    tryFetch();
  }, []);

  /* Only show the two metrics that look good */
  const topStats = [
    {
      num:   loading ? null : stats?.totalSolved.toString() ?? "103",
      label: "Problems Solved",
      icon:  <FiCode size={16} />,
    },
    {
      num:   loading ? null : stats ? `${Number(stats.acceptanceRate).toFixed(1)}%` : "71.5%",
      label: "Acceptance Rate",
      icon:  <FiTarget size={16} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Vikneshwaran | LeetCode</title>
        <meta name="description" content="My LeetCode problem-solving stats and progress." />
      </Head>

      <section style={{
        minHeight: "100vh", width: "100%",
        background: "var(--paper, #faf8f4)",
        position: "relative", overflow: "hidden",
        paddingTop: "6rem", paddingBottom: "5rem",
      }}>

        {/* Layer 0: ruled lines */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px)",
        }} />

        {/* Layer 1: ambient orbs */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
          {[
            { size: 500, color: "rgba(155,44,26,0.05)",  top: "-10%",   left: "-6%"  },
            { size: 400, color: "rgba(44,95,138,0.05)",  bottom: "-5%", right: "-5%" },
            { size: 300, color: "rgba(200,140,80,0.05)", top: "40%",    left: "40%"  },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              filter: "blur(90px)",
              ...("top"    in o ? { top:    o.top }    : {}),
              ...("bottom" in o ? { bottom: o.bottom } : {}),
              ...("left"   in o ? { left:   o.left }   : {}),
              ...("right"  in o ? { right:  o.right }  : {}),
            }} />
          ))}
        </div>

        {/* Layer 2: Neural canvas */}
        <NeuralBackground variant="light" nodeCount={55} connectDist={130} speed={1} style={{ zIndex: 2 }} />

        {/* Layer 3: vignette */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(250,248,244,0.65) 100%)",
        }} />

        {/* ══ Content ══ */}
        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{
            position: "relative", zIndex: 10,
            maxWidth: 1100, margin: "0 auto",
            padding: "0 clamp(1.25rem, 5vw, 4rem)",
            boxSizing: "border-box",
          }}
        >

          {/* ── Header ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "3rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.6rem, 2vw, 0.67rem)",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#9B2C1A", background: "rgba(155,44,26,0.09)",
                border: "1px solid rgba(155,44,26,0.22)",
                padding: "0.32rem 0.85rem", borderRadius: "999px",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B2C1A", flexShrink: 0 }} />
                Problem Solving
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap", marginBottom: "0.9rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 400, color: "#3D2F27", letterSpacing: "-0.03em", lineHeight: 1.06 }}>LeetCode</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 400, fontStyle: "italic", color: "#1a1612", letterSpacing: "-0.03em", lineHeight: 1.06 }}>Progress</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div style={{ width: "1.5rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, color: "#5C4A3A", fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)", letterSpacing: "0.01em", margin: 0 }}>
                  DSA &nbsp;·&nbsp; Algorithms &nbsp;·&nbsp; Data Structures
                </p>
              </div>

              <motion.a
                href={`https://leetcode.com/u/${USERNAME}/`}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.6rem 1.2rem", borderRadius: "0.5rem",
                  fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500,
                  color: "#faf8f4", background: "#1a1612",
                  border: "1px solid #1a1612", textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(26,22,18,0.18)", transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(26,22,18,0.26)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(26,22,18,0.18)"; }}
              >
                <SiLeetcode size={14} />
                View LeetCode Profile
                <FiExternalLink size={12} style={{ opacity: 0.7 }} />
              </motion.a>
            </div>
          </motion.div>

          {/* ── Two stat pills (no ranking, no difficulty breakdowns) ── */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {topStats.map(({ num, label, icon }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "0.85rem",
                padding: "1rem 1.5rem",
                background: "rgba(255,255,255,0.78)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(26,22,18,0.09)", borderRadius: "0.85rem",
                boxShadow: "0 2px 10px rgba(26,22,18,0.06)",
                flex: "1 1 200px",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "2.4rem", height: "2.4rem", borderRadius: "0.55rem",
                  background: "rgba(155,44,26,0.08)", border: "1px solid rgba(155,44,26,0.18)",
                  color: "#9B2C1A", flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  {loading ? (
                    <div style={{ width: 60, height: 22, borderRadius: 4, background: "rgba(26,22,18,0.07)", marginBottom: 4 }} />
                  ) : (
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#1a1612", lineHeight: 1 }}>
                      {num}
                    </div>
                  )}
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e9590", marginTop: 4 }}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Snake Calendar card — full width, large ── */}
          <motion.div
            variants={fadeUp}
            style={{
              background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)",
              border: "1px solid rgba(26,22,18,0.09)", borderRadius: "1rem",
              boxShadow: "0 4px 24px rgba(26,22,18,0.07), 0 1px 4px rgba(26,22,18,0.04)",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div style={{
              padding: "1.25rem 1.75rem",
              borderBottom: "1px solid rgba(26,22,18,0.07)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "0.75rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "2.4rem", height: "2.4rem", borderRadius: "0.55rem",
                  background: "rgba(230,126,34,0.09)", border: "1px solid rgba(230,126,34,0.22)",
                  color: "#e67e22", fontSize: "1.1rem",
                }}>
                  <SiLeetcode />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "#1a1612", margin: 0, lineHeight: 1.2 }}>
                    Submission Activity
                  </h2>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e9590", margin: "3px 0 0" }}>
                    @{USERNAME}
                  </p>
                </div>
              </div>

              {/* Active badge */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.35rem 0.9rem", borderRadius: "999px",
                background: "rgba(39,174,96,0.08)", border: "1px solid rgba(39,174,96,0.2)",
              }}>
                <span style={{ position: "relative", display: "flex", width: 7, height: 7, flexShrink: 0 }}>
                  <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#27ae60", opacity: 0.6 }} />
                  <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7, borderRadius: "50%", background: "#27ae60" }} />
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#27ae60" }}>
                  Active
                </span>
              </div>
            </div>

            {/* ── Snake calendar — generous padding, large display ── */}
            <div style={{ padding: "2rem 1.75rem 2.5rem" }}>
              <SnakeCalendar />
            </div>

            {/* Card footer */}
            <div style={{
              padding: "1rem 1.75rem",
              borderTop: "1px solid rgba(26,22,18,0.07)",
              display: "flex", alignItems: "center", gap: "0.65rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B2C1A", opacity: 0.7, flexShrink: 0, display: "inline-block" }} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.6, color: "#6B5744", margin: 0, fontWeight: 400 }}>
                Continuously practising Data Structures &amp; Algorithms — writing cleaner, faster code every day.
              </p>
            </div>
          </motion.div>

        </motion.div>

        <style>{`
          @keyframes lc-pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.45; }
          }
        `}</style>
      </section>
    </>
  );
}