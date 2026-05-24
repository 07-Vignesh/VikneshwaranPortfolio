"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";


const spring       = { type: "spring", mass: 0.4, damping: 15,  stiffness: 300 } as const;
const bounceSpring = { type: "spring", mass: 0.3, damping: 20,  stiffness: 500 } as const;

export function Navbar() {
  const [active,              setActive]              = useState<string | null>(null);
  const [isMobileMenuOpen,    setIsMobileMenuOpen]    = useState(false);
  const [currentSection,      setCurrentSection]      = useState<string>("");
  const [isAboutOpen,         setIsAboutOpen]         = useState(false);
  const [isVisible,           setIsVisible]           = useState(true);
  const [scrolled,            setScrolled]            = useState(false);
  const [isMobile,            setIsMobile]            = useState(false);
  const lastScrollTime = useRef<number>(0);

  /* ── responsive detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── scroll / section detection ── */
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      setScrolled(window.scrollY > 20);
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;
      const sections = document.querySelectorAll("section[id], main[id]");
      const scrollPos = window.scrollY + 100;
      let current = "";
      sections.forEach((s) => {
        const top    = (s as HTMLElement).offsetTop;
        const height = s.clientHeight;
        const id     = s.getAttribute("id") || "";
        if (scrollPos >= top && scrollPos < top + height) current = id;
      });
      if (current && current !== currentSection) setCurrentSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  /* ── navbar visibility toggle (from contact page) ── */
  useEffect(() => {
    const handler = (e: CustomEvent) => setIsVisible(e.detail.visible);
    window.addEventListener("toggleNavbar", handler as EventListener);
    return () => window.removeEventListener("toggleNavbar", handler as EventListener);
  }, []);

  const isAboutActive = () => ["about", "experience", "skills"].includes(currentSection);

  const isActive = (id: string) => {
    if (id === "about")    return isAboutActive();
    if (id === "home")     return ["home", "main-content", "", "about-content"].includes(currentSection) || !currentSection;
    if (id === "projects") return ["projects", "projects-page"].includes(currentSection);
    if (id === "contact")  return ["contact", "contact-page"].includes(currentSection);
    if (id === "github")   return currentSection === "github";
    return currentSection === id;
  };

  const aboutLinks = [
    { href: "/#about",      label: "About Me",   section: "about"      },
    { href: "/#experience", label: "Experience", section: "experience"  },
    { href: "/#skills",     label: "Skills",     section: "skills"      },
  ];

  const navItems = [
    { id: "home",     label: "Home",     href: "/#home"     },
    { id: "projects", label: "Projects", href: "/#projects" },
    { id: "contact",  label: "Contact",  href: "/#contact"  },
  ];

  /* ────────────────────────────────────────────────── */
  /*  DESKTOP                                           */
  /* ────────────────────────────────────────────────── */
  const DesktopNav = (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          key="desktop-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.18 } }}
          transition={spring}
          style={{
            position: "fixed", top: 14, left: 0, right: 0,
            zIndex: 50,
            display: "flex", justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* pill */}
          <div
            style={{
              pointerEvents: "auto",
              display: "flex", alignItems: "center", gap: 2,
              padding: "5px 6px",
              borderRadius: "1rem",
              background: scrolled ? "rgba(250,248,244,0.97)" : "rgba(250,248,244,0.88)",
              backdropFilter: "blur(18px) saturate(160%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
              border: "1px solid rgba(26,22,18,0.1)",
              boxShadow: scrolled
                ? "0 6px 32px rgba(26,22,18,0.13), 0 1px 4px rgba(26,22,18,0.06)"
                : "0 2px 16px rgba(26,22,18,0.08), 0 1px 3px rgba(26,22,18,0.04)",
              transition: "box-shadow 0.3s ease, background 0.3s ease",
            }}
          >
            {/* Home / Projects */}
            {navItems.filter(n => n.id !== "contact").map(({ id, label, href }) => (
              <NavLink key={id} href={href} active={isActive(id)}>{label}</NavLink>
            ))}

            {/* About dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setActive("about")}
              onMouseLeave={() => setActive(null)}
            >
              <button
                style={{
                  position: "relative",
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "0.44rem 0.9rem",
                  borderRadius: "0.6rem",
                  fontFamily: "var(--font-body)", fontSize: "0.875rem",
                  fontWeight: isAboutActive() ? 600 : 500,
                  color: isAboutActive() ? "#9B2C1A" : "#5C4A3A",
                  background: "transparent",
                  border: "none", cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { if (!isAboutActive()) (e.currentTarget as HTMLButtonElement).style.color = "#1a1612"; }}
                onMouseLeave={e => { if (!isAboutActive()) (e.currentTarget as HTMLButtonElement).style.color = "#5C4A3A"; }}
              >
                <span style={{ position: "relative" }}>
                  About
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: -3, left: 0,
                      height: 1.5,
                      borderRadius: 2,
                      background: "#9B2C1A",
                      display: "block",
                    }}
                    initial={false}
                    animate={{ width: isAboutActive() ? "100%" : "0%" }}
                    transition={{ type: "spring", mass: 0.3, damping: 18, stiffness: 320 }}
                  />
                </span>
                <motion.span
                  animate={{ rotate: active === "about" ? 180 : 0 }}
                  transition={bounceSpring}
                  style={{ display: "flex", opacity: 0.6 }}
                >
                  <ChevronDown size={12} />
                </motion.span>
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {active === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{ opacity: 0,  y: 6,  scale: 0.97, transition: { duration: 0.14 } }}
                    transition={bounceSpring}
                    style={{
                      position: "absolute", top: "calc(100% + 10px)",
                      left: "50%", transform: "translateX(-50%)",
                      minWidth: 172, zIndex: 60,
                      borderRadius: "0.75rem", overflow: "hidden",
                      background: "rgba(250,248,244,0.97)",
                      backdropFilter: "blur(18px)",
                      border: "1px solid rgba(26,22,18,0.1)",
                      boxShadow: "0 12px 40px rgba(26,22,18,0.14), 0 2px 8px rgba(26,22,18,0.07)",
                      padding: 5,
                    }}
                  >
                    {/* caret */}
                    <div style={{
                      position: "absolute", top: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)",
                      width: 10, height: 10,
                      background: "rgba(250,248,244,0.97)",
                      borderTop: "1px solid rgba(26,22,18,0.1)",
                      borderLeft: "1px solid rgba(26,22,18,0.1)",
                    }} />

                    {aboutLinks.map((item, i) => (
                      <motion.a
                        key={item.section}
                        href={item.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0  }}
                        transition={{ delay: i * 0.04, ...bounceSpring }}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          padding: "0.5rem 0.8rem",
                          borderRadius: "0.5rem",
                          fontFamily: "var(--font-body)", fontSize: "0.85rem",
                          fontWeight: currentSection === item.section ? 600 : 400,
                          color: currentSection === item.section ? "#9B2C1A" : "#5C4A3A",
                          background: currentSection === item.section ? "rgba(155,44,26,0.07)" : "transparent",
                          textDecoration: "none",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => {
                          if (currentSection !== item.section) {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.background = "rgba(26,22,18,0.05)";
                            el.style.color = "#1a1612";
                          }
                        }}
                        onMouseLeave={e => {
                          if (currentSection !== item.section) {
                            const el = e.currentTarget as HTMLAnchorElement;
                            el.style.background = "transparent";
                            el.style.color = "#5C4A3A";
                          }
                        }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <NavLink href="/#contact" active={isActive("contact")}>Contact</NavLink>

            {/* separator */}
            <div style={{ width: 1, height: 18, background: "rgba(26,22,18,0.1)", margin: "0 4px", flexShrink: 0 }} />

            {/* GitHub → #github section */}
            <NavLink href="/#github" active={isActive("github")}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <SiLeetcode size={13} />
                LeetCode
              </span>
            </NavLink>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );

  /* ────────────────────────────────────────────────── */
  /*  MOBILE                                            */
  /* ────────────────────────────────────────────────── */
  const MobileNav = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.18 } }}
          transition={spring}
          style={{ position: "fixed", top: 14, left: 14, right: 14, zIndex: 50 }}
        >
          {/* top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* hamburger */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.93 }}
                style={{
                  padding: "0.55rem", borderRadius: "0.6rem",
                  background: "rgba(250,248,244,0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(26,22,18,0.1)",
                  boxShadow: "0 2px 12px rgba(26,22,18,0.08)",
                  color: "#5C4A3A", cursor: "pointer", display: "flex",
                }}
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={bounceSpring}>
                  {isMobileMenuOpen ? <X size={18} /> : <MenuIcon size={18} />}
                </motion.div>
              </motion.button>
            </div>

            {/* section pill */}
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.42rem 1rem", borderRadius: "999px",
              background: "rgba(250,248,244,0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(26,22,18,0.1)",
              boxShadow: "0 2px 12px rgba(26,22,18,0.08)",
              color: "#9B2C1A",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#9B2C1A", flexShrink: 0 }} />
              <motion.span
                key={currentSection}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={bounceSpring}
              >
                {!currentSection || currentSection === "main-content" || currentSection === "home"
                  ? "Home"
                  : currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </motion.span>
            </div>
          </div>

          {/* menu panel */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,   scale: 1    }}
                exit={{ opacity: 0,  y: -10, scale: 0.97, transition: { duration: 0.16 } }}
                transition={spring}
                style={{
                  marginTop: 8, borderRadius: "1rem", padding: 6,
                  background: "rgba(250,248,244,0.97)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(26,22,18,0.1)",
                  boxShadow: "0 12px 40px rgba(26,22,18,0.13)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { href: "/#home",     id: "home",     label: "Home"     },
                    { href: "/#projects", id: "projects", label: "Projects" },
                  ].map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, ...bounceSpring }}>
                      <MobileNavLink href={item.href} active={isActive(item.id)} onClick={() => setIsMobileMenuOpen(false)}>
                        {item.label}
                      </MobileNavLink>
                    </motion.div>
                  ))}

                  {/* About accordion */}
                  <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, ...bounceSpring }}>
                    <button
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "0.6rem 0.85rem", borderRadius: "0.6rem",
                        fontFamily: "var(--font-body)", fontSize: "0.875rem",
                        fontWeight: isAboutActive() ? 600 : 500,
                        color: isAboutActive() ? "#9B2C1A" : "#5C4A3A",
                        background: isAboutActive() ? "rgba(155,44,26,0.07)" : "transparent",
                        border: "none", cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      <span>About</span>
                      <motion.span animate={{ rotate: isAboutOpen ? 180 : 0 }} transition={bounceSpring} style={{ display: "flex", opacity: 0.6 }}>
                        <ChevronDown size={13} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {isAboutOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden", paddingLeft: "0.75rem" }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "4px 0" }}>
                            {aboutLinks.map((item, i) => (
                              <motion.div key={item.section} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, ...bounceSpring }}>
                                <MobileNavLink href={item.href} active={currentSection === item.section} onClick={() => { setIsMobileMenuOpen(false); setIsAboutOpen(false); }}>
                                  {item.label}
                                </MobileNavLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Contact */}
                  <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, ...bounceSpring }}>
                    <MobileNavLink href="/#contact" active={isActive("contact")} onClick={() => setIsMobileMenuOpen(false)}>
                      Contact
                    </MobileNavLink>
                  </motion.div>

                  {/* divider + GitHub */}
                  <div style={{ height: 1, background: "rgba(26,22,18,0.08)", margin: "4px 2px" }} />
                  <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, ...bounceSpring }}>
                    <MobileNavLink
                      href="/#github"
                      active={isActive("github")}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <SiLeetcode size={14} /> LeetCode
                    </MobileNavLink>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* render correct nav based on viewport */
  if (!isMobile) return DesktopNav;
  return MobileNav;
}

