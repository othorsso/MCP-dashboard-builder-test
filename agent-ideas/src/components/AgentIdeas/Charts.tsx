// Charts section: ideas by category (horizontal bar) + top contributors (horizontal bar).
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AGENT_IDEAS } from '../../data/agentIdeasData';
import { ALL_CATEGORIES, CATEGORY_STYLES } from '../../types/agentIdeas';
import type { Category } from '../../types/agentIdeas';
import { useAgentIdeasStore } from '../../store/agentIdeasStore';

const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 8,
    fontSize: 12,
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
  },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#e2e8f0' },
};

// Ideas per category, sorted descending
const categoryData = ALL_CATEGORIES.map((cat: Category) => ({
  name: cat,
  count: AGENT_IDEAS.filter((i) => i.category === cat).length,
  color: CATEGORY_STYLES[cat].chartColor,
}))
  .filter((d) => d.count > 0)
  .sort((a, b) => b.count - a.count);

// Top 10 contributors
const submitterMap = AGENT_IDEAS.reduce<Record<string, number>>((acc, idea) => {
  acc[idea.submitter] = (acc[idea.submitter] ?? 0) + 1;
  return acc;
}, {});

const submitterData = Object.entries(submitterMap)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

export default function Charts() {
  const setCategories = useAgentIdeasStore((s) => s.setCategories);
  const selectedCategories = useAgentIdeasStore((s) => s.selectedCategories);

  // Uses 'any' to bypass recharts BarMouseEvent parameter type variance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCategoryBarClick(entry: any) {
    const name: string | undefined = entry?.name;
    if (!name) return;
    const cat = name as Category;
    const isActive = selectedCategories.length === 1 && selectedCategories[0] === cat;
    setCategories(isActive ? [] : [cat]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ideas by category */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">Idéer per kategori</h3>
        <p className="text-xs text-slate-500 mb-4">Klicka på en stapel för att filtrera</p>
        <ResponsiveContainer width="100%" height={390}>
          <BarChart
            layout="vertical"
            data={categoryData}
            margin={{ left: 0, right: 24, top: 4, bottom: 4 }}
          >
            <XAxis
              type="number"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              interval={0}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE.contentStyle}
              labelStyle={TOOLTIP_STYLE.labelStyle}
              itemStyle={TOOLTIP_STYLE.itemStyle}
              cursor={{ fill: 'rgba(148, 163, 184, 0.06)' }}
              formatter={(value) => [value, 'Idéer']}
            />
            <Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
              onClick={handleCategoryBarClick}
              style={{ cursor: 'pointer' }}
            >
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top contributors */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">Top bidragsgivare</h3>
        <p className="text-xs text-slate-500 mb-4">Antal inlämnade idéer per person / forum</p>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart
            layout="vertical"
            data={submitterData}
            margin={{ left: 0, right: 24, top: 4, bottom: 4 }}
          >
            <XAxis
              type="number"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE.contentStyle}
              labelStyle={TOOLTIP_STYLE.labelStyle}
              itemStyle={TOOLTIP_STYLE.itemStyle}
              cursor={{ fill: 'rgba(148, 163, 184, 0.06)' }}
              formatter={(value) => [value, 'Idéer']}
            />
            <Bar dataKey="count" fill="#6366f1" fillOpacity={0.85} radius={[0, 4, 4, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
