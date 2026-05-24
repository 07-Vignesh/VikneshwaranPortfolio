"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { RiRobot2Line } from "react-icons/ri";
import { IoClose, IoSend } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { predefinedPrompts } from "@/data/prompt-data";
import {
  HeaderProps,
  MessageDisplayProps,
  InputAreaProps,
  Message,
  StructuredContent,
} from "./types";
import {
  SkillsCard,
  ProjectsCard,
  ExperienceCard,
  ContactCard,
  LinkCard,
} from "../ai-chat-cards";

/* ─────────────────────────────────────────
   CHAT HEADER
───────────────────────────────────────── */
export const ChatHeader: React.FC<HeaderProps> = ({ onClose }) => (
  <div style={{
    flexShrink: 0,
    padding: "1rem 1.25rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    borderBottom: "1px solid rgba(26,22,18,0.08)",
  }}>
    {/* Brand row */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32, borderRadius: "0.5rem",
        background: "rgba(155,44,26,0.09)",
        border: "1px solid rgba(155,44,26,0.2)",
        color: "#9B2C1A", fontSize: "1rem",
      }}>
        <RiRobot2Line />
      </div>
      <div>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem", fontWeight: 700,
          color: "#1a1612", margin: 0, lineHeight: 1.2,
        }}>
          AI Assistant
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem", letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#9e9590",
          margin: 0,
        }}>
          Ask me anything about Vikneshwaran
        </p>
      </div>
    </div>

    {/* Close */}
    {onClose && (
      <button
        onClick={onClose}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, borderRadius: "0.45rem",
          background: "transparent",
          border: "1px solid rgba(26,22,18,0.1)",
          color: "#5C4A3A", cursor: "pointer",
          transition: "all 0.18s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(26,22,18,0.06)"; el.style.color = "#1a1612"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "transparent"; el.style.color = "#5C4A3A"; }}
      >
        <IoClose size={14} />
      </button>
    )}
  </div>
);

/* ─────────────────────────────────────────
   THINKING / SEARCHING INDICATORS
───────────────────────────────────────── */
const ThinkingIndicator: React.FC = () => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.35rem 0.85rem", borderRadius: "999px",
    background: "rgba(155,44,26,0.07)",
    border: "1px solid rgba(155,44,26,0.18)",
  }}>
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem", letterSpacing: "0.1em",
      textTransform: "uppercase", color: "#9B2C1A",
    }}>
      Thinking
    </span>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 4, height: 4, borderRadius: "50%",
        background: "#9B2C1A", opacity: 0.6,
        display: "inline-block",
        animation: `ai-bounce 0.9s ${i * 0.15}s ease-in-out infinite`,
      }} />
    ))}
  </div>
);

const SearchingIndicator: React.FC = () => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.35rem 0.85rem", borderRadius: "999px",
    background: "rgba(44,95,138,0.07)",
    border: "1px solid rgba(44,95,138,0.18)",
  }}>
    <FiSearch size={12} style={{ color: "#2c5f8a", animation: "ai-pulse 1.4s ease-in-out infinite" }} />
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.65rem", letterSpacing: "0.1em",
      textTransform: "uppercase", color: "#2c5f8a",
    }}>
      Searching…
    </span>
  </div>
);

/* ─────────────────────────────────────────
   MESSAGE CONTENT
───────────────────────────────────────── */
const MessageContent: React.FC<{
  message: Message;
  renderStructuredContent: (c: StructuredContent) => React.ReactNode;
}> = ({ message, renderStructuredContent }) => (
  <>
    {message.content?.trim() && (
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem", lineHeight: 1.75,
          color: message.type === "user" ? "#1a1612" : "#3D2F27",
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(message.content).toString()),
        }}
      />
    )}
    {message.content?.trim() && message.structuredContent && (
      <div style={{ height: 1, background: "rgba(26,22,18,0.08)", margin: "0.75rem 0" }} />
    )}
    {message.structuredContent && renderStructuredContent(message.structuredContent)}
  </>
);

