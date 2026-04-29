import { TripTag } from "@/types/trips";

// ─── Date helpers ─────────────────────────────────────────────────────────────

const MONTHS_SV = [
  "Januari", "Februari", "Mars", "April", "Maj", "Juni",
  "Juli", "Augusti", "September", "Oktober", "November", "December",
];

/** Format ISO date string to Swedish readable, e.g. "28 april 2026" */
export function formatDateSv(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${d} ${MONTHS_SV[m - 1].toLowerCase()} ${y}`;
}

/** Format ISO date to short, e.g. "28 apr" */
export function formatDateShortSv(isoDate: string): string {
  const [, m, d] = isoDate.split("-").map(Number);
  return `${d} ${MONTHS_SV[m - 1].toLowerCase().slice(0, 3)}`;
}

/** Return Swedish month name (1-indexed) */
export function monthNameSv(month: number): string {
  return MONTHS_SV[month - 1] ?? "";
}

// ─── Tag colour map ───────────────────────────────────────────────────────────

const TAG_COLOURS: Record<string, string> = {
  Fiske:       "bg-blue-100 text-blue-800",
  Gädda:       "bg-green-100 text-green-800",
  Abborre:     "bg-yellow-100 text-yellow-800",
  Gös:         "bg-amber-100 text-amber-800",
  Öring:       "bg-orange-100 text-orange-800",
  Sjö:         "bg-sky-100 text-sky-800",
  Å:           "bg-teal-100 text-teal-800",
  Hav:         "bg-cyan-100 text-cyan-800",
  Skog:        "bg-emerald-100 text-emerald-800",
  Vandring:    "bg-lime-100 text-lime-800",
  Båt:         "bg-indigo-100 text-indigo-800",
  Vinterfiske: "bg-slate-100 text-slate-700",
  Sommar:      "bg-yellow-50 text-yellow-700",
  Höst:        "bg-orange-50 text-orange-700",
  Vinter:      "bg-blue-50 text-blue-700",
  Vår:         "bg-green-50 text-green-700",
  Solnedgång:  "bg-rose-100 text-rose-700",
  Natur:       "bg-forest-100 text-forest-700",
};

export function tagColour(tag: TripTag): string {
  return TAG_COLOURS[tag] ?? "bg-stone-100 text-stone-700";
}

// ─── Sanitise plain text ──────────────────────────────────────────────────────

/** Strip any HTML tags and trim. Used before storing/displaying user input. */
export function sanitiseText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")   // strip tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

/** Validate a comment submission – returns an error string or null */
export function validateComment(name: string, comment: string): string | null {
  if (!name || name.trim().length < 2) return "Ange ett namn (minst 2 tecken).";
  if (name.trim().length > 60) return "Namnet får vara max 60 tecken.";
  if (!comment || comment.trim().length < 5) return "Kommentaren är för kort.";
  if (comment.trim().length > 1000) return "Kommentaren får vara max 1 000 tecken.";
  return null;
}
