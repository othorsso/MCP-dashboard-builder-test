// Card component representing a single agent idea.
import type { AgentIdea } from '../../types/agentIdeas';
import { CATEGORY_STYLES } from '../../types/agentIdeas';
import { CategoryBadge, RoleBadge } from './Badges';
import { User, AlertCircle, TrendingUp, Users } from 'lucide-react';

interface IdeaCardProps {
  idea: AgentIdea;
  isSelected: boolean;
  onSelect: () => void;
}

// Whether a submitter name represents a group/forum rather than an individual
function isGroup(submitter: string) {
  return submitter.toLowerCase().includes('forum');
}

export default function IdeaCard({ idea, isSelected, onSelect }: IdeaCardProps) {
  const s = CATEGORY_STYLES[idea.category];

  return (
    <button
      onClick={onSelect}
      className={`text-left w-full rounded-xl p-5 border bg-slate-900 transition-all duration-150 focus:outline-none hover:bg-slate-800/80 ${
        isSelected
          ? `${s.cardActiveBorder} ring-1 ring-current/20 bg-slate-800/80`
          : 'border-slate-800 hover:border-slate-600'
      }`}
    >
      {/* Header: ID + category badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <CategoryBadge category={idea.category} />
        <span className="text-xs text-slate-600 font-mono flex-shrink-0">#{idea.id}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white leading-snug mb-2 line-clamp-2">
        {idea.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 line-clamp-2 mb-3 leading-relaxed">
        {idea.description}
      </p>

      {/* Challenge */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-1">
          <AlertCircle size={11} className="text-slate-500 flex-shrink-0" />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Utmaning</span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic">{idea.challenge}</p>
      </div>

      {/* Business value */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp size={11} className="text-slate-500 flex-shrink-0" />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Affärsnytta</span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">{idea.businessValue}</p>
      </div>

      {/* User roles — show up to 3 */}
      {idea.userRoles.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {idea.userRoles.slice(0, 3).map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
          {idea.userRoles.length > 3 && (
            <span className="text-xs text-slate-600">+{idea.userRoles.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer: submitter */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
        {isGroup(idea.submitter) ? (
          <Users size={12} className="text-slate-600 flex-shrink-0" />
        ) : (
          <User size={12} className="text-slate-600 flex-shrink-0" />
        )}
        <span className="text-xs text-slate-500 truncate">{idea.submitter}</span>
      </div>
    </button>
  );
}
