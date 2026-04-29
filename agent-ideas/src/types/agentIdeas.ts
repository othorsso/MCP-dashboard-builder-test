// All TypeScript types and color lookup tables for the Agent Ideas dashboard.
// Color classes use full strings (not interpolated) so Tailwind JIT can detect them.

export type Category =
  | 'Finance'
  | 'Development & Tech'
  | 'SCM & Planning'
  | 'System Administration'
  | 'Warehouse & Logistics'
  | 'Application Management'
  | 'Customer Support'
  | 'Sales'
  | 'Project Management'
  | 'Retail'
  | 'HR & Training'
  | 'Service Management'
  | 'Security & Licensing';

export const ALL_CATEGORIES: Category[] = [
  'Finance',
  'Development & Tech',
  'SCM & Planning',
  'System Administration',
  'Warehouse & Logistics',
  'Application Management',
  'Customer Support',
  'Sales',
  'Project Management',
  'Retail',
  'HR & Training',
  'Service Management',
  'Security & Licensing',
];

export interface AgentIdea {
  id: number;
  title: string;
  submitter: string;
  description: string;
  userRoles: string[];
  challenge: string;
  businessValue: string;
  comments?: string;
  category: Category;
}

// Full Tailwind class strings per category — JIT requires no dynamic interpolation
export const CATEGORY_STYLES: Record<
  Category,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    cardActiveBorder: string;
    chartColor: string;
    kpiDefaultBorder: string;
    kpiActiveBorder: string;
    kpiActiveRing: string;
    kpiActiveDot: string;
    kpiText: string;
    chipActive: string;
    chipDefault: string;
  }
