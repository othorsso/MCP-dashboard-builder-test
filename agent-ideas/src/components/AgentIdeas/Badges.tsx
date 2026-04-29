// Reusable badge components for the Agent Ideas dashboard.
import type { Category } from '../../types/agentIdeas';
import { CATEGORY_STYLES } from '../../types/agentIdeas';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const s = CATEGORY_STYLES[category];
  const sizeClass = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-xs';
  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium whitespace-nowrap ${sizeClass} ${s.badgeBg} ${s.badgeText} ${s.badgeBorder}`}
    >
      {category}
    </span>
  );
}

interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium whitespace-nowrap bg-slate-700/60 text-slate-300 border border-slate-600/50">
      {role}
    </span>
  );
}
