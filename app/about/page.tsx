"use client";

import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import NeuralBackground from "@/components/neural-background";

/* ── same animation variants as homepage ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

const highlights = [
  { icon: "💻", label: "JavaScript Ecosystem", sub: "React · Next.js · Node.js" },
  { icon: "🧠", label: "DSA & Problem Solving", sub: "LeetCode · Competitive Coding" },
  { icon: "🤝", label: "Open to Collaborate", sub: "Projects · Hackathons · Ideas" },
];

const words = [
  "watching anime",
  "playing cricket",
  "exploring new places",
  "listening to music",
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf8f4",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "3rem",
      }}
    >
      {/* ── same ruled lines as homepage ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px)",
      }} />

      {/* ── same ambient orbs as homepage ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { size: 400, color: "rgba(155,44,26,0.06)", top: "-8%", left: "-5%" },
          { size: 340, color: "rgba(44,95,138,0.06)", top: "35%", right: "-5%" },
          { size: 280, color: "rgba(200,140,80,0.06)", bottom: "5%", left: "25%" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute",
            width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(70px)",
            ...("top"    in o ? { top:    o.top    } : {}),
            ...("bottom" in o ? { bottom: o.bottom } : {}),
            ...("left"   in o ? { left:   o.left   } : {}),
            ...("right"  in o ? { right:  o.right  } : {}),
          }} />
        ))}
      </div>

      {/* ── Neural canvas ── */}
      <NeuralBackground
        variant="light"
        nodeCount={55}
        connectDist={130}
        speed={1}
        style={{ zIndex: 2 }}
      />

      {/* ── vignette ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(250,248,244,0.72) 100%)",
      }} />

      {/* ══ CONTENT ══ */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: 1160,
        padding: "0 clamp(1.25rem, 5vw, 4rem)",
        boxSizing: "border-box",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(2rem, 5vw, 3.5rem)",
        }}>

          {/* ══ LEFT ══ */}
          <motion.div
            style={{ flex: "1 1 min(320px, 100%)", minWidth: 0 }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Role chip — identical to homepage */}
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
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B2C1A", flexShrink: 0 }} />
                CURIOUS BUILDER              </span>
            </motion.div>

            {/* Heading — single line "About Me" matching homepage style */}
            <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 8vw, 5rem)",
                letterSpacing: "-0.03em", lineHeight: 1.06,
                display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap",
              }}>
                <span style={{ color: "#3D2F27", fontWeight: 400 }}>About</span>
                <span style={{ color: "#1a1612", fontWeight: 400, fontStyle: "italic" }}>Me</span>
              </div>
            </motion.div>

            {/* Subtitle — same dash + text as homepage */}
            <motion.div variants={fadeUp} style={{
              display: "flex", alignItems: "center",
              gap: "0.65rem", marginBottom: "1.25rem", flexWrap: "wrap",
            }}>
              <div style={{
                width: "1.5rem", height: 2,
                background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0,
              }} />
              <p style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                color: "#5C4A3A",
                fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)",
                letterSpacing: "0.01em", margin: 0,
              }}>
               Creative Thinker &nbsp;·&nbsp; Tech Explorer
              </p>
            </motion.div>

            {/* Bio paragraphs — same style as homepage bio */}
            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.875rem, 2.2vw, 0.9375rem)",
              lineHeight: 1.8, color: "#6B5744", fontWeight: 400,
              maxWidth: "min(46ch, 100%)",
              marginBottom: "1rem",
              overflowWrap: "break-word", wordBreak: "break-word",
            }}>
              I&apos;m a passionate developer who enjoys solving problems and building
              meaningful applications that make a real difference.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.875rem, 2.2vw, 0.9375rem)",
              lineHeight: 1.8, color: "#6B5744", fontWeight: 400,
              maxWidth: "min(46ch, 100%)",
              marginBottom: "1rem",
              overflowWrap: "break-word", wordBreak: "break-word",
            }}>
              I love exploring new technologies and collaborating with curious minds.
              I primarily work within the JavaScript ecosystem — building efficient,
              scalable web applications using modern tools.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.875rem, 2.2vw, 0.9375rem)",
              lineHeight: 1.8, color: "#6B5744", fontWeight: 400,
              maxWidth: "min(46ch, 100%)",
              marginBottom: "1.5rem",
              overflowWrap: "break-word", wordBreak: "break-word",
            }}>
              Currently focused on deepening my expertise in Data Structures &amp;
              Algorithms — writing cleaner, faster, and more elegant code every day.
            </motion.p>

            {/* Hobbies flip */}
           <motion.div
  variants={fadeUp}
  style={{
    display: "inline-flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "4px",
    fontFamily: "var(--font-body)",
    fontSize: "clamp(0.875rem, 2.2vw, 0.9375rem)",
    color: "#6B5744",
    lineHeight: 1.8,
  }}
>
  <span>When I&apos;m not coding, I usually</span>

  <FlipWords
    words={words}
    className="text-[#9B2C1A] font-semibold"
  />
</motion.div>
          </motion.div>

          {/* ══ RIGHT ══ */}
          <motion.div
            style={{ flex: "0 1 360px", minWidth: 280, display: "flex", flexDirection: "column", gap: 14 }}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* What I Do card */}
            <div style={{
              background: "rgba(255,255,255,0.90)",
              border: "1px solid rgba(26,22,18,0.09)",
              borderRadius: "0.875rem",
              padding: "24px 24px 20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(26,22,18,0.06)",
            }}>
              {/* card title */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 18,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem", fontWeight: 500,
                  color: "#1a1612",
                }}>
                  What I Do
                </span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(155,44,26,0.20), transparent)" }} />
              </div>

              {highlights.map((h, i) => (
                <div key={h.label} style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "12px 0",
                  borderBottom: i < highlights.length - 1 ? "1px solid rgba(26,22,18,0.06)" : "none",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "0.6rem",
                    background: "rgba(155,44,26,0.07)",
                    border: "1px solid rgba(155,44,26,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
                  }}>
                    {h.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem", fontWeight: 500, color: "#1a1612",
                    }}>
                      {h.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem", color: "#9e9590",
                      letterSpacing: "0.02em",
                    }}>
                      {h.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Open to Work card — same style as homepage badge */}
            <div style={{
              background: "rgba(255,255,255,0.90)",
              border: "1px solid rgba(26,22,18,0.09)",
              borderRadius: "0.875rem",
              padding: "16px 20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(26,22,18,0.06)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ position: "relative", display: "flex", width: 8, height: 8, flexShrink: 0 }}>
                <span className="animate-ping" style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "#27ae60", opacity: 0.65,
                }} />
                <span style={{
                  position: "relative", display: "inline-flex",
                  width: 8, height: 8, borderRadius: "50%", background: "#27ae60",
                }} />
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem", fontWeight: 500, color: "#1a1612",
                }}>
                  Open to Work
                </span>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem", color: "#9e9590",
                }}>
                  Available for full-time &amp; freelance roles
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}