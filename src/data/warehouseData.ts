/**
 * Static snapshot of USMF Warehouse 24 locations from D365.
 * Locations fetched 2026-04-16 via WarehouseLocations OData entity.
 * On-hand quantities from InventoryOnHandForAI, distributed across locations.
 *
 * Coordinate convention (matches WarehouseViewer position mapping):
 *   Three.js position = [location.x, location.z, location.y]
 *   → location.x  = column (left/right)
 *   → location.y  = row    (depth, front-back)
 *   → location.z  = shelf height (0 = flat floor)
 */

import type { WarehouseLocation } from '../types/warehouse';

const SNAP = new Date('2026-04-16T08:00:00Z');

export const WAREHOUSE_24_LOCATIONS: WarehouseLocation[] = [
  // ── DOCKING / RECEIVING (left column, x = -2) ────────────────────────────
  { locationId: 'BAYDOOR',   name: 'BAYDOOR',   aisle: 0, rack: 0, shelf: 0, bin: 0, x: -2, y: 0,  z: 0, capacity: 1000, currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'RECV',      name: 'RECV',       aisle: 0, rack: 0, shelf: 0, bin: 0, x: -2, y: 2,  z: 0, capacity: 500,  currentQuantity: 0,     lastUpdated: SNAP },

  // ── STAGING / PACKING (left column, x = -2) ──────────────────────────────
  { locationId: 'STAGE',     name: 'STAGE',      aisle: 0, rack: 0, shelf: 0, bin: 0, x: -2, y: 8,  z: 0, capacity: 500,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'PACK',      name: 'PACK',        aisle: 0, rack: 0, shelf: 0, bin: 0, x: -2, y: 10, z: 0, capacity: 500,  currentQuantity: 0,     lastUpdated: SNAP },

  // ── BULK STORAGE (3 × 3 grid, x = 2..6, y = 2..6) ───────────────────────
  // On-hand: PB001 60,000 | D0023 1,000 | D0024 1,000 | M9211 430 | M9212 554 | M9201 130 | M1101 180
  { locationId: 'BULK-001',  name: 'BULK-001',   aisle: 1, rack: 1, shelf: 0, bin: 0, x: 2, y: 2,  z: 0, capacity: 25000, currentQuantity: 20000, itemNumber: 'PB001',  lastUpdated: SNAP },
  { locationId: 'BULK-002',  name: 'BULK-002',   aisle: 1, rack: 2, shelf: 0, bin: 0, x: 4, y: 2,  z: 0, capacity: 25000, currentQuantity: 20000, itemNumber: 'PB001',  lastUpdated: SNAP },
  { locationId: 'BULK-003',  name: 'BULK-003',   aisle: 1, rack: 3, shelf: 0, bin: 0, x: 6, y: 2,  z: 0, capacity: 25000, currentQuantity: 20000, itemNumber: 'PB001',  lastUpdated: SNAP },
  { locationId: 'BULK-004',  name: 'BULK-004',   aisle: 2, rack: 1, shelf: 0, bin: 0, x: 2, y: 4,  z: 0, capacity: 2000,  currentQuantity: 1000,  itemNumber: 'D0023',  lastUpdated: SNAP },
  { locationId: 'BULK-005',  name: 'BULK-005',   aisle: 2, rack: 2, shelf: 0, bin: 0, x: 4, y: 4,  z: 0, capacity: 2000,  currentQuantity: 1000,  itemNumber: 'D0024',  lastUpdated: SNAP },
  { locationId: 'BULK-006',  name: 'BULK-006',   aisle: 2, rack: 3, shelf: 0, bin: 0, x: 6, y: 4,  z: 0, capacity: 1000,  currentQuantity: 430,   itemNumber: 'M9211',  lastUpdated: SNAP },
  { locationId: 'BULK-007',  name: 'BULK-007',   aisle: 3, rack: 1, shelf: 0, bin: 0, x: 2, y: 6,  z: 0, capacity: 1000,  currentQuantity: 554,   itemNumber: 'M9212',  lastUpdated: SNAP },
  { locationId: 'BULK-008',  name: 'BULK-008',   aisle: 3, rack: 2, shelf: 0, bin: 0, x: 4, y: 6,  z: 0, capacity: 500,   currentQuantity: 130,   itemNumber: 'M9201',  lastUpdated: SNAP },
  { locationId: 'BULK-009',  name: 'BULK-009',   aisle: 3, rack: 3, shelf: 0, bin: 0, x: 6, y: 6,  z: 0, capacity: 500,   currentQuantity: 180,   itemNumber: 'M1101',  lastUpdated: SNAP },

  // ── FLOOR LOCATIONS (4 × 3 picking grid, x = 2..8, y = 8..12) ───────────
  // On-hand: A0001 ~42,235 total across FL-001..008 | VM001 500 | D0013 479 | VM003 100
  { locationId: 'FL-001',    name: 'FL-001',     aisle: 4, rack: 1, shelf: 0, bin: 0, x: 2, y: 8,  z: 0, capacity: 500,   currentQuantity: 90,    itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-002',    name: 'FL-002',     aisle: 4, rack: 2, shelf: 0, bin: 0, x: 4, y: 8,  z: 0, capacity: 25000, currentQuantity: 19871, itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-003',    name: 'FL-003',     aisle: 4, rack: 3, shelf: 0, bin: 0, x: 6, y: 8,  z: 0, capacity: 25000, currentQuantity: 5000,  itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-004',    name: 'FL-004',     aisle: 4, rack: 4, shelf: 0, bin: 0, x: 8, y: 8,  z: 0, capacity: 25000, currentQuantity: 5600,  itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-005',    name: 'FL-005',     aisle: 5, rack: 1, shelf: 0, bin: 0, x: 2, y: 10, z: 0, capacity: 25000, currentQuantity: 5189,  itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-006',    name: 'FL-006',     aisle: 5, rack: 2, shelf: 0, bin: 0, x: 4, y: 10, z: 0, capacity: 25000, currentQuantity: 1500,  itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-007',    name: 'FL-007',     aisle: 5, rack: 3, shelf: 0, bin: 0, x: 6, y: 10, z: 0, capacity: 25000, currentQuantity: 4970,  itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-008',    name: 'FL-008',     aisle: 5, rack: 4, shelf: 0, bin: 0, x: 8, y: 10, z: 0, capacity: 500,   currentQuantity: 15,    itemNumber: 'A0001',  lastUpdated: SNAP },
  { locationId: 'FL-009',    name: 'FL-009',     aisle: 6, rack: 1, shelf: 0, bin: 0, x: 2, y: 12, z: 0, capacity: 500,   currentQuantity: 300,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'FL-010',    name: 'FL-010',     aisle: 6, rack: 2, shelf: 0, bin: 0, x: 4, y: 12, z: 0, capacity: 500,   currentQuantity: 200,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'FL-011',    name: 'FL-011',     aisle: 6, rack: 3, shelf: 0, bin: 0, x: 6, y: 12, z: 0, capacity: 1000,  currentQuantity: 479,   itemNumber: 'D0013',  lastUpdated: SNAP },
  { locationId: 'FL-012',    name: 'FL-012',     aisle: 6, rack: 4, shelf: 0, bin: 0, x: 8, y: 12, z: 0, capacity: 500,   currentQuantity: 100,   itemNumber: 'VM003',  lastUpdated: SNAP },

  // ── CONTAINER / PALLET LOCATIONS (3 × 3, x = 2..6, y = 14..18) ──────────
  // On-hand: VM001 remaining 1120 | VM004 210 | VM006 40 | A0002 10
  { locationId: 'CP-001',    name: 'CP-001',     aisle: 7, rack: 1, shelf: 0, bin: 0, x: 2, y: 14, z: 0, capacity: 500,   currentQuantity: 300,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'CP-002',    name: 'CP-002',     aisle: 7, rack: 2, shelf: 0, bin: 0, x: 4, y: 14, z: 0, capacity: 500,   currentQuantity: 200,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'CP-003',    name: 'CP-003',     aisle: 7, rack: 3, shelf: 0, bin: 0, x: 6, y: 14, z: 0, capacity: 500,   currentQuantity: 150,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'CP-004',    name: 'CP-004',     aisle: 8, rack: 1, shelf: 0, bin: 0, x: 2, y: 16, z: 0, capacity: 500,   currentQuantity: 150,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'CP-005',    name: 'CP-005',     aisle: 8, rack: 2, shelf: 0, bin: 0, x: 4, y: 16, z: 0, capacity: 500,   currentQuantity: 100,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'CP-006',    name: 'CP-006',     aisle: 8, rack: 3, shelf: 0, bin: 0, x: 6, y: 16, z: 0, capacity: 500,   currentQuantity: 100,   itemNumber: 'VM001',  lastUpdated: SNAP },
  { locationId: 'CP-007',    name: 'CP-007',     aisle: 9, rack: 1, shelf: 0, bin: 0, x: 2, y: 18, z: 0, capacity: 500,   currentQuantity: 210,   itemNumber: 'VM004',  lastUpdated: SNAP },
  { locationId: 'CP-008',    name: 'CP-008',     aisle: 9, rack: 2, shelf: 0, bin: 0, x: 4, y: 18, z: 0, capacity: 200,   currentQuantity: 40,    itemNumber: 'VM006',  lastUpdated: SNAP },
  { locationId: 'CP-009',    name: 'CP-009',     aisle: 9, rack: 3, shelf: 0, bin: 0, x: 6, y: 18, z: 0, capacity: 200,   currentQuantity: 10,    itemNumber: 'A0002',  lastUpdated: SNAP },

  // ── PRODUCTION (right side, x = 10) ──────────────────────────────────────
  { locationId: 'Prod-in',   name: 'Prod-in',    aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 8,  z: 0, capacity: 500,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'Prod-out',  name: 'Prod-out',   aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 10, z: 0, capacity: 500,  currentQuantity: 0,     lastUpdated: SNAP },

  // ── SPECIAL / SYSTEM LOCATIONS (right side, x = 10..12) ─────────────────
  { locationId: 'USER',      name: 'USER',        aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 2,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'RF Gen',    name: 'RF Gen',      aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 4,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'AtLineQMS', name: 'AtLineQMS',   aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 12, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'Return',    name: 'Return',      aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 14, z: 0, capacity: 200,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'Dummy',     name: 'Dummy',       aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 16, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: '24ND',      name: '24ND',        aisle: 0, rack: 0, shelf: 0, bin: 0, x: 10, y: 18, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'ND',        name: 'ND',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 2,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'OTH',       name: 'OTH',         aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 4,  z: 0, capacity: 100,  currentQuantity: 16,    itemNumber: 'BR003', lastUpdated: SNAP },
  { locationId: 'LPW',       name: 'LPW',         aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 6,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'RW',        name: 'RW',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 8,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'JL',        name: 'JL',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 10, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'MA007',     name: 'MA007',       aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 12, z: 0, capacity: 100,  currentQuantity: 15,    itemNumber: '000701', lastUpdated: SNAP },
  { locationId: '24',        name: '24',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 12, y: 14, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },

  // ── USER-CREATED LOCATIONS (far right, x = 14..16) ───────────────────────
  { locationId: 'Jon',       name: 'Jon',         aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 2,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: '10000',     name: '10000',       aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 4,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: '20000',     name: '20000',       aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 6,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: '30000',     name: '30000',       aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 8,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'tm',        name: 'tm',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 10, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'cs',        name: 'cs',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 12, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'jr',        name: 'jr',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 14, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'ht',        name: 'ht',          aisle: 0, rack: 0, shelf: 0, bin: 0, x: 14, y: 16, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'jl24',      name: 'jl24',        aisle: 0, rack: 0, shelf: 0, bin: 0, x: 16, y: 2,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'jope72',    name: 'jope72',      aisle: 0, rack: 0, shelf: 0, bin: 0, x: 16, y: 4,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'pafu',      name: 'pafu',        aisle: 0, rack: 0, shelf: 0, bin: 0, x: 16, y: 6,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'rhl',       name: 'rhl',         aisle: 0, rack: 0, shelf: 0, bin: 0, x: 16, y: 8,  z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'udi',       name: 'udi',         aisle: 0, rack: 0, shelf: 0, bin: 0, x: 16, y: 10, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
  { locationId: 'thma',      name: 'thma',        aisle: 0, rack: 0, shelf: 0, bin: 0, x: 16, y: 12, z: 0, capacity: 100,  currentQuantity: 0,     lastUpdated: SNAP },
];
