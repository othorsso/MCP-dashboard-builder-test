import { getTripByDate } from "@/data/trips";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import TripDetail from "@/components/trip/TripDetail";
import MediaGallery from "@/components/gallery/MediaGallery";
import Lightbox from "@/components/gallery/Lightbox";
import CommentSection from "@/components/comments/CommentSection";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Comment } from "@/types/trips";

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const trip = getTripByDate(date);
  if (!trip) return { title: "Tur hittades inte" };
  return {
    title: `${trip.title} – Oscar gillar natur och fiske`,
    description: trip.summary.slice(0, 160),
    openGraph: {
      title: trip.title,
      description: trip.summary.slice(0, 160),
      images: trip.media
          .filter((m) => m.type === "image" && m.src)
          .slice(0, 1)
          .map((m) => ({ url: m.src, alt: m.alt ?? trip.title })),
    },
  };
}

async function getApprovedComments(tripDate: string): Promise<Comment[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("id, tripDate: trip_date, name, comment, status, createdAt: created_at")
      .eq("trip_date", tripDate)
      .eq("status", "approved")
      .order("created_at", { ascending: true });
    if (error) return [];
    return (data ?? []) as Comment[];
  } catch {
    return [];
  }
}

export default async function TripPage({ params }: Props) {
  const { date } = await params;
  const trip = getTripByDate(date);
  if (!trip) notFound();

  const approvedComments = await getApprovedComments(date);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <TripDetail trip={trip} />
      <MediaGallery media={trip.media} />
      <Lightbox />
      <CommentSection
        tripDate={date}
        approvedComments={approvedComments}
        supabaseConfigured={supabaseConfigured}
      />
    </div>
  );
}
