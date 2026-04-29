"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLightbox } from "@/store/appStore";
import { TripMedia } from "@/types/trips";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import { X, ChevronLeft, ChevronRight, Fish, Weight, Ruler, RotateCcw, User } from "lucide-react";

// ─── Fish metadata shown inside the lightbox ──────────────────────────────────
function LightboxFishBadges({ item }: { item: TripMedia }) {
  const hasFishData =
    item.fishSpecies ||
    item.fishWeightKg !== undefined ||
    item.fishLengthCm !== undefined ||
    item.caughtAndReleased ||
    item.caughtBy ||
    item.gear;

  if (!hasFishData) return null;

  return (
    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
      {item.fishSpecies && (
        <span className="inline-flex items-center gap-1 bg-green-900/60 text-green-300 text-xs font-semibold px-2 py-0.5 rounded-full">
          <Fish size={10} /> {item.fishSpecies}
        </span>
      )}
      {item.fishWeightKg !== undefined && (
        <span className="inline-flex items-center gap-1 bg-blue-900/60 text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">
          <Weight size={10} /> {item.fishWeightKg.toFixed(1).replace(".", ",")} kg
        </span>
      )}
      {item.fishLengthCm !== undefined && (
        <span className="inline-flex items-center gap-1 bg-amber-900/60 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full">
          <Ruler size={10} /> {item.fishLengthCm} cm
        </span>
      )}
      {item.caughtAndReleased && (
        <span className="inline-flex items-center gap-1 bg-teal-900/60 text-teal-300 text-xs font-semibold px-2 py-0.5 rounded-full">
          <RotateCcw size={10} /> Catch &amp; Release
        </span>
      )}
      {item.caughtBy && (
        <span className="inline-flex items-center gap-1 bg-violet-900/60 text-violet-300 text-xs font-semibold px-2 py-0.5 rounded-full">
          <User size={10} /> {item.caughtBy}
        </span>
      )}
      {item.gear && (
        <span className="bg-stone-700/80 text-stone-300 text-xs font-medium px-2 py-0.5 rounded-full">
          {item.gear}
        </span>
      )}
    </div>
  );
}

export default function Lightbox() {
  const { isOpen, items, currentIndex, close, next, prev } = useLightbox();
  const item = items[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close, next, prev]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Pause video when navigating away or closing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentIndex, isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 lightbox-backdrop"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Medievisare"
    >
      {/* ── Media area ── */}
      <div
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          // ── Video player ──
          <video
            ref={videoRef}
            src={resolveMediaUrl(item.src)}
            poster={item.poster ? resolveMediaUrl(item.poster) : undefined}
            controls
            playsInline
            muted={false}
            className="w-full max-h-[70vh] rounded-xl bg-black"
            aria-label={item.title ?? item.caption ?? "Video"}
          />
        ) : (
          // ── Image ──
          <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:max-h-[70vh]">
            <Image
              src={resolveMediaUrl(item.src)}
              alt={item.alt ?? item.caption ?? `Bild ${currentIndex + 1}`}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 1200px) 100vw, 80vw"
              priority
            />
          </div>
        )}
      </div>

      {/* ── Caption + fish metadata ── */}
      {(item.caption || item.title || item.fishSpecies) && (
        <div
          className="mt-3 text-center px-4 max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {(item.caption || item.title) && (
            <p className="text-white/80 text-sm">
              {item.type === "video" ? item.title : item.caption}
            </p>
          )}
          <LightboxFishBadges item={item} />
        </div>
      )}

      {/* ── Counter ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
        {item.type === "video" ? "🎬" : "📷"} {currentIndex + 1} / {items.length}
      </div>

      {/* ── Close ── */}
      <button
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
        onClick={close}
        aria-label="Stäng"
      >
        <X size={20} />
      </button>

      {/* ── Prev ── */}
      {items.length > 1 && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Föregående"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* ── Next ── */}
      {items.length > 1 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Nästa"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

