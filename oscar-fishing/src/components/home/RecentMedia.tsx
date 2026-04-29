import Link from "next/link";
import Image from "next/image";
import { trips } from "@/data/trips";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { Play } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface MediaItem {
  src: string;
  type: "image" | "video";
  alt: string;
  tripDate: string;
  poster?: string;
}

function getRecentMedia(count: number): MediaItem[] {
  const items: MediaItem[] = [];
  for (const trip of trips) {
    for (const m of trip.media) {
      const src = m.type === "video" ? (m.poster ?? "") : m.src;
      if (!src) continue;
      items.push({
        src,
        type: m.type,
        alt: (m.type === "image" ? m.alt : m.title) ?? trip.title,
        tripDate: trip.date,
        poster: m.type === "video" ? m.poster : undefined,
      });
      if (items.length >= count) return items;
    }
  }
  return items;
}

export default function RecentMedia() {
  const items = getRecentMedia(8);
  if (items.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10" aria-label="Senaste bilder och videos">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--forest-500)] font-semibold mb-1">
            Senaste bilder &amp; klipp
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
            Senaste bilderna. Några med fisk.
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Och några med starkt självförtroende utan särskilt fler resultat.
          </p>
        </div>
        <Link
          href="/arkiv"
          className="flex items-center gap-1 text-sm text-[var(--forest-500)] font-medium hover:underline underline-offset-2"
        >
          Alla turer <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {items.map((item, i) => (
          <Link
            key={i}
            href={`/tur/${item.tripDate}`}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 dark:bg-white/5 shadow-sm ring-1 ring-stone-200/50 dark:ring-white/8 hover:ring-[var(--forest-500)]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <Image
              src={resolveMediaUrl(item.src)}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-400"
              sizes="(max-width: 640px) 50vw, 25vw"
              loading="lazy"
            />
            {/* Video play overlay */}
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Play size={14} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}
