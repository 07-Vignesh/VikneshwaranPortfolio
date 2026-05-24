"use client";

import { motion } from "framer-motion";
import PDFViewer from "@/components/resume/pdf-viewer";
import { FiCode, FiBookOpen, FiAward, FiGlobe } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import NeuralBackground from "@/components/neural-background";

const container = {
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
    iconBg: "rgba(155,44,26,0.08)",
    iconBorder: "rgba(155,44,26,0.16)",
    iconColor: "#9B2C1A",
    title: "Technical Focus",
    content: "My resume highlights expertise in full-stack development with React, Next.js, Node.js and modern web technologies — building responsive, accessible, and performant web applications.",
    type: "text",
  },
  {
    icon: <FiBookOpen size={15} />,
    iconBg: "rgba(44,95,138,0.08)",
    iconBorder: "rgba(44,95,138,0.16)",
    iconColor: "#2c5f8a",
    title: "Resume Tips",
    content: [
      "Check Experience for my professional journey",
      "The Skills section outlines technical capabilities",
      "See Education for my academic background",
    ],
    type: "list",
  },
  {
    icon: <FiAward size={15} />,
    iconBg: "rgba(39,174,96,0.08)",
    iconBorder: "rgba(39,174,96,0.16)",
    iconColor: "#27ae60",
    title: "Why Hire Me",
    content: "I bring technical expertise, strong problem-solving abilities, and collaborative skills to every project. My passion for clean code and user-centric design drives me to create exceptional digital experiences.",
    type: "text",
  },
];

