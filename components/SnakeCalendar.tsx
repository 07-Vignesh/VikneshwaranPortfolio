"use client";

import { useEffect, useRef, useState } from "react";

const USERNAME = "7VikneshVicky";

const CELL = 11;
const GAP = 2;
const WEEKS = 53;
const DAYS = 7;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getColor(count: number): string {
  if (!count || count === 0) return "rgba(26,22,18,0.07)";
  if (count >= 5) return "#9B2C1A";
  if (count >= 3) return "#c0392b";
  if (count >= 2) return "#e17055";
  return "#fab1a0";
}

function buildGrid() {
  const today = new Date();
  const grid: { date: string; count: number; week: number; day: number }[] = [];

  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - (WEEKS - 1) * 7);

  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > today) continue;
      grid.push({
        date: date.toISOString().split("T")[0],
        count: 0,
        week: w,
        day: d,
      });
    }
  }
  return grid;
}

/**
 * Merges a submissionCalendar object (unix-timestamp keys OR date-string keys)
 * into the grid. Returns updated grid + total.
 */
function applyCalendar(
  grid: { date: string; count: number; week: number; day: number }[],
  cal: Record<string, number>
) {
  const dateMap: Record<string, number> = {};

  for (const [key, cnt] of Object.entries(cal)) {
    const n = Number(key);
    const dateStr = isNaN(n) || n < 1e9
      ? key  // already a date string like "2025-01-01"
      : new Date(n * 1000).toISOString().split("T")[0]; // unix timestamp
    dateMap[dateStr] = (dateMap[dateStr] || 0) + Number(cnt);
  }

  const updated = grid.map(cell => ({
    ...cell,
    count: dateMap[cell.date] ?? 0,
  }));
  const total = updated.reduce((s, c) => s + c.count, 0);
  return { updated, total };
}