/* ── NavLink ── */
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        position: "relative",
        display: "inline-flex", alignItems: "center",
        padding: "0.44rem 0.9rem",
        borderRadius: "0.6rem",
        fontFamily: "var(--font-body)", fontSize: "0.875rem",
        fontWeight: active ? 600 : 500,
        color: active ? "#9B2C1A" : "#5C4A3A",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "#1a1612"; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "#5C4A3A"; }}
    >
      <span style={{ position: "relative" }}>
        {children}
        <motion.span
          style={{
            position: "absolute",
            bottom: -3, left: 0,
            height: 1.5,
            borderRadius: 2,
            background: "#9B2C1A",
            display: "block",
          }}
          initial={false}
          animate={{ width: active ? "100%" : "0%" }}
          transition={{ type: "spring", mass: 0.3, damping: 18, stiffness: 320 }}
        />
      </span>
    </a>
  );
}

/* ── MobileNavLink ── */
function MobileNavLink({ href, active, onClick, children }: {
  href: string; active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.6rem 0.85rem", borderRadius: "0.6rem",
        fontFamily: "var(--font-body)", fontSize: "0.875rem",
        fontWeight: active ? 600 : 400,
        color: active ? "#9B2C1A" : "#5C4A3A",
        background: active ? "rgba(155,44,26,0.07)" : "transparent",
        textDecoration: "none", transition: "all 0.15s",
      }}
      onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(26,22,18,0.04)"; el.style.color = "#1a1612"; } }}
      onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "#5C4A3A"; } }}
    >
      {active && <span style={{ width: 2, height: "1rem", borderRadius: 2, background: "#9B2C1A", flexShrink: 0 }} />}
      {children}
    </a>
  );
}