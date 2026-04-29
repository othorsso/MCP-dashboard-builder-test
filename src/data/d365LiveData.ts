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

export const MCP_SNAPSHOT_DATE = new Date('2026-04-22T08:00:00Z');
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
  // Wave 2 (very early), never started — aged > 25 days
  { workId: 'USMF-000002', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000002', waveId: 'USMF-000000002', loadId: 'USMF-000002', orderNumber: '000752', processingStarted: false },
  { workId: 'USMF-000717', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000355', waveId: 'USMF-000000486', loadId: 'USMF-000482', orderNumber: '002685', processingStarted: false },
  { workId: 'USMF-001392', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000805', waveId: 'USMF-000001461', loadId: 'USMF-001007', orderNumber: '000751', processingStarted: false },
  { workId: 'USMF-001643', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000931', waveId: 'USMF-000001514', loadId: 'USMF-001158', orderNumber: '005311', processingStarted: false },
  { workId: 'USMF-001671', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000958', waveId: 'USMF-000001539', loadId: 'USMF-001209', orderNumber: '005336', processingStarted: false },
  { workId: 'USMF-001680', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000959', waveId: 'USMF-000001540', loadId: 'USMF-001209', orderNumber: '005337', processingStarted: false },
  { workId: 'USMF-001691', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000961', waveId: 'USMF-000001542', loadId: 'USMF-001209', orderNumber: '005338', processingStarted: false },
  { workId: 'USMF-001692', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000961', waveId: 'USMF-000001542', loadId: 'USMF-001209', orderNumber: '005338', processingStarted: false },
  { workId: 'USMF-001701', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000963', waveId: 'USMF-000001544', loadId: 'USMF-001213', orderNumber: '005339', processingStarted: false },
  { workId: 'USMF-001702', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000963', waveId: 'USMF-000001544', loadId: 'USMF-001213', orderNumber: '005339', processingStarted: false },
  { workId: 'USMF-001703', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000963', waveId: 'USMF-000001544', loadId: 'USMF-001213', orderNumber: '005339', processingStarted: false },
  { workId: 'USMF-001704', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000963', waveId: 'USMF-000001544', loadId: 'USMF-001213', orderNumber: '005339', processingStarted: false },
  { workId: 'USMF-001842', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000964', waveId: 'USMF-000001545', loadId: 'USMF-001214', orderNumber: '005340', processingStarted: false },
  { workId: 'USMF-001843', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-001000', waveId: 'USMF-000001583', loadId: 'USMF-001247', orderNumber: '005366', processingStarted: false },
  { workId: 'USMF-001844', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000055', waveId: 'USMF-000000086', loadId: 'USMF-000057', orderNumber: '001460', processingStarted: false },
  { workId: 'USMF-001845', warehouseId: '24', status: 'Open', type: 'Sales',  priority: 50, blocked: false, shipmentId: 'USMF-000080', waveId: 'USMF-000000111', loadId: 'USMF-000058', orderNumber: '001461', processingStarted: false },

  // ── WH24 — Purchase Putaway (9 unstarted lines across 5 POs) ─────────────
  { workId: 'USMF-000092', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000275', processingStarted: false },
  { workId: 'USMF-000093', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000275', poolId: 'Webshop', processingStarted: false },
  { workId: 'USMF-000117', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000275', processingStarted: false },
  { workId: 'USMF-000118', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000354', processingStarted: false },
  { workId: 'USMF-000673', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00001087', processingStarted: false },
  { workId: 'USMF-000678', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000102', processingStarted: false },
  { workId: 'USMF-000904', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00001476', processingStarted: false },
  { workId: 'USMF-000905', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00001476', processingStarted: false },
  { workId: 'USMF-002342', warehouseId: '24', status: 'Open', type: 'Purch',  priority: 50, blocked: false, shipmentId: 'USMF-001255', waveId: '', loadId: 'USMF-001532', orderNumber: '00004156', processingStarted: false },

  // ── WH24 — Production Picks ───────────────────────────────────────────────
  { workId: 'USMF-001592', warehouseId: '24', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000001487', loadId: '', orderNumber: '', processingStarted: false },
  { workId: 'USMF-001743', warehouseId: '24', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000001576', loadId: '', orderNumber: 'P001513', processingStarted: false },

  // ── WH24 — Return Order ───────────────────────────────────────────────────
  { workId: 'USMF-001892', warehouseId: '24', status: 'Open', type: 'ReturnOrder', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '006412', processingStarted: false },

  // ── WH51 — Quality (1 sampling + 3 quality orders) ───────────────────────
  { workId: 'USMF-000268', warehouseId: '51', status: 'Open', type: 'QualityItemSampling', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '00000526', processingStarted: false },
  { workId: 'USMF-002144', warehouseId: '51', status: 'Open', type: 'QualityOrder',        priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '000383', processingStarted: false },
  { workId: 'USMF-002147', warehouseId: '51', status: 'Open', type: 'QualityOrder',        priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '000384', processingStarted: false },
  { workId: 'USMF-002169', warehouseId: '51', status: 'Open', type: 'QualityOrder',        priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: '000431', processingStarted: false },
  { workId: 'USMF-002317', warehouseId: '51', status: 'Open', type: 'QualityItemSampling', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: 'P002210', processingStarted: false },
  { workId: 'USMF-002467', warehouseId: '51', status: 'Open', type: 'QualityItemSampling', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: 'P002235', processingStarted: false },
  { workId: 'USMF-002542', warehouseId: '51', status: 'Open', type: 'QualityItemSampling', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: 'P000736', processingStarted: false },

  // ── WH51 — Production Picks ───────────────────────────────────────────────
  { workId: 'USMF-000344', warehouseId: '51', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000000137', loadId: '', orderNumber: 'P000611', processingStarted: false },
  { workId: 'USMF-001176', warehouseId: '51', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000000137', loadId: '', orderNumber: 'P000611', processingStarted: false },
  { workId: 'USMF-002093', warehouseId: '51', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000001737', loadId: '', orderNumber: 'P001960', processingStarted: false },
  { workId: 'USMF-002094', warehouseId: '51', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000001738', loadId: '', orderNumber: 'P001963', processingStarted: false },
  { workId: 'USMF-002192', warehouseId: '51', status: 'Open', type: 'ProdPick', priority: 50, blocked: false, shipmentId: '', waveId: 'USMF-000001811', loadId: '', orderNumber: 'P002135', processingStarted: false },

  // ── WH51 — Production Putaway ─────────────────────────────────────────────
  { workId: 'USMF-002117', warehouseId: '51', status: 'Open', type: 'ProdPut', priority: 50, blocked: false, shipmentId: '', waveId: '', loadId: '', orderNumber: 'P002086', processingStarted: false },
  // *** CRITICAL: IsWarehouseWorkBlocked=Yes + Status=Open ***
  { workId: 'USMF-002118', warehouseId: '51', status: 'Open', type: 'ProdPut', priority: 50, blocked: true,  shipmentId: '', waveId: '', loadId: '', orderNumber: 'P002087', processingStarted: false },

  // ── WH51 — Sales Outbound ─────────────────────────────────────────────────
  { workId: 'USMF-001847', warehouseId: '51', status: 'Open', type: 'Sales', priority: 50, blocked: false, shipmentId: 'USMF-000206', waveId: 'USMF-000000361', loadId: 'USMF-000308', orderNumber: '002441', processingStarted: false },
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
  { warehouseId: '24', itemNumber: 'A0001',   productName: "HDMI 6' Cables",           onHand: 42373, reserved: 581,  available: 41792 },
  { warehouseId: '24', itemNumber: 'A0002',   productName: "HDMI 12' Cables",          onHand: 10,    reserved: 10,   available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000703',  productName: 'TestComponent1',           onHand: 2,     reserved: 2,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000704',  productName: 'TestComponent2',           onHand: 22,    reserved: 8,    available: 14    },
  { warehouseId: '24', itemNumber: '000726',  productName: 'TestComponent3',           onHand: 5,     reserved: 4,    available: 1     }, // ← NEAR STOCKOUT
  { warehouseId: '24', itemNumber: '000776',  productName: 'TestComponent4-Serial',    onHand: 2,     reserved: 2,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000777',  productName: 'TestComponent5',           onHand: 5,     reserved: 2,    available: 3     },
  { warehouseId: '24', itemNumber: '000778',  productName: 'TestComponent5-SerialwCo', onHand: 1,     reserved: 1,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '000779',  productName: 'TestComponent6-CoProd',    onHand: 1,     reserved: 1,    available: 0     }, // ← STOCKOUT
  { warehouseId: '24', itemNumber: '1000',    productName: 'Surface Pro 128 GB',       onHand: 10,    reserved: 9,    available: 1     }, // ← CRITICAL LOW
  { warehouseId: '24', itemNumber: 'BR003',   productName: 'Brake part 3',             onHand: 17,    reserved: 5,    available: 12    },
  { warehouseId: '24', itemNumber: 'D0013',   productName: 'SpecialSpeaker',           onHand: 499,   reserved: 24,   available: 475   },
  { warehouseId: '24', itemNumber: 'D0023',   productName: 'Standard Speaker',         onHand: 1000,  reserved: 0,    available: 1000  },
  { warehouseId: '24', itemNumber: 'D0024',   productName: 'High End Speaker',         onHand: 1000,  reserved: 0,    available: 1000  },
  { warehouseId: '24', itemNumber: 'L0100',   productName: 'Speaker driver',           onHand: 1,     reserved: 1,    available: 0     }, // ← NEW STOCKOUT
  { warehouseId: '24', itemNumber: 'M1101',   productName: 'Foam reacting Agent',      onHand: 180,   reserved: 0,    available: 180   },
  { warehouseId: '24', itemNumber: 'M9201',   productName: 'Cone and coil assembly',   onHand: 150,   reserved: 0,    available: 150   },
  { warehouseId: '24', itemNumber: 'M9211',   productName: 'Wiring harness',           onHand: 430,   reserved: 0,    available: 430   },
  { warehouseId: '24', itemNumber: 'M9212',   productName: 'Speaker driver',           onHand: 555,   reserved: 0,    available: 555   },
  { warehouseId: '24', itemNumber: 'M9311',   productName: 'Steel bar',                onHand: 2,     reserved: 1,    available: 1     },
  { warehouseId: '24', itemNumber: 'PB001',   productName: 'PB',                       onHand: 60000, reserved: 0,    available: 60000 },
  // ── WH51 ─────────────────────────────────────────────────────────────────
  { warehouseId: '51', itemNumber: '000826',  productName: 'Test item RL/M',           onHand: 96,    reserved: 0,    available: 96    },
  { warehouseId: '51', itemNumber: '1000',    productName: 'Surface Pro 128 GB',       onHand: 2,     reserved: 0,    available: 2     },
  { warehouseId: '51', itemNumber: 'L0100',   productName: 'Speaker driver',           onHand: 1425,  reserved: 46,   available: 1379  },
  { warehouseId: '51', itemNumber: 'L0101',   productName: 'Mini-speaker',             onHand: 296,   reserved: 70,   available: 226   },
  { warehouseId: '51', itemNumber: 'M9200',   productName: 'Steel pressed frame',      onHand: 280,   reserved: 40,   available: 240   },
  { warehouseId: '51', itemNumber: 'M9201',   productName: 'Cone and coil assembly',   onHand: 195,   reserved: 55,   available: 140   },
  { warehouseId: '51', itemNumber: 'M9202',   productName: 'Dust cap',                 onHand: 280,   reserved: 41,   available: 239   },
  { warehouseId: '51', itemNumber: 'M9203',   productName: 'Ferrite cap',              onHand: 1475,  reserved: 66,   available: 1409  },
  { warehouseId: '51', itemNumber: 'M9204',   productName: 'Package box and printed manual', onHand: 2520, reserved: 111, available: 2409 },
  { warehouseId: '51', itemNumber: 'M9211',   productName: 'Wiring harness',           onHand: 500,   reserved: 0,    available: 500   },
  { warehouseId: '51', itemNumber: 'M9212',   productName: 'Speaker driver',           onHand: 625,   reserved: 0,    available: 625   },
  { warehouseId: '51', itemNumber: 'M9215',   productName: 'Speaker cabinet',          onHand: 240,   reserved: 0,    available: 240   },
];

