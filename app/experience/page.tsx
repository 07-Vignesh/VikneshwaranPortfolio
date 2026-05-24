"use client";

import React from "react";
import { FiMapPin, FiAward, FiBriefcase, FiBook, FiCode } from "react-icons/fi";
import NeuralBackground from "@/components/neural-background";
import { motion } from "framer-motion";

/* ── same animation variants as homepage ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

/* ── DATA ── */
const timelineData = [
  {
    period: "Present",
    type: "work",
    tag: "Current",
    role: "Job Seeker & Part-Time Assistant",
    company: "SGS IT Park (Computer Shop)",
    location: "Karaikudi",
    desc: "Currently seeking full-time opportunities as a software developer while working part-time at SGS IT Park computer shop. Continuously improving technical skills and building projects.",
    points: [
      "Assisting customers with computer-related services and support",
      "Handling basic troubleshooting and system-related tasks",
      "Continuously practicing Data Structures and Algorithms",
      "Building and improving web development projects",
    ],
  },
  {
    period: "Dec 2025 – Jan 2026",
    type: "work",
    tag: "Internship",
    role: "Software Development Intern",
    company: "South Grapes Solutions",
    location: "Karaikudi",
    desc: "Completed a one-month internship gaining practical exposure to software development and real-world project environments.",
    points: [
      "Learned software development concepts and industry practices",
      "Improved coding and problem-solving skills through hands-on tasks",
      "Demonstrated punctuality, hard work, and eagerness to learn",
      "Gained exposure to real-world development workflow and teamwork",
    ],
  },
  {
    period: "May – Jun 2025",
    type: "work",
    tag: "Internship",
    role: "Web Development Intern",
    company: "DrobospaceX Automation Pvt. Ltd.",
    location: "Karaikudi",
    desc: "Completed internship training in Web Development, gaining hands-on experience in building and understanding web applications.",
    points: [
      "Learned and applied core web development concepts",
      "Built basic web applications and improved practical coding skills",
      "Developed problem-solving and logical thinking abilities",
      "Demonstrated enthusiasm, self-discipline, and teamwork",
    ],
  },
  {
    period: "2023 – 2026",
    type: "edu",
    tag: "Degree",
    role: "B.Voc Software Development",
    company: "Alagappa University",
    location: "Karaikudi, Tamil Nadu",
    desc: "Completed B.Voc in Software Development. Gained strong knowledge in web development, programming, and software engineering fundamentals. Built real-world projects and sharpened DSA skills.",
    points: [],
  },
  {
    period: "2021 – 2023",
    type: "edu",
    tag: "School",
    role: "Higher Secondary (Computer Science)",
    company: "SMSV Higher Secondary School",
    location: "Karaikudi, Tamil Nadu",
    desc: "Top performer in Computer Science at SMSV Higher Secondary School. Developed a strong foundation in programming, logical thinking, and problem-solving.",
    points: [],
  },
];

