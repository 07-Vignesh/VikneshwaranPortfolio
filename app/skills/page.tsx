"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript,
  SiMysql, SiPostgresql, SiGit, SiDocker, SiMongodb, SiNodedotjs,
  SiExpress, SiAuth0, SiPostman, SiXampp,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiJavaLine } from "react-icons/ri";
import { FiCode, FiDatabase, FiTool } from "react-icons/fi";
import NeuralBackground from "@/components/neural-background";

const skills = {
  "Frontend Development": {
    icon: <FiCode />,
    accent: "#9B2C1A",
    accentLight: "rgba(155,44,26,0.08)",
    accentBorder: "rgba(155,44,26,0.22)",
    items: [
      { name: "React",        icon: <SiReact />,       color: "#61DAFB" },
      { name: "Next.js",      icon: <SiNextdotjs />,   color: "#1a1612" },
      { name: "TypeScript",   icon: <SiTypescript />,  color: "#3178C6" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "JavaScript",   icon: <SiJavascript />,  color: "#F7DF1E" },
    ],
  },
  "Backend & Databases": {
    icon: <FiDatabase />,
    accent: "#2c5f8a",
    accentLight: "rgba(44,95,138,0.08)",
    accentBorder: "rgba(44,95,138,0.22)",
    items: [
      { name: "Java",       icon: <RiJavaLine />,   color: "#ED8B00" },
      { name: "Node.js",    icon: <SiNodedotjs />,  color: "#339933" },
      { name: "Express.js", icon: <SiExpress />,    color: "#5C4A3A" },
      { name: "MySQL",      icon: <SiMysql />,      color: "#4479A1" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "MongoDB",    icon: <SiMongodb />,    color: "#47A248" },
    ],
  },
  "Tools & Technologies": {
    icon: <FiTool />,
    accent: "#7a5c2e",
    accentLight: "rgba(122,92,46,0.08)",
    accentBorder: "rgba(122,92,46,0.22)",
    items: [
      { name: "Git",        icon: <SiGit />,     color: "#F05032" },
      { name: "Docker",     icon: <SiDocker />,  color: "#2496ED" },
      { name: "Postman",    icon: <SiPostman />, color: "#FF6C37" },
      { name: "XAMPP",      icon: <SiXampp />,   color: "#FB7A24" },
      { name: "VS Code",    icon: <VscVscode />, color: "#007ACC" },
      { name: "Clerk Auth", icon: <SiAuth0 />,   color: "#EB5424" },
      { name: "Eclipse",    icon: <FiCode />,    color: "#7A3F9D" },
    ],
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section
      id="skills"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--paper, #faf8f4)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "5rem",
      }}
    >
      {/* Layer 0: ruled lines — identical to home */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px)",
      }} />

      {/* Layer 1: ambient orbs */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { size: 500, color: "rgba(155,44,26,0.055)",  top: "-12%",   left: "-8%"   },
          { size: 400, color: "rgba(44,95,138,0.055)",  bottom: "-5%", right: "-6%"  },
          { size: 320, color: "rgba(200,140,80,0.055)", top: "38%",    left: "42%"   },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute",
            width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(90px)",
            ...("top"    in o ? { top:    o.top }    : {}),
            ...("bottom" in o ? { bottom: o.bottom } : {}),
            ...("left"   in o ? { left:   o.left }   : {}),
            ...("right"  in o ? { right:  o.right }  : {}),
          }} />
        ))}
      </div>

      {/* Layer 2: Neural canvas — same as home */}
      <NeuralBackground
        variant="light"
        nodeCount={55}
        connectDist={130}
        speed={1}
        style={{ zIndex: 2 }}
      />

      {/* Layer 3: vignette — same as home */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(250,248,244,0.65) 100%)",
      }} />

      {/* ══ Content ══ */}
      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: 1100, margin: "0 auto",
        padding: "0 clamp(1.25rem, 5vw, 4rem)",
        boxSizing: "border-box",
      }}>

        {/* ── Section header — matches About / Work & Education style ── */}
        <motion.div
          style={{ marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* chip — matches "MY JOURNEY", "FULL STACK DEVELOPER" chips */}
          <div style={{ marginBottom: "1.25rem" }}>
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
              Technical Toolkit
            </span>
          </div>

         <div style={{ marginBottom: "0.9rem" }}>
  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: 400, color: "#3D2F27",
      letterSpacing: "-0.03em", lineHeight: 1.06,
    }}>
      Skills &amp;
    </span>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: 400, fontStyle: "italic", color: "#1a1612",
      letterSpacing: "-0.03em", lineHeight: 1.06,
    }}>
      Technologies
    </span>
  </div>
