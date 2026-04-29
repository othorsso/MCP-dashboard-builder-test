import Link from "next/link";
import { trips, getYears } from "@/data/trips";
import { monthNameSv } from "@/lib/utils";
import { Calendar, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arkiv – Oscar gillar natur och fiske",
  description: "Bläddra bland alla turer år för år.",
};

export default function ArchivePage() {
  const years = getYears();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-medium mb-1">
          Hela arkivet
        </p>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Turer år för år
        </h1>
      </div>

      {years.length === 0 ? (
        <p className="text-stone-400">Inga turer ännu.</p>
      ) : (
        <div className="space-y-10">
          {years.map((year) => {
            const yearTrips = trips.filter((t) => t.date.startsWith(String(year)));
            // Group by month
            const months: Record<number, typeof yearTrips> = {};
            yearTrips.forEach((t) => {
              const m = parseInt(t.date.split("-")[1]);
              if (!months[m]) months[m] = [];
              months[m].push(t);
            });

            return (
              <div key={year}>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={18} className="text-[var(--forest-500)]" />
                  <h2 className="text-xl font-bold text-[var(--foreground)]">{year}</h2>
                  <span className="text-xs text-stone-400">
                    {yearTrips.length} {yearTrips.length === 1 ? "tur" : "turer"}
                  </span>
                  <Link
                    href={`/arkiv/${year}`}
                    className="ml-auto text-xs text-[var(--forest-500)] hover:underline flex items-center gap-0.5"
                  >
                    Visa allt <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(months)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([month, monthTrips]) => (
                      <Link
                        key={month}
                        href={`/arkiv/${year}/${String(month).padStart(2, "0")}`}
                        className="bg-white dark:bg-white/[0.04] rounded-xl border border-stone-100 dark:border-white/10 p-4 hover:border-[var(--forest-500)]/40 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-[var(--foreground)] group-hover:text-[var(--forest-500)] transition-colors">
                            {monthNameSv(Number(month))}
                          </p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {monthTrips.length} {monthTrips.length === 1 ? "tur" : "turer"}
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-stone-300 group-hover:text-[var(--forest-500)] transition-colors flex-shrink-0" aria-hidden="true" />
                      </Link>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
