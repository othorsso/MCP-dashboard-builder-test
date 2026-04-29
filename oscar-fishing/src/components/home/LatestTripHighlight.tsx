import Link from "next/link";
import Image from "next/image";
import { trips } from "@/data/trips";
import { formatDateSv } from "@/lib/utils";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { ChevronRight, Calendar, Images } from "lucide-react";

export default function LatestTripHighlight() {
  const latest = trips[0];
  if (!latest) return null;

  const firstImage = latest.media.find((m) => m.type === "image");
  const cover = latest.coverPhoto ?? firstImage?.src;
  const coverAlt = firstImage?.alt ?? latest.title;
  const imageCount = latest.media.filter((m) => m.type === "image").length;
  const videoCount = latest.media.filter((m) => m.type === "video").length;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--forest-500)]">
          <Calendar size={11} aria-hidden="true" />
          Senast ute
        </span>
        <span className="h-px flex-1 bg-stone-200 dark:bg-white/10" aria-hidden="true" />
      </div>

      <Link
        href={`/tur/${latest.date}`}
        className="group block rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-white/8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-white/[0.04]"
        aria-label={`Visa senaste turen: ${latest.title}`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Cover image */}
          {cover && (
            <div className="relative sm:w-56 sm:flex-shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden bg-stone-100 dark:bg-white/5">
              <Image
                src={resolveMediaUrl(cover)}
                alt={coverAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 224px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" aria-hidden="true" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 px-6 py-5 flex flex-col justify-between gap-3">
            <div>
              <p className="text-xs text-stone-400 dark:text-stone-500 mb-1.5">
                {formatDateSv(latest.date)}
              </p>
              <h2 className="font-bold text-lg text-[var(--foreground)] leading-snug group-hover:text-[var(--forest-500)] transition-colors mb-2">
                {latest.title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                {latest.summary}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-stone-400">
                {imageCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Images size={12} aria-hidden="true" />
                    {imageCount} {imageCount === 1 ? "bild" : "bilder"}
                  </span>
                )}
                {videoCount > 0 && (
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">▶</span>
                    {videoCount} {videoCount === 1 ? "klipp" : "klipp"}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--forest-500)] group-hover:gap-2.5 transition-all duration-200">
                Visa turen <ChevronRight size={14} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
