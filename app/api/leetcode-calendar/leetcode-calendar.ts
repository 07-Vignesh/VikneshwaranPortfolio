// app/api/leetcode-calendar/route.ts
// (or pages/api/leetcode-calendar.ts — see bottom for Pages Router version)

import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // optional, remove if you hit issues

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") ?? "7VikneshVicky";

  // LeetCode GraphQL API — works server-side (no CORS restriction)
  const graphqlQuery = {
    query: `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            submissionCalendar
          }
        }
      }
    `,
    variables: { username },
  };

  try {
    // ── Try LeetCode's own GraphQL endpoint first ──────────────────────────
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "Origin": "https://leetcode.com",
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (lcRes.ok) {
      const json = await lcRes.json();
      const calStr =
        json?.data?.matchedUser?.userCalendar?.submissionCalendar;

      if (calStr) {
        const submissionCalendar = JSON.parse(calStr); // { "unixTs": count, … }
        return NextResponse.json({ submissionCalendar }, {
          headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
        });
      }
    }
  } catch { /* fall through */ }

  // ── Fallback: alfa-leetcode-api (public third-party) ──────────────────────
  try {
    const alfaRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/calendar`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (alfaRes.ok) {
      const d = await alfaRes.json();
      // alfa returns { submissionCalendar: "{...}" } (JSON string)
      const raw = d?.submissionCalendar ?? d?.calendar ?? null;
      if (raw) {
        const submissionCalendar =
          typeof raw === "string" ? JSON.parse(raw) : raw;
        return NextResponse.json({ submissionCalendar }, {
          headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
        });
      }
    }
  } catch { /* fall through */ }

  return NextResponse.json(
    { error: "Could not fetch calendar", submissionCalendar: {} },
    { status: 502 }
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// PAGES ROUTER version (use this if you're on pages/, not app/)
// Save as: pages/api/leetcode-calendar.ts
// ─────────────────────────────────────────────────────────────────────────────
/*
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = (req.query.username as string) ?? "7VikneshVicky";

  const graphqlQuery = {
    query: `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            submissionCalendar
          }
        }
      }
    `,
    variables: { username },
  };

  try {
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "Origin": "https://leetcode.com",
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (lcRes.ok) {
      const json = await lcRes.json();
      const calStr = json?.data?.matchedUser?.userCalendar?.submissionCalendar;
      if (calStr) {
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
        return res.json({ submissionCalendar: JSON.parse(calStr) });
      }
    }
  } catch {}

  try {
    const alfaRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/calendar`
    );
    if (alfaRes.ok) {
      const d = await alfaRes.json();
      const raw = d?.submissionCalendar ?? d?.calendar ?? null;
      if (raw) {
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
        return res.json({ submissionCalendar: typeof raw === "string" ? JSON.parse(raw) : raw });
      }
    }
  } catch {}

  res.status(502).json({ error: "Could not fetch calendar", submissionCalendar: {} });
}
*/