import Link from "next/link";
import { trips } from "@/data/trips";
import { formatDateShortSv } from "@/lib/utils";
import { MapPin, ExternalLink } from "lucide-react";

/**
 * Map-inspired trip overview using location cards with region grouping.
 * Structured so a real Leaflet/Mapbox map can be added later — see README.
 */
export default function TripMap() {
  // Group trips by location region
  const byLocation: Record<string, typeof trips> = {};
  for (const trip of trips) {
    const loc = trip.location || "Okänd plats";
    if (!byLocation[loc]) byLocation[loc] = [];
    byLocation[loc].push(trip);
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-medium mb-1">
          Karta över turer
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
          Var har Oscar varit?
        </h2>
        <p className="text-stone-500 text-sm">
          Platser visas som ungefärliga regioner för att skydda hemliga fiskepunkter. 🤫
        </p>
      </div>

      {/* Stylised "map" region layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(byLocation).map(([location, locationTrips]) => (
          <div
            key={location}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Region header */}
            <div
              className="px-4 pt-4 pb-3 flex items-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg, var(--forest-50,#f0f7f0) 0%, #e8f4f8 100%)",
              }}
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--forest-500)] flex items-center justify-center shadow-sm">
                <MapPin size={14} className="text-white" />
              </span>
              <div>
                <p className="font-semibold text-[var(--foreground)] text-sm">{location}</p>
                <p className="text-xs text-stone-400">
                  {locationTrips.length} {locationTrips.length === 1 ? "tur" : "turer"}
                </p>
              </div>
            </div>

            {/* Trip list within region */}
            <ul className="divide-y divide-stone-100 dark:divide-stone-800">
              {locationTrips.map((trip) => (
                <li key={trip.date}>
                  <Link
                    href={`/tur/${trip.date}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate group-hover:text-[var(--forest-500)] transition-colors">
                        {trip.title}
                      </p>
                      <p className="text-xs text-stone-400">
                        {formatDateShortSv(trip.date)}
                        {trip.area ? ` · ${trip.area}` : ""}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="flex-shrink-0 text-stone-300 group-hover:text-[var(--forest-500)] transition-colors ml-2"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Upgrade note */}
      <p className="mt-6 text-xs text-stone-400 text-center">
        💡 En interaktiv karta med Leaflet/Mapbox kan enkelt läggas till senare — se README för instruktioner.
      </p>
    </section>
  );
}