/* ─────────────────────────────────────────
   MESSAGE DISPLAY
───────────────────────────────────────── */
export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  messages,
  isSearching,
  error,
  renderStructuredContent,
  messagesEndRef,
}) => (
  <div style={{
    flex: 1, overflowY: "auto", overflowX: "hidden",
    padding: "1rem 1.25rem 2rem",
    display: "flex", flexDirection: "column", gap: "1rem",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(26,22,18,0.1) transparent",
  }}>
    <AnimatePresence initial={false}>
      {error ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "0.75rem 1rem", borderRadius: "0.75rem",
            background: "rgba(231,76,60,0.07)",
            border: "1px solid rgba(231,76,60,0.2)",
            fontFamily: "var(--font-body)", fontSize: "0.82rem",
            color: "#c0392b",
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }}
        />
      ) : (
        messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              justifyContent: message.type === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-start",
              gap: "0.6rem",
            }}
          >
            {/* Assistant avatar */}
            {message.type === "assistant" && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 28, height: 28, borderRadius: "0.45rem",
                background: "rgba(155,44,26,0.08)",
                border: "1px solid rgba(155,44,26,0.18)",
                color: "#9B2C1A", flexShrink: 0, marginTop: 2,
              }}>
                <RiRobot2Line size={13} />
              </div>
            )}

            {/* Bubble */}
            <div style={{
              maxWidth: "85%",
              padding: "0.7rem 0.95rem",
              borderRadius: message.type === "user"
                ? "1rem 1rem 0.2rem 1rem"
                : "1rem 1rem 1rem 0.2rem",
              background: message.type === "user"
                ? "#1a1612"
                : "rgba(255,255,255,0.85)",
              border: message.type === "user"
                ? "1px solid #1a1612"
                : "1px solid rgba(26,22,18,0.1)",
              boxShadow: "0 2px 8px rgba(26,22,18,0.07)",
              backdropFilter: "blur(8px)",
            }}>
              {/* Loading state */}
              {message.type === "assistant" &&
               index === messages.length - 1 &&
               message.content === "..." ? (
                isSearching ? <SearchingIndicator /> : <ThinkingIndicator />
              ) : (
                <>
                  <MessageContent
                    message={message}
                    renderStructuredContent={renderStructuredContent}
                  />
                  {/* Timestamp */}
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem", letterSpacing: "0.06em",
                    color: message.type === "user" ? "rgba(250,248,244,0.35)" : "rgba(26,22,18,0.3)",
                    margin: "0.4rem 0 0",
                    textAlign: "right",
                  }}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </>
              )}
            </div>

            {/* User avatar */}
            {message.type === "user" && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 28, height: 28, borderRadius: "0.45rem",
                background: "#1a1612",
                border: "1px solid rgba(26,22,18,0.2)",
                color: "#faf8f4", flexShrink: 0, marginTop: 2,
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem", fontStyle: "italic",
              }}>
                V
              </div>
            )}
          </motion.div>
        ))
      )}
      {messagesEndRef && <div ref={messagesEndRef} />}
    </AnimatePresence>

    <style>{`
      @keyframes ai-bounce {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50%       { transform: translateY(-3px); opacity: 1; }
      }
      @keyframes ai-pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.4; }
      }
      /* Markdown styles inside bubbles */
      .ai-bubble p        { margin: 0 0 0.5em; }
      .ai-bubble p:last-child { margin-bottom: 0; }
      .ai-bubble ul, .ai-bubble ol { padding-left: 1.2em; margin: 0.4em 0; }
      .ai-bubble li       { margin-bottom: 0.2em; }
      .ai-bubble code     { font-family: var(--font-mono); font-size: 0.78em; background: rgba(26,22,18,0.07); padding: 0.1em 0.35em; border-radius: 0.25em; }
      .ai-bubble strong   { font-weight: 600; color: #1a1612; }
      .ai-bubble a        { color: #9B2C1A; text-decoration: underline; text-underline-offset: 2px; }
    `}</style>
  </div>
);

