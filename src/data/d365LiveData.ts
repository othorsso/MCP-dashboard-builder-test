// ============================================================
// Warehouse Exception Radar — Real D365FO Data Snapshot
// ============================================================
//
// DATA SOURCE: Dynamics 365 Finance & Operations (USMF company)
// FETCHED VIA: MCP server / OData API — 2026-04-17
// ENTITIES USED:
//   • WarehouseWorkHeaders  — open + blocked work for WH24 & WH51
//   • WarehousesOnHandV2    — on-hand inventory by warehouse
//   • WarehouseLocations    — location data (see warehouseData.ts)
//
// COVERAGE: Warehouse 24 (WH24) and Warehouse 51 (WH51) in USMF
// ============================================================

export const MCP_SNAPSHOT_DATE = new Date('2026-04-17T08:00:00Z');
export const MCP_COMPANY = 'USMF';
export const MCP_ENVIRONMENT = 'https://en-tier2.sandbox.operations.dynamics.com/';

// ── REAL D365 DATA: Open Work Headers ────────────────────────────────────────
// Source entity : WarehouseWorkHeaders
// Filter applied: dataAreaId='USMF', WarehouseId in ('24','51'), Status='Open'
// Extra query   : separate call for IsWarehouseWorkBlocked='Yes' (all statuses)
//
// Fields: WarehouseWorkId, WarehouseId, WarehouseWorkStatus, WarehouseWorkOrderType,
//         WarehouseWorkPriority, IsWarehouseWorkBlocked, ShipmentId,
//         WarehouseWorkPoolId, WaveId, LoadId, SourceOrderNumber,
//         WarehouseWorkProcessingStartDateTime

export interface D365WorkHeader {
  workId: string;
  warehouseId: '24' | '51';
  status: 'Open' | 'Closed' | 'Cancelled';
  type: string;
  priority: number;
  blocked: boolean;
  shipmentId: string;
  waveId: string;
  loadId: string;
  orderNumber: string;
  poolId?: string;
  /** true when ProcessingStartDateTime != 1900-01-01 */
  processingStarted: boolean;
}

export const OPEN_WORK_HEADERS: D365WorkHeader[] = [
  // ── WH24 — Sales Outbound ────────────────────────────────────────────────
  // Wave 2 (very early), never started — shipment + load USMF-000002
  { workId: 'USMF-000002', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000002', waveId: 'USMF-000000002', loadId: 'USMF-000002', orderNumber: '000752', processingStarted: false },
  // Later sales wave, also unstarted — shipment USMF-000355, load USMF-000482
  { workId: 'USMF-000717', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000355', waveId: 'USMF-000000486', loadId: 'USMF-000482', orderNumber: '',       processingStarted: false },

  // ── WH24 — Purchase Putaway (6 unstarted lines) ──────────────────────────
  { workId: 'USMF-000092', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000275', processingStarted: false },
  { workId: 'USMF-000093', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000275', poolId: 'Webshop', processingStarted: false },
  { workId: 'USMF-000117', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000275', processingStarted: false },
  { workId: 'USMF-000118', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000354', processingStarted: false },
  { workId: 'USMF-000673', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00001087', processingStarted: false },
  { workId: 'USMF-000678', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000102', processingStarted: false },

  // ── WH51 — Production ────────────────────────────────────────────────────
  // Quality item sampling — goods held pending QC for PO 00000526
  { workId: 'USMF-000268', warehouseId: '51', status: 'Open', type: 'QualityItemSampling', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000526', processingStarted: false },
  // Production component pick for P000611
  { workId: 'USMF-000344', warehouseId: '51', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000000137', loadId: '', orderNumber: 'P000611', processingStarted: false },

  // ── WH51 — BLOCKED Open Work ─────────────────────────────────────────────
  // *** CRITICAL: IsWarehouseWorkBlocked=Yes + Status=Open ***
  // Finished goods for P002087 cannot be put away — production putaway blocked
  { workId: 'USMF-002118', warehouseId: '51', status: 'Open', type: 'ProdPut', priority: 50, blocked: true, shipmentId: '', waveId: '', loadId: '', orderNumber: 'P002087', processingStarted: false },
];

// ── REAL D365 DATA: On-Hand Inventory ────────────────────────────────────────
// Source entity : WarehousesOnHandV2
// Filter applied: dataAreaId='USMF', InventoryWarehouseId in ('24','51')
// Selected items: those with notable reservation / stockout conditions
// (Full result set contained 50+ rows; only relevant rows listed here)

export interface D365OnHand {
  warehouseId: '24' | '51';
  itemNumber: string;
  productName: string;
  onHand: number;
  reserved: number;
  available: number;
}

export const ON_HAND_INVENTORY: D365OnHand[] = [
  // ── WH24 ─────────────────────────────────────────────────────────────────
  { warehouseId: '24', itemNumber: 'A0001', productName: "HDMI 6' Cables",           onHand: 42373, reserved: 581,  available: 41792 },
  { warehouseId: '24', itemNumber: 'A0002', productName: "HDMI 12' Cables",          onHand: 10,    reserved: 10,   available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000703', productName: 'TestComponent1',          onHand: 2,     reserved: 2,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000704', productName: 'TestComponent2',          onHand: 22,    reserved: 8,    available: 14    },
  { warehouseId: '24', itemNumber: '000726', productName: 'TestComponent3',          onHand: 5,     reserved: 4,    available: 1     }, // ← NEAR STOCKOUT
  { warehouseId: '24', itemNumber: '000776', productName: 'TestComponent4-Serial',   onHand: 2,     reserved: 2,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000777', productName: 'TestComponent5',          onHand: 5,     reserved: 2,    available: 3     },
  { warehouseId: '24', itemNumber: '000778', productName: 'TestComponent5-SerialwCo',onHand: 1,     reserved: 1,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000779', productName: 'TestComponent6-CoProd',   onHand: 1,     reserved: 1,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '1000',   productName: 'Surface Pro 128 GB',      onHand: 10,    reserved: 9,    available: 1     }, // ← CRITICAL LOW
  { warehouseId: '24', itemNumber: 'BR003',  productName: 'Brake part 3',            onHand: 17,    reserved: 5,    available: 12    },
  { warehouseId: '24', itemNumber: 'D0013',  productName: 'SpecialSpeaker',          onHand: 499,   reserved: 24,   available: 475   },
  { warehouseId: '24', itemNumber: 'D0023',  productName: 'Standard Speaker',        onHand: 1000,  reserved: 0,    available: 1000  },
  { warehouseId: '24', itemNumber: 'D0024',  productName: 'High End Speaker',        onHand: 1000,  reserved: 0,    available: 1000  },
  // ── WH51 ─────────────────────────────────────────────────────────────────
  { warehouseId: '51', itemNumber: '000826', productName: 'Test item RL/M',          onHand: 96,    reserved: 0,    available: 96    },
  { warehouseId: '51', itemNumber: '1000',   productName: 'Surface Pro 128 GB',      onHand: 2,     reserved: 0,    available: 2     },
  { warehouseId: '51', itemNumber: 'D0004',  productName: 'HighEndSpeaker',          onHand: 0,     reserved: 0,    available: 0     },
  { warehouseId: '51', itemNumber: 'D0008',  productName: 'Licensed High End Speaker',onHand: 0,    reserved: 0,    available: 0     },
];
