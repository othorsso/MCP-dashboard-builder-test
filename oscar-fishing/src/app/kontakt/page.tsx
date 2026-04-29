import type { Metadata } from "next";
import { Mail, Fish } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt – Oscar gillar natur och fiske",
  description: "Kontakta Oscar — frågor, tips om fiskeplatser eller bara ett hej.",
};

// ── Byt ut e-postadressen nedan mot din riktiga adress ──────────────────────
const CONTACT_EMAIL = "din.email@exempel.se";
// ────────────────────────────────────────────────────────────────────────────

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-medium mb-2">
        Hör av dig
      </p>
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
        Kontakt
      </h1>
      <p className="text-[var(--foreground)]/70 leading-relaxed mb-10">
        Har du frågor, tips om bra fiskeplatser, eller vill du bara säga hej?
        Skriv gärna ett mail. Jag svarar när jag inte är ute och fiskar.
      </p>

      {/* Contact card */}
      <div
        className="rounded-2xl border p-6 flex items-start gap-4"
        style={{
          background: "#f0faf3",
          borderColor: "#3a9b5e28",
          borderTopWidth: "3px",
          borderTopColor: "#3a9b5e",
        }}
      >
        <span
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: "#3a9b5e15" }}
        >
          <Mail size={20} style={{ color: "#3a9b5e" }} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-stone-700 mb-1">E-post</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[var(--forest-500)] hover:underline underline-offset-2 font-medium break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-stone-400 mt-2">
            Svarstid: vanligtvis inom några dagar. Eller längre, om fisket är bra.
          </p>
        </div>
      </div>

      {/* Extra info */}
      <div className="mt-10 border-t border-stone-200 dark:border-stone-800 pt-8">
        <div className="flex items-center gap-2 text-stone-400 text-sm">
          <Fish size={15} className="text-[var(--forest-500)]" aria-hidden="true" />
          <span>
            Sidan drivs av Oscar — en privatperson. Det finns inget kommersiellt
            syfte med bloggen.
          </span>
        </div>
      </div>
    </div>
  );
}
