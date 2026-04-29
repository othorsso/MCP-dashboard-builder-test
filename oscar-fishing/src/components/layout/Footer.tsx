import Link from "next/link";
import { Fish } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-stone-200/60 dark:border-stone-800/60 bg-[var(--forest-50)] dark:bg-stone-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <Fish size={16} className="text-[var(--forest-500)]" />
          <span>© {currentYear} Oscar gillar natur och fiske</span>
        </div>
        <nav className="flex flex-wrap gap-5 justify-center sm:justify-end">
          <Link href="/arkiv" className="hover:text-[var(--forest-500)] transition-colors">
            Arkiv
          </Link>
          <Link href="/karta" className="hover:text-[var(--forest-500)] transition-colors">
            Karta
          </Link>
          <Link href="/om" className="hover:text-[var(--forest-500)] transition-colors">
            Om Oscar
          </Link>
          <Link href="/kontakt" className="hover:text-[var(--forest-500)] transition-colors">
            Kontakt
          </Link>
          <Link href="/integritetspolicy" className="hover:text-[var(--forest-500)] transition-colors">
            Integritetspolicy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
