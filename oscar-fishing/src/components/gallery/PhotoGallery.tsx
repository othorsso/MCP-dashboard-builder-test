"use client";

import Image from "next/image";
import { TripPhoto } from "@/types/trips";
import { useLightbox } from "@/store/appStore";
import { Camera } from "lucide-react";

interface PhotoGalleryProps {
  photos: TripPhoto[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const { open } = useLightbox();

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-stone-300 gap-3">
        <Camera size={40} strokeWidth={1} />
        <p className="text-sm">Inga bilder för den här turen.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {photos.map((photo, i) => (
        <button
          key={i}
          className="group relative overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800 aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest-500)] photo-card"
          onClick={() => open(photos, i)}
          aria-label={`Öppna bild: ${photo.alt}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt ?? photo.caption ?? `Bild ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
          {/* Caption overlay */}
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs line-clamp-2">{photo.caption}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
