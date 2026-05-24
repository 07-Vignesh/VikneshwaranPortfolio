"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AssistantProps {
  onClick: () => void;
  isChatOpen: boolean;
  isInputVisible: boolean;
  isLoading: boolean;
}

const OPEN_CHAT_PHRASES = [
  "Let's chat! Ask me anything about Vikneshwaran! 💬",
  "I'm here to help! What would you like to know? 🤔",
  "Ready to assist! Fire away with your questions! 🚀",
  "Hey there! Let's explore Vikneshwaran's work together! 👋",
];

const CLOSE_CHAT_PHRASES = [
  "See you later! Click me anytime 👋",
  "Come back soon! I'll be right here 😊",
  "Bye for now! I'll keep the lights on 💡",
];

const IDLE_PHRASES = [
  "Click me to open the AI chat! 💬",
  "Want to know something? Let's chat! 🧠",
  "I know a lot about Vikneshwaran! Try me 😎",
  "Need help? That's what I'm here for! 🎯",
];

const LOADING_PHRASES = [
  "Let me think about that… 🤔",
  "Processing your question… ⚡",
  "Almost there… 💭",
];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function AssistantButton({
  onClick,
  isChatOpen,
  isInputVisible,
  isLoading,
}: AssistantProps) {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [showPulse, setShowPulse] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevChatOpen = useRef(isChatOpen);
  const prevInputVisible = useRef(isInputVisible);
  const prevLoading = useRef(isLoading);

  /* ── show a tooltip bubble ── */
  const showTooltip = (msg: string, duration = 4000) => {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    setTooltip(msg);
    tooltipTimer.current = setTimeout(() => setTooltip(null), duration);
  };

  /* ── idle tooltip every 10-16s ── */
  useEffect(() => {
    const schedule = () => {
      const delay = 10000 + Math.random() * 6000;
      idleTimer.current = setInterval(() => {
        if (!isChatOpen && !isLoading) {
          showTooltip(randomPick(IDLE_PHRASES), 3500);
        }
      }, delay);
    };
    schedule();

    /* greeting on mount */
    const greetTimer = setTimeout(() => {
      showTooltip("Hey! I'm Vicky's AI assistant! Click me to chat 👋", 4000);
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 8000);
    }, 1200);

    return () => {
      if (idleTimer.current) clearInterval(idleTimer.current);
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
      clearTimeout(greetTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── react to state changes ── */
  useEffect(() => {
    const wasOpen = prevChatOpen.current;
    if (isChatOpen && !wasOpen) {
      showTooltip(randomPick(OPEN_CHAT_PHRASES), 3500);
      setShowPulse(false);
    } else if (!isChatOpen && wasOpen) {
      showTooltip(randomPick(CLOSE_CHAT_PHRASES), 3000);
    }
    prevChatOpen.current = isChatOpen;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatOpen]);

  useEffect(() => {
    if (isLoading && !prevLoading.current) {
      showTooltip(randomPick(LOADING_PHRASES), 5000);
    } else if (!isLoading && prevLoading.current) {
      showTooltip("Got it! Here's what I found ✨", 2500);
    }
    prevLoading.current = isLoading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isInputVisible && !prevInputVisible.current && !isChatOpen) {
      showTooltip(randomPick(IDLE_PHRASES), 3000);
    }
    prevInputVisible.current = isInputVisible;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputVisible]);

  const handleClick = () => {
    setShowPulse(false);
    onClick();
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 28, right: 28,
      zIndex: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 10,
      pointerEvents: "none",
    }}>

      {/* ── Tooltip bubble ── */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={tooltip}
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              pointerEvents: "none",
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(26,22,18,0.10)",
              borderRadius: "0.875rem",
              padding: "0.5rem 0.875rem",
              maxWidth: 220,
              boxShadow: "0 4px 20px rgba(26,22,18,0.10)",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "#3D2F27",
              lineHeight: 1.5,
              position: "relative",
            }}
          >
            {tooltip}
            {/* tail */}
            <span style={{
              position: "absolute",
              bottom: -7, right: 22,
              width: 14, height: 8,
              overflow: "hidden",
            }}>
              <span style={{
                display: "block",
                width: 10, height: 10,
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(26,22,18,0.10)",
                transform: "rotate(45deg) translateY(-5px)",
                margin: "0 auto",
              }} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main button ── */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          pointerEvents: "all",
          position: "relative",
          width: 56, height: 56,
          borderRadius: "50%",
          background: isChatOpen
            ? "#1a1612"
            : "linear-gradient(135deg, #9B2C1A 0%, #c0392b 100%)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isChatOpen
            ? "0 4px 20px rgba(26,22,18,0.30)"
            : "0 4px 20px rgba(155,44,26,0.35)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Pulse ring — shown on mount */}
        {showPulse && !isChatOpen && (
          <>
            <span style={{
              position: "absolute", inset: -4,
              borderRadius: "50%",
              border: "2px solid rgba(155,44,26,0.40)",
              animation: "ring-pulse 1.8s ease-out infinite",
            }} />
            <span style={{
              position: "absolute", inset: -10,
              borderRadius: "50%",
              border: "2px solid rgba(155,44,26,0.18)",
              animation: "ring-pulse 1.8s 0.4s ease-out infinite",
            }} />
          </>
        )}

        {/* Loading spinner overlay */}
        {isLoading && (
          <span style={{
            position: "absolute", inset: -3,
            borderRadius: "50%",
            border: "2.5px solid transparent",
            borderTopColor: "rgba(155,44,26,0.55)",
            animation: "spin 0.9s linear infinite",
          }} />
        )}

        {/* Icon — switches between chat and close */}
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.svg
              key="close"
              width="22" height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#faf8f4"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              width="24" height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#faf8f4"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              {/* Brain / AI icon */}
              <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a2.5 2.5 0 0 1 2 2.45V6a3 3 0 0 1 1.5 2.6v.4a3 3 0 0 1-1 2.24V12a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 7 12v-.76A3 3 0 0 1 6 9v-.4A3 3 0 0 1 7.5 6v-.05A2.5 2.5 0 0 1 9.5 2.5V2z" />
              <path d="M12 12v5" />
              <path d="M9 17h6" />
              <path d="M9.5 17v2a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2" />
              <path d="M9 9h.01M15 9h.01" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Notification dot when idle and not open */}
        {!isChatOpen && !isLoading && (
          <span style={{
            position: "absolute",
            top: 2, right: 2,
            width: 10, height: 10,
            borderRadius: "50%",
            background: "#27ae60",
            border: "2px solid #faf8f4",
          }} />
        )}
      </motion.button>

      {/* keyframes */}
      <style>{`
        @keyframes ring-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}