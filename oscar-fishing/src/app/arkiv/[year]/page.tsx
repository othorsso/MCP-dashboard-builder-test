import Link from "next/link";
import { getTripsByYear } from "@/data/trips";
import { monthNameSv } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import TripCard from "@/components/home/TripCard";

interface Props {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} – Arkiv – Oscar gillar natur och fiske`,
    description: `Alla turer från ${year}.`,
  };
}

export default async function YearPage({ params }: Props) {
  const { year } = await params;
  const yearNum = parseInt(year);
  if (isNaN(yearNum)) notFound();

  const yearTrips = getTripsByYear(yearNum);
  if (yearTrips.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-stone-400">
        <p className="text-5xl mb-4">🌲</p>
        <p className="text-lg font-medium">Inga turer för {year} ännu.</p>
        <Link href="/arkiv" className="text-sm text-[var(--forest-500)] hover:underline mt-3 inline-block">
          Tillbaka till arkivet
        </Link>
      </div>
    );
  }

  // Group by month
  const months: Record<number, typeof yearTrips> = {};
  yearTrips.forEach((t) => {
    const m = parseInt(t.date.split("-")[1]);
    if (!months[m]) months[m] = [];
    months[m].push(t);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-400 flex items-center gap-1.5 mb-8">
        <Link href="/arkiv" className="hover:text-[var(--forest-500)]">Arkiv</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--foreground)]/70">{year}</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{year}</h1>
      <p className="text-stone-400 text-sm mb-10">
        {yearTrips.length} {yearTrips.length === 1 ? "tur" : "turer"} det här året
      </p>

      <div className="space-y-12">
        {Object.entries(months)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([month, monthTrips]) => (
            <div key={month}>
              <div className="flex items-center gap-3 mb-5">
                <Link
                  href={`/arkiv/${year}/${String(month).padStart(2, "0")}`}
                  className="text-lg font-semibold text-[var(--foreground)] hover:text-[var(--forest-500)] transition-colors"
                >
                  {monthNameSv(Number(month))}
                </Link>
                <span className="text-xs text-stone-400 bg-stone-100 dark:bg-white/8 px-2 py-0.5 rounded-full">
                  {monthTrips.length} {monthTrips.length === 1 ? "tur" : "turer"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {monthTrips.map((trip) => (
                  <TripCard key={trip.date} trip={trip} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
