import { trips } from "@/data/trips";
import TripCard from "./TripCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function RecentTrips() {
  const recent = trips.slice(0, 3);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16" aria-label="Senaste fisketurer">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-medium mb-1">
            Senaste turerna
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
            Ut i det vilda
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Ett litet urval. Inte alla slutade med fisk, men alla slutade utomhus.
          </p>
        </div>
        <Link
          href="/arkiv"
          className="flex items-center gap-1 text-sm text-[var(--forest-500)] font-medium hover:underline"
        >
          Alla turer <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recent.map((trip) => (
          <TripCard key={trip.date} trip={trip} />
        ))}
      </div>
    </section>
  );
}
