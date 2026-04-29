// Filter bar: text search + category chip filters + reset button.
import { Search, X } from 'lucide-react';
import { useAgentIdeasStore } from '../../store/agentIdeasStore';
import { ALL_CATEGORIES, CATEGORY_STYLES } from '../../types/agentIdeas';
import type { Category } from '../../types/agentIdeas';
import { AGENT_IDEAS } from '../../data/agentIdeasData';

// Pre-compute count per category for display in chips
const COUNTS = ALL_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
  acc[cat] = AGENT_IDEAS.filter((i) => i.category === cat).length;
  return acc;
}, {});

export default function FilterBar() {
  const searchQuery = useAgentIdeasStore((s) => s.searchQuery);
  const selectedCategories = useAgentIdeasStore((s) => s.selectedCategories);
  const setSearchQuery = useAgentIdeasStore((s) => s.setSearchQuery);
  const toggleCategory = useAgentIdeasStore((s) => s.toggleCategory);
  const clearFilters = useAgentIdeasStore((s) => s.clearFilters);

  const hasFilters = searchQuery.trim().length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-3">
      {/* Search + reset row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Sök titel, beskrivning, utmaning, inlämmare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-9 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors whitespace-nowrap"
          >
            <X size={13} />
            Rensa filter
          </button>
        )}
      </div>

      {/* Category chip filters */}
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((cat: Category) => {
          const isActive = selectedCategories.includes(cat);
          const s = CATEGORY_STYLES[cat];
          const count = COUNTS[cat] ?? 0;
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150 whitespace-nowrap ${
                isActive ? s.chipActive : s.chipDefault
              }`}
            >
              {cat}
              <span className="opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
