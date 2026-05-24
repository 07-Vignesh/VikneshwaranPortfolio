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
  id: string;
  content: string;
  subject: string;
  senderName?: string;
  senderEmail?: string;
  timestamp: number;
  mode: "manual" | "ai";
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* shared input style */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(250,248,244,0.85)",
  border: "1px solid rgba(26,22,18,0.14)",
  borderRadius: "0.5rem",
  padding: "0.6rem 0.85rem",
  fontFamily: "var(--font-body)",
  fontSize: "0.875rem",
  color: "#1a1612",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "0.4rem",
  fontFamily: "var(--font-body)", fontSize: "0.78rem",
  fontWeight: 500, color: "#5C4A3A",
  marginBottom: "0.35rem",
};

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
      setShouldHideNavbar(true);
      setIslandExpanded(true);
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

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    if (e.isTrusted) { callback(); }
    else { setStatus("error"); setErrorMessage("Automated clicks are not allowed"); }
  };

  const handleGenerateEmail = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true); setEmailContent(""); setIsTextAnimating(false);
    try {
      const response = await fetch("/api/generate-email", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error(response.status === 504 ? "Request timed out. Try a simpler prompt." : "Failed to generate email");
      const { generatedContent } = await response.json();
      setEmailContent(generatedContent); setIsTextAnimating(true);
    } catch (error) {
      setStatus("error"); setErrorMessage(error instanceof Error ? error.message : "Failed to generate email");
    } finally { setIsGenerating(false); }
  };

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const extractEmailFromContent = (content: string) => { const m = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g); return m ? m[0] : null; };

  const handleSendEmail = async () => {
    if (!emailContent || isSending) return;
    if (mode === "manual") {
      if (!senderName.trim()) { setStatus("error"); setErrorMessage("Please enter your name"); return; }
      if (!senderEmail.trim() || !validateEmail(senderEmail)) { setStatus("error"); setErrorMessage("Please enter a valid email"); return; }
      if (!subject.trim()) { setStatus("error"); setErrorMessage("Please enter a subject"); return; }
    } else {
      if (!extractEmailFromContent(emailContent)) { setStatus("error"); setErrorMessage("Generated email must include a valid email address"); return; }
    }
    setIsSending(true); setStatus("idle"); setErrorMessage("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: emailContent, prompt: mode === "ai" ? prompt : "Manual Email", senderName: mode === "manual" ? senderName : undefined, senderEmail: mode === "manual" ? senderEmail : undefined, subject }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send email");
      setNewEmail({ id: Date.now().toString(), content: emailContent, subject: subject || "No Subject", senderName: mode === "manual" ? senderName : undefined, senderEmail: mode === "manual" ? senderEmail : undefined, timestamp: Date.now(), mode });
      setIsChatOpen(true); setStatus("success");
      setPrompt(""); setEmailContent(""); setSenderName(""); setSenderEmail(""); setSubject("");
    } catch (error) {
      setStatus("error"); setErrorMessage(error instanceof Error ? error.message : "Failed to send email");
    } finally { setIsSending(false); }
  };

  const handleSelectTemplate = (index: number) => {
    setSelectedTemplate(index); setPrompt(emailTemplates[index].prompt); setShowTemplates(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* ── Dynamic Island notification ── */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ width: 120, height: 40, y: -100, x: "-50%", borderRadius: 20, opacity: 0 }}
            animate={{ width: islandExpanded ? 300 : 120, height: islandExpanded ? 58 : 40, y: islandExpanded ? 28 : 18, x: "-50%", borderRadius: islandExpanded ? 16 : 20, opacity: 1 }}
            exit={{ width: 120, height: 40, y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              position: "fixed", top: 0, left: "50%", zIndex: 9999,
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(12px)",
              background: status === "success" ? "rgba(240,253,244,0.95)" : "rgba(254,242,242,0.95)",
              border: `1px solid ${status === "success" ? "rgba(39,174,96,0.3)" : "rgba(220,38,38,0.3)"}`,
              boxShadow: "0 8px 32px rgba(26,22,18,0.12)",
            }}
          >
            <AnimatePresence>
              {islandExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0 1rem" }}>
                  {status === "success" ? (
                    <>
                      <CheckCircle size={18} color="#27ae60" />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, color: "#166534" }}>Email sent successfully!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} color="#dc2626" />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, color: "#991b1b" }}>{errorMessage}</span>
                    </>
                  )}
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

      <section
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
            { size: 300, color: "rgba(200,140,80,0.05)", top: "40%",    left: "40%"  },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
              background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`, filter: "blur(90px)",
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
        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{
            position: "relative", zIndex: 10,
            maxWidth: 1100, margin: "0 auto",
            padding: "0 clamp(1.25rem, 5vw, 4rem)",
            boxSizing: "border-box",
          }}
        >
          {/* ── Header ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "2.5rem" }}>
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
                Get In Touch
              </span>
            </div>
            <div style={{ marginBottom: "0.9rem" }}>
  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: 400, color: "#3D2F27",
      letterSpacing: "-0.03em", lineHeight: 1.06,
    }}>
      Let&apos;s
    </span>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem, 6vw, 4rem)",
      fontWeight: 400, fontStyle: "italic", color: "#1a1612",
      letterSpacing: "-0.03em", lineHeight: 1.06,
    }}>
      Connect
    </span>
  </div>
</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ width: "1.5rem", height: 2, background: "#9B2C1A", borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, color: "#5C4A3A", fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)", letterSpacing: "0.01em", margin: 0 }}>
                AI-powered email generation or write manually
              </p>
            </div>
          </motion.div>

          {/* ── Mode switcher ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              display: "inline-flex", padding: "4px", gap: "4px",
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(26,22,18,0.1)", borderRadius: "0.75rem",
              boxShadow: "0 2px 10px rgba(26,22,18,0.06)",
            }}>
              {(["ai", "manual"] as const).map((m) => (
                <motion.button
                  key={m}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMode(m); setShowTemplates(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.45rem",
                    padding: "0.5rem 1.1rem", borderRadius: "0.5rem",
                    fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500,
                    cursor: "pointer", transition: "all 0.22s ease",
                    border: "none",
                    background: mode === m ? "#1a1612" : "transparent",
                    color: mode === m ? "#faf8f4" : "#5C4A3A",
                    boxShadow: mode === m ? "0 2px 8px rgba(26,22,18,0.18)" : "none",
                  }}
                >
                  {m === "ai" ? <><Sparkles size={13} /> AI Assistant</> : <><FileText size={13} /> Manual</>}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Two-column grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "1.5rem",
            alignItems: "start",
          }}>

            {/* ── Left column ── */}
            <motion.div variants={fadeUp}>
              <div style={{
                background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)",
                border: "1px solid rgba(26,22,18,0.09)", borderRadius: "1rem",
                overflow: "hidden", position: "relative",
                boxShadow: "0 4px 24px rgba(26,22,18,0.07)",
              }}>
                {/* Card header */}
                <div style={{
                  padding: "1.15rem 1.4rem", borderBottom: "1px solid rgba(26,22,18,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "2rem", height: "2rem", borderRadius: "0.45rem",
                      background: "rgba(155,44,26,0.08)", border: "1px solid rgba(155,44,26,0.2)",
                      color: "#9B2C1A",
                    }}>
                      {mode === "ai" ? <Sparkles size={14} /> : <User size={14} />}
                    </div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: "#1a1612", margin: 0 }}>
                      {mode === "ai" ? "Customize Prompt" : "Your Details"}
                    </h2>
                  </div>

                  {mode === "ai" && (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.35rem",
                          padding: "0.38rem 0.8rem", borderRadius: "0.4rem",
                          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                          letterSpacing: "0.08em", textTransform: "uppercase",
                          color: "#5C4A3A",
                          background: "rgba(250,248,244,0.9)",
                          border: "1px solid rgba(26,22,18,0.14)",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        <LayoutTemplate size={11} /> Templates
                      </button>
                      <button
                        onClick={(e) => handleButtonClick(e, handleGenerateEmail)}
                        disabled={isGenerating || !prompt.trim()}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.35rem",
                          padding: "0.38rem 0.9rem", borderRadius: "0.4rem",
                          fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500,
                          color: isGenerating || !prompt.trim() ? "#9e9590" : "#faf8f4",
                          background: isGenerating || !prompt.trim() ? "rgba(26,22,18,0.05)" : "#9B2C1A",
                          border: `1px solid ${isGenerating || !prompt.trim() ? "rgba(26,22,18,0.1)" : "#9B2C1A"}`,
                          cursor: isGenerating || !prompt.trim() ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                          boxShadow: isGenerating || !prompt.trim() ? "none" : "0 2px 8px rgba(155,44,26,0.25)",
                        }}
                      >
                        {isGenerating ? (
                          <span style={{ display: "flex", gap: "2px" }}>
                            {[0,1,2].map(i => (
                              <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#9e9590", display: "inline-block", animation: `bounce 0.9s ${i*0.15}s infinite` }} />
                            ))}
                          </span>
                        ) : <><Sparkles size={11} /> Generate</>}
                      </button>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: "1.25rem 1.4rem" }}>
                  {mode === "ai" ? (
                    <div style={{ position: "relative" }}>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Write a professional email to inquire about a job opportunity..."
                        style={{
                          ...inputStyle,
                          height: 280, resize: "none",
                          lineHeight: 1.7,
                        }}
                        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(155,44,26,0.4)"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(155,44,26,0.08)"; }}
                        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(26,22,18,0.14)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; }}
                      />
                      {selectedTemplate !== null && (
                        <div style={{
                          position: "absolute", bottom: 10, left: 10, right: 10,
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "0.3rem 0.65rem", borderRadius: "0.35rem",
                          background: "rgba(250,248,244,0.95)",
                          border: "1px solid rgba(26,22,18,0.1)",
                        }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9B2C1A" }}>
                            {emailTemplates[selectedTemplate].title}
                          </span>
                          <button onClick={() => { setSelectedTemplate(null); setPrompt(""); }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#9e9590", background: "none", border: "none", cursor: "pointer" }}>
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                      {[
                        { id: "name", label: "Your Name", icon: <User size={12} />, type: "text", value: senderName, onChange: setSenderName, placeholder: "Vikneshwaran" },
                        { id: "email", label: "Your Email", icon: <Mail size={12} />, type: "email", value: senderEmail, onChange: setSenderEmail, placeholder: "your@email.com" },
                        { id: "subject", label: "Subject", icon: <MessageSquare size={12} />, type: "text", value: subject, onChange: setSubject, placeholder: "Email subject..." },
                      ].map(({ id, label, icon, type, value, onChange, placeholder }) => (
                        <div key={id}>
                          <label htmlFor={id} style={labelStyle}>{icon}{label} <span style={{ color: "#9B2C1A" }}>*</span></label>
                          <input
                            type={type} id={id} value={value}
                            onChange={e => onChange(e.target.value)}
                            placeholder={placeholder}
                            style={inputStyle}
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
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute", inset: 0, zIndex: 10,
                        background: "rgba(250,248,244,0.97)", backdropFilter: "blur(8px)",
                        borderRadius: "1rem", padding: "1.5rem",
                        overflowY: "auto",
                        border: "1px solid rgba(26,22,18,0.09)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#1a1612", margin: 0 }}>Select a Template</h3>
                        <button onClick={() => setShowTemplates(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5C4A3A", display: "flex" }}>
                          <XCircle size={18} />
                        </button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem" }}>
                        {emailTemplates.map((template, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSelectTemplate(index)}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                              display: "flex", flexDirection: "column", alignItems: "center",
                              padding: "1rem 0.75rem", borderRadius: "0.6rem", textAlign: "center",
                              background: selectedTemplate === index ? "rgba(155,44,26,0.08)" : "rgba(255,255,255,0.8)",
                              border: `1px solid ${selectedTemplate === index ? "rgba(155,44,26,0.35)" : "rgba(26,22,18,0.1)"}`,
                              cursor: "pointer", transition: "all 0.2s",
                            }}
                          >
                            <span style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{template.icon}</span>
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, color: "#1a1612", marginBottom: "0.3rem" }}>{template.title}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "#9B2C1A", background: "rgba(155,44,26,0.08)", padding: "0.15rem 0.5rem", borderRadius: "999px", border: "1px solid rgba(155,44,26,0.2)" }}>
                              {template.tags[0]}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── Right column ── */}
            <motion.div variants={fadeUp}>
              <div style={{
                background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)",
                border: "1px solid rgba(26,22,18,0.09)", borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(26,22,18,0.07)",
              }}>
                {/* Card header */}
                <div style={{
                  padding: "1.15rem 1.4rem", borderBottom: "1px solid rgba(26,22,18,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "2rem", height: "2rem", borderRadius: "0.45rem",
                      background: "rgba(44,95,138,0.08)", border: "1px solid rgba(44,95,138,0.2)",
                      color: "#2c5f8a",
                    }}>
                      <Mail size={14} />
                    </div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: "#1a1612", margin: 0 }}>
                      {mode === "ai" ? "Generated Email" : "Your Message"}
                    </h2>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {/* History button */}
                    <AnimatePresence>
                      {messageCount > 0 && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          onClick={() => setIsChatOpen(!isChatOpen)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "0.35rem",
                            padding: "0.38rem 0.8rem", borderRadius: "0.4rem",
                            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                            letterSpacing: "0.08em", textTransform: "uppercase",
                            color: "#5C4A3A",
                            background: isChatOpen ? "rgba(26,22,18,0.07)" : "rgba(250,248,244,0.9)",
                            border: "1px solid rgba(26,22,18,0.14)",
                            cursor: "pointer", transition: "all 0.2s",
                            position: "relative",
                          }}
                        >
                          <MessageSquare size={11} />
                          History
                          <span style={{
                            position: "absolute", top: -6, right: -6,
                            width: 16, height: 16, borderRadius: "50%",
                            background: "#9B2C1A", color: "#faf8f4",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "var(--font-mono)", fontSize: "0.5rem",
                          }}>
                            {messageCount}
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Send button */}
                    {emailContent && (
                      <button
                        onClick={(e) => handleButtonClick(e, handleSendEmail)}
                        disabled={isSending}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.35rem",
                          padding: "0.38rem 0.9rem", borderRadius: "0.4rem",
                          fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500,
                          color: isSending ? "#9e9590" : "#faf8f4",
                          background: isSending ? "rgba(26,22,18,0.05)" : "#1a1612",
                          border: `1px solid ${isSending ? "rgba(26,22,18,0.1)" : "#1a1612"}`,
                          cursor: isSending ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                          boxShadow: isSending ? "none" : "0 2px 8px rgba(26,22,18,0.2)",
                        }}
                        onMouseEnter={e => { if (!isSending) { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(26,22,18,0.28)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(26,22,18,0.2)"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
                      >
                        {isSending ? (
                          <span style={{ display: "flex", gap: "2px" }}>
                            {[0,1,2].map(i => (
                              <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#9e9590", display: "inline-block" }} />
                            ))}
                          </span>
                        ) : <><Send size={11} /> Send</>}
                      </button>
                    )}
                  </div>
                </div>

                {/* Textarea area */}
                <div style={{ padding: "1.25rem 1.4rem" }}>
                  <div style={{ position: "relative", height: 280, borderRadius: "0.5rem", overflow: "hidden", border: "1px solid rgba(26,22,18,0.12)", background: "rgba(250,248,244,0.85)" }}>
                    {mode === "ai" ? (
                      <div style={{ position: "absolute", inset: 0, overflowY: "auto", padding: "0.75rem 0.85rem" }}>
                        {emailContent ? (
                          isTextAnimating ? (
                            <TextGenerationEffect text={emailContent} className="text-sm" speed="fast" onComplete={() => setIsTextAnimating(false)} />
                          ) : (
                            <textarea
                              value={emailContent}
                              onChange={e => setEmailContent(e.target.value)}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.75, color: "#3D2F27", padding: "0.75rem 0.85rem", boxSizing: "border-box" }}
                            />
                          )
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.6rem", textAlign: "center" }}>
                            <Sparkles size={20} color="rgba(155,44,26,0.35)" />
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#9e9590", margin: 0, maxWidth: "28ch", lineHeight: 1.6 }}>
                              Enter a prompt and click Generate to create an email
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <textarea
                        value={emailContent}
                        onChange={e => setEmailContent(e.target.value)}
                        placeholder="Write your message here..."
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.75, color: "#3D2F27", padding: "0.75rem 0.85rem", boxSizing: "border-box" }}
                      />
                    )}
                  </div>

                  {/* AI attribution */}
                  {mode === "ai" && (
                    <div style={{ marginTop: "0.65rem", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.4rem" }}>
                     
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      <ChatHistory
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        newEmail={newEmail}
        onMessageCountChange={setMessageCount}
      />
    </div>
  );
}