/* ─────────────────────────────────────────
   INPUT AREA
───────────────────────────────────────── */
export const InputArea: React.FC<InputAreaProps> = ({
  input,
  setInput,
  isLoading,
  isThemeMode,
  themeChangeHistory,
  handleSubmit,
  handleKeyDown,
  resetThemeChanges,
  inputRef,
  isThemeRequest,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isTheme = isThemeRequest(input);

  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  return (
    <div style={{
      flexShrink: 0,
      padding: "0.85rem 1.25rem 1.1rem",
      borderTop: "1px solid rgba(26,22,18,0.08)",
      position: "relative",
    }}>

      {/* Suggestions panel */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: "calc(100% + 8px)",
              left: "1.25rem", right: "1.25rem",
              background: "rgba(250,248,244,0.98)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(26,22,18,0.1)",
              borderRadius: "0.85rem",
              boxShadow: "0 -8px 32px rgba(26,22,18,0.1), 0 2px 8px rgba(26,22,18,0.06)",
              padding: "1rem",
              zIndex: 20,
            }}
          >
            {/* Panel header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#9e9590",
              }}>
                Suggestions
              </span>
              <button
                onClick={() => setShowSuggestions(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 22, height: 22, borderRadius: "0.35rem",
                  background: "transparent",
                  border: "none", cursor: "pointer", color: "#9e9590",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#1a1612"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9e9590"; }}
              >
                <IoClose size={13} />
              </button>
            </div>

            {/* Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {predefinedPrompts.slice(0, 8).map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(`${p.prefix} ${p.prompt}`);
                    setShowSuggestions(false);
                    inputRef.current?.focus();
                  }}
                  style={{
                    padding: "0.32rem 0.75rem", borderRadius: "999px",
                    fontFamily: "var(--font-body)", fontSize: "0.75rem",
                    color: "#5C4A3A",
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(26,22,18,0.1)",
                    cursor: "pointer", transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(155,44,26,0.07)"; el.style.borderColor = "rgba(155,44,26,0.25)"; el.style.color = "#9B2C1A"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.8)"; el.style.borderColor = "rgba(26,22,18,0.1)"; el.style.color = "#5C4A3A"; }}
                >
                  {p.prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme mode indicator */}
      <AnimatePresence>
        {isTheme && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              marginBottom: "0.55rem",
              padding: "0.22rem 0.65rem", borderRadius: "999px",
              background: "rgba(122,92,46,0.08)",
              border: "1px solid rgba(122,92,46,0.22)",
            }}
          >
            <span style={{ fontSize: "0.7rem" }}>🎨</span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#7a5c2e",
            }}>
              Theme mode active
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input row */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        {/* Suggestions toggle */}
        <button
          type="button"
          onClick={() => setShowSuggestions(!showSuggestions)}
          title="Suggestions"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: "0.55rem", flexShrink: 0,
            background: showSuggestions ? "rgba(155,44,26,0.09)" : "rgba(250,248,244,0.9)",
            border: `1px solid ${showSuggestions ? "rgba(155,44,26,0.25)" : "rgba(26,22,18,0.12)"}`,
            color: showSuggestions ? "#9B2C1A" : "#5C4A3A",
            cursor: "pointer", transition: "all 0.18s",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; if (!showSuggestions) { el.style.borderColor = "rgba(26,22,18,0.25)"; el.style.color = "#1a1612"; } }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; if (!showSuggestions) { el.style.borderColor = "rgba(26,22,18,0.12)"; el.style.color = "#5C4A3A"; } }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          title="Toggle theme mode"
          onClick={() => {
            const cleaned = input.replace(/^(theme:|search:)\s*/i, "").trim();
            setInput(isTheme ? cleaned : `Theme: ${cleaned}`);
            inputRef.current?.focus();
          }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: "0.55rem", flexShrink: 0,
            background: isTheme ? "rgba(122,92,46,0.09)" : "rgba(250,248,244,0.9)",
            border: `1px solid ${isTheme ? "rgba(122,92,46,0.25)" : "rgba(26,22,18,0.12)"}`,
            cursor: "pointer", transition: "all 0.18s",
            fontSize: "0.9rem",
          }}
        >
          🎨
        </button>

        {/* Text input */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "rgba(250,248,244,0.9)",
          border: "1px solid rgba(26,22,18,0.12)",
          borderRadius: "0.65rem",
          padding: "0 0.85rem",
          height: 38,
          transition: "border-color 0.18s, box-shadow 0.18s",
        }}
          onFocusCapture={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(155,44,26,0.35)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px rgba(155,44,26,0.07)";
          }}
          onBlurCapture={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(26,22,18,0.12)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isTheme ? "Describe a UI change…" : "Ask me anything…"}
            disabled={isLoading}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "var(--font-body)", fontSize: "0.875rem",
              color: "#1a1612",
            }}
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: "0.55rem", flexShrink: 0,
            background: input.trim() && !isLoading ? "#1a1612" : "rgba(26,22,18,0.05)",
            border: `1px solid ${input.trim() && !isLoading ? "#1a1612" : "rgba(26,22,18,0.1)"}`,
            color: input.trim() && !isLoading ? "#faf8f4" : "#9e9590",
            cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
            transition: "all 0.18s",
            boxShadow: input.trim() && !isLoading ? "0 2px 8px rgba(26,22,18,0.18)" : "none",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; if (input.trim() && !isLoading) { el.style.boxShadow = "0 4px 14px rgba(26,22,18,0.26)"; el.style.transform = "translateY(-1px)"; } }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.boxShadow = input.trim() && !isLoading ? "0 2px 8px rgba(26,22,18,0.18)" : "none"; el.style.transform = ""; }}
        >
          {isLoading
            ? <CgSpinner size={14} style={{ animation: "spin 0.8s linear infinite" }} />
            : <IoSend size={13} />
          }
        </button>
      </form>

      {/* Hint */}
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.54rem", letterSpacing: "0.08em",
        textTransform: "uppercase", color: "rgba(26,22,18,0.25)",
        textAlign: "center", margin: "0.55rem 0 0",
      }}>
        Enter to send · Esc to close
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};