"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

import {
  SkillsCard,
  ProjectsCard,
  ExperienceCard,
  ContactCard,
  LinkCard,
} from "./ai-chat-cards";
import { MessageDisplay } from "./ai-chat/chat-components";
import { AIChatModalProps } from "./ai-chat/types";

interface StructuredContent {
  type: "skills" | "projects" | "experience" | "contact" | "links" | "general";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function AIChatModal({
  isOpen,
  onClose,
  messages,
  isSearching,
  error,
}: AIChatModalProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const renderStructuredContent = (content: StructuredContent) => {
    switch (content.type) {
      case "skills":     return <SkillsCard skills={content.data} />;
      case "projects":   return <ProjectsCard projects={content.data} />;
      case "experience": return <ExperienceCard experiences={content.data} />;
      case "contact":    return <ContactCard contact={content.data} />;
      case "links":      return <LinkCard links={content.data} />;
      default:           return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(26,22,18,0.45)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              pointerEvents: "all",
            }}
          />

          {/* ── Modal panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 30,  scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 320, duration: 0.3 }}
            style={{
              /* mobile: sheet from bottom */
              position: "fixed",
              bottom: 0, left: 0, right: 0,
              height: "85dvh",
              borderRadius: "1.5rem 1.5rem 0 0",
              /* desktop override via media query below */
              background: "rgba(250,248,244,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(26,22,18,0.10)",
              boxShadow: "0 -8px 48px rgba(26,22,18,0.14), 0 0 0 1px rgba(255,255,255,0.6) inset",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              pointerEvents: "all",
              zIndex: 10,
            }}
            className="ai-chat-modal"
          >
            {/* ── Modal header ── */}
            <div
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem 0.875rem",
                borderBottom: "1px solid rgba(26,22,18,0.07)",
                flexShrink: 0,
              }}
            >
              {/* Left: avatar + title */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                {/* AI avatar */}
                <div style={{
                  width: 36, height: 36, borderRadius: "0.6rem",
                  background: "linear-gradient(135deg, #9B2C1A 0%, #c0392b 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(155,44,26,0.30)",
                }}>
                  {/* spark icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#faf8f4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>

                <div>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem", fontWeight: 600,
                    color: "#1a1612", margin: 0, lineHeight: 1.2,
                  }}>
                    Vik&apos;s AI Assistant
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: 2 }}>
                    <span style={{
                      position: "relative", display: "inline-flex",
                      width: 6, height: 6, flexShrink: 0,
                    }}>
                      <span className="animate-ping" style={{
                        position: "absolute", inset: 0,
                        borderRadius: "50%", background: "#27ae60", opacity: 0.6,
                      }} />
                      <span style={{
                        position: "relative", display: "inline-flex",
                        width: 6, height: 6, borderRadius: "50%", background: "#27ae60",
                      }} />
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "#27ae60",
                    }}>
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 34, height: 34, borderRadius: "0.5rem",
                  background: "rgba(26,22,18,0.06)",
                  border: "1px solid rgba(26,22,18,0.10)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#5C4A3A",
                  transition: "background 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(155,44,26,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#9B2C1A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,22,18,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "#5C4A3A"; }}
              >
                <IoClose size={18} />
              </motion.button>
            </div>

            {/* ── Messages area ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}
            >
              <MessageDisplay
                messages={messages}
                isSearching={isSearching}
                error={error}
                renderStructuredContent={renderStructuredContent}
                messagesEndRef={messagesEndRef}
              />
            </motion.div>
          </motion.div>

          {/* ── Desktop sizing via global style ── */}
          <style>{`
            @media (min-width: 768px) {
              .ai-chat-modal {
                position: relative !important;
                bottom: auto !important;
                left: auto !important;
                right: auto !important;
                width: 100% !important;
                max-width: 860px !important;
                height: 85vh !important;
                border-radius: 1.25rem !important;
                margin: 2rem !important;
              }
            }

            /* Scrollbar styling to match theme */
            .ai-chat-modal ::-webkit-scrollbar { width: 4px; }
            .ai-chat-modal ::-webkit-scrollbar-track { background: transparent; }
            .ai-chat-modal ::-webkit-scrollbar-thumb {
              background: rgba(26,22,18,0.15);
              border-radius: 4px;
            }
            .ai-chat-modal ::-webkit-scrollbar-thumb:hover {
              background: rgba(155,44,26,0.25);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AIChatModal;