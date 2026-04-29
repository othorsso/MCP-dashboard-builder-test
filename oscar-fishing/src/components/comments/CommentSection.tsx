import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Comment } from "@/types/trips";
import { MessageCircle } from "lucide-react";

interface CommentSectionProps {
  tripDate: string;
  approvedComments: Comment[];
  supabaseConfigured: boolean;
}

export default function CommentSection({
  tripDate,
  approvedComments,
  supabaseConfigured,
}: CommentSectionProps) {
  return (
    <section className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-[var(--forest-500)]" />
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Kommentarer ({approvedComments.length})
        </h2>
      </div>

      <CommentList comments={approvedComments} />

      <div className="mt-8">
        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">
          Lämna en kommentar
        </h3>
        {supabaseConfigured ? (
          <CommentForm tripDate={tripDate} />
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-4 text-sm text-amber-700 dark:text-amber-300">
            ⚙️ Kommentarsfunktionen är ännu inte aktiverad. Se README för
            Supabase-konfiguration.
          </div>
        )}
      </div>
    </section>
  );
}
