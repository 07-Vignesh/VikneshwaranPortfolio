"use client";
/* eslint-disable */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Send, Sparkles, Mail, FileText, LayoutTemplate,
  User, MessageSquare, CheckCircle, XCircle,
} from "lucide-react";
import { emailTemplates } from "@/components/tools/emailTemplates";
import { TextGenerationEffect } from "@/components/ui/TextGenerationEffect";
import { ChatHistory } from "@/components/contact/ChatHistory";
import NeuralBackground from "@/components/neural-background";

interface EmailMessage {
  id: string; content: string; subject: string;
  senderName?: string; senderEmail?: string;
  timestamp: number; mode: "manual" | "ai";
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };

export default function Contact() {
  const [mode, setMode] = useState<"manual" | "ai">("ai");
  const [prompt, setPrompt] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [shouldHideNavbar, setShouldHideNavbar] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newEmail, setNewEmail] = useState<EmailMessage | undefined>(undefined);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "error" || status === "success") {
      setShouldHideNavbar(true); setIslandExpanded(true);
      timer = setTimeout(() => {
        setIslandExpanded(false);
        setTimeout(() => { setStatus("idle"); setErrorMessage(""); setShouldHideNavbar(false); }, 500);
      }, 3000);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [status]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("toggleNavbar", { detail: { visible: !shouldHideNavbar } }));
  }, [shouldHideNavbar]);

  const handleButtonClick = (e: React.MouseEvent, cb: () => void) => {
    if (e.isTrusted) cb();
    else { setStatus("error"); setErrorMessage("Automated clicks are not allowed"); }
  };

  const handleGenerateEmail = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true); setEmailContent(""); setIsTextAnimating(false);
    try {
      const res = await fetch("/api/generate-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      if (!res.ok) throw new Error(res.status === 504 ? "Request timed out." : "Failed to generate email");
      const { generatedContent } = await res.json();
      setEmailContent(generatedContent); setIsTextAnimating(true);
    } catch (err) {
      setStatus("error"); setErrorMessage(err instanceof Error ? err.message : "Failed to generate email");
    } finally { setIsGenerating(false); }
  };

  const validateEmail = (e: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
  const extractEmail = (c: string) => { const m = c.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g); return m?.[0] ?? null; };

  const handleSendEmail = async () => {
    if (!emailContent || isSending) return;
    if (mode === "manual") {
      if (!senderName.trim()) { setStatus("error"); setErrorMessage("Please enter your name"); return; }
      if (!senderEmail.trim() || !validateEmail(senderEmail)) { setStatus("error"); setErrorMessage("Please enter a valid email"); return; }
      if (!subject.trim()) { setStatus("error"); setErrorMessage("Please enter a subject"); return; }
    } else {
      if (!extractEmail(emailContent)) { setStatus("error"); setErrorMessage("Generated email must include a valid email address"); return; }
    }
    setIsSending(true); setStatus("idle"); setErrorMessage("");
    try {
      const res = await fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: emailContent, prompt: mode === "ai" ? prompt : "Manual Email", senderName: mode === "manual" ? senderName : undefined, senderEmail: mode === "manual" ? senderEmail : undefined, subject }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      setNewEmail({ id: Date.now().toString(), content: emailContent, subject: subject || "No Subject", senderName: mode === "manual" ? senderName : undefined, senderEmail: mode === "manual" ? senderEmail : undefined, timestamp: Date.now(), mode });
      setIsChatOpen(true); setStatus("success");
      setPrompt(""); setEmailContent(""); setSenderName(""); setSenderEmail(""); setSubject("");
    } catch (err) {
      setStatus("error"); setErrorMessage(err instanceof Error ? err.message : "Failed to send email");
    } finally { setIsSending(false); }
  };

  /* shared styles */
  const inputSt: React.CSSProperties = {
    width: "100%", background: "rgba(250,248,244,0.85)",
    border: "1px solid rgba(26,22,18,0.14)", borderRadius: "0.5rem",
    padding: "0.6rem 0.85rem", fontFamily: "var(--font-body)",
    fontSize: "0.875rem", color: "#1a1612", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box",
  };
  const labelSt: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.4rem",
    fontFamily: "var(--font-body)", fontSize: "0.78rem",
    fontWeight: 500, color: "#5C4A3A", marginBottom: "0.35rem",
  };
  const cardSt: React.CSSProperties = {
    background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)",
    border: "1px solid rgba(26,22,18,0.09)", borderRadius: "1rem",
    overflow: "hidden", boxShadow: "0 4px 24px rgba(26,22,18,0.07)",
  };
  const iconBoxSt = (bg: string, border: string, color: string): React.CSSProperties => ({
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 32, height: 32, borderRadius: "0.45rem",
    background: bg, border: `1px solid ${border}`, color, flexShrink: 0,
  });
  const smallBtn = (active: boolean, accent = false): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.35rem",
    padding: "0.36rem 0.75rem", borderRadius: "0.4rem",
    fontFamily: accent ? "var(--font-body)" : "var(--font-mono)",
    fontSize: accent ? "0.78rem" : "0.6rem",
    fontWeight: accent ? 500 : 400,
    letterSpacing: accent ? 0 : "0.07em", textTransform: accent ? "none" : "uppercase",
    color: active ? "#faf8f4" : "#5C4A3A",
    background: active ? (accent ? "#9B2C1A" : "#1a1612") : "rgba(250,248,244,0.9)",
    border: `1px solid ${active ? (accent ? "#9B2C1A" : "#1a1612") : "rgba(26,22,18,0.14)"}`,
    cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" as const,
    boxShadow: active ? `0 2px 8px rgba(26,22,18,0.18)` : "none",
  });

  return (
    <div style={{ position: "relative" }}>
      {/* Dynamic Island */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ width: 120, height: 40, y: -100, x: "-50%", borderRadius: 20, opacity: 0 }}
            animate={{ width: islandExpanded ? 300 : 120, height: islandExpanded ? 58 : 40, y: islandExpanded ? 28 : 18, x: "-50%", borderRadius: islandExpanded ? 16 : 20, opacity: 1 }}
            exit={{ width: 120, height: 40, y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{ position: "fixed", top: 0, left: "50%", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", background: status === "success" ? "rgba(240,253,244,0.95)" : "rgba(254,242,242,0.95)", border: `1px solid ${status === "success" ? "rgba(39,174,96,0.3)" : "rgba(220,38,38,0.3)"}`, boxShadow: "0 8px 32px rgba(26,22,18,0.12)" }}
          >
            <AnimatePresence>
              {islandExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0 1rem" }}>
                  {status === "success" ? <><CheckCircle size={16} color="#27ae60" /><span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, color: "#166534" }}>Email sent!</span></> : <><XCircle size={16} color="#dc2626" /><span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, color: "#991b1b" }}>{errorMessage}</span></>}
                </motion.div>
              )}
              {!islandExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {status === "success" ? <CheckCircle size={16} color="#27ae60" /> : <XCircle size={16} color="#dc2626" />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <section style={{ minHeight: "100vh", width: "100%", background: "#faf8f4", position: "relative", overflow: "hidden", paddingTop: "5.5rem", paddingBottom: "4rem" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(26,22,18,0.03) 79px,rgba(26,22,18,0.03) 80px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
          {[{ size: 500, color: "rgba(155,44,26,0.05)", top: "-10%", left: "-6%" }, { size: 400, color: "rgba(44,95,138,0.05)", bottom: "-5%", right: "-5%" }, { size: 300, color: "rgba(200,140,80,0.05)", top: "40%", left: "40%" }].map((o, i) => (
            <div key={i} style={{ position: "absolute", width: o.size, height: o.size, borderRadius: "50%", background: `radial-gradient(circle,${o.color} 0%,transparent 70%)`, filter: "blur(90px)", ...("top" in o ? { top: o.top } : {}), ...("bottom" in o ? { bottom: o.bottom } : {}), ...("left" in o ? { left: o.left } : {}), ...("right" in o ? { right: o.right } : {}) }} />
          ))}
        </div>
        <NeuralBackground variant="light" nodeCount={55} connectDist={130} speed={1} style={{ zIndex: 2 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%,transparent 25%,rgba(250,248,244,0.65) 100%)" }} />

        <motion.div variants={container} initial="hidden" animate="show"
          style={{ position: "relative", zIndex: 10, maxWidth: 1060, margin: "0 auto", padding: "0 clamp(1rem, 5vw, 3.5rem)", boxSizing: "border-box" }}>

          {/* ── Header ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "2rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "clamp(0.58rem,2vw,0.65rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9B2C1A", background: "rgba(155,44,26,0.09)", border: "1px solid rgba(155,44,26,0.22)", padding: "0.28rem 0.8rem", borderRadius: "999px", marginBottom: "0.85rem" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#9B2C1A", flexShrink: 0 }} /> Get In Touch
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.22em", flexWrap: "wrap", marginBottom: "0.7rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 7vw, 3.8rem)", fontWeight: 400, color: "#3D2F27", letterSpacing: "-0.03em", lineHeight: 1.06 }}>Let&apos;s</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 7vw, 3.8rem)", fontWeight: 400, fontStyle: "italic", color: "#1a1612", letterSpacing: "-0.03em", lineHeight: 1.06 }}>Connect</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
              <div style={{ width: "1.3rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-body)", color: "#5C4A3A", fontSize: "clamp(0.8rem, 2vw, 0.95rem)", margin: 0 }}>AI-powered email generation or write manually</p>
            </div>
          </motion.div>

          {/* ── Mode switcher ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "inline-flex", padding: 4, gap: 4, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(26,22,18,0.1)", borderRadius: "0.75rem", boxShadow: "0 2px 10px rgba(26,22,18,0.06)" }}>
              {(["ai", "manual"] as const).map(m => (
                <motion.button key={m} whileTap={{ scale: 0.97 }}
                  onClick={() => { setMode(m); setShowTemplates(false); }}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.48rem 1rem", borderRadius: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", border: "none", background: mode === m ? "#1a1612" : "transparent", color: mode === m ? "#faf8f4" : "#5C4A3A", boxShadow: mode === m ? "0 2px 8px rgba(26,22,18,0.18)" : "none", transition: "all 0.22s", whiteSpace: "nowrap" }}>
                  {m === "ai" ? <><Sparkles size={13} />AI Assistant</> : <><FileText size={13} />Manual</>}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Two-column grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "1.25rem", alignItems: "stretch" }}>

            {/* LEFT */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ ...cardSt, position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
                {/* header */}
                <div style={{ padding: "0.9rem 1.1rem", borderBottom: "1px solid rgba(26,22,18,0.07)" }}>
                  {/* top row: icon + title */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: mode === "ai" ? "0.7rem" : 0 }}>
                    <div style={iconBoxSt("rgba(155,44,26,0.08)", "rgba(155,44,26,0.2)", "#9B2C1A")}>
                      {mode === "ai" ? <Sparkles size={14} /> : <User size={14} />}
                    </div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#1a1612", margin: 0, lineHeight: 1.2 }}>
                      {mode === "ai" ? "Customize Prompt" : "Your Details"}
                    </h2>
                  </div>
                  {/* bottom row: buttons (only AI mode) */}
                  {mode === "ai" && (
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button onClick={() => setShowTemplates(!showTemplates)} style={smallBtn(false)}>
                        <LayoutTemplate size={11} /> Templates
                      </button>
                      <button onClick={e => handleButtonClick(e, handleGenerateEmail)} disabled={isGenerating || !prompt.trim()}
                        style={{ ...smallBtn(!isGenerating && !!prompt.trim(), true), opacity: isGenerating || !prompt.trim() ? 0.55 : 1, cursor: isGenerating || !prompt.trim() ? "not-allowed" : "pointer" }}>
                        {isGenerating
                          ? <span style={{ display: "flex", gap: 2 }}>{[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#9e9590", display: "inline-block", animation: `ct-bounce 0.9s ${i*0.15}s infinite` }} />)}</span>
                          : <><Sparkles size={11} />Generate</>}
                      </button>
                    </div>
                  )}
                </div>

                {/* body */}
                <div style={{ padding: "1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  {mode === "ai" ? (
                    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                      <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                        placeholder="e.g. Write a professional email to inquire about a job opportunity..."
                        style={{ ...inputSt, flex: 1, minHeight: 220, resize: "none", lineHeight: 1.7 }}
                        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(155,44,26,0.4)"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(155,44,26,0.08)"; }}
                        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(26,22,18,0.14)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; }}
                      />
                      {selectedTemplate !== null && (
                        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.28rem 0.6rem", borderRadius: "0.35rem", background: "rgba(250,248,244,0.95)", border: "1px solid rgba(26,22,18,0.1)" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9B2C1A" }}>{emailTemplates[selectedTemplate].title}</span>
                          <button onClick={() => { setSelectedTemplate(null); setPrompt(""); }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: "#9e9590", background: "none", border: "none", cursor: "pointer" }}>Clear</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {[
                        { id: "name", label: "Your Name", icon: <User size={12} />, type: "text", value: senderName, fn: setSenderName, ph: "Vikneshwaran" },
                        { id: "email", label: "Your Email", icon: <Mail size={12} />, type: "email", value: senderEmail, fn: setSenderEmail, ph: "your@email.com" },
                        { id: "subject", label: "Subject", icon: <MessageSquare size={12} />, type: "text", value: subject, fn: setSubject, ph: "Email subject..." },
                      ].map(({ id, label, icon, type, value, fn, ph }) => (
                        <div key={id}>
                          <label htmlFor={id} style={labelSt}>{icon}{label}<span style={{ color: "#9B2C1A" }}>*</span></label>
                          <input type={type} id={id} value={value} onChange={e => fn(e.target.value)} placeholder={ph} style={inputSt}
                            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(155,44,26,0.4)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(155,44,26,0.08)"; }}
                            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(26,22,18,0.14)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Templates overlay */}
                <AnimatePresence>
                  {showTemplates && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ position: "absolute", inset: 0, zIndex: 10, background: "rgba(250,248,244,0.97)", backdropFilter: "blur(8px)", borderRadius: "1rem", padding: "1.25rem", overflowY: "auto", border: "1px solid rgba(26,22,18,0.09)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: "#1a1612", margin: 0 }}>Select a Template</h3>
                        <button onClick={() => setShowTemplates(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5C4A3A", display: "flex" }}><XCircle size={17} /></button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "0.65rem" }}>
                        {emailTemplates.map((t, i) => (
                          <motion.button key={i} onClick={() => { setSelectedTemplate(i); setPrompt(t.prompt); setShowTemplates(false); }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.875rem 0.6rem", borderRadius: "0.6rem", textAlign: "center", background: selectedTemplate === i ? "rgba(155,44,26,0.08)" : "rgba(255,255,255,0.8)", border: `1px solid ${selectedTemplate === i ? "rgba(155,44,26,0.35)" : "rgba(26,22,18,0.1)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                            <span style={{ fontSize: "1.35rem", marginBottom: "0.4rem" }}>{t.icon}</span>
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, color: "#1a1612", marginBottom: "0.3rem" }}>{t.title}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "#9B2C1A", background: "rgba(155,44,26,0.08)", padding: "0.12rem 0.45rem", borderRadius: "999px", border: "1px solid rgba(155,44,26,0.2)" }}>{t.tags[0]}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ ...cardSt, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* header */}
                <div style={{ padding: "0.9rem 1.1rem", borderBottom: "1px solid rgba(26,22,18,0.07)" }}>
                  {/* top row: icon + title */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.6rem", marginBottom: (messageCount > 0 || emailContent) ? "0.7rem" : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div style={iconBoxSt("rgba(44,95,138,0.08)", "rgba(44,95,138,0.2)", "#2c5f8a")}>
                        <Mail size={14} />
                      </div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#1a1612", margin: 0, lineHeight: 1.2 }}>
                        {mode === "ai" ? "Generated Email" : "Your Message"}
                      </h2>
                    </div>
                  </div>
                  {/* bottom row: action buttons */}
                  {(messageCount > 0 || emailContent) && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <AnimatePresence>
                        {messageCount > 0 && (
                          <motion.button initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            style={{ ...smallBtn(isChatOpen), position: "relative" }}>
                            <MessageSquare size={11} />History
                            <span style={{ position: "absolute", top: -6, right: -6, width: 15, height: 15, borderRadius: "50%", background: "#9B2C1A", color: "#faf8f4", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.48rem" }}>{messageCount}</span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                      {emailContent && (
                        <button onClick={e => handleButtonClick(e, handleSendEmail)} disabled={isSending}
                          style={{ ...smallBtn(!isSending, true), opacity: isSending ? 0.55 : 1, cursor: isSending ? "not-allowed" : "pointer", background: isSending ? "rgba(26,22,18,0.05)" : "#1a1612", color: isSending ? "#9e9590" : "#faf8f4", border: `1px solid ${isSending ? "rgba(26,22,18,0.1)" : "#1a1612"}` }}
                          onMouseEnter={e => { if (!isSending) { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(26,22,18,0.28)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}>
                          {isSending
                            ? <span style={{ display: "flex", gap: 2 }}>{[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#9e9590", display: "inline-block" }} />)}</span>
                            : <><Send size={11} />Send</>}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* email area */}
                <div style={{ padding: "1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", flex: 1, minHeight: 220, borderRadius: "0.5rem", overflow: "hidden", border: "1px solid rgba(26,22,18,0.12)", background: "rgba(250,248,244,0.85)" }}>
                    {mode === "ai" ? (
                      <div style={{ position: "absolute", inset: 0, overflowY: "auto", padding: "0.75rem 0.85rem" }}>
                        {emailContent ? (
                          isTextAnimating
                            ? <TextGenerationEffect text={emailContent} className="text-sm" speed="fast" onComplete={() => setIsTextAnimating(false)} />
                            : <textarea value={emailContent} onChange={e => setEmailContent(e.target.value)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.75, color: "#3D2F27", padding: "0.75rem 0.85rem", boxSizing: "border-box" }} />
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.5rem", textAlign: "center" }}>
                            <Sparkles size={18} color="rgba(155,44,26,0.35)" />
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#9e9590", margin: 0, maxWidth: "26ch", lineHeight: 1.6 }}>Enter a prompt and click Generate</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <textarea value={emailContent} onChange={e => setEmailContent(e.target.value)} placeholder="Write your message here..."
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.75, color: "#3D2F27", padding: "0.75rem 0.85rem", boxSizing: "border-box" }} />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      <ChatHistory isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} newEmail={newEmail} onMessageCountChange={setMessageCount} />

      <style>{`
        @keyframes ct-bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}