"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import Head from "next/head";
import NeuralBackground from "@/components/neural-background";

type MediaType = "image" | "youtube";
type Project = {
  id: number;
  title: string;
  description: string;
  media: { type: MediaType; src: string; thumbnail?: string };
  tags: string[];
  link: string;
  github: string;
};

const extractYouTubeId = (url: string): string => {
  if (url.includes("youtu.be")) return url.split("/").pop() || "";
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];
  const embedMatch = url.match(/youtube\.com\/embed\/([^/?]+)/);
  if (embedMatch) return embedMatch[1];
  return url;
};

const projects: Project[] = [
  {
    id: 1,
    title: "SkillConnect",
    description:
      "SkillConnect is an AI-powered freelancing platform that connects clients with both technical and non-technical freelancers through smart recommendations, location-based search, and real-time AI assistance. Built with React, Node.js, MongoDB, FastAPI, and FAISS, the platform offers secure authentication, freelancer booking, and an intelligent RAG-based chatbot to make hiring faster, smarter, and more accessible.",
    media: { type: "image", src: "/projects/project1ss.webp" },
    tags: ["React.js", "Node.js", "Tailwind CSS", "MongoDB", "FastAPI", "Clerk"],
    link: "https://skill-connect-rosy.vercel.app/",
    github: "https://github.com/07-Vignesh/SkillConnect",
  },
  {
    id: 2,
    title: "GoldenElite AI",
    description:
      "GoldenElite AI is a premium AI-powered career platform that helps students and professionals build successful careers through smart resume creation, interview preparation, career insights, and expert mentorship. It combines advanced AI technology with personalized guidance to support career growth in a modern and professional experience.",
    media: { type: "image", src: "/projects/project2ss.webp" },
    tags: ["Next.js", "Tailwind", "Neon", "Clerk", "OpenAI"],
    link: "https://goldeneliteai.vercel.app/",
    github: "https://github.com/07-Vignesh/GoldenEliteAI",
  },
  {
    id: 3,
    title: "Smart Bus Tracking System",
    description:
      "Smart Bus Tracking System is a real-time student transportation monitoring application integrated with GPS hardware devices. The system tracks school buses live, detects nearby student pickup locations, and sends automatic alerts for student safety and seat readiness.",
    media: { type: "image", src: "/projects/project3ss.webp" },
    tags: ["React.js", "Node.js", "MongoDB", "WebSockets", "GPS/IoT"],
    link: "https://bustrackin-app.web.app/",
    github: "https://github.com/07-Vignesh/terminal-ai-assistant-windows.git",
  },
  {
    id: 4,
    title: "VisionLearn AR",
    description:
      "VisionLearn AR is an AR/VR-based educational web application that helped me explore modern frontend technologies, 3D web experiences, and interactive UI design. The platform provides immersive virtual learning experiences using AR/VR concepts, animations, and modern web development practices.",
    media: { type: "image", src: "/projects/project4ss.webp" },
    tags: ["Next.js", "Tailwind", "Three.js", "EmailJS", "Framer Motion"],
    link: "https://vision-learn-ar.vercel.app/",
    github: "https://github.com/07-Vignesh/VisionLearn--AR",
  },
];

const tagColor = (tag: string): string => {
  const t = tag.toLowerCase();
  if (t.includes("react"))   return "#0ea5c8";
  if (t.includes("next"))    return "#404040";
  if (t.includes("node"))    return "#16a34a";
  if (t.includes("mongo"))   return "#15803d";
  if (t.includes("tail"))    return "#0891b2";
  if (t.includes("type"))    return "#2563eb";
  if (t.includes("openai"))  return "#059669";
  if (t.includes("clerk"))   return "#c2410c";
  if (t.includes("fast"))    return "#0d9488";
  if (t.includes("neon"))    return "#0891b2";
  if (t.includes("three"))   return "#7c3aed";
  if (t.includes("framer"))  return "#db2777";
  if (t.includes("email"))   return "#9B2C1A";
  if (t.includes("gps") || t.includes("iot")) return "#9B2C1A";
  return "#7a5c2e";
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ytId = selected?.media.type === "youtube"
    ? extractYouTubeId(selected.media.src) : null;

  return (
    <>
      <Head>
        <title>Vikneshwaran | Projects</title>
        <meta name="description" content="Portfolio of web development and software engineering projects." />
      </Head>

      <section
        id="projects-page"
        style={{
          minHeight: "100vh", width: "100%",
          background: "var(--paper, #faf8f4)",
          position: "relative", overflow: "hidden",
          paddingTop: "6rem", paddingBottom: "5rem",
        }}
      >
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
            { size: 300, color: "rgba(200,140,80,0.05)", top: "45%",    left: "38%"  },
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

        {/* Layer 2: Neural canvas */}
        <NeuralBackground variant="light" nodeCount={55} connectDist={130} speed={1} style={{ zIndex: 2 }} />

        {/* Layer 3: vignette */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(250,248,244,0.65) 100%)",
        }} />

        {/* ══ Content ══ */}
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: 1160, margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 4rem)",
          boxSizing: "border-box",
        }}>

          {/* ── Page header ── */}
          <motion.div
            style={{ marginBottom: "3.5rem" }}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* chip */}
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
                Selected Work
              </span>
            </div>

            {/* heading — bold upright + italic, pure ink, no brown */}
           <div style={{ marginBottom: "0.9rem" }}>
  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: 400, color: "#3D2F27",
      letterSpacing: "-0.03em", lineHeight: 1.06,
    }}>
      My
    </span>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: 400, fontStyle: "italic", color: "#1a1612",
      letterSpacing: "-0.03em", lineHeight: 1.06,
    }}>
      Projects
    </span>
  </div>