const achievements = [
  {
    icon: "award",
    accent: "#9B2C1A",
    accentBg: "rgba(155,44,26,0.07)",
    accentBorder: "rgba(155,44,26,0.18)",
    title: "WebHunt Event In-Charge",
    org: "TechFest Hackathon – Alagappa University",
    location: "Karaikudi",
    desc: "Organised and managed the WebHunt competitive event with 50+ participants. Handled event coordination, judging workflow, and technical issue resolution.",
    points: [
      "Managed 50+ participants during the event",
      "Coordinated judging and technical support",
      "Awarded a shield for outstanding event execution",
    ],
  },
  {
    icon: "code",
    accent: "#27ae60",
    accentBg: "rgba(39,174,96,0.07)",
    accentBorder: "rgba(39,174,96,0.18)",
    title: "Smart India Hackathon (SIH)",
    org: "National Level Hackathon",
    location: "India",
    desc: "Participated in Smart India Hackathon and collaborated with a team to develop innovative real-world solutions under a competitive environment.",
    points: [
      "Worked on real-world problem statements",
      "Improved teamwork and problem-solving skills",
      "Gained experience in rapid project development",
    ],
  },
  {
    icon: "award",
    accent: "#2c5f8a",
    accentBg: "rgba(44,95,138,0.07)",
    accentBorder: "rgba(44,95,138,0.18)",
    title: "5th Place – College Hackathon",
    org: "Vidhyagiri Arts and Science College",
    location: "Tamil Nadu",
    desc: "Secured 5th place in a college-level hackathon and received a ₹2000 cash prize for developing an innovative technical solution.",
    points: [
      "Ranked among top teams in the competition",
      "Won ₹2000 cash prize",
      "Presented innovative project solution successfully",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <section
      id="experience"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#faf8f4",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "4rem",
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
          { size: 340, color: "rgba(44,95,138,0.06)", top: "40%", right: "-5%" },
          { size: 280, color: "rgba(200,140,80,0.05)", bottom: "5%", left: "30%" },
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

      {/* ── Neural canvas ── */}
      <NeuralBackground variant="light" nodeCount={55} connectDist={130} speed={1} style={{ zIndex: 2 }} />

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
        margin: "0 auto",
        padding: "0 clamp(1.25rem, 5vw, 4rem)",
        boxSizing: "border-box",
      }}>

        {/* ── PAGE HEADER ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ marginBottom: "3rem" }}
        >
          {/* Role chip — identical style to homepage */}
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
              My Journey
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 7vw, 4.2rem)",
              color: "#3D2F27",
              fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.0,
            }}>
              Work &amp;
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 7vw, 4.2rem)",
              color: "#1a1612",
              fontWeight: 400, fontStyle: "italic",
              letterSpacing: "-0.03em", lineHeight: 1.06,
            }}>
              Education
            </div>
          </motion.div>

          {/* Subtitle — same as homepage */}
          <motion.div variants={fadeUp} style={{
            display: "flex", alignItems: "center",
            gap: "0.65rem", flexWrap: "wrap",
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
             Experience &nbsp;·&nbsp; Education &nbsp;·&nbsp; Growth
            </p>
          </motion.div>
        </motion.div>

        {/* ── SECTION DIVIDER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex", alignItems: "center", gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "0.6rem",
            background: "#9B2C1A",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#faf8f4", flexShrink: 0,
          }}>
            <FiBriefcase size={15} />
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem", fontWeight: 500,
            color: "#1a1612",
          }}>
            Experience &amp; Education
          </span>
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(to right, rgba(155,44,26,0.25), transparent)",
          }} />
        </motion.div>

        {/* ══ TIMELINE ══ */}
        <div style={{ position: "relative", paddingLeft: 52, marginBottom: 56 }}>

          {/* vertical line */}
          <div style={{
            position: "absolute",
            left: 15, top: 10, bottom: 10,
            width: 2, borderRadius: 2,
            background: "linear-gradient(to bottom, #9B2C1A 0%, rgba(155,44,26,0.4) 50%, rgba(155,44,26,0.08) 100%)",
          }} />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", paddingBottom: i < timelineData.length - 1 ? 28 : 0 }}
              className="xp-item"
            >
              {/* dot */}
              <div
                className="xp-dot"
                style={{
                  position: "absolute",
                  left: -44, top: 8,
                  width: 16, height: 16,
                  borderRadius: "50%",
                  background: "#faf8f4",
                  border: `2.5px solid ${item.type === "edu" ? "#2c5f8a" : "#9B2C1A"}`,
                  boxShadow: `0 0 0 4px ${item.type === "edu" ? "rgba(44,95,138,0.15)" : "rgba(155,44,26,0.15)"}`,
                  transition: "all 0.25s",
                }}
              />

              {/* period + tag */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: item.type === "edu" ? "#2c5f8a" : "#9B2C1A",
                }}>
                  {item.period}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: item.type === "edu" ? "#2c5f8a" : "#9B2C1A",
                  background: item.type === "edu" ? "rgba(44,95,138,0.07)" : "rgba(155,44,26,0.07)",
                  border: `1px solid ${item.type === "edu" ? "rgba(44,95,138,0.18)" : "rgba(155,44,26,0.18)"}`,
                  borderRadius: 5,
                  padding: "2px 8px",
                }}>
                  {item.tag}
                </span>
              </div>

              {/* card */}
              <div
                className="xp-card"
                style={{
                  background: "rgba(255,255,255,0.90)",
                  border: "1px solid rgba(26,22,18,0.09)",
                  borderRadius: "0.875rem",
                  padding: "20px 22px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(26,22,18,0.06)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s, transform 0.25s",
                }}
              >
                {/* left accent bar */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                  background: item.type === "edu" ? "#2c5f8a" : "#9B2C1A",
                  borderRadius: "0.875rem 0 0 0.875rem",
                  opacity: 0,
                }} className="xp-card-bar" />

                {/* top row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    flexShrink: 0, width: 36, height: 36, borderRadius: "0.6rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: item.type === "edu" ? "rgba(44,95,138,0.08)" : "rgba(155,44,26,0.08)",
                    border: `1px solid ${item.type === "edu" ? "rgba(44,95,138,0.15)" : "rgba(155,44,26,0.15)"}`,
                    color: item.type === "edu" ? "#2c5f8a" : "#9B2C1A",
                  }}>
                    {item.type === "edu" ? <FiBook size={15} /> : <FiBriefcase size={15} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem", fontWeight: 500,
                      color: "#1a1612", margin: "0 0 4px",
                      lineHeight: 1.3,
                    }}>
                      {item.role}
                    </p>
                    <div style={{
                      display: "flex", alignItems: "center",
                      flexWrap: "wrap", gap: 5,
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                    }}>
                      <span style={{ fontWeight: 600, color: "#5C4A3A" }}>{item.company}</span>
                      <span style={{ color: "rgba(26,22,18,0.3)" }}>·</span>
                      <span style={{ color: "#9e9590", display: "flex", alignItems: "center", gap: 3 }}>
                        <FiMapPin size={10} />{item.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "#6B5744",
                  lineHeight: 1.75,
                  margin: "0 0 10px",
                }}>
                  {item.desc}
                </p>

                {item.points.length > 0 && (
                  <ul style={{
                    listStyle: "none", padding: 0, margin: 0,
                    borderTop: "1px solid rgba(26,22,18,0.06)",
                    paddingTop: 10,
                    display: "flex", flexDirection: "column", gap: 5,
                  }}>
                    {item.points.map((pt, j) => (
                      <li key={j} style={{
                        display: "flex", alignItems: "flex-start", gap: 8,
                        fontFamily: "var(--font-body)",
                        fontSize: "0.84rem", color: "#6B5744", lineHeight: 1.65,
                      }}>
                        <span style={{
                          color: item.type === "edu" ? "#2c5f8a" : "#9B2C1A",
                          fontSize: "0.72rem", flexShrink: 0, marginTop: 3,
                        }}>▹</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── ACHIEVEMENTS DIVIDER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex", alignItems: "center", gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "0.6rem",
            background: "#9B2C1A",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#faf8f4", flexShrink: 0,
          }}>
            <FiAward size={15} />
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem", fontWeight: 500,
            color: "#1a1612",
          }}>
            Achievements
          </span>
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(to right, rgba(155,44,26,0.25), transparent)",
          }} />
        </motion.div>

        {/* ── ACHIEVEMENT CARDS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(255,255,255,0.90)",
                border: "1px solid rgba(26,22,18,0.09)",
                borderRadius: "0.875rem",
                padding: "20px 22px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(26,22,18,0.06)",
                display: "flex", gap: 14,
                alignItems: "flex-start",
                position: "relative", overflow: "hidden",
                transition: "box-shadow 0.25s, transform 0.25s",
              }}
              className="xp-ach-card"
            >
              {/* coloured top strip */}
              <div style={{
                position: "absolute", left: 0, top: 0, right: 0, height: 2,
                background: a.accent, borderRadius: "0.875rem 0.875rem 0 0",
                opacity: 0,
              }} className="xp-ach-strip" />

              <div style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: "0.65rem",
                background: a.accentBg, border: `1px solid ${a.accentBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: a.accent, marginTop: 1,
              }}>
                {a.icon === "code" ? <FiCode size={17} /> : <FiAward size={17} />}
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem", fontWeight: 500,
                  color: "#1a1612", margin: 0,
                }}>
                  {a.title}
                </p>
                <div style={{
                  display: "flex", alignItems: "center",
                  flexWrap: "wrap", gap: 5,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.77rem", color: "#9e9590", fontWeight: 500,
                }}>
                  <span>{a.org}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{a.location}</span>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.855rem", color: "#6B5744",
                  lineHeight: 1.68, margin: 0,
                }}>
                  {a.desc}
                </p>
                <ul style={{
                  listStyle: "none", padding: 0,
                  margin: 0, paddingTop: 8,
                  borderTop: "1px solid rgba(26,22,18,0.06)",
                  display: "flex", flexDirection: "column", gap: 4,
                }}>
                  {a.points.map((pt, j) => (
                    <li key={j} style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      fontFamily: "var(--font-body)",
                      fontSize: "0.83rem", color: "#6B5744",
                      lineHeight: 1.6, paddingTop: 4,
                    }}>
                      <span style={{ color: a.accent, fontSize: "0.72rem", flexShrink: 0, marginTop: 3 }}>▹</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* hover effects via global CSS */}
      <style>{`
        .xp-item:hover .xp-dot {
          background: currentColor !important;
          box-shadow: 0 0 0 6px rgba(155,44,26,0.18) !important;
        }
        .xp-card:hover {
          box-shadow: 0 8px 32px rgba(26,22,18,0.12) !important;
          transform: translateX(4px);
        }
        .xp-card:hover .xp-card-bar {
          opacity: 1 !important;
        }
        .xp-ach-card:hover {
          box-shadow: 0 8px 32px rgba(26,22,18,0.12) !important;
          transform: translateY(-3px);
        }
        .xp-ach-card:hover .xp-ach-strip {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}