</div>

          {/* subtitle line — matches "Developer · Learner · Builder" style */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "1.5rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#5C4A3A",
              fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)",
              letterSpacing: "0.01em",
              margin: 0,
            }}>
              Frontend &nbsp;·&nbsp; Backend &nbsp;·&nbsp; Tools
            </p>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {Object.entries(skills).map(([category, { icon, accent, accentLight, accentBorder, items }]) => {
            const isHovered = hoveredCard === category;
            return (
              <motion.div
                key={category}
                variants={fadeUp}
                onHoverStart={() => setHoveredCard(category)}
                onHoverEnd={() => setHoveredCard(null)}
                animate={{
                  y: isHovered ? -6 : 0,
                  boxShadow: isHovered
                    ? `0 20px 48px rgba(26,22,18,0.11), 0 4px 16px rgba(26,22,18,0.07), 0 0 0 1px ${accent}30`
                    : "0 4px 24px rgba(26,22,18,0.06), 0 1px 4px rgba(26,22,18,0.04)",
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(14px)",
                  border: `1px solid ${isHovered ? accent + "28" : "rgba(26,22,18,0.09)"}`,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "border-color 0.28s",
                }}
              >
                {/* Shimmer top bar on hover */}
                <motion.div
                  style={{
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    opacity: 0,
                  }}
                  animate={{ opacity: isHovered ? 0.7 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card header */}
                <div style={{
                  padding: "1.35rem 1.5rem 1.15rem",
                  borderBottom: "1px solid rgba(26,22,18,0.07)",
                  display: "flex", alignItems: "center", gap: "0.85rem",
                }}>
                  <motion.div
                    animate={{
                      background: isHovered ? accent : accentLight,
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "2.4rem", height: "2.4rem", borderRadius: "0.6rem",
                      border: `1px solid ${accentBorder}`,
                      color: isHovered ? "#fff" : accent,
                      fontSize: "1.1rem", flexShrink: 0,
                    }}
                  >
                    {icon}
                  </motion.div>
                  <div>
                    {/* Card title — matches the serif body text style from About */}
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#1a1612",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}>
                      {category}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "#9e9590",
                      marginTop: "2px",
                    }}>
                      {items.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skill chips */}
                <div style={{ padding: "1.2rem 1.5rem 1.5rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {items.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.28, delay: 0.1 + i * 0.04 }}
                        whileHover={{
                          y: -4,
                          boxShadow: `0 6px 16px ${skill.color}30`,
                          borderColor: `${skill.color}60`,
                          background: `${skill.color}0d`,
                          transition: { duration: 0.18 },
                        }}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.42rem",
                          padding: "0.38rem 0.75rem",
                          borderRadius: "0.5rem",
                          background: "rgba(250,248,244,0.9)",
                          border: "1px solid rgba(26,22,18,0.1)",
                          boxShadow: "0 1px 3px rgba(26,22,18,0.05)",
                          cursor: "default",
                        }}
                      >
                        <span style={{ fontSize: "0.95rem", color: skill.color, lineHeight: 1, flexShrink: 0 }}>
                          {skill.icon}
                        </span>
                        {/* Chip label — matches the body text weight used in About cards */}
                        <span style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8rem",
                          fontWeight: 400,
                          color: "#5C4A3A",
                          letterSpacing: "0.01em",
                          whiteSpace: "nowrap",
                        }}>
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Footer note ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center" }}
        >
          <div style={{
            display: "flex", alignItems: "flex-startr", gap: "0.75rem",
            padding: "0.9rem 1.6rem",
            borderRadius: "0.75rem",
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(26,22,18,0.1)",
            boxShadow: "0 2px 12px rgba(26,22,18,0.06)",
            backdropFilter: "blur(8px)",
            maxWidth: "520px",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#9B2C1A", flexShrink: 0, opacity: 0.7,
              display: "inline-block",  marginTop: "9px",
            }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              lineHeight: 1.8,
              color: "#6B5744",
              fontWeight: 400,
              margin: 0,
            }}>
              Always exploring new technologies to expand my toolkit and solve
              complex problems more effectively.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}