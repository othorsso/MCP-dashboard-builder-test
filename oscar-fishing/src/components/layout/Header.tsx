"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Fish } from "lucide-react";
import { getYears } from "@/data/trips";

const years = getYears();

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur-md border-b border-stone-200/50 dark:border-white/8 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
        {/* Logo — left */}
        <div className="flex-none">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Till startsidan"
          >
            <Fish
              size={19}
              strokeWidth={1.8}
              className="text-[var(--forest-500)] group-hover:text-[var(--forest-700)] transition-colors"
            />
            <span className="font-semibold text-sm text-[var(--foreground)] leading-tight">
              Oscar gillar{" "}
              <span className="text-[var(--forest-500)]">natur &amp; fiske</span>
            </span>
          </Link>
        </div>

        {/* Nav — centered (desktop only) */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-0.5 text-sm font-medium text-[var(--foreground)]/70" aria-label="Huvudnavigation">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest-500)]"
          >
            Hem
          </Link>

          {/* Archive dropdown */}
          <div className="relative group">
            <button
              className="px-3.5 py-1.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200 flex items-center gap-1"
              aria-haspopup="true"
              aria-label="Öppna arkiv-meny"
            >
              Arkiv
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-50 mt-px" aria-hidden="true">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Dropdown — always uses explicit white/light background regardless of dark mode */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 py-2 z-50 overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid #e7ede8",
                boxShadow: "0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(58,107,62,0.08)",
              }}
            >
              {years.map((y) => (
                <Link
                  key={y}
                  href={`/arkiv/${y}`}
                  className="block px-4 py-2.5 text-sm text-stone-700 font-medium hover:bg-[#f0f7f0] hover:text-[var(--forest-700)] transition-all duration-150 focus:outline-none focus-visible:bg-[#f0f7f0]"
                >
                  {y}
                </Link>
              ))}
              <div className="border-t border-stone-100 mt-1 pt-1">
                <Link
                  href="/arkiv"
                  className="block px-4 py-2.5 text-sm text-[var(--forest-500)] font-semibold hover:bg-[#f0f7f0] hover:text-[var(--forest-700)] transition-all duration-150 focus:outline-none focus-visible:bg-[#f0f7f0]"
                >
                  Alla år →
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/karta"
            className="px-3.5 py-1.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest-500)]"
          >
            Karta
          </Link>
          <Link
            href="/om"
            className="px-3.5 py-1.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest-500)]"
          >
            Om Oscar
          </Link>
        </nav>

        {/* Right side — desktop spacer + mobile burger */}
        <div className="flex-none flex items-center">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200/60 dark:border-white/8 bg-[var(--background)] px-4 py-3 flex flex-col gap-0.5 text-sm font-medium">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200"
          >
            Hem
          </Link>
          <Link
            href="/arkiv"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200"
          >
            Arkiv – alla år
          </Link>
          {years.map((y) => (
            <Link
              key={y}
              href={`/arkiv/${y}`}
              onClick={() => setMenuOpen(false)}
              className="pl-7 py-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-[var(--forest-500)] dark:hover:text-emerald-300 transition-colors"
            >
              ↳ {y}
            </Link>
          ))}
          <Link
            href="/karta"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200"
          >
            Karta
          </Link>
          <Link
            href="/om"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg hover:bg-[var(--forest-50)] dark:hover:bg-emerald-900/30 hover:text-[var(--forest-700)] dark:hover:text-emerald-300 transition-all duration-200"
          >
            Om Oscar
          </Link>
        </div>
      )}
    </header>
  );
}
