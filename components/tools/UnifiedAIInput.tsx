"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

interface UnifiedAIInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isLoading: boolean;
  isChatOpen: boolean;
  isInputVisible: boolean;
  buttonPosition: { right: number; bottom: number };
}

export const UnifiedAIInput: React.FC<UnifiedAIInputProps> = ({
  input,
  setInput,
  onSubmit,
  onClose,
  isLoading,
  isChatOpen,
  isInputVisible,
  buttonPosition,
}) => {
  const [windowWidth,            setWindowWidth]            = useState(0);
  const [showSlowMsg,            setShowSlowMsg]            = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* window width */
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* slow-loading message */
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isLoading) {
      t = setTimeout(() => setShowSlowMsg(true), 10_000);
    } else {
      setShowSlowMsg(false);
    }
    return () => clearTimeout(t);
  }, [isLoading]);

  /* focus */
  useEffect(() => {
    if (isInputVisible || isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isInputVisible, isChatOpen]);

  const handleClose = () => { onClose(); };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); handleClose(); }
  };

  /* pill width */
  const padding       = windowWidth < 768 ? 16 : 200;
  const pillWidth     = Math.min(560, Math.max(200, windowWidth - padding));
  const buttonCenter  = windowWidth - buttonPosition.right - 28;
  const startX        = buttonCenter - windowWidth / 2;
  const bottomOffset  = windowWidth < 768 ? 16 : buttonPosition.bottom;



  return (
    <AnimatePresence>
      {(isInputVisible || isChatOpen) && (
        <>
          {/* Backdrop (input-only phase) */}
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{ position: "fixed", inset: 0, zIndex: 55 }}
            />
          )}

          <motion.div
            style={{
              position: "fixed", zIndex: 60,
              left: "50%", bottom: bottomOffset,
              transform: "translateX(-50%)",
              width: "100%", maxWidth: "100vw",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}
            exit={{ transition: { duration: 0.3 } }}
          >

            {/* ── Slow-load pill (desktop) ── */}
            <AnimatePresence>
              {showSlowMsg && windowWidth >= 768 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                  style={{
                    position: "absolute", bottom: "calc(100% + 10px)",
                    left: "50%", transform: "translateX(-50%)",
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.32rem 0.9rem", borderRadius: "999px",
                    background: "rgba(250,248,244,0.95)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(200,140,80,0.3)",
                    boxShadow: "0 4px 16px rgba(26,22,18,0.1)",
                    fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#7a5c2e", whiteSpace: "nowrap",
                    pointerEvents: "none", zIndex: 70,
                  }}
                >
                  <span style={{ position: "relative", display: "flex", width: 6, height: 6 }}>
                    <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#e67e22", opacity: 0.6 }} />
                    <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6, borderRadius: "50%", background: "#e67e22" }} />
                  </span>
                  Taking longer than usual…
                </motion.div>
              )}
            </AnimatePresence>



            {/* ── Main row: input pill ── */}
            <motion.div
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.6rem", pointerEvents: "auto",
              }}
              layout
            >

              {/* ── Input pill ── */}
              <motion.form
                onSubmit={onSubmit}
                style={{
                  display: "flex", alignItems: "center", overflow: "hidden",
                  height: 50,
                  background: "rgba(250,248,244,0.92)",
                  backdropFilter: "blur(18px) saturate(160%)",
                  WebkitBackdropFilter: "blur(18px) saturate(160%)",
                  border: "1px solid rgba(26,22,18,0.12)",
                  boxShadow: "0 8px 32px rgba(26,22,18,0.1), 0 2px 8px rgba(26,22,18,0.06)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                initial={{ x: startX, width: 50, borderRadius: 25, opacity: 0.5 }}
                animate={{ x: 0, width: pillWidth, borderRadius: 25, opacity: 1 }}
                exit={{ x: startX, width: 50, borderRadius: 25, opacity: 0, transition: { duration: 0.28, ease: "easeInOut" } }}
                transition={{ type: "spring", damping: 26, stiffness: 200, mass: 1 }}
              >


                {/* Text input */}
                <motion.div
                  style={{ flex: 1, display: "flex", alignItems: "center", height: "100%", paddingLeft: "1.1rem", paddingRight: "0.25rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything…"
                    disabled={isLoading}
                    style={{
                      width: "100%", background: "transparent",
                      border: "none", outline: "none",
                      fontFamily: "var(--font-body)",
                      fontSize: windowWidth < 768 ? "0.9rem" : "0.95rem",
                      color: "#1a1612",
                    }}
                  />
                </motion.div>

                {/* Send button */}
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={input.trim() && !isLoading ? { scale: 1.08 } : {}}
                  whileTap={input.trim() && !isLoading ? { scale: 0.94 } : {}}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    marginRight: "0.45rem",
                    background: input.trim() && !isLoading ? "#1a1612" : "rgba(26,22,18,0.06)",
                    border: `1px solid ${input.trim() && !isLoading ? "#1a1612" : "rgba(26,22,18,0.1)"}`,
                    color: input.trim() && !isLoading ? "#faf8f4" : "#9e9590",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    transition: "all 0.18s",
                    boxShadow: input.trim() && !isLoading ? "0 2px 8px rgba(26,22,18,0.2)" : "none",
                  }}
                >
                  {isLoading
                    ? <CgSpinner size={14} style={{ animation: "uai-spin 0.8s linear infinite" }} />
                    : <IoSend size={13} />
                  }
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: "0.6rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.54rem", letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(26,22,18,0.3)",
                pointerEvents: "none",
              }}
            >
              Enter to send · Esc to close
            </motion.p>
          </motion.div>

          {/* Slow-load pill (mobile) */}
          <AnimatePresence>
            {showSlowMsg && windowWidth < 768 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                style={{
                  position: "fixed", bottom: 90, left: "50%",
                  zIndex: 100, pointerEvents: "none",
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  padding: "0.3rem 0.85rem", borderRadius: "999px",
                  background: "rgba(250,248,244,0.95)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,140,80,0.3)",
                  fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#7a5c2e", whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(26,22,18,0.1)",
                }}
              >
                <span style={{ position: "relative", display: "flex", width: 6, height: 6 }}>
                  <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#e67e22", opacity: 0.6 }} />
                  <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6, borderRadius: "50%", background: "#e67e22" }} />
                </span>
                Taking longer than usual…
              </motion.div>
            )}
          </AnimatePresence>

          <style>{`
            @keyframes uai-spin { to { transform: rotate(360deg); } }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};