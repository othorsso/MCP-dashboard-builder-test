/**
 * ─── Media URL resolution ─────────────────────────────────────────────────────
 *
 * By default, media files are served from /public/media/ (local).
 * When NEXT_PUBLIC_MEDIA_BASE_URL is set, that base URL is prepended
 * instead — enabling a zero-code migration to Cloudflare R2 (or any CDN).
 *
 * Local (default):
 *   /media/2026/04/28/gadda.jpg  →  /media/2026/04/28/gadda.jpg
 *
 * With R2 (set NEXT_PUBLIC_MEDIA_BASE_URL=https://pub-xxx.r2.dev):
 *   /media/2026/04/28/gadda.jpg  →  https://pub-xxx.r2.dev/2026/04/28/gadda.jpg
 *
 * The /media prefix is stripped when an external base URL is configured,
 * so the R2 bucket should mirror the path structure starting from YYYY/MM/DD/.
 */
const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "";

export function resolveMediaUrl(src: string | undefined): string {
  if (!src) return "";
  if (!MEDIA_BASE) return src; // local: serve from /public
  // Strip leading /media prefix and prepend R2/CDN base URL
  return `${MEDIA_BASE}${src.replace(/^\/media/, "")}`;
}
