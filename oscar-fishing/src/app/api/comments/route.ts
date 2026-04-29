import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sanitiseText, validateComment } from "@/lib/utils";
import { CommentSubmission } from "@/types/trips";

// Edge Runtime — required for Cloudflare Pages compatibility.
// Note: in-memory rate limiting is best-effort on edge (no shared state across nodes).
export const runtime = "edge";

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes.
const RATE_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_MAP.get(ip);
  if (!entry || now > entry.resetAt) {
    RATE_MAP.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Supabase must be configured
  if (!supabase) {
    return NextResponse.json(
      { error: "Kommentarsfunktionen är inte konfigurerad." },
      { status: 503 }
    );
  }

  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Du har skickat för många kommentarer nyligen. Försök igen om en stund." },
      { status: 429 }
    );
  }

  let body: CommentSubmission;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ogiltigt format." }, { status: 400 });
  }

  // Honeypot check
  if (body.website) {
    // Silently discard – don't tell bots they were caught
    return NextResponse.json({ ok: true });
  }

  // Validate
  const validationError = validateComment(body.name ?? "", body.comment ?? "");
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // Sanitise
  const safeName = sanitiseText(body.name).slice(0, 60);
  const safeComment = sanitiseText(body.comment).slice(0, 1000);
  const safeTripDate = (body.tripDate ?? "").replace(/[^0-9-]/g, "").slice(0, 10);

  if (!safeTripDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return NextResponse.json({ error: "Ogiltig datum." }, { status: 422 });
  }

  // Store as pending – never auto-approve
  const { error } = await supabase.from("comments").insert({
    trip_date: safeTripDate,
    name: safeName,
    comment: safeComment,
    status: "pending",
  });

  if (error) {
    console.error("Comment insert error:", error.message);
    return NextResponse.json(
      { error: "Kunde inte spara kommentaren. Försök igen." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