export default function SnakeCalendar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState(() => buildGrid());
  const [loading, setLoading] = useState(true);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [fetchStatus, setFetchStatus] = useState<"loading" | "ok" | "error">("loading");
  const animRef = useRef<number | null>(null);
  const snakeRef = useRef<number[]>([]);
  const frameRef = useRef(0);
  const SNAKE_LEN = 12;
  const SPEED = 2;

  useEffect(() => {
    let cancelled = false;

    async function fetchCalendar() {
      // ── Strategy 1: your own Next.js proxy (if it exists) ──────────────────
      // We test it but don't rely on it exclusively.
      const proxySources = [
        `/api/leetcode-calendar?username=${USERNAME}`,
      ];

      // ── Strategy 2: public LeetCode stats APIs ──────────────────────────────
      // alfa-leetcode-api returns { submissionCalendar: "{...}" } (JSON string)
      const publicSources = [
        `https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`,
        `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${USERNAME}&year=2025`,
        `https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${USERNAME}&year=2024`,
        `https://leetcode-stats-api.herokuapp.com/${USERNAME}`,
      ];

      const tryParse = (d: any): Record<string, number> | null => {
        // Different APIs use different field names
        const raw =
          d?.submissionCalendar ??
          d?.calendar ??
          d?.submissionCalendarJSON ??
          d?.data?.matchedUser?.userCalendar?.submissionCalendar ??
          null;

        if (!raw) return null;

        try {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (typeof parsed === "object" && parsed !== null) return parsed;
        } catch { /* ignore */ }
        return null;
      };

      // Try proxy first, then public APIs
      const allSources = [...proxySources, ...publicSources];
      const calMaps: Record<string, number>[] = [];

      for (const url of allSources) {
        if (cancelled) return;
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
          if (!res.ok) continue;
          const d = await res.json();
          const cal = tryParse(d);
          if (cal && Object.keys(cal).length > 0) {
            calMaps.push(cal);
            // If we got a full year (unix timestamps), one source is enough
            const hasUnix = Object.keys(cal).some(k => Number(k) > 1e9);
            if (hasUnix) break;
          }
        } catch {
          continue;
        }
      }

      if (cancelled) return;

      if (calMaps.length === 0) {
        setFetchStatus("error");
        setLoading(false);
        return;
      }

      // Merge all maps (handles partial-year APIs)
      const merged: Record<string, number> = {};
      for (const cal of calMaps) {
        for (const [k, v] of Object.entries(cal)) {
          const n = Number(k);
          const dateStr = isNaN(n) || n < 1e9
            ? k
            : new Date(n * 1000).toISOString().split("T")[0];
          merged[dateStr] = (merged[dateStr] || 0) + Number(v);
        }
      }

      const baseGrid = buildGrid();
      const { updated, total } = applyCalendar(baseGrid, merged);

      setGrid(updated);
      setTotalSubmissions(total);
      setFetchStatus("ok");
      setLoading(false);
    }

    fetchCalendar();
    return () => { cancelled = true; };
  }, []);

  // ── Canvas animation ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = WEEKS * (CELL + GAP);
    const H = DAYS * (CELL + GAP);
    canvas.width = W;
    canvas.height = H;

    if (snakeRef.current.length === 0) {
      const first = grid.findIndex(c => c.count > 0);
      snakeRef.current = [first >= 0 ? first : 0];
    }

    let idx = snakeRef.current[0];

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, W, H);

      // Draw all cells
      grid.forEach((cell) => {
        const x = cell.week * (CELL + GAP);
        const y = cell.day  * (CELL + GAP);
        ctx.beginPath();
        (ctx as any).roundRect(x, y, CELL, CELL, 2);
        ctx.fillStyle = getColor(cell.count);
        ctx.fill();
      });

      // Move snake
      if (frameRef.current % SPEED === 0) {
        idx = (idx + 1) % grid.length;
        snakeRef.current.unshift(idx);
        if (snakeRef.current.length > SNAKE_LEN) snakeRef.current.pop();
      }

      // Draw snake segments (back to front)
      for (let i = snakeRef.current.length - 1; i >= 0; i--) {
        const ci = snakeRef.current[i];
        const cell = grid[ci];
        if (!cell) continue;
        const x = cell.week * (CELL + GAP);
        const y = cell.day  * (CELL + GAP);
        const alpha = 1 - i / SNAKE_LEN;
        const isHead = i === 0;

        if (isHead) {
          ctx.shadowColor = "rgba(155,44,26,0.6)";
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        (ctx as any).roundRect(x, y, CELL, CELL, 2);
        ctx.fillStyle = isHead
          ? `rgba(155,44,26,${alpha})`
          : `rgba(192,57,43,${alpha * 0.85})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (isHead) {
          ctx.fillStyle = "#faf8f4";
          ctx.beginPath();
          ctx.arc(x + 3.5, y + 3.5, 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7.5, y + 3.5, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [grid]);

  // ── Month labels ────────────────────────────────────────────────────────────
  const monthLabels: { label: string; x: number }[] = [];
  let lastMonth = -1;
  grid.forEach(cell => {
    const m = new Date(cell.date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTHS[m], x: cell.week * (CELL + GAP) });
      lastMonth = m;
    }
  });

  const activeDays = grid.filter(c => c.count > 0).length;
  const maxStreak = (() => {
    let max = 0, cur = 0;
    const sorted = [...grid].sort((a, b) => a.date.localeCompare(b.date));
    sorted.forEach(c => { if (c.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0; });
    return max;
  })();

  return (
    <div style={{ padding: "2rem 1.5rem", borderTop: "1px solid rgba(26,22,18,0.07)" }}>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap",
        gap: "0.75rem", marginBottom: "1.25rem",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem", fontWeight: 700,
          color: "#1a1612", margin: 0,
        }}>
          {loading
            ? "Loading Activity…"
            : fetchStatus === "error"
            ? "Could not load submissions"
            : `${totalSubmissions} submissions in the past year`}
        </h2>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#9e9590", letterSpacing: "0.08em", textTransform: "uppercase" }}>Less</span>
          {["rgba(26,22,18,0.07)", "#fab1a0", "#e17055", "#c0392b", "#9B2C1A"].map((c, i) => (
            <span key={i} style={{ width: 11, height: 11, borderRadius: 3, background: c, display: "inline-block" }} />
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#9e9590", letterSpacing: "0.08em", textTransform: "uppercase" }}>More</span>
        </div>
      </div>

      {/* Calendar + snake */}
      <div style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "inline-block", minWidth: WEEKS * (CELL + GAP) }}>

          {/* Month labels */}
          <div style={{ position: "relative", height: 18, marginBottom: 4 }}>
            {monthLabels.map(({ label, x }) => (
              <span key={`${label}-${x}`} style={{
                position: "absolute", left: x,
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem", color: "#9e9590",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                {label}
              </span>
            ))}
          </div>

          {/* Day labels + canvas */}
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
              {["S","M","T","W","T","F","S"].map((d, i) => (
                <span key={i} style={{
                  width: CELL, height: CELL,
                  lineHeight: `${CELL}px`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem", color: i % 2 === 1 ? "#9e9590" : "transparent",
                  textAlign: "center", display: "block",
                }}>
                  {d}
                </span>
              ))}
            </div>

            <canvas
              ref={canvasRef}
              style={{ display: "block", borderRadius: 4 }}
            />
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div style={{
        marginTop: "1rem",
        display: "flex", gap: "1.5rem", flexWrap: "wrap",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem", color: "#9e9590",
        letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        <span>Active days: <strong style={{ color: "#5C4A3A" }}>{activeDays}</strong></span>
        <span>Max streak: <strong style={{ color: "#5C4A3A" }}>{maxStreak}</strong></span>
      </div>
    </div>
  );
}