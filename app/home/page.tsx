"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Head from "next/head";
import MagneticButton from "@/components/ui/magnetic-button";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion } from "framer-motion";
import NeuralBackground from "@/components/neural-background";

const imageMetadata = {
  profile1: { url: "/profile1.jpeg", alt: "Vikneshwaran - Full Stack Developer" },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { num: "FULL STACK", label: "DEVELOPER" },
  { num: "10+", label: "Projects" },
  { num: "DSA", label: "LEARNER" },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vikneshwaran",
              jobTitle: "Full Stack Developer",
            }),
          }}
        />
      </Head>

      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper)",
          overflow: "hidden",
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        {/* Layer 0: ruled lines */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px)",
          }}
        />

        {/* Layer 1: ambient orbs */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
          {[
            { size: 400, color: "rgba(192,57,43,0.06)", top: "-8%", left: "-5%" },
            { size: 340, color: "rgba(44,95,138,0.06)", top: "35%", right: "-5%" },
            { size: 280, color: "rgba(200,140,80,0.06)", bottom: "5%", left: "25%" },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute",
              width: o.size, height: o.size, borderRadius: "50%",
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
              filter: "blur(70px)",
              ...("top" in o ? { top: o.top } : {}),
              ...("bottom" in o ? { bottom: o.bottom } : {}),
              ...("left" in o ? { left: o.left } : {}),
              ...("right" in o ? { right: o.right } : {}),
            }} />
          ))}
        </div>

        {/* Layer 2: Neural canvas */}
        <NeuralBackground
          variant="light"
          nodeCount={55}
          connectDist={130}
          speed={1}
          style={{ zIndex: 2 }}
        />

        {/* Layer 3: tighter vignette */}
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

            {/* ══ LEFT: Text column ══ */}
            <motion.div
              style={{ flex: "1 1 min(320px, 100%)", minWidth: 0 }}
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Role chip */}
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
                  Full Stack Developer
                </span>
              </motion.div>

              {/* Name */}
              <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 5rem)",
                  color: "#3D2F27",
                  fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.0,
                }}>
                  Hi, I&apos;m
                </div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 5rem)",
                  color: "#1a1612",
                  fontWeight: 400, fontStyle: "italic",
                  letterSpacing: "-0.03em", lineHeight: 1.06,
                  wordBreak: "break-word", overflowWrap: "break-word",
                }}>
                  Vikneshwaran
                </div>
              </motion.div>

              {/* Subtitle */}
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
                  Full Stack Developer &nbsp;·&nbsp; Tech Enthusiast
                </p>
              </motion.div>

              {/* Bio */}
              <motion.p variants={fadeUp} style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.875rem, 2.2vw, 0.9375rem)",
                lineHeight: 1.8,
                color: "#6B5744",
                fontWeight: 400,
                maxWidth: "min(42ch, 100%)",
                marginBottom: "2rem",
                overflowWrap: "break-word", wordBreak: "break-word",
              }}>
                I turn coffee into code and bugs into features. Full-stack
                developer with a strong foundation in Data Structures &amp;
                Algorithms — building efficient, scalable web applications
                using modern technologies.
              </motion.p>

              {/* CTA + socials */}
              <motion.div variants={fadeUp} style={{
                display: "flex", alignItems: "center",
                gap: "0.75rem", flexWrap: "wrap",
              }}>
                <MagneticButton>
                  <button
                    onClick={() => (window.location.href = "/resume")}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.45rem",
                      padding: "0.68rem 1.4rem", borderRadius: "0.5rem",
                      background: "#1a1612", color: "#faf8f4",
                      fontFamily: "var(--font-body)", fontWeight: 500,
                      fontSize: "0.875rem",
                      border: "1px solid #1a1612", cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 8px rgba(26,22,18,0.18)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 6px 20px rgba(26,22,18,0.22)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ""; el.style.boxShadow = "0 2px 8px rgba(26,22,18,0.18)"; }}
                  >
                    View CV
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                  </button>
                </MagneticButton>

                <div style={{ width: 1, height: 26, background: "rgba(26,22,18,0.15)", flexShrink: 0 }} />

                {[
                  { href: "https://github.com/07-Vignesh", icon: <FaGithub size={16} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/viknesh-waran/", icon: <FaLinkedin size={16} />, label: "LinkedIn" },
                  { href: "https://leetcode.com/u/7VigneshVicky/", icon: <SiLeetcode size={16} />, label: "LeetCode" },
                ].map(({ href, icon, label }) => (
                  <MagneticButton key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: "2.35rem", height: "2.35rem", borderRadius: "0.5rem",
                        color: "#5C4A3A",
                        border: "1px solid rgba(26,22,18,0.15)",
                        background: "rgba(255,255,255,0.85)",
                        boxShadow: "0 1px 4px rgba(26,22,18,0.08)",
                        transition: "all 0.2s ease", textDecoration: "none",
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#9B2C1A"; el.style.borderColor = "rgba(155,44,26,0.3)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 4px 12px rgba(26,22,18,0.12)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#5C4A3A"; el.style.borderColor = "rgba(26,22,18,0.15)"; el.style.transform = ""; el.style.boxShadow = "0 1px 4px rgba(26,22,18,0.08)"; }}
                    >{icon}</a>
                  </MagneticButton>
                ))}
              </motion.div>

              {/* Scroll hint — desktop only */}
              <motion.div variants={fadeUp} className="hidden md:flex"
                style={{ marginTop: "2.5rem", alignItems: "center", gap: "0.7rem", color: "#9e9590" }}
              >
                <div style={{ width: 1, height: 24, background: "rgba(26,22,18,0.15)" }} />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.63rem",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#9e9590",
                }}>
                  Scroll to explore
                </span>
                <motion.svg width="10" height="14" viewBox="0 0 12 16" fill="none"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ opacity: 0.4 }}
                >
                  <path d="M6 1v14M1 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.div>
            </motion.div>

            {/* ══ RIGHT: Profile image — desktop only ══ */}
            <motion.div
              className="hidden md:flex"
              style={{ flex: "0 0 auto", justifyContent: "center", alignItems: "center" }}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer wrapper: photo + floating stats side-by-side */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>

                {/* ── Photo card ── */}
                <TiltCard>
                  {/* Single wrapper — no offset ghost frames */}
                  <div style={{ position: "relative", width: 270, height: 330 }}>

                    {/* Photo card */}
                    <div style={{
                      position: "relative", width: "100%", height: "100%",
                      borderRadius: "1rem", overflow: "hidden",
                      border: "1px solid rgba(26,22,18,0.12)",
                      boxShadow: "0 16px 48px rgba(26,22,18,0.14), 0 4px 16px rgba(26,22,18,0.08)",
                      background: "var(--cream-deep)",
                    }}>
                      {/* Corner accents — inside card, no layout impact */}
                      <div style={{ position: "absolute", top: 10, left: 10, width: 18, height: 18, zIndex: 5, pointerEvents: "none", borderTop: "2px solid #9B2C1A", borderLeft: "2px solid #9B2C1A", borderTopLeftRadius: "0.6rem", opacity: 0.5 }} />
                      <div style={{ position: "absolute", bottom: 10, right: 10, width: 18, height: 18, zIndex: 5, pointerEvents: "none", borderBottom: "2px solid #2c5f8a", borderRight: "2px solid #2c5f8a", borderBottomRightRadius: "0.6rem", opacity: 0.4 }} />

                      <Image
                        src={imageMetadata.profile1.url}
                        alt={imageMetadata.profile1.alt}
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="270px"
                        style={{ filter: "sepia(8%) contrast(1.03)" }}
                      />
                      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(245,240,232,0.28) 0%, transparent 50%)" }} />
                    </div>

                    {/* Open to Work badge — below card, no x-overflow */}
                    <motion.div
                      style={{ position: "absolute", bottom: -14, left: 16, zIndex: 10 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.82, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <div style={{
                        display: "flex", alignItems: "center", gap: "0.45rem",
                        padding: "0.42rem 0.9rem", borderRadius: "0.6rem",
                        background: "#ffffff", border: "1px solid rgba(26,22,18,0.12)",
                        boxShadow: "0 4px 16px rgba(26,22,18,0.10)",
                      }}>
                        <span style={{ position: "relative", display: "flex", width: 7, height: 7, flexShrink: 0 }}>
                          <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#27ae60", opacity: 0.65 }} />
                          <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7, borderRadius: "50%", background: "#27ae60" }} />
                        </span>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          color: "#5C4A3A",
                        }}>
                          Open to Work
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </TiltCard>

                {/* ── Stats pills — floated to the right of the photo ── */}
                <motion.div
                  style={{
                    display: "flex", flexDirection: "column", gap: "8px",
                    marginTop: "20px",
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stats.map(({ num, label }) => (
                    <div key={label} style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(26,22,18,0.1)",
                      borderRadius: "0.625rem",
                      padding: "0.55rem 0.85rem",
                      boxShadow: "0 2px 10px rgba(26,22,18,0.07)",
                      textAlign: "center",
                      minWidth: "58px",
                    }}>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem", fontWeight: 500,
                        color: "#1a1612", lineHeight: 1,
                      }}>{num}</div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem", letterSpacing: "0.08em",
                        textTransform: "uppercase", color: "#9e9590",
                        marginTop: "3px",
                      }}>{label}</div>
                    </div>
                  ))}
                </motion.div>

              </div>
            </motion.div>

          </div>

          {/* ══ Mobile-only: profile image below text ══ */}
          <motion.div
            className="flex md:hidden"
            style={{ justifyContent: "center", marginTop: "2.5rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "relative", width: 220, height: 270 }}>
              <div style={{
                position: "relative", width: "100%", height: "100%",
                borderRadius: "0.875rem", overflow: "hidden",
                border: "1px solid rgba(26,22,18,0.12)",
                boxShadow: "0 12px 32px rgba(26,22,18,0.12)",
                background: "var(--cream-deep)",
              }}>
                <Image
                  src={imageMetadata.profile1.url}
                  alt={imageMetadata.profile1.alt}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="220px"
                  style={{ filter: "sepia(8%) contrast(1.03)" }}
                />
              </div>
              {/* Mobile badge */}
              <div style={{
                position: "absolute", bottom: -10, left: "50%",
                transform: "translateX(-50%)", zIndex: 10,
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.35rem 0.8rem", borderRadius: "0.5rem",
                background: "#ffffff", border: "1px solid rgba(26,22,18,0.12)",
                boxShadow: "0 4px 12px rgba(26,22,18,0.10)",
                whiteSpace: "nowrap",
              }}>
                <span style={{ position: "relative", display: "flex", width: 6, height: 6, flexShrink: 0 }}>
                  <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#27ae60", opacity: 0.65 }} />
                  <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6, borderRadius: "50%", background: "#27ae60" }} />
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C4A3A" }}>
                  Open to Work
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}