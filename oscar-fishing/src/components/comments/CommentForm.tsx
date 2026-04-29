"use client";

import { useState } from "react";
import { CommentSubmission } from "@/types/trips";

interface CommentFormProps {
  tripDate: string;
}

export default function CommentForm({ tripDate }: CommentFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    // Honeypot check
    if (website) {
      setStatus("idle");
      return;
    }

    const payload: CommentSubmission = {
      tripDate,
      name: name.trim(),
      comment: comment.trim(),
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Något gick fel. Försök igen.");
        setStatus("error");
      } else {
        setStatus("success");
        setName("");
        setComment("");
      }
    } catch {
      setErrorMsg("Kunde inte skicka kommentaren. Kontrollera din internetuppkoppling.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4 text-sm text-green-700 dark:text-green-300">
        ✓ Tack för din kommentar! Den visas när den har blivit godkänd.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot — hidden from users, must be empty */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Ditt namn <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
          placeholder="Namn"
          className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--forest-500)] transition"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Kommentar <span className="text-red-400">*</span>
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          required
          rows={4}
          placeholder="Skriv din kommentar här…"
          className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--forest-500)] transition resize-none"
        />
        <p className="text-xs text-stone-400 mt-1 text-right">{comment.length}/1000</p>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}

      <p className="text-xs text-stone-400">
        Kommentaren visas inte direkt – den granskas innan den publiceras.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[var(--forest-500)] hover:bg-[var(--forest-700)] disabled:opacity-60 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors"
      >
        {status === "submitting" ? "Skickar…" : "Skicka kommentar"}
      </button>
    </form>
  );
}