</div>

            {/* subtitle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ width: "1.5rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
              <p style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                color: "#6B5744",        /* one warm mid-tone for subtitles */
                fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)",
                letterSpacing: "0.01em", margin: 0,
              }}>
                Real-world applications built with modern technologies
              </p>
            </div>
          </motion.div>

          {/* ── Cards grid ── */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "1.75rem",
            }}
          >
            {projects.map((project) => {
              const thumb  = project.media.type === "youtube" ? project.media.thumbnail : project.media.src;
              const isYt   = project.media.type === "youtube";

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  onClick={() => setSelected(project)}
                  whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(26,22,18,0.12), 0 4px 16px rgba(26,22,18,0.07)" }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(26,22,18,0.09)",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 4px 24px rgba(26,22,18,0.07), 0 1px 4px rgba(26,22,18,0.04)",
                    display: "flex", flexDirection: "column",
                  }}
                >
                  {/* ── Thumbnail ── */}
                  <div style={{
                    width: "100%", aspectRatio: "16/9",
                    overflow: "hidden", position: "relative",
                    background: "#e8e2d8", flexShrink: 0,
                  }}>
                    <motion.img
                      src={thumb}
                      alt={project.title}
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.45 }}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "top",
                        filter: "sepia(5%) contrast(1.02)",
                        display: "block",
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(to top, rgba(245,240,232,0.45) 0%, transparent 55%)",
                    }} />
                    {isYt && (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: "50%",
                          background: "rgba(255,255,255,0.92)",
                          border: "1px solid rgba(26,22,18,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 4px 16px rgba(26,22,18,0.15)",
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#9B2C1A">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {/* Number badge */}
                    <div style={{
                      position: "absolute", top: 10, left: 10,
                      width: 26, height: 26, borderRadius: "50%",
                      background: "rgba(255,255,255,0.92)",
                      border: "1px solid rgba(26,22,18,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                      color: "#9B2C1A", fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(26,22,18,0.1)",
                    }}>
                      {String(project.id).padStart(2, "0")}
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div style={{
                    padding: "1.1rem 1.25rem 1.3rem",
                    flex: 1, display: "flex", flexDirection: "column", gap: "0.55rem",
                  }}>
                    {/* Title — single dark ink colour, no brown mixing */}
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem", fontWeight: 700,
                      color: "#1a1612",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25, margin: 0,
                    }}>
                      {project.title}
                    </h2>

                    {/* Description preview — warm mid grey */}
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem", lineHeight: 1.65,
                      color: "#6B5744",
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    } as React.CSSProperties}>
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem", marginTop: "auto", paddingTop: "0.25rem" }}>
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} style={{
                          padding: "0.18rem 0.52rem", borderRadius: "0.3rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.56rem", letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          color: tagColor(tag),
                          background: `${tagColor(tag)}14`,
                          border: `1px solid ${tagColor(tag)}2e`,
                        }}>
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span style={{
                          padding: "0.18rem 0.52rem", borderRadius: "0.3rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.56rem", letterSpacing: "0.07em",
                          color: "#9e9590",
                          background: "rgba(26,22,18,0.05)",
                          border: "1px solid rgba(26,22,18,0.1)",
                        }}>
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer row */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      paddingTop: "0.65rem",
                      borderTop: "1px solid rgba(26,22,18,0.07)",
                      marginTop: "0.25rem",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem", letterSpacing: "0.1em",
                        textTransform: "uppercase", color: "#9B2C1A",
                      }}>
                        View Details →
                      </span>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        {project.github && (
                          <a
                            href={project.github} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()} title="GitHub"
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "center",
                              width: 28, height: 28, borderRadius: "0.35rem",
                              color: "#5C4A3A", background: "rgba(250,248,244,0.9)",
                              border: "1px solid rgba(26,22,18,0.12)",
                              textDecoration: "none", transition: "all 0.2s",
                            }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#1a1612"; el.style.borderColor = "rgba(26,22,18,0.3)"; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#5C4A3A"; el.style.borderColor = "rgba(26,22,18,0.12)"; }}
                          >
                            <FiGithub size={12} />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()} title="Live Demo"
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "center",
                              width: 28, height: 28, borderRadius: "0.35rem",
                              color: "#faf8f4", background: "#1a1612",
                              border: "1px solid #1a1612",
                              textDecoration: "none", transition: "all 0.2s",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.82"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                          >
                            <FiExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ Modal ══ */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 9998,
                background: "rgba(26,22,18,0.6)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            {/* Panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.95,  y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 9999,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "1rem", pointerEvents: "none",
              }}
            >
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  pointerEvents: "auto",
                  width: "100%", maxWidth: 820,
                  maxHeight: "90vh", overflowY: "auto",
                  background: "var(--paper, #faf8f4)",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(26,22,18,0.1)",
                  boxShadow: "0 40px 100px rgba(26,22,18,0.25), 0 8px 32px rgba(26,22,18,0.12)",
                  position: "relative", scrollbarWidth: "none",
                }}
              >
                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position: "sticky", top: 14, float: "right",
                    marginRight: 14, marginTop: 14, zIndex: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 34, height: 34, borderRadius: "50%",
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(26,22,18,0.15)",
                    color: "#5C4A3A", cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(26,22,18,0.12)",
                    transition: "all 0.2s", flexShrink: 0,
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#1a1612"; el.style.color = "#faf8f4"; el.style.borderColor = "#1a1612"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.95)"; el.style.color = "#5C4A3A"; el.style.borderColor = "rgba(26,22,18,0.15)"; }}
                  aria-label="Close"
                >
                  <FiX size={15} />
                </button>

                {/* Media */}
                <div style={{
                  width: "100%", aspectRatio: "16/9",
                  background: "#e8e2d8", overflow: "hidden",
                  borderRadius: "1.25rem 1.25rem 0 0",
                  position: "relative", flexShrink: 0,
                }}>
                  {ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                      title={selected.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={selected.media.src} alt={selected.title}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "top",
                          filter: "sepia(5%) contrast(1.02)", display: "block",
                        }}
                      />
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(to top, rgba(250,248,244,0.5) 0%, transparent 45%)",
                      }} />
                    </>
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: "1.75rem 2rem 2.25rem", boxSizing: "border-box" }}>

                  {/* project chip */}
                  <div style={{ marginBottom: "0.85rem" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "#9B2C1A",
                      background: "rgba(155,44,26,0.09)",
                      border: "1px solid rgba(155,44,26,0.22)",
                      padding: "0.28rem 0.75rem", borderRadius: "999px",
                    }}>
                      Project {String(selected.id).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Modal title — pure ink, no colour split */}
                  <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    fontWeight: 700,
                    color: "#1a1612",
                    letterSpacing: "-0.02em", lineHeight: 1.15,
                    marginBottom: "1rem",
                  }}>
                    {selected.title}
                  </h2>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.25rem" }}>
                    {selected.tags.map(tag => (
                      <span key={tag} style={{
                        padding: "0.26rem 0.7rem", borderRadius: "0.4rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem", letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: tagColor(tag),
                        background: `${tagColor(tag)}14`,
                        border: `1px solid ${tagColor(tag)}2e`,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(26,22,18,0.08)", marginBottom: "1.25rem" }} />

                  {/* Description */}
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "1.75rem" }}>
                    <div style={{
                      width: "1.5rem", height: 2,
                      background: "#9B2C1A", borderRadius: 2, opacity: 0.7,
                      flexShrink: 0, marginTop: "0.7rem",
                    }} />
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.875rem, 2vw, 0.9375rem)",
                      lineHeight: 1.85,
                      color: "#5C4A3A",   /* one warm body tone */
                      fontWeight: 400, margin: 0,
                    }}>
                      {selected.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a
                      href={selected.github} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.65rem 1.4rem", borderRadius: "0.5rem",
                        fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500,
                        color: "#3D2F27",
                        background: "rgba(250,248,244,0.9)",
                        border: "1px solid rgba(26,22,18,0.15)",
                        textDecoration: "none",
                        boxShadow: "0 1px 4px rgba(26,22,18,0.06)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(26,22,18,0.3)"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 4px 12px rgba(26,22,18,0.1)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(26,22,18,0.15)"; el.style.transform = ""; el.style.boxShadow = "0 1px 4px rgba(26,22,18,0.06)"; }}
                    >
                      <FiGithub size={15} /> View on GitHub
                    </a>

                    {selected.link ? (
                      <a
                        href={selected.link} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.5rem",
                          padding: "0.65rem 1.4rem", borderRadius: "0.5rem",
                          fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500,
                          color: "#faf8f4", background: "#1a1612",
                          border: "1px solid #1a1612", textDecoration: "none",
                          boxShadow: "0 2px 8px rgba(26,22,18,0.2)", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 20px rgba(26,22,18,0.28)"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ""; el.style.boxShadow = "0 2px 8px rgba(26,22,18,0.2)"; }}
                      >
                        <FiExternalLink size={15} /> Live Demo
                      </a>
                    ) : (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.65rem 1.4rem", borderRadius: "0.5rem",
                        fontFamily: "var(--font-body)", fontSize: "0.85rem",
                        color: "#b0a89e",
                        background: "rgba(250,248,244,0.5)",
                        border: "1px solid rgba(26,22,18,0.08)",
                      }}>
                        <FiExternalLink size={15} /> No Live Demo
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}