> = {
  Finance: {
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    cardActiveBorder: 'border-emerald-500/60',
    chartColor: '#10b981',
    kpiDefaultBorder: 'border-emerald-500/40',
    kpiActiveBorder: 'border-emerald-400',
    kpiActiveRing: 'ring-emerald-500/30',
    kpiActiveDot: 'bg-emerald-400',
    kpiText: 'text-emerald-400',
    chipActive: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400',
  },
  'Development & Tech': {
    badgeBg: 'bg-violet-500/15',
    badgeText: 'text-violet-400',
    badgeBorder: 'border-violet-500/30',
    cardActiveBorder: 'border-violet-500/60',
    chartColor: '#8b5cf6',
    kpiDefaultBorder: 'border-violet-500/40',
    kpiActiveBorder: 'border-violet-400',
    kpiActiveRing: 'ring-violet-500/30',
    kpiActiveDot: 'bg-violet-400',
    kpiText: 'text-violet-400',
    chipActive: 'bg-violet-500/20 text-violet-300 border-violet-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-violet-500/50 hover:text-violet-400',
  },
  'SCM & Planning': {
    badgeBg: 'bg-blue-500/15',
    badgeText: 'text-blue-400',
    badgeBorder: 'border-blue-500/30',
    cardActiveBorder: 'border-blue-500/60',
    chartColor: '#3b82f6',
    kpiDefaultBorder: 'border-blue-500/40',
    kpiActiveBorder: 'border-blue-400',
    kpiActiveRing: 'ring-blue-500/30',
    kpiActiveDot: 'bg-blue-400',
    kpiText: 'text-blue-400',
    chipActive: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-blue-500/50 hover:text-blue-400',
  },
  'System Administration': {
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/30',
    cardActiveBorder: 'border-amber-500/60',
    chartColor: '#f59e0b',
    kpiDefaultBorder: 'border-amber-500/40',
    kpiActiveBorder: 'border-amber-400',
    kpiActiveRing: 'ring-amber-500/30',
    kpiActiveDot: 'bg-amber-400',
    kpiText: 'text-amber-400',
    chipActive: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-amber-500/50 hover:text-amber-400',
  },
  'Warehouse & Logistics': {
    badgeBg: 'bg-orange-500/15',
    badgeText: 'text-orange-400',
    badgeBorder: 'border-orange-500/30',
    cardActiveBorder: 'border-orange-500/60',
    chartColor: '#f97316',
    kpiDefaultBorder: 'border-orange-500/40',
    kpiActiveBorder: 'border-orange-400',
    kpiActiveRing: 'ring-orange-500/30',
    kpiActiveDot: 'bg-orange-400',
    kpiText: 'text-orange-400',
    chipActive: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-orange-500/50 hover:text-orange-400',
  },
  'Application Management': {
    badgeBg: 'bg-cyan-500/15',
    badgeText: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30',
    cardActiveBorder: 'border-cyan-500/60',
    chartColor: '#06b6d4',
    kpiDefaultBorder: 'border-cyan-500/40',
    kpiActiveBorder: 'border-cyan-400',
    kpiActiveRing: 'ring-cyan-500/30',
    kpiActiveDot: 'bg-cyan-400',
    kpiText: 'text-cyan-400',
    chipActive: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400',
  },
  'Customer Support': {
    badgeBg: 'bg-pink-500/15',
    badgeText: 'text-pink-400',
    badgeBorder: 'border-pink-500/30',
    cardActiveBorder: 'border-pink-500/60',
    chartColor: '#ec4899',
    kpiDefaultBorder: 'border-pink-500/40',
    kpiActiveBorder: 'border-pink-400',
    kpiActiveRing: 'ring-pink-500/30',
    kpiActiveDot: 'bg-pink-400',
    kpiText: 'text-pink-400',
    chipActive: 'bg-pink-500/20 text-pink-300 border-pink-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-pink-500/50 hover:text-pink-400',
  },
  Sales: {
    badgeBg: 'bg-rose-500/15',
    badgeText: 'text-rose-400',
    badgeBorder: 'border-rose-500/30',
    cardActiveBorder: 'border-rose-500/60',
    chartColor: '#f43f5e',
    kpiDefaultBorder: 'border-rose-500/40',
    kpiActiveBorder: 'border-rose-400',
    kpiActiveRing: 'ring-rose-500/30',
    kpiActiveDot: 'bg-rose-400',
    kpiText: 'text-rose-400',
    chipActive: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-rose-500/50 hover:text-rose-400',
  },
  'Project Management': {
    badgeBg: 'bg-indigo-500/15',
    badgeText: 'text-indigo-400',
    badgeBorder: 'border-indigo-500/30',
    cardActiveBorder: 'border-indigo-500/60',
    chartColor: '#6366f1',
    kpiDefaultBorder: 'border-indigo-500/40',
    kpiActiveBorder: 'border-indigo-400',
    kpiActiveRing: 'ring-indigo-500/30',
    kpiActiveDot: 'bg-indigo-400',
    kpiText: 'text-indigo-400',
    chipActive: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-indigo-500/50 hover:text-indigo-400',
  },
  Retail: {
    badgeBg: 'bg-yellow-500/15',
    badgeText: 'text-yellow-400',
    badgeBorder: 'border-yellow-500/30',
    cardActiveBorder: 'border-yellow-500/60',
    chartColor: '#eab308',
    kpiDefaultBorder: 'border-yellow-500/40',
    kpiActiveBorder: 'border-yellow-400',
    kpiActiveRing: 'ring-yellow-500/30',
    kpiActiveDot: 'bg-yellow-400',
    kpiText: 'text-yellow-400',
    chipActive: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-yellow-500/50 hover:text-yellow-400',
  },
  'HR & Training': {
    badgeBg: 'bg-teal-500/15',
    badgeText: 'text-teal-400',
    badgeBorder: 'border-teal-500/30',
    cardActiveBorder: 'border-teal-500/60',
    chartColor: '#14b8a6',
    kpiDefaultBorder: 'border-teal-500/40',
    kpiActiveBorder: 'border-teal-400',
    kpiActiveRing: 'ring-teal-500/30',
    kpiActiveDot: 'bg-teal-400',
    kpiText: 'text-teal-400',
    chipActive: 'bg-teal-500/20 text-teal-300 border-teal-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-teal-500/50 hover:text-teal-400',
  },
  'Service Management': {
    badgeBg: 'bg-lime-500/15',
    badgeText: 'text-lime-400',
    badgeBorder: 'border-lime-500/30',
    cardActiveBorder: 'border-lime-500/60',
    chartColor: '#84cc16',
    kpiDefaultBorder: 'border-lime-500/40',
    kpiActiveBorder: 'border-lime-400',
    kpiActiveRing: 'ring-lime-500/30',
    kpiActiveDot: 'bg-lime-400',
    kpiText: 'text-lime-400',
    chipActive: 'bg-lime-500/20 text-lime-300 border-lime-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-lime-500/50 hover:text-lime-400',
  },
  'Security & Licensing': {
    badgeBg: 'bg-red-500/15',
    badgeText: 'text-red-400',
    badgeBorder: 'border-red-500/30',
    cardActiveBorder: 'border-red-500/60',
    chartColor: '#ef4444',
    kpiDefaultBorder: 'border-red-500/40',
    kpiActiveBorder: 'border-red-400',
    kpiActiveRing: 'ring-red-500/30',
    kpiActiveDot: 'bg-red-400',
    kpiText: 'text-red-400',
    chipActive: 'bg-red-500/20 text-red-300 border-red-500/50',
    chipDefault: 'bg-slate-800 text-slate-400 border-slate-700 hover:border-red-500/50 hover:text-red-400',
  },
};
