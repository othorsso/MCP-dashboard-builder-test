import { Comment } from "@/types/trips";
import { formatDateSv } from "@/lib/utils";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-stone-400 italic">
        Inga kommentarer ännu. Var den första!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li
          key={c.id}
          className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm text-[var(--foreground)]">
              {/* Plain text — never render as HTML */}
              {c.name}
            </span>
            <time
              dateTime={c.createdAt}
              className="text-xs text-stone-400"
            >
              {formatDateSv(c.createdAt.slice(0, 10))}
            </time>
          </div>
          {/* Comment body — rendered as plain text only */}
          <p className="text-sm text-stone-600 dark:text-stone-300 whitespace-pre-wrap">
            {c.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}
