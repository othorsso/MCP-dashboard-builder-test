import Link from "next/link";
import { Trip } from "@/types/trips";
import { formatDateSv, tagColour } from "@/lib/utils";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { MapPin, Camera, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TripDetailProps {
  trip: Trip;
}

export default function TripDetail({ trip }: TripDetailProps) {
  const firstImage = trip.media.find((m) => m.type === "image");
  const cover = trip.coverPhoto ?? firstImage?.src;
  const [year, month] = trip.date.split("-");

  return (
    <article>
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-400 flex items-center gap-1.5 mb-6 flex-wrap">
        <Link href="/" className="hover:text-[var(--forest-500)]">Hem</Link>
        <ChevronRight size={12} />
        <Link href="/arkiv" className="hover:text-[var(--forest-500)]">Arkiv</Link>
        <ChevronRight size={12} />
        <Link href={`/arkiv/${year}`} className="hover:text-[var(--forest-500)]">{year}</Link>
        <ChevronRight size={12} />
        <Link href={`/arkiv/${year}/${month}`} className="hover:text-[var(--forest-500)]">
          {parseInt(month)}
        </Link>
        <ChevronRight size={12} />
        <span className="text-[var(--foreground)]/70 truncate max-w-[180px]">{trip.title}</span>
      </nav>

      {/* Hero cover image */}
      {cover && (
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-8 bg-stone-100 dark:bg-stone-800">
          <Image
            src={resolveMediaUrl(cover)}
            alt={trip.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <p className="text-sm text-stone-400 mb-2">{formatDateSv(trip.date)}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-3 leading-tight">
          {trip.title}
        </h1>
        {(trip.location || trip.area) && (
          <p className="flex items-center gap-1.5 text-stone-400 text-sm mb-4">
            <MapPin size={14} />
            {trip.location}
            {trip.area ? ` – ${trip.area}` : ""}
          </p>
        )}
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {trip.tags.map((tag) => (
            <Link
              key={tag}
              href={`/arkiv?tag=${encodeURIComponent(tag)}`}
              className={`text-sm px-3 py-1 rounded-full font-medium hover:opacity-80 transition-opacity ${tagColour(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Summary text */}
      <div className="prose prose-stone dark:prose-invert max-w-none mb-10">
        <p className="text-lg leading-relaxed text-[var(--foreground)]/80 whitespace-pre-line">
          {trip.summary}
        </p>
      </div>

      {/* Photo count */}
      <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
        <Camera size={14} />
        <span>
          {trip.media.filter((m) => m.type === "image").length} bilder
          {trip.media.filter((m) => m.type === "video").length > 0 &&
            ` · ${trip.media.filter((m) => m.type === "video").length} video${trip.media.filter((m) => m.type === "video").length > 1 ? "s" : ""}`}
        </span>
      </div>
    </article>
  );
}
