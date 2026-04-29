"use client";

import Image from "next/image";
import { TripMedia } from "@/types/trips";
import { useLightbox } from "@/store/appStore";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { Camera, Play, Fish, Weight, Ruler, RotateCcw, User } from "lucide-react";

interface MediaGalleryProps {
  media: TripMedia[];
}

// ─── Fish metadata badge strip ────────────────────────────────────────────────
function FishBadges({ item }: { item: TripMedia }) {
  const hasFishData =
    item.fishSpecies ||
    item.fishWeightKg !== undefined ||
    item.fishLengthCm !== undefined ||
    item.caughtAndReleased !== undefined ||
    item.caughtBy ||
    item.gear;

  if (!hasFishData) return null;

  return (
    <div className="flex flex-wrap gap-1 px-2 pb-2">
      {item.fishSpecies && (
        <span className="inline-flex items-center gap-0.5 bg-green-100 text-green-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
          <Fish size={9} />
          {item.fishSpecies}
        </span>
      )}
      {item.fishWeightKg !== undefined && (
        <span className="inline-flex items-center gap-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
          <Weight size={9} />
          {item.fishWeightKg.toFixed(1).replace(".", ",")} kg
        </span>
      )}
      {item.fishLengthCm !== undefined && (
        <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
          <Ruler size={9} />
          {item.fishLengthCm} cm
        </span>
      )}
      {item.caughtAndReleased && (
        <span className="inline-flex items-center gap-0.5 bg-teal-100 text-teal-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
          <RotateCcw size={9} />
          C&amp;R
        </span>
      )}
      {item.caughtBy && (
        <span className="inline-flex items-center gap-0.5 bg-violet-100 text-violet-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
          <User size={9} />
          {item.caughtBy}
        </span>
      )}
      {item.gear && (
        <span className="bg-stone-100 text-stone-600 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
          {item.gear}
        </span>
      )}
    </div>
  );
}

// ─── Image card ───────────────────────────────────────────────────────────────
function ImageCard({
  item,
  index,
  onClick,
}: {
  item: TripMedia;
  index: number;
  onClick: () => void;
}) {
  const hasFishData =
    item.fishSpecies ||
    item.fishWeightKg !== undefined ||
    item.fishLengthCm !== undefined ||
    item.caughtAndReleased !== undefined ||
    item.caughtBy ||
    item.gear;

  return (
    <div
      className={`group rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-sm
        ${hasFishData ? "flex flex-col" : ""}`}
    >
      <button
        className="relative overflow-hidden aspect-[4/3] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest-500)] photo-card"
        onClick={onClick}
        aria-label={`Öppna bild ${index + 1}: ${item.alt ?? item.caption ?? ""}`}
      >
        <Image
          src={resolveMediaUrl(item.src)}
          alt={item.alt ?? item.caption ?? `Bild ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
        {/* Caption overlay */}
        {item.caption && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-xs line-clamp-2">{item.caption}</p>
          </div>
        )}
        {/* Expand hint */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full p-1">
          <Camera size={11} className="text-white" />
        </div>
      </button>
      <FishBadges item={item} />
    </div>
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────
function VideoCard({
  item,
  index,
  onClick,
}: {
  item: TripMedia;
  index: number;
  onClick: () => void;
}) {
  return (
    <div className="group rounded-xl overflow-hidden bg-stone-900 shadow-sm flex flex-col">
      <button
        className="relative aspect-[4/3] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest-500)] overflow-hidden"
        onClick={onClick}
        aria-label={`Öppna video ${index + 1}: ${item.title ?? item.caption ?? ""}`}
      >
        {/* Poster / fallback */}
        {item.poster ? (
          <Image
            src={resolveMediaUrl(item.poster)}
            alt={item.title ?? `Video ${index + 1}`}
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        {/* Video badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          Video
        </div>
      </button>
      {/* Caption */}
      {(item.title || item.caption) && (
        <div className="px-3 py-2">
          {item.title && (
            <p className="text-xs font-medium text-stone-200 leading-tight">
              {item.title}
            </p>
          )}
          {item.caption && item.caption !== item.title && (
            <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-2">
              {item.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main gallery ─────────────────────────────────────────────────────────────
export default function MediaGallery({ media }: MediaGalleryProps) {
  const { open } = useLightbox();

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-stone-300 gap-3">
        <Camera size={40} strokeWidth={1} />
        <p className="text-sm">Inga media för den här turen.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {media.map((item, i) =>
        item.type === "video" ? (
          <VideoCard
            key={i}
            item={item}
            index={i}
            onClick={() => open(media, i)}
          />
        ) : (
          <ImageCard
            key={i}
            item={item}
            index={i}
            onClick={() => open(media, i)}
          />
        )
      )}
    </div>
  );
}
