// ============================================================
// Warehouse Exception Radar — Type definitions
// ============================================================

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type ProcessArea =
  | 'outbound'
  | 'inbound'
  | 'production'
  | 'quality'
  | 'inventory'
  | 'replenishment';

export type ExceptionCategory =
  | 'blocked_work'
  | 'stockout'
  | 'low_stock'
  | 'stale_work'
  | 'quality_hold'
  | 'delayed_shipment'
  | 'replenishment_delay'
  | 'device_error';

export type WarehouseId = '24' | '51';

/** How the data behind this exception was obtained */
export type DataSource =
  | 'real'      // Directly from D365FO via MCP OData
  | 'derived'   // Calculated/inferred from real D365 data
  | 'simulated'; // Modelled / demo logic — not from live system

export interface WarehouseException {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  warehouseId: WarehouseId;
  processArea: ProcessArea;
  category: ExceptionCategory;
  /** How many hours this exception has been open */
  agingHours: number;
  impact: string;
  likelyCause: string;
  suggestedAction: string;
  /** D365 Work ID (WarehouseWorkId) if applicable */
  sourceWorkId?: string;
  /** D365 order / prod order number */
  sourceOrderNumber?: string;
  /** Item number (ItemNumber) */
  itemNumber?: string;
  itemName?: string;
  /** Shipment ID (ShipmentId) */
  shipmentId?: string;
  dataSource: DataSource;
  /** One-line explanation of where this data came from */
  dataNote: string;
  createdAt: Date;
  status: 'open' | 'in_progress' | 'monitoring';
  tags: string[];
}

export interface ExceptionFilters {
  warehouseIds: WarehouseId[];
  severities: Severity[];
  processAreas: ProcessArea[];
  categories: ExceptionCategory[];
  dataSource: DataSource | 'all';
  maxAgeHours: number | null;
}

export interface KpiMetrics {
  totalExceptions: number;
  criticalCount: number;
  highCount: number;
  shipmentsAtRisk: number;
  avgAgingHours: number;
  wh24Count: number;
  wh51Count: number;
  blockedWorkCount: number;
  stockoutCount: number;
  realDataCount: number;
}