const socials = [
  {
    href: "https://github.com/07-Vignesh",
    label: "GitHub",
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/viknesh-waran/",
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{
      position: "relative",
      minHeight: "100vh",
      width: "100%",
      background: "#faf8f4",
      overflow: "hidden",
    }}>

      {/* ── ruled lines ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px)",
      }} />

      {/* ── ambient orbs ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { size: 400, color: "rgba(155,44,26,0.06)", top: "-8%", left: "-5%" },
          { size: 340, color: "rgba(44,95,138,0.06)", top: "40%", right: "-5%" },
          { size: 280, color: "rgba(200,140,80,0.05)", bottom: "5%", left: "30%" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(70px)",
            ...("top"    in o ? { top:    o.top    } : {}),
            ...("bottom" in o ? { bottom: o.bottom } : {}),
            ...("left"   in o ? { left:   o.left   } : {}),
            ...("right"  in o ? { right:  o.right  } : {}),
          }} />
        ))}
      </div>

      <NeuralBackground variant="light" nodeCount={55} connectDist={130} speed={1} style={{ zIndex: 2 }} />

      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(250,248,244,0.72) 100%)",
      }} />

      {/* ══ LOADING STATE ══ */}
      {!mounted ? (
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "100vh",
        }}>
          <div style={{ textAlign: "center" }}>
            {/* Letter animation */}
            <div style={{ display: "flex", justifyContent: "center", gap: 2, overflow: "hidden", height: 36, marginBottom: 12 }}>
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.025, duration: 0.3, ease: "easeOut" }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem", fontWeight: 400,
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
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#9B2C1A",
                  display: "inline-block",
                  animation: `bounce 0.9s ${i * 0.18}s infinite`,
                  opacity: 0.7,
                }} />
              ))}
            </div>
          </div>
        </div>
      ) : (

        /* ══ MAIN CONTENT ══ */
        <div style={{
          position: "relative", zIndex: 10,
          width: "100%", maxWidth: 1160,
          margin: "0 auto",
          padding: "5rem clamp(1.25rem, 5vw, 4rem) 4rem",
          boxSizing: "border-box",
        }}>

          {/* ── PAGE HEADER ── */}
          <motion.div
            variants={container} initial="hidden" animate="show"
            style={{ marginBottom: "2.5rem" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "1.25rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.6rem, 2vw, 0.67rem)",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#9B2C1A",
                background: "rgba(155,44,26,0.09)",
                border: "1px solid rgba(155,44,26,0.22)",
                padding: "0.32rem 0.85rem", borderRadius: "999px",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B2C1A" }} />
                My Resume
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 7vw, 4.2rem)",
                  color: "#3D2F27", fontWeight: 400,
                  letterSpacing: "-0.03em", lineHeight: 1.06,
                }}>
                  My
                </span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 7vw, 4.2rem)",
                  color: "#1a1612", fontWeight: 400, fontStyle: "italic",
                  letterSpacing: "-0.03em", lineHeight: 1.06,
                }}>
                  Qualifications
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ width: "1.5rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
              <p style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                color: "#5C4A3A", fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)",
                letterSpacing: "0.01em", margin: 0,
              }}>
                Experience &nbsp;·&nbsp; Skills &nbsp;·&nbsp; Education
              </p>
            </motion.div>
          </motion.div>

          {/* ── CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(255,255,255,0.88)",
              border: "1px solid rgba(26,22,18,0.09)",
              borderRadius: "1.125rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(26,22,18,0.08)",
              overflow: "hidden",
              display: "flex",
              flexWrap: "wrap",
            }}
          >

            {/* ── SIDEBAR ── */}
            <div style={{
              width: "clamp(220px, 28%, 280px)",
              flexShrink: 0,
              borderRight: "1px solid rgba(26,22,18,0.08)",
              padding: "28px 24px",
              background: "rgba(250,248,244,0.60)",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}>

              {/* sidebar title */}
              <div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem", fontWeight: 500, color: "#1a1612",
                  margin: "0 0 3px",
                }}>
                  About This Resume
                </p>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.67rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#9B2C1A", margin: 0,
                }}>
                  Interactive guide
                </p>
              </div>

              {/* sections */}
              {sidebarSections.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.625rem" }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "0.5rem",
                      background: s.iconBg, border: `1px solid ${s.iconBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: s.iconColor, flexShrink: 0,
                    }}>
                      {s.icon}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem", fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "#5C4A3A",
                    }}>
                      {s.title}
                    </span>
                  </div>

                  {s.type === "text" ? (
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.825rem", color: "#6B5744", lineHeight: 1.7, margin: 0,
                    }}>
                      {s.content as string}
                    </p>
                  ) : (
                    <ul style={{
                      listStyle: "none", padding: 0, margin: 0,
                      display: "flex", flexDirection: "column", gap: 5,
                    }}>
                      {(s.content as string[]).map((item, j) => (
                        <li key={j} style={{
                          display: "flex", alignItems: "flex-start", gap: 7,
                          fontFamily: "var(--font-body)",
                          fontSize: "0.825rem", color: "#6B5744", lineHeight: 1.65,
                        }}>
                          <span style={{ color: "#9B2C1A", fontSize: "0.65rem", marginTop: 4, flexShrink: 0 }}>▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Connect */}
              <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid rgba(26,22,18,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "0.5rem",
                    background: "rgba(200,140,80,0.08)", border: "1px solid rgba(200,140,80,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#c87d30", flexShrink: 0,
                  }}>
                    <FiGlobe size={14} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem", fontWeight: 600,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#5C4A3A",
                  }}>
                    Connect
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {socials.map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: 34, height: 34, borderRadius: "0.5rem",
                        background: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(26,22,18,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#5C4A3A",
                        boxShadow: "0 1px 4px rgba(26,22,18,0.06)",
                        transition: "all 0.2s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "#9B2C1A";
                        el.style.borderColor = "rgba(155,44,26,0.28)";
                        el.style.transform = "translateY(-2px)";
                        el.style.boxShadow = "0 4px 12px rgba(26,22,18,0.10)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.color = "#5C4A3A";
                        el.style.borderColor = "rgba(26,22,18,0.12)";
                        el.style.transform = "";
                        el.style.boxShadow = "0 1px 4px rgba(26,22,18,0.06)";
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── PDF VIEWER ── */}
            <div style={{ flex: 1, minHeight: "calc(100vh - 220px)", minWidth: 0 }}>
              <PDFViewer />
            </div>

          </motion.div>
        </div>
      )}

      {/* bounce keyframe */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (max-width: 768px) {
          .resume-card { flex-direction: column !important; }
          .resume-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(26,22,18,0.08) !important; }
        }
      `}</style>
    </main>
  );
}