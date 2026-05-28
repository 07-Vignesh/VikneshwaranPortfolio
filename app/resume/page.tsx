"use client";

import { motion } from "framer-motion";
import PDFViewer from "@/components/resume/pdf-viewer";
import { FiCode, FiBookOpen, FiAward, FiGlobe } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import NeuralBackground from "@/components/neural-background";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

const nameLetters = "Vikneshwaran  Resume".split("");

const sidebarSections = [
  {
    icon: <FiCode size={15} />,
    iconBg: "rgba(155,44,26,0.08)", iconBorder: "rgba(155,44,26,0.16)", iconColor: "#9B2C1A",
    title: "Technical Focus",
    content: "Full-stack expertise in React, Next.js, Node.js and modern web technologies — building responsive, accessible, and performant web applications.",
    type: "text",
  },
  {
    icon: <FiBookOpen size={15} />,
    iconBg: "rgba(44,95,138,0.08)", iconBorder: "rgba(44,95,138,0.16)", iconColor: "#2c5f8a",
    title: "Resume Tips",
    content: [
      "Check Experience for my professional journey",
      "Skills section outlines technical capabilities",
      "Education for my academic background",
    ],
    type: "list",
  },
  {
    icon: <FiAward size={15} />,
    iconBg: "rgba(39,174,96,0.08)", iconBorder: "rgba(39,174,96,0.16)", iconColor: "#27ae60",
    title: "Why Hire Me",
    content: "I bring technical expertise, strong problem-solving abilities, and collaborative skills — with a passion for clean code and user-centric design.",
    type: "text",
  },
];

