import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/types/trips";
import { formatDateSv, tagColour } from "@/lib/utils";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { MapPin, Camera } from "lucide-react";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const firstImage = trip.media.find((m) => m.type === "image");
  const cover = trip.coverPhoto ?? firstImage?.src;
  const coverAlt = firstImage?.alt ?? trip.title;

  return (
    <Link
      href={`/tur/${trip.date}`}
      className="group block bg-white dark:bg-white/[0.05] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-white/5 photo-card">
        {cover ? (
          <Image
            src={resolveMediaUrl(cover)}
            alt={coverAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-300">
            <Camera size={40} strokeWidth={1} />
          </div>
        )}
        {/* Photo count badge */}
        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
          <Camera size={10} />
          {trip.media.length}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-stone-400 mb-1">{formatDateSv(trip.date)}</p>
        <h3 className="font-semibold text-[var(--foreground)] text-base leading-snug mb-1 group-hover:text-[var(--forest-500)] transition-colors">
          {trip.title}
        </h3>
        {trip.location && (
          <p className="text-xs text-stone-400 flex items-center gap-1 mb-2">
            <MapPin size={11} />
            {trip.location}
            {trip.area ? `, ${trip.area}` : ""}
          </p>
        )}
        <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
          {trip.summary}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {trip.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColour(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
