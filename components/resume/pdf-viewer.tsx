"use client";

import { useState, useEffect } from "react";

export default function PDFViewer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const resumePath = "/vikneshwaran.pdf";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => { clearTimeout(timer); window.removeEventListener("resize", check); };
  }, []);

  /* Don't render until we know the viewport size */
  if (isMobile === null) return null;

  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", overflow: "hidden" }}>

      {/* Skeleton */}
      {isLoading && (
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, minHeight: 260, justifyContent: "center" }}>
          {[100, 85, 92, 78, 88].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 11, borderRadius: 6, background: "rgba(26,22,18,0.07)", animation: `pdf-s 1.4s ${i * 0.1}s ease-in-out infinite` }} />
          ))}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#9e9590", marginTop: 8 }}>Loading resume…</p>
        </div>
      )}

      {!isLoading && isMobile && (
        /* ── Mobile CTA ── */
        <div style={{
          width: "100%",
          maxWidth: "100%",
          padding: "1.75rem 1.25rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          textAlign: "center",
          overflow: "hidden",
        }}>
          {/* PDF icon */}
          <div style={{
            width: 60, height: 60, borderRadius: "0.875rem", flexShrink: 0,
            background: "rgba(155,44,26,0.08)",
            border: "1px solid rgba(155,44,26,0.16)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#9B2C1A",
          }}>
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Text */}
          <div style={{ width: "100%" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "#1a1612", margin: "0 0 6px" }}>
              View Resume
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "#6B5744", margin: 0, lineHeight: 1.6 }}>
              Open or download the PDF for the best mobile experience.
            </p>
          </div>

          {/* Buttons — 100% width, no overflow */}
          <div style={{ width: "100%", maxWidth: "100%", display: "flex", flexDirection: "column", gap: 10, boxSizing: "border-box" }}>
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                width: "100%", padding: "0.75rem 0",
                borderRadius: "0.625rem",
                fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
                background: "#1a1612", color: "#faf8f4",
                border: "1px solid #1a1612", textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>

            <a
              href={resumePath}
              download
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                width: "100%", padding: "0.75rem 0",
                borderRadius: "0.625rem",
                fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
                background: "rgba(255,255,255,0.9)", color: "#5C4A3A",
                border: "1px solid rgba(26,22,18,0.15)", textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      )}

      {!isLoading && !isMobile && (
        /* ── Desktop: iframe + buttons ── */
        <>
          <iframe
            src={`${resumePath}#view=FitH`}
            width="100%"
            height="820px"
            style={{ border: "none", display: "block" }}
            title="Vikneshwaran Resume PDF"
          />
          <div style={{
            padding: "1.1rem 1.5rem",
            borderTop: "1px solid rgba(26,22,18,0.07)",
            display: "flex", gap: "0.65rem", flexWrap: "wrap",
          }}>
            <a
              href={resumePath} download
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.52rem 1.1rem", borderRadius: "0.625rem",
                fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
                background: "#1a1612", color: "#faf8f4", border: "1px solid #1a1612",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 6px 20px rgba(26,22,18,0.22)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ""; el.style.boxShadow = "none"; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
            <a
              href={resumePath} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.52rem 1.1rem", borderRadius: "0.625rem",
                fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
                background: "rgba(255,255,255,0.85)", color: "#5C4A3A",
                border: "1px solid rgba(26,22,18,0.12)",
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#9B2C1A"; el.style.borderColor = "rgba(155,44,26,0.28)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#5C4A3A"; el.style.borderColor = "rgba(26,22,18,0.12)"; el.style.transform = ""; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>
          </div>
        </>
      )}

      <style>{`
        @keyframes pdf-s {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}