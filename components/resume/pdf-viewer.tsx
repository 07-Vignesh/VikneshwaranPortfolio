"use client";

import { useState, useEffect } from "react";

export default function PDFViewer() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState("800px");
  const [isMobile, setIsMobile] = useState(false);

  const resumePath = "/vikneshwaran.pdf";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const updateHeight = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIframeHeight(mobile ? `${window.innerHeight * 0.6}px` : "820px");
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => { clearTimeout(timer); window.removeEventListener("resize", updateHeight); };
  }, []);

  const btnBase: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.52rem 1.1rem",
    borderRadius: "0.625rem",
    fontSize: "0.875rem", fontWeight: 500,
    fontFamily: "var(--font-body)",
    cursor: "pointer", textDecoration: "none",
    transition: "all 0.2s",
    border: "1px solid rgba(26,22,18,0.12)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0" }}>

      {/* ── Loading skeleton ── */}
      {isLoading && (
        <div style={{
          width: "100%", height: 400,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          {/* skeleton bars */}
          {[100, 85, 92, 78, 88].map((w, i) => (
            <div key={i} style={{
              width: `${w}%`, height: 12, borderRadius: 6,
              background: "rgba(26,22,18,0.07)",
              animation: `shimmer 1.4s ${i * 0.1}s ease-in-out infinite`,
            }} />
          ))}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem", color: "#9e9590",
            marginTop: 8,
          }}>
            Loading resume…
          </p>
        </div>
      )}

      {/* ── PDF area ── */}
      <div style={{
        width: "100%",
        border: "1px solid rgba(26,22,18,0.08)",
        borderRadius: "0 0 1.125rem 0",
        overflow: "hidden",
        background: "rgba(250,248,244,0.50)",
        display: isLoading ? "none" : "block",
      }}>

        {isMobile ? (
          /* ── Mobile CTA ── */
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "2.5rem 1.5rem", textAlign: "center", gap: "1rem",
          }}>
            {/* PDF icon */}
            <div style={{
              width: 64, height: 64, borderRadius: "1rem",
              background: "rgba(155,44,26,0.08)",
              border: "1px solid rgba(155,44,26,0.16)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#9B2C1A",
            }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 500, color: "#1a1612", margin: "0 0 6px" }}>
                View Resume
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#6B5744", margin: 0, lineHeight: 1.65, maxWidth: 280 }}>
                For the best viewing experience on mobile, open or download the PDF directly.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 240 }}>
              <a href={resumePath} target="_blank" rel="noopener noreferrer"
                style={{ ...btnBase, background: "#1a1612", color: "#faf8f4", justifyContent: "center", border: "1px solid #1a1612" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(26,22,18,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </a>
              <a href={resumePath} download
                style={{ ...btnBase, background: "rgba(255,255,255,0.85)", color: "#5C4A3A", justifyContent: "center" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#9B2C1A"; el.style.borderColor = "rgba(155,44,26,0.28)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#5C4A3A"; el.style.borderColor = "rgba(26,22,18,0.12)"; }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        ) : (
          /* ── Desktop iframe ── */
          <iframe
            src={`${resumePath}#view=FitH`}
            width="100%"
            height={iframeHeight}
            style={{ border: "none", display: "block" }}
            title="Vikneshwaran Resume PDF"
          />
        )}
      </div>

      {/* ── Desktop action buttons ── */}
      {!isMobile && !isLoading && (
        <div style={{
          marginTop: "1.25rem",
          display: "flex", gap: "0.75rem", flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <a
            href={resumePath}
            download
            style={{ ...btnBase, background: "#1a1612", color: "#faf8f4", border: "1px solid #1a1612" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 6px 20px rgba(26,22,18,0.22)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "";
              el.style.boxShadow = "none";
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>

          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...btnBase, background: "rgba(255,255,255,0.85)", color: "#5C4A3A" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#9B2C1A";
              el.style.borderColor = "rgba(155,44,26,0.28)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 4px 12px rgba(26,22,18,0.10)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#5C4A3A";
              el.style.borderColor = "rgba(26,22,18,0.12)";
              el.style.transform = "";
              el.style.boxShadow = "none";
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in New Tab
          </a>
        </div>
      )}

      {/* shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}