/**
 * AdPlaceholder — shows a styled placeholder until Google AdSense is configured.
 *
 * Usage:
 *   <AdPlaceholder variant="banner" className="max-w-6xl mx-auto px-4 mt-8" />
 *
 * When you're ready to activate real ads:
 * 1. Set adsEnabled = true in src/config/ads.ts
 * 2. Add your publisher ID and slot IDs via environment variables
 * 3. Replace the placeholder content below with the real <ins> AdSense tag
 *    (or use a library like next/script to load the AdSense script globally)
 *
 * See src/config/ads.ts for full setup instructions.
 */

interface AdPlaceholderProps {
  /** "banner" = wide horizontal strip between sections | "sidebar" = tall sidebar unit */
  variant?: "banner" | "sidebar";
  className?: string;
}

export default function AdPlaceholder({
  variant = "banner",
  className = "",
}: AdPlaceholderProps) {
  if (variant === "sidebar") {
    return (
      <div className={className} aria-label="Annonsplats" role="complementary">
        <div
          className="w-full rounded-2xl border border-dashed border-stone-200 dark:border-white/10 bg-stone-50/60 dark:bg-white/[0.02] flex flex-col items-center justify-center gap-3 p-5 text-center"
          style={{ minHeight: "250px" }}
        >
          <span className="text-2xl" aria-hidden="true">📣</span>
          <div>
            <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
              Annonsplats
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-600 mt-1 max-w-[160px]">
              Sidobanner via Google AdSense
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={className} aria-label="Annonsplats" role="complementary">
        <div
          className="w-full rounded-2xl border border-dashed border-stone-200 dark:border-white/10 bg-stone-50/60 dark:bg-white/[0.02] flex flex-col sm:flex-row items-center justify-center gap-2 py-5 px-6 text-center"
          style={{ minHeight: "80px" }}
        >
          <span className="text-lg" aria-hidden="true">📣</span>
          <div>
            <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
              Annonsplats
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-600 mt-0.5">
              Här kan Google AdSense eller affiliate-annonser visas när det är aktiverat.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
