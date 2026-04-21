// ============================================================
// Zustand Store — starter template
// Replace Item, Filters, KpiFilterId with your own types.
// ============================================================

import { create } from 'zustand';

// ── Types ──────────────────────────────────────────────────────────────────────
export interface Item {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  // Add your own fields here
}

export interface Filters {
  severities: Array<Item['severity']>;
  categories: string[];
}

export type KpiFilterId = 'total' | 'critical' | 'high' | 'medium_low';
// Add more KPI IDs to match your KPI cards

// ── KPI filter predicates (single source of truth) ────────────────────────────
export const KPI_FILTER_LABELS: Record<KpiFilterId, string> = {
  total:       'All Items',
  critical:    'Critical',
  high:        'High Severity',
  medium_low:  'Medium & Low',
};

export const KPI_FILTER_PREDICATES: Record<KpiFilterId, (i: Item) => boolean> = {
  total:      () => true,
  critical:   (i) => i.severity === 'critical',
  high:       (i) => i.severity === 'high',
  medium_low: (i) => i.severity === 'medium' || i.severity === 'low',
};

// ── Default state ─────────────────────────────────────────────────────────────
const DEFAULT_FILTERS: Filters = {
  severities: ['critical', 'high', 'medium', 'low'],
  categories: [], // populate with your categories
};

// ── Store interface ───────────────────────────────────────────────────────────
interface AppStore {
  items: Item[];
  filters: Filters;
  kpiFilter: KpiFilterId | null;
  selectedId: string | null;

  setFilters: (f: Partial<Filters>) => void;
  resetFilters: () => void;
  setKpiFilter: (id: KpiFilterId | null) => void;
  selectItem: (id: string | null) => void;
  filteredItems: () => Item[];
}

// ── Store ────────────────────────────────────────────────────────────────────
export const useAppStore = create<AppStore>((set, get) => ({
  items: [], // replace with: deriveItems() or STATIC_DATA
  filters: DEFAULT_FILTERS,
  kpiFilter: null,
  selectedId: null,

  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  setKpiFilter: (id) => set({ kpiFilter: id }),

  selectItem: (id) => set({ selectedId: id }),

  filteredItems: () => {
    const { items, filters, kpiFilter } = get();

    // Step 1: apply standard filters
    const base = items.filter((i) => {
      if (!filters.severities.includes(i.severity)) return false;
      if (filters.categories.length && !filters.categories.includes(i.category)) return false;
      return true;
    });

    // Step 2: apply KPI tile filter on top
    if (!kpiFilter || kpiFilter === 'total') return base;
    return base.filter((i) => KPI_FILTER_PREDICATES[kpiFilter](i));
  },
}));
