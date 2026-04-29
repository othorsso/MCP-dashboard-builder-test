// Detail panel shown on the right when an idea is selected.
// Displays the full content of the selected idea row.
import { useAgentIdeasStore } from '../../store/agentIdeasStore';
import { AGENT_IDEAS } from '../../data/agentIdeasData';
import { CATEGORY_STYLES } from '../../types/agentIdeas';
import { CategoryBadge, RoleBadge } from './Badges';
import { X, User, Users, AlertCircle, TrendingUp, FileText, MessageSquare } from 'lucide-react';

function isGroup(submitter: string) {
  return submitter.toLowerCase().includes('forum');
}

function Section({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-slate-500">{icon}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

export default function DetailPanel() {
  const selectedId = useAgentIdeasStore((s) => s.selectedId);
  const selectIdea = useAgentIdeasStore((s) => s.selectIdea);

  if (!selectedId) return null;

  const idea = AGENT_IDEAS.find((i) => i.id === selectedId);
  if (!idea) return null;

  const s = CATEGORY_STYLES[idea.category];

  return (
    <div className={`rounded-xl border bg-slate-900 overflow-hidden ${s.cardActiveBorder}`}>
      {/* Panel header */}
      <div className="flex items-start justify-between gap-3 p-5 border-b border-slate-800">
        <div className="flex-1 min-w-0">
          <CategoryBadge category={idea.category} size="sm" />
          <h2 className="mt-2 text-lg font-bold text-white leading-snug">{idea.title}</h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            {isGroup(idea.submitter) ? (
              <Users size={12} className="text-slate-500 flex-shrink-0" />
            ) : (
              <User size={12} className="text-slate-500 flex-shrink-0" />
            )}
            <span className="text-xs text-slate-500">{idea.submitter}</span>
            <span className="text-slate-700 text-xs">·</span>
            <span className="text-xs text-slate-600 font-mono">#{idea.id}</span>
          </div>
        </div>
        <button
          onClick={() => selectIdea(null)}
          className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Stäng"
        >
          <X size={16} />
        </button>
      </div>

      {/* Panel body */}
      <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(100vh-280px)]">
        {/* Description */}
        <Section icon={<FileText size={13} />} label="Beskrivning">
          {idea.description}
        </Section>

        {/* Challenge */}
        <Section icon={<AlertCircle size={13} />} label="Utmaning">
          <span className="italic text-slate-400">{idea.challenge}</span>
        </Section>

        {/* Business value */}
        <Section icon={<TrendingUp size={13} />} label="Affärsnytta">
          <span className={`font-medium ${s.kpiText}`}>{idea.businessValue}</span>
        </Section>

        {/* User roles */}
        <Section icon={<User size={13} />} label="Användarroll">
          <div className="flex flex-wrap gap-1.5 mt-1">
            {idea.userRoles.map((role) => (
              <RoleBadge key={role} role={role} />
            ))}
          </div>
        </Section>

        {/* Comments (optional) */}
        {idea.comments && (
          <Section icon={<MessageSquare size={13} />} label="Kommentarer">
            <span className="text-slate-400">{idea.comments}</span>
          </Section>
        )}
      </div>
    </div>
  );
}
