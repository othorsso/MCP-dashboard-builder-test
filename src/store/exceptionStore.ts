// ============================================================
// Warehouse Exception Radar — Zustand Store
// ============================================================

import { create } from 'zustand';
import type {
  WarehouseException,
  ExceptionFilters,
  KpiMetrics,
  Severity,
  ProcessArea,
  ExceptionCategory,
  WarehouseId,
} from '../types/exceptions';
import { deriveExceptions } from '../data/exceptionEngine';

// ── KPI filter definitions ────────────────────────────────────────────────────
// Each entry maps a tile ID to a human label + a predicate over exceptions.
// The table shows exceptions where kpiPredicate(e) === true.
export type KpiFilterId =
  | 'total'
  | 'critical'
  | 'high'
  | 'shipments_at_risk'
  | 'avg_aging'
  | 'blocked_work'
  | 'wh24'
  | 'wh51';

export const KPI_FILTER_LABELS: Record<KpiFilterId, string> = {
  total:            'All Exceptions',
  critical:         'Critical Severity',
  high:             'High Severity',
  shipments_at_risk:'Shipments at Risk',
  avg_aging:        'Above-Average Aging',
  blocked_work:     'Blocked Work',
  wh24:             'WH24 Only',
  wh51:             'WH51 Only',
};

export const KPI_FILTER_PREDICATES: Record<KpiFilterId, (e: WarehouseException, avgAging: number) => boolean> = {
  total:            () => true,
  critical:         (e) => e.severity === 'critical',
  high:             (e) => e.severity === 'high',
  shipments_at_risk:(e) => !!(e.shipmentId && e.severity !== 'low'),
  avg_aging:        (e, avg) => e.agingHours > avg,
  blocked_work:     (e) => e.category === 'blocked_work',
  wh24:             (e) => e.warehouseId === '24',
  wh51:             (e) => e.warehouseId === '51',
};

const ALL_WAREHOUSES: WarehouseId[] = ['24', '51'];
const ALL_SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low'];
const ALL_AREAS: ProcessArea[] = ['outbound', 'inbound', 'production', 'quality', 'inventory', 'replenishment'];
const ALL_CATEGORIES: ExceptionCategory[] = [
  'blocked_work', 'stockout', 'low_stock', 'stale_work',
  'quality_hold', 'delayed_shipment', 'replenishment_delay', 'device_error',
];

const DEFAULT_FILTERS: ExceptionFilters = {
  warehouseIds: ALL_WAREHOUSES,
  severities: ALL_SEVERITIES,
  processAreas: ALL_AREAS,
  categories: ALL_CATEGORIES,
  dataSource: 'all',
  maxAgeHours: null,
};

interface ExceptionStore {
  exceptions: WarehouseException[];
  filters: ExceptionFilters;
  kpiFilter: KpiFilterId | null;
  selectedExceptionId: string | null;
  setFilters: (filters: Partial<ExceptionFilters>) => void;
  resetFilters: () => void;
  setKpiFilter: (id: KpiFilterId | null) => void;
  selectException: (id: string | null) => void;
  filteredExceptions: () => WarehouseException[];
  metrics: () => KpiMetrics;
}

export const useExceptionStore = create<ExceptionStore>((set, get) => ({
  exceptions: deriveExceptions(),
  filters: DEFAULT_FILTERS,
  kpiFilter: null,
  selectedExceptionId: null,

  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  setKpiFilter: (id) => set({ kpiFilter: id }),

  selectException: (id) => set({ selectedExceptionId: id }),

  filteredExceptions: () => {
    const { exceptions, filters, kpiFilter } = get();
    // First apply the standard filter bar
    const afterFilters = exceptions.filter((e) => {
      if (!filters.warehouseIds.includes(e.warehouseId)) return false;
      if (!filters.severities.includes(e.severity)) return false;
      if (!filters.processAreas.includes(e.processArea)) return false;
      if (!filters.categories.includes(e.category)) return false;
      if (filters.dataSource !== 'all' && e.dataSource !== filters.dataSource) return false;
      if (filters.maxAgeHours !== null && e.agingHours > filters.maxAgeHours) return false;
      return true;
    });
    // Then apply the KPI tile filter on top
    if (!kpiFilter || kpiFilter === 'total') return afterFilters;
    const avgAging =
      afterFilters.length > 0
        ? Math.round(afterFilters.reduce((s, e) => s + e.agingHours, 0) / afterFilters.length)
        : 0;
    const predicate = KPI_FILTER_PREDICATES[kpiFilter];
    return afterFilters.filter((e) => predicate(e, avgAging));
  },

  metrics: () => {
    const exceptions = get().exceptions;
    const total = exceptions.length;
    const critical = exceptions.filter((e) => e.severity === 'critical').length;
    const high = exceptions.filter((e) => e.severity === 'high').length;
    const shipmentsAtRisk = exceptions.filter((e) => e.shipmentId && e.severity !== 'low').length;
    const avgAging =
      total > 0 ? Math.round(exceptions.reduce((s, e) => s + e.agingHours, 0) / total) : 0;
    const wh24 = exceptions.filter((e) => e.warehouseId === '24').length;
    const wh51 = exceptions.filter((e) => e.warehouseId === '51').length;
    const blocked = exceptions.filter((e) => e.category === 'blocked_work').length;
    const stockouts = exceptions.filter((e) => e.category === 'stockout').length;
    const realData = exceptions.filter((e) => e.dataSource === 'real').length;
    return {
      totalExceptions: total,
      criticalCount: critical,
      highCount: high,
      shipmentsAtRisk,
      avgAgingHours: avgAging,
      wh24Count: wh24,
      wh51Count: wh51,
      blockedWorkCount: blocked,
      stockoutCount: stockouts,
      realDataCount: realData,
    };
  },
}));