const socials = [
  { href: "https://github.com/07-Vignesh",             label: "GitHub",   icon: <FaGithub size={15} />   },
  { href: "https://www.linkedin.com/in/viknesh-waran/", label: "LinkedIn", icon: <FaLinkedin size={15} /> },
];

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="rv-main">

      {/* ruled lines */}
      <div aria-hidden="true" className="rv-lines" />

      {/* orbs */}
      <div aria-hidden="true" className="rv-orbs">
        {[
          { size: 400, color: "rgba(155,44,26,0.06)", top: "-8%",  left: "-5%"  },
          { size: 340, color: "rgba(44,95,138,0.06)", top: "40%",  right: "-5%" },
          { size: 280, color: "rgba(200,140,80,0.05)",bottom: "5%",left: "30%"  },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(70px)",
            ...("top"    in o ? { top:    o.top }    : {}),
            ...("bottom" in o ? { bottom: o.bottom } : {}),
            ...("left"   in o ? { left:   o.left }   : {}),
            ...("right"  in o ? { right:  o.right }  : {}),
          }} />
        ))}
      </div>

      <NeuralBackground variant="light" nodeCount={55} connectDist={130} speed={1} style={{ zIndex: 2 }} />

      <div aria-hidden="true" className="rv-vignette" />

      {/* ══ LOADING ══ */}
      {!mounted ? (
        <div className="rv-loading">
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 2, overflow: "hidden", height: 36, marginBottom: 12 }}>
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.025, duration: 0.3, ease: "easeOut" }}
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400,
                    color: letter === " " ? "transparent" : "#1a1612",
                    width: letter === " " ? 8 : "auto",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#9e9590", margin: "0 0 12px" }}>
              Loading Resume…
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#9B2C1A",
                  display: "inline-block", animation: `rv-bounce 0.9s ${i * 0.18}s infinite`, opacity: 0.7,
                }} />
              ))}
            </div>
          </div>
        </div>
      ) : (

        /* ══ CONTENT ══ */
        <div className="rv-content">

          {/* header */}
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ marginBottom: "2.5rem" }}>
            <motion.div variants={fadeUp} style={{ marginBottom: "1.25rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                fontFamily: "var(--font-mono)", fontSize: "clamp(0.6rem, 2vw, 0.67rem)",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#9B2C1A", background: "rgba(155,44,26,0.09)",
                border: "1px solid rgba(155,44,26,0.22)",
                padding: "0.32rem 0.85rem", borderRadius: "999px",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B2C1A" }} />
                My Resume
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 7vw, 4.2rem)", color: "#3D2F27", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.06 }}>My</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 7vw, 4.2rem)", color: "#1a1612", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.03em", lineHeight: 1.06 }}>Qualifications</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ width: "1.5rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, color: "#5C4A3A", fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)", letterSpacing: "0.01em", margin: 0 }}>
                Experience &nbsp;·&nbsp; Skills &nbsp;·&nbsp; Education
              </p>
            </motion.div>
          </motion.div>

          {/* ── Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rv-card"
          >
            {/* Sidebar */}
            <div className="rv-sidebar">
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 500, color: "#1a1612", margin: "0 0 3px" }}>
                  About This Resume
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9B2C1A", margin: 0 }}>
                  Interactive guide
                </p>
              </div>

              {sidebarSections.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.55rem" }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "0.5rem", flexShrink: 0,
                      background: s.iconBg, border: `1px solid ${s.iconBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: s.iconColor,
                    }}>
                      {s.icon}
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C4A3A" }}>
                      {s.title}
                    </span>
                  </div>
                  {s.type === "text" ? (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6B5744", lineHeight: 1.7, margin: 0 }}>
                      {s.content as string}
                    </p>
                  ) : (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                      {(s.content as string[]).map((item, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#6B5744", lineHeight: 1.65 }}>
                          <span style={{ color: "#9B2C1A", fontSize: "0.65rem", marginTop: 4, flexShrink: 0 }}>▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Connect */}
              <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(26,22,18,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.65rem" }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "0.5rem",
                    background: "rgba(200,140,80,0.08)", border: "1px solid rgba(200,140,80,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#c87d30", flexShrink: 0,
                  }}>
                    <FiGlobe size={14} />
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C4A3A" }}>
                    Connect
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {socials.map(({ href, label, icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      style={{
                        width: 34, height: 34, borderRadius: "0.5rem",
                        background: "rgba(255,255,255,0.85)", border: "1px solid rgba(26,22,18,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#5C4A3A", boxShadow: "0 1px 4px rgba(26,22,18,0.06)",
                        transition: "all 0.2s", textDecoration: "none",
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#9B2C1A"; el.style.borderColor = "rgba(155,44,26,0.28)"; el.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#5C4A3A"; el.style.borderColor = "rgba(26,22,18,0.12)"; el.style.transform = ""; }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="rv-viewer">
              <PDFViewer />
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        /* ── Base ── */
        .rv-main {
          position: relative;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          background: #faf8f4;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        .rv-lines {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px);
        }
        .rv-orbs {
          position: absolute; inset: 0; z-index: 1; overflow: hidden; pointer-events: none;
        }
        .rv-vignette {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(250,248,244,0.72) 100%);
        }
        .rv-loading {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          min-height: 100vh;
        }
        .rv-content {
          position: relative; z-index: 10;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 5rem 1.25rem 4rem;
          box-sizing: border-box;
        }

        /* ── Card: 2-col desktop ── */
        .rv-card {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(26,22,18,0.09);
          border-radius: 1.125rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(26,22,18,0.08);
          overflow: hidden;
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
        }
        .rv-sidebar {
          min-width: 0;
          overflow: hidden;
          border-right: 1px solid rgba(26,22,18,0.08);
          padding: 28px 24px;
          background: rgba(250,248,244,0.60);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .rv-viewer {
          min-width: 0;
          width: 100%;
          overflow: hidden;
        }

        /* ── Mobile: single column ── */
        @media (max-width: 767px) {
          .rv-content {
            padding: 4.5rem 1rem 3rem;
          }
          .rv-card {
            grid-template-columns: 1fr;
          }
          .rv-sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(26,22,18,0.08);
            padding: 20px 16px;
            gap: 20px;
          }
          .rv-viewer {
            width: 100%;
          }
        }

        @keyframes rv-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </main>
  );
}