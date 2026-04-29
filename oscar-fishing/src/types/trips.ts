// ─── Media types ──────────────────────────────────────────────────────────────

export type MediaType = "image" | "video";

export interface TripMedia {
  type: MediaType;
  /** Path relative to /public, e.g. "/media/2026/04/28/gadda.jpg" */
  src: string;
  /** Image alt text (or video description). Required for images; good practice for videos. */
  alt?: string;
  /** Video title (used for videos, shown in player/lightbox) */
  title?: string;
  /** Short caption shown below or in overlay */
  caption?: string;
  /** Poster/thumbnail image for videos */
  poster?: string;

  // ── Fish metadata (all optional) ──────────────────────────────────────────
  /** Fish species, e.g. "Gädda" */
  fishSpecies?: string;
  /** Fish weight in kilograms, e.g. 4.2 */
  fishWeightKg?: number;
  /** Fish length in centimetres, e.g. 88 */
  fishLengthCm?: number;
  /** true = fish was returned to the water */
  caughtAndReleased?: boolean;
  /** Name of the person who caught the fish, e.g. "Oscar", "Idil" */
  caughtBy?: string;
  /** Tackle/method, e.g. "Jerkbait", "Flugfiske", "Pimpel" */
  gear?: string;
  /** Optional location override for this specific media item */
  location?: string;
  area?: string;
}

/** @deprecated Use TripMedia instead */
export type TripPhoto = TripMedia;

export interface TripCoordinates {
  lat: number;
  lng: number;
  /** When true, coordinates are approximate – never expose exact spot */
  approximate: boolean;
}

export type TripTag =
  | "Fiske"
  | "Gädda"
  | "Abborre"
  | "Gös"
  | "Öring"
  | "Sjö"
  | "Å"
  | "Hav"
  | "Skog"
  | "Vandring"
  | "Båt"
  | "Vinterfiske"
  | "Sommar"
  | "Höst"
  | "Vinter"
  | "Vår"
  | "Solnedgång"
  | "Natur"
  | string;

export interface Trip {
  /** ISO date string, e.g. "2026-04-28" */
  date: string;
  title: string;
  /** General region shown publicly, e.g. "Västra Götaland" (optional – omit when unknown) */
  location?: string;
  /** Optional neighbourhood hint, e.g. "Nära Göteborg" */
  area?: string;
  /** Swedish short summary text */
  summary: string;
  tags: TripTag[];
  /** All media items for this trip (images and/or videos) */
  media: TripMedia[];
  /** Optional – always use approximate: true for fishing spots */
  coordinates?: TripCoordinates;
  /** Optional – overrides the first image as the featured/cover */
  coverPhoto?: string;
}

// ─── Comment types ────────────────────────────────────────────────────────────

export type CommentStatus = "pending" | "approved";

export interface Comment {
  id: string;
  tripDate: string;
  name: string;
  comment: string;
  status: CommentStatus;
  createdAt: string;
}

export interface CommentSubmission {
  tripDate: string;
  name: string;
  comment: string;
  /** Honeypot – must be empty */
  website?: string;
}

// ─── Derived helpers ──────────────────────────────────────────────────────────

export interface ArchiveYear {
  year: number;
  months: ArchiveMonth[];
}

export interface ArchiveMonth {
  year: number;
  month: number; // 1-12
  trips: Trip[];
}
