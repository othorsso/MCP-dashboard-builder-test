import Link from "next/link";
import { getTripsByMonth } from "@/data/trips";
import { monthNameSv } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import TripCard from "@/components/home/TripCard";

interface Props {
  params: Promise<{ year: string; month: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params;
  const monthName = monthNameSv(parseInt(month));
  return {
    title: `${monthName} ${year} – Oscar gillar natur och fiske`,
    description: `Turer från ${monthName.toLowerCase()} ${year}.`,
  };
}

export default async function MonthPage({ params }: Props) {
  const { year, month } = await params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  if (isNaN(yearNum) || isNaN(monthNum)) notFound();

  const monthTrips = getTripsByMonth(yearNum, monthNum);
  const monthName = monthNameSv(monthNum);

  if (monthTrips.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-stone-400">
        <p className="text-5xl mb-4">🌧️</p>
        <p className="text-lg font-medium">
          Inga turer för {monthName.toLowerCase()} {year}.
        </p>
        <Link
          href={`/arkiv/${year}`}
          className="text-sm text-[var(--forest-500)] hover:underline mt-3 inline-block"
        >
          Tillbaka till {year}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-400 flex items-center gap-1.5 mb-8 flex-wrap">
        <Link href="/arkiv" className="hover:text-[var(--forest-500)]">Arkiv</Link>
        <ChevronRight size={12} />
        <Link href={`/arkiv/${year}`} className="hover:text-[var(--forest-500)]">{year}</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--foreground)]/70">{monthName}</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
        {monthName} {year}
      </h1>
      <p className="text-stone-400 text-sm mb-10">
        {monthTrips.length} {monthTrips.length === 1 ? "tur" : "turer"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {monthTrips.map((trip) => (
          <TripCard key={trip.date} trip={trip} />
        ))}
      </div>
    </div>
  );
}
