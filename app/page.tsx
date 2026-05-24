"use client";

import ExperiencePage from "./experience/page";
import HeroPage from "./home/page";
import About from "./about/page";
import Skills from "./skills/page";
import Contact from "./contact/page";
import Projects from "./projects/page";
import { AIChatModal } from "../components/tools/ai-chat-modal";
import { UnifiedAIInput } from "../components/tools/UnifiedAIInput";
import { useState, useEffect, useCallback } from "react";
import GitHub from "./github/page";
import { useThemeHandler, useMessageHandler, initializeChat } from "../components/tools/ai-chat/chat-utils";
import Assitanatbutton from "../components/ui/AssistantButton";

export default function Home() {
  const themeHandlers = useThemeHandler();
  const messageHandlers = useMessageHandler(themeHandlers);
  const {
    messages, setMessages,
    isLoading, isSearching,
    error, setError,
    processThemeRequest, processMessage, isThemeRequest,
  } = messageHandlers;

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isChatOpen, setIsChatOpen]         = useState(false);
  const [input, setInput]                   = useState("");

  useEffect(() => {
    if (isChatOpen) {
      if (messages.length === 0) initializeChat(setMessages, setError);
      localStorage.setItem("hasInteractedWithAI", "true");
    }
  }, [isChatOpen, messages.length, setMessages, setError]);

  const buttonPosition = { right: 16, bottom: 16 };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    if (!isChatOpen) setIsChatOpen(true);

    const userMessage      = { type: "user"      as const, content: input.trim(), timestamp: new Date() };
    const assistantMessage = { type: "assistant" as const, content: "...",        timestamp: new Date() };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");

    try {
      const isTheme = isThemeRequest(userMessage.content);
      const response = isTheme
        ? await processThemeRequest(userMessage.content)
        : await processMessage(userMessage.content);

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, content: response.content, structuredContent: response.structuredContent }
            : msg
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, content: `Error: ${errorMessage}` }
            : msg
        )
      );
    }
  };

  const handleAIButtonClick = useCallback(() => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setIsInputVisible(false);
    } else if (isInputVisible) {
      setIsInputVisible(false);
    } else {
      setIsInputVisible(true);
    }
  }, [isChatOpen, isInputVisible]);

  const handleClose = () => {
    setIsChatOpen(false);
    setIsInputVisible(false);
  };

  return (
    <main
      className="main-content"
      id="main-content"
      data-theme-target="main-content"
    >
      {/* ─────────────────────────────────────────
          FIXED BACKGROUND
          position:fixed so it never scrolls and
          never causes horizontal overflow
          ───────────────────────────────────────── */}
      <div
        id="page-background-base"
        data-theme-target="page-background-base"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background: "var(--paper, #faf8f4)",
          /* Hard-stop: background can NEVER be wider than viewport */
          width: "100vw",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {/* Warm dot grid texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(90,72,54,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          /* Clip so dots never escape the viewport on mobile */
          overflow: "hidden",
        }} />
      </div>

      {/* ─────────────────────────────────────────
          PAGE WRAPPER
          overflow-x hidden is the single guard
          that prevents any child from causing
          horizontal scroll on mobile
          ───────────────────────────────────────── */}
      <div style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}>

        {/* ── Hero ── */}
        <div style={{ width: "100%", overflowX: "hidden", position: "relative" }}>
          <section
            id="home"
            style={{ position: "relative", zIndex: 10 }}
            data-theme-target="home-section"
          >
            <HeroPage />
          </section>
        </div>

        {/* ── About (white) ── */}
        <section
          id="about"
          className="scroll-mt-20"
          data-theme-target="about-section"
          style={{ background: "#ffffff", width: "100%", overflowX: "hidden" }}
        >
          <About />
        </section>

        {/* ── Experience (cream) ── */}
        <section
          id="experience"
          className="scroll-mt-20"
          data-theme-target="experience-section"
          style={{ background: "var(--paper, #faf8f4)", width: "100%", overflowX: "hidden" }}
        >
          <ExperiencePage />
        </section>

        {/* ── Skills (white) ── */}
        <section
          id="skills"
          className="scroll-mt-20"
          data-theme-target="skills-section"
          style={{ background: "#ffffff", width: "100%", overflowX: "hidden" }}
        >
          <Skills />
        </section>

        {/* ── Projects (cream) ── */}
        <section
          id="projects"
          className="scroll-mt-20"
          data-theme-target="projects-section"
          style={{ background: "var(--paper, #faf8f4)", width: "100%", overflowX: "hidden" }}
        >
          <Projects />
        </section>

        {/* ── GitHub (white) ── */}
        <section
          id="github"
          className="scroll-mt-20"
          data-theme-target="github-section"
          style={{ background: "#ffffff", width: "100%", overflowX: "hidden" }}
        >
          <GitHub />
        </section>

        {/* ── Contact (dark) ── */}
        <section
          id="contact"
          className="scroll-mt-20"
          data-theme-target="contact-section"
          style={{ background: "var(--ink, #1a1612)", width: "100%", overflowX: "hidden" }}
        >
          <Contact />
        </section>

      </div>{/* end page wrapper */}

      {/* ─────────────────────────────────────────
          AI COMPONENTS
          These are fixed/absolute positioned so
          they sit above the page, not inside the
          scroll flow — no overflow risk
          ───────────────────────────────────────── */}
      <Assitanatbutton
        onClick={handleAIButtonClick}
        isChatOpen={isChatOpen}
        isInputVisible={isInputVisible}
        isLoading={isLoading}
      />

      <UnifiedAIInput
        input={input}
        setInput={setInput}
        onSubmit={handlePromptSubmit}
        onClose={handleClose}
        isLoading={isLoading}
        isChatOpen={isChatOpen}
        isInputVisible={isInputVisible}
        buttonPosition={buttonPosition}
      />

      <AIChatModal
        isOpen={isChatOpen}
        onClose={handleClose}
        messages={messages}
        isSearching={isSearching}
        error={error}
      />

      {/* ─────────────────────────────────────────
          GLOBAL STYLE OVERRIDES
          ───────────────────────────────────────── */}
      <style jsx global>{`
        /* ── Hard stop on horizontal scroll ── */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
          /* Prevent iOS rubber-band horizontal scroll */
          overscroll-behavior-x: none;
        }

        /* ── Kill leftover dark-theme artefacts ── */
        .bg-scanlines       { display: none !important; }
        canvas.neural-bg,
        .neural-background  { display: none !important; }

        /* ── Blob animation ── */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%       { transform: translate(-20px, 20px) scale(1.04); }
          50%       { transform: translate(15px, -15px) scale(0.96); }
          75%       { transform: translate(-15px, -15px) scale(1.04); }
        }
        .animate-blob         { animation: blob 18s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* ── Typography defaults ── */
        h1, h2, h3, h4 {
          font-family: var(--font-display, 'DM Serif Display', Georgia, serif) !important;
          /* Prevent headings overflowing narrow screens */
          overflow-wrap: break-word;
          word-break: break-word;
        }
        p, span, li, label, a {
          font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
          overflow-wrap: break-word;
        }

        /* ── Responsive images ── */
        img {
          max-width: 100%;
          height: auto;
        }

        /* ── Selection colour ── */
        ::selection {
          background: rgba(155, 44, 26, 0.15);
          color: #1a1612;
        }

        /* ── Responsive container helper used by child pages ── */
        .page-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 5vw, 4rem);
          box-sizing: border-box;
        }

        /* ── Mobile: tighten spacing ── */
        @media (max-width: 640px) {
          .scroll-mt-20 {
            scroll-margin-top: 4rem;
          }
        }
      `}</style>
    </main>
  );
}