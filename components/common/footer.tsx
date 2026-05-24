"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: "https://github.com/07-Vignesh",             icon: <FaGithub size={15} />,   label: "GitHub"   },
    { href: "https://www.linkedin.com/in/viknesh-waran/", icon: <FaLinkedin size={15} />, label: "LinkedIn" },
    { href: "https://leetcode.com/u/7VigneshVicky/",      icon: <SiLeetcode size={15} />, label: "LeetCode" },
  ];

  const navLinks = [
    { label: "Home",     href: "#home"     },
    { label: "Projects", href: "#projects" },
    { label: "Skills",   href: "#skills"   },
    { label: "About",    href: "#about"    },
    { label: "Contact",  href: "#contact"  },
  ];

  return (
    <footer
      style={{
        width: "100%",
        background: "var(--paper, #faf8f4)",
        borderTop: "1px solid rgba(26,22,18,0.09)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 2,
        background: "linear-gradient(90deg, transparent, rgba(155,44,26,0.35), rgba(44,95,138,0.25), transparent)",
      }} />

      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "2.25rem clamp(1.25rem, 5vw, 4rem) 1.75rem",
        boxSizing: "border-box",
      }}>

        {/* Main row */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "2rem",
        }}>

          {/* Left: brand */}
          <div style={{ flex: "1 1 200px", minWidth: 0 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#1a1612",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}>
              Vikneshwaran
            </div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              lineHeight: 1.7,
              color: "#6B5744",
              margin: 0,
              maxWidth: "26ch",
            }}>
              Full Stack Developer · Tech Enthusiast
            </p>
            {/* Open to work badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              marginTop: "0.85rem",
              padding: "0.3rem 0.8rem", borderRadius: "999px",
              background: "rgba(39,174,96,0.07)",
              border: "1px solid rgba(39,174,96,0.22)",
            }}>
              <span style={{ position: "relative", display: "flex", width: 6, height: 6, flexShrink: 0 }}>
                <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#27ae60", opacity: 0.55 }} />
                <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6, borderRadius: "50%", background: "#27ae60" }} />
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem", letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#27ae60",
              }}>
                Open to Work
              </span>
            </div>
          </div>

          {/* Center: nav links */}
          <div style={{ flex: "1 1 180px" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#9e9590",
              marginBottom: "0.85rem",
            }}>
              Navigation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem", fontWeight: 400,
                    color: "#5C4A3A", textDecoration: "none",
                    transition: "color 0.18s",
                    width: "fit-content",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#9B2C1A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#5C4A3A"; }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: socials */}
          <div style={{ flex: "1 1 160px" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#9e9590",
              marginBottom: "0.85rem",
            }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {socials.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.55rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem", fontWeight: 400,
                    color: "#5C4A3A", textDecoration: "none",
                    transition: "color 0.18s",
                    width: "fit-content",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#9B2C1A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#5C4A3A"; }}
                >
                  {icon}
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(26,22,18,0.08)", marginBottom: "1.25rem" }} />

        {/* Bottom row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem", letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9e9590", margin: 0,
          }}>
            © {currentYear} Vikneshwaran · Built with Next.js
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#9B2C1A", opacity: 0.5, display: "inline-block" }} />
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#9e9590", margin: 0,
            }}>
              Designed &amp; Developed by Vikneshwaran
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}