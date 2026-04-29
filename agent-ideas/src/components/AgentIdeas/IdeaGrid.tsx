// The main grid of idea cards, with empty state and results counter.
import { useAgentIdeasStore } from '../../store/agentIdeasStore';
import { AGENT_IDEAS } from '../../data/agentIdeasData';
import IdeaCard from './IdeaCard';
import { SearchX } from 'lucide-react';

interface IdeaGridProps {
  /** When true, the detail panel is visible — reduce columns to make room */
  panelOpen: boolean;
}

export default function IdeaGrid({ panelOpen }: IdeaGridProps) {
  const filteredIdeas = useAgentIdeasStore((s) => s.filteredIdeas());
  const selectedId = useAgentIdeasStore((s) => s.selectedId);
  const selectIdea = useAgentIdeasStore((s) => s.selectIdea);
  const clearFilters = useAgentIdeasStore((s) => s.clearFilters);

  const total = AGENT_IDEAS.length;
  const shown = filteredIdeas.length;

  const gridCols = panelOpen
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';

  return (
    <div>
      {/* Results counter */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">
          {shown === total ? (
            <span>Visar <span className="text-white font-medium">{total}</span> idéer</span>
          ) : (
            <span>
              Visar <span className="text-white font-medium">{shown}</span> av{' '}
              <span className="text-slate-300">{total}</span> idéer
            </span>
          )}
        </p>
      </div>

      {/* Empty state */}
      {filteredIdeas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX size={40} className="text-slate-700 mb-4" />
          <p className="text-slate-400 text-sm font-medium mb-1">Inga idéer hittades</p>
          <p className="text-slate-600 text-xs mb-4">Prova att ändra söktermen eller filtren</p>
          <button
            onClick={clearFilters}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          >
            Rensa alla filter
          </button>
        </div>
      )}

      {/* Cards grid */}
      {filteredIdeas.length > 0 && (
        <div className={`grid gap-4 ${gridCols}`}>
          {filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              isSelected={idea.id === selectedId}
              onSelect={() => selectIdea(idea.id === selectedId ? null : idea.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
