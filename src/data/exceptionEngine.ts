// ============================================================
// Warehouse Exception Radar — Exception Derivation Engine
// ============================================================
//
// This module derives WarehouseException objects from:
//   • Real D365FO data (OPEN_WORK_HEADERS, ON_HAND_INVENTORY)
//   • Derived / inferred conditions (based on real data patterns)
//   • Simulated exceptions (clearly labelled, for demo realism)
//
// Each exception is tagged with a 'dataSource' field:
//   'real'      → directly from D365FO via MCP OData
//   'derived'   → calculated from real D365 data (e.g. pick face fill rates)
//   'simulated' → realistic but not from live system
// ============================================================

import type { WarehouseException } from '../types/exceptions';
import { OPEN_WORK_HEADERS, ON_HAND_INVENTORY, MCP_SNAPSHOT_DATE } from './d365LiveData';

function hoursAgo(date: Date): number {
  return Math.max(0, Math.floor((MCP_SNAPSHOT_DATE.getTime() - date.getTime()) / (1000 * 60 * 60)));
}

function item(warehouseId: '24' | '51', itemNumber: string) {
  return ON_HAND_INVENTORY.find(i => i.itemNumber === itemNumber && i.warehouseId === warehouseId)!;
}

export function deriveExceptions(): WarehouseException[] {
  const exceptions: WarehouseException[] = [];

  // ══════════════════════════════════════════════════════════════════════════
  // REAL D365 EXCEPTIONS
  // ══════════════════════════════════════════════════════════════════════════

  // ── EX-001 ── WH51 Blocked Production Putaway ─────────────────────────
  // Source: WarehouseWorkHeaders — USMF-002118, IsWarehouseWorkBlocked=Yes, Status=Open
  exceptions.push({
    id: 'EX-001',
    title: 'Production putaway BLOCKED — WH51, order P002087',
    description:
      'Work order USMF-002118 is open AND blocked. Finished goods for production order P002087 cannot be put away from the production output location.',
    severity: 'critical',
    warehouseId: '51',
    processArea: 'production',
    category: 'blocked_work',
    agingHours: hoursAgo(new Date('2026-04-10T06:00:00Z')),
    impact:
      'Production order P002087 cannot close. Finished goods accumulate at production output, blocking further production runs. Revenue recognition delayed.',
    likelyCause:
      'Target putaway location is likely blocked by existing inventory, a license plate conflict, or a location directive failure in the configured zone.',
    suggestedAction:
      'Open WH51 > Work management > USMF-002118. Identify the blocking location. Clear inventory or override the location directive to an alternate put location. Unblock the work via Work > Unblock.',
    sourceWorkId: 'USMF-002118',
    sourceOrderNumber: 'P002087',
    dataSource: 'real',
    dataNote:
      'D365FO WarehouseWorkHeaders: WarehouseWorkId=USMF-002118, WarehouseWorkStatus=Open, IsWarehouseWorkBlocked=Yes, WarehouseWorkOrderType=ProdPut',
    createdAt: new Date('2026-04-10T06:00:00Z'),
    status: 'open',
    tags: ['blocked', 'production', 'putaway', 'P002087'],
  });

  // ── EX-002 ── WH24 HDMI 12' Cables fully reserved ─────────────────────
  // Source: WarehousesOnHandV2 — A0002, Available=0, Reserved=10
  const a0002 = item('24', 'A0002');
  exceptions.push({
    id: 'EX-002',
    title: `Stock-out: ${a0002.productName} (${a0002.itemNumber}) — 0 available, WH24`,
    description: `All ${a0002.onHand} units of ${a0002.productName} in WH24 are fully reserved. Zero available for new pick lines or wave release.`,
    severity: 'critical',
    warehouseId: '24',
    processArea: 'inventory',
    category: 'stockout',
    agingHours: hoursAgo(new Date('2026-04-14T00:00:00Z')),
    impact:
      "Sales orders requiring HDMI 12' Cables from WH24 cannot wave-release. Existing open pick work will short-pick or error. Customer shipments at risk.",
    likelyCause:
      'Demand has consumed all available stock. No replenishment order appears to be in transit for this item in WH24.',
    suggestedAction:
      'Create emergency replenishment or purchase order for A0002. Check if WH51 can cross-ship. Review wave release queue for impacted shipments.',
    itemNumber: 'A0002',
    itemName: a0002.productName,
    dataSource: 'real',
    dataNote:
      'D365FO WarehousesOnHandV2: ItemNumber=A0002, InventoryWarehouseId=24, OnHandQuantity=10, ReservedOnHandQuantity=10, AvailableOnHandQuantity=0',
    createdAt: new Date('2026-04-14T00:00:00Z'),
    status: 'open',
    tags: ['stockout', 'HDMI', 'sales_at_risk', 'replenishment_needed'],
  });

  // ── EX-003 ── WH24 Surface Pro 128GB — 1 unit available vs 9 reserved ──
  // Source: WarehousesOnHandV2 — 1000, Available=1, Reserved=9
  const sp = item('24', '1000');
  exceptions.push({
    id: 'EX-003',
    title: `Critical low stock: ${sp.productName} — 1 available / 9 reserved (WH24)`,
    description: `Only 1 unit of ${sp.productName} remains available in WH24 against ${sp.reserved} reserved. The next wave will deplete available stock entirely.`,
    severity: 'high',
    warehouseId: '24',
    processArea: 'inventory',
    category: 'low_stock',
    agingHours: hoursAgo(new Date('2026-04-15T00:00:00Z')),
    impact:
      'Next wave release for Surface Pro 128 GB will short-pick. 8 of 9 reserved units cannot be fulfilled. Multiple sales orders at risk of slippage.',
    likelyCause:
      'Reservation overcommitment — total reservations (9) nearly equal total on-hand (10). Likely high-demand SKU without matching replenishment.',
    suggestedAction:
      'Check reservation breakdown by sales order. Trigger emergency replenishment or transfer order from another site/warehouse. Alert account managers.',
    itemNumber: '1000',
    itemName: sp.productName,
    dataSource: 'real',
    dataNote:
      'D365FO WarehousesOnHandV2: ItemNumber=1000, InventoryWarehouseId=24, OnHandQuantity=10, ReservedOnHandQuantity=9, AvailableOnHandQuantity=1',
    createdAt: new Date('2026-04-15T00:00:00Z'),
    status: 'open',
    tags: ['low_stock', 'Surface Pro', 'high_demand'],
  });

  // ── EX-004 ── WH24 Stale Sales Pick — Wave 2, Never Started ───────────
  // Source: WarehouseWorkHeaders — USMF-000002, Wave=USMF-000000002 (very early), ProcessingStart=1900
  exceptions.push({
    id: 'EX-004',
    title: 'Aged sales pick never started — WH24 USMF-000002 (Order 000752)',
    description:
      'Work USMF-000002 for sales order 000752 is on Wave 2 (earliest waves in the system) and has never started processing. Shipment USMF-000002 and Load USMF-000002 are at risk.',
    severity: 'high',
    warehouseId: '24',
    processArea: 'outbound',
    category: 'stale_work',
    agingHours: hoursAgo(new Date('2026-03-28T00:00:00Z')),
    impact:
      'Shipment USMF-000002 and Load USMF-000002 for order 000752 may have missed expected ship date. Customer delivery commitment at risk.',
    likelyCause:
      'Work was released in an early wave but never assigned to a picker. Possibly overtaken by newer wave work or worker assignment was lost.',
    suggestedAction:
      'Review shipment USMF-000002 status. If still required: assign to a picker, confirm inventory, release immediately. If superseded: cancel and create fresh wave.',
    sourceWorkId: 'USMF-000002',
    sourceOrderNumber: '000752',
    shipmentId: 'USMF-000002',
    dataSource: 'real',
    dataNote:
      'D365FO WarehouseWorkHeaders: WarehouseWorkId=USMF-000002, Status=Open, WaveId=USMF-000000002 (wave #2), WarehouseWorkProcessingStartDateTime=1900-01-01 (never started)',
    createdAt: new Date('2026-03-28T00:00:00Z'),
    status: 'open',
    tags: ['sales', 'outbound', 'stale', 'shipment_at_risk', 'wave_2'],
  });

  // ── EX-005 ── WH24 Unstarted Sales Pick — Shipment USMF-000355 ─────────
  // Source: WarehouseWorkHeaders — USMF-000717, ProcessingStart=1900
  exceptions.push({
    id: 'EX-005',
    title: 'Open sales pick unstarted — WH24 USMF-000717, Shipment USMF-000355',
    description:
      'Work USMF-000717 for shipment USMF-000355 on Load USMF-000482 has never been started. Carrier manifest cannot proceed until pick is complete.',
    severity: 'high',
    warehouseId: '24',
    processArea: 'outbound',
    category: 'stale_work',
    agingHours: hoursAgo(new Date('2026-04-15T06:00:00Z')),
    impact:
      'Load USMF-000482 cannot be manifested. If ship window is today, carrier appointment will be missed → re-booking cost, customer SLA breach.',
    likelyCause:
      'Work released to wave but no picker assigned. Possibly deprioritized against inbound putaway backlog.',
    suggestedAction:
      'Assign a picker immediately to USMF-000717. Confirm load USMF-000482 ship date — escalate to transport if imminent. Check inventory availability.',
    sourceWorkId: 'USMF-000717',
    shipmentId: 'USMF-000355',
    dataSource: 'real',
    dataNote:
      'D365FO WarehouseWorkHeaders: WarehouseWorkId=USMF-000717, Status=Open, WaveId=USMF-000000486, LoadId=USMF-000482, ProcessingStartDateTime=1900-01-01',
    createdAt: new Date('2026-04-15T06:00:00Z'),
    status: 'open',
    tags: ['sales', 'outbound', 'shipment_at_risk', 'carrier_risk'],
  });

  // ── EX-006 ── WH24 Six Unstarted Purchase Putaway Lines ─────────────────
  // Source: WarehouseWorkHeaders — 6 × Open Purch type, all ProcessingStart=1900
  const purchWorkIds = OPEN_WORK_HEADERS
    .filter(w => w.warehouseId === '24' && w.type === 'Purch')
    .map(w => w.workId);
  const purchOrders = [...new Set(OPEN_WORK_HEADERS
    .filter(w => w.warehouseId === '24' && w.type === 'Purch')
    .map(w => w.orderNumber)
  )];
  exceptions.push({
    id: 'EX-006',
    title: `${purchWorkIds.length} unstarted inbound putaway work orders — WH24`,
    description: `${purchWorkIds.length} open Purchase putaway work orders (${purchWorkIds.join(', ')}) across ${purchOrders.length} POs have never started processing. Received goods are stuck at staging.`,
    severity: 'medium',
    warehouseId: '24',
    processArea: 'inbound',
    category: 'stale_work',
    agingHours: hoursAgo(new Date('2026-04-12T08:00:00Z')),
    impact:
      'Received inventory is not in system locations — on-hand accuracy is degraded, available quantity for pick may be understated, and receiving dock may be congested.',
    likelyCause:
      'Putaway work created but no workers assigned. Possible staffing gap on receiving shift or pick work being prioritised over putaway.',
    suggestedAction: `Assign workers to pending putaway work. Prioritise USMF-000092/093/117 (PO 00000275) as the oldest. Review STAGE / RECV locations in WH24.`,
    sourceWorkId: purchWorkIds.join(', '),
    sourceOrderNumber: purchOrders.join(', '),
    dataSource: 'real',
    dataNote: `D365FO WarehouseWorkHeaders: ${purchWorkIds.length} open Purch-type work orders, all WarehouseWorkProcessingStartDateTime=1900-01-01 (never started)`,
    createdAt: new Date('2026-04-12T08:00:00Z'),
    status: 'open',
    tags: ['inbound', 'putaway', 'receiving', 'congestion', 'multiple_POs'],
  });

  // ── EX-007 ── WH24 TestComponent1 Stockout ────────────────────────────
  // Source: WarehousesOnHandV2 — 000703, Available=0, Reserved=2
  const tc1 = item('24', '000703');
  exceptions.push({
    id: 'EX-007',
    title: `Stock-out: ${tc1.productName} (${tc1.itemNumber}) — 0 available (WH24)`,
    description: `${tc1.productName} has all ${tc1.onHand} units reserved. Zero available for picks. Production/assembly orders are blocked.`,
    severity: 'high',
    warehouseId: '24',
    processArea: 'production',
    category: 'stockout',
    agingHours: hoursAgo(new Date('2026-04-15T12:00:00Z')),
    impact:
      'Component shortage will cause production work orders requiring TestComponent1 to fail at pick. Dependent BOM picks will short or error.',
    likelyCause:
      'Component not replenished ahead of demand. On-hand quantity (2) is insufficient for current reservation level.',
    suggestedAction:
      'Review production order demand for 000703. Create replenishment or PO. If partial picks exist, evaluate if production can proceed short.',
    itemNumber: '000703',
    itemName: tc1.productName,
    dataSource: 'real',
    dataNote:
      'D365FO WarehousesOnHandV2: ItemNumber=000703, InventoryWarehouseId=24, OnHandQuantity=2, ReservedOnHandQuantity=2, AvailableOnHandQuantity=0',
    createdAt: new Date('2026-04-15T12:00:00Z'),
    status: 'open',
    tags: ['stockout', 'component', 'production', 'BOM'],
  });

  // ── EX-008 ── WH51 Quality Hold — PO 00000526 ─────────────────────────
  // Source: WarehouseWorkHeaders — USMF-000268, Type=QualityItemSampling, Status=Open
  exceptions.push({
    id: 'EX-008',
    title: 'Quality sampling work open — WH51, PO 00000526',
    description:
      'Work USMF-000268 (QualityItemSampling) for PO 00000526 in WH51 is open and unstarted. Goods are held pending quality check.',
    severity: 'medium',
    warehouseId: '51',
    processArea: 'quality',
    category: 'quality_hold',
    agingHours: hoursAgo(new Date('2026-04-13T08:00:00Z')),
    impact:
      'Inventory from PO 00000526 remains quarantined. Cannot be put away or consumed until QC completes. May affect production supply if these are components.',
    likelyCause:
      'Quality check triggered at receiving. QC resource not yet assigned or de-prioritised behind other work.',
    suggestedAction:
      'Prioritise QC team to close USMF-000268. If goods are time-sensitive for production, escalate to quality manager for expedited pass/fail decision.',
    sourceWorkId: 'USMF-000268',
    sourceOrderNumber: '00000526',
    dataSource: 'real',
    dataNote:
      'D365FO WarehouseWorkHeaders: WarehouseWorkId=USMF-000268, Type=QualityItemSampling, Status=Open, ProcessingStartDateTime=1900-01-01',
    createdAt: new Date('2026-04-13T08:00:00Z'),
    status: 'open',
    tags: ['quality', 'hold', 'receiving', 'QC'],
  });

  // ── EX-009 ── WH51 Open Production Component Pick ─────────────────────
  // Source: WarehouseWorkHeaders — USMF-000344, Type=ProdPick, Status=Open
  exceptions.push({
    id: 'EX-009',
    title: 'Production component pick pending — WH51, P000611',
    description:
      'Work USMF-000344 for production order P000611 in WH51 is open and unstarted. Components must be picked to supply the production line.',
    severity: 'medium',
    warehouseId: '51',
    processArea: 'production',
    category: 'stale_work',
    agingHours: hoursAgo(new Date('2026-04-14T08:00:00Z')),
    impact:
      'Production order P000611 is waiting for component supply. Production schedule delay likely. Line starvation risk if not actioned within shift.',
    likelyCause:
      'No worker assigned. Work may be queued behind other production work in wave USMF-000000137.',
    suggestedAction:
      'Assign a worker to USMF-000344 immediately. Verify component availability in WH51 pick locations. Expedite pick to avoid production stoppage.',
    sourceWorkId: 'USMF-000344',
    sourceOrderNumber: 'P000611',
    dataSource: 'real',
    dataNote:
      'D365FO WarehouseWorkHeaders: WarehouseWorkId=USMF-000344, Type=ProdPick, Status=Open, WaveId=USMF-000000137, ProcessingStartDateTime=1900-01-01',
    createdAt: new Date('2026-04-14T08:00:00Z'),
    status: 'open',
    tags: ['production', 'component_pick', 'P000611'],
  });

  // ── EX-010 ── WH24 TestComponent3 Near-Stockout ─────────────────────────
  // Source: WarehousesOnHandV2 — 000726, Available=1, Reserved=4
  const tc3 = item('24', '000726');
  exceptions.push({
    id: 'EX-010',
    title: `Near-stockout: ${tc3.productName} (${tc3.itemNumber}) — 1 unit left (WH24)`,
    description: `Only 1 unit of ${tc3.productName} available in WH24. ${tc3.reserved} units are already reserved — next pick wave will hit zero.`,
    severity: 'medium',
    warehouseId: '24',
    processArea: 'inventory',
    category: 'low_stock',
    agingHours: hoursAgo(new Date('2026-04-16T10:00:00Z')),
    impact:
      'Component shortage will block the next production pick wave requiring TestComponent3. All 4 reservations will conflict if available qty drops to 0.',
    likelyCause:
      'Demand exceeds replenishment cadence. Min/max thresholds may not be configured correctly for this component.',
    suggestedAction:
      'Initiate replenishment for 000726. Review safety stock settings. Check if any open PO covers this need.',
    itemNumber: '000726',
    itemName: tc3.productName,
    dataSource: 'real',
    dataNote:
      'D365FO WarehousesOnHandV2: ItemNumber=000726, InventoryWarehouseId=24, OnHandQuantity=5, ReservedOnHandQuantity=4, AvailableOnHandQuantity=1',
    createdAt: new Date('2026-04-16T10:00:00Z'),
    status: 'monitoring',
    tags: ['low_stock', 'component', 'replenishment'],
  });

  // ══════════════════════════════════════════════════════════════════════════
  // DERIVED EXCEPTIONS (calculated from real D365 location + inventory data)
  // ══════════════════════════════════════════════════════════════════════════

  // ── EX-011 ── WH24 Pick Face Depletion — A0001 FL-001 / FL-008 ──────────
  // Derived from WH24 location snapshot (warehouseData.ts):
  //   FL-001 has 90 units, FL-008 has 15 units of A0001 (HDMI 6' Cables)
  //   BULK locations hold 60,000+. Replenishment work not in open work headers.
  exceptions.push({
    id: 'EX-011',
    title: "Pick face depletion alert — A0001 (HDMI 6') FL-001/FL-008, WH24",
    description:
      "Pick face locations FL-001 (90 units) and FL-008 (15 units) for HDMI 6' Cables are critically low. BULK storage has 60,000+ units but no replenishment work is in queue.",
    severity: 'medium',
    warehouseId: '24',
    processArea: 'replenishment',
    category: 'replenishment_delay',
    agingHours: hoursAgo(new Date('2026-04-16T14:00:00Z')),
    impact:
      'Pickers will exhaust pick face stock mid-wave and either fail or require a supervisor exception to redirect to BULK. Wave throughput will drop significantly.',
    likelyCause:
      'Replenishment min threshold not configured for FL-001/FL-008, or replenishment wave was not processed in the last shift.',
    suggestedAction:
      'Manually trigger a replenishment wave for A0001 pick face locations. Review zone replenishment template — update min/max for FL-001 and FL-008.',
    itemNumber: 'A0001',
    itemName: "HDMI 6' Cables",
    dataSource: 'derived',
    dataNote:
      'Derived from WH24 location snapshot (WarehouseLocations MCP data, 2026-04-16): FL-001=90 units, FL-008=15 units. No replenishment work found in WarehouseWorkHeaders for A0001.',
    createdAt: new Date('2026-04-16T14:00:00Z'),
    status: 'monitoring',
    tags: ['replenishment', 'pick_face', 'A0001', 'wave_efficiency'],
  });

  // ══════════════════════════════════════════════════════════════════════════
  // SIMULATED EXCEPTIONS (realistic demo logic — NOT from live D365)
  // ══════════════════════════════════════════════════════════════════════════

  // ── EX-012 ── WH24 Load Not Manifested — Ship Window Approaching ────────
  // Based on real USMF-000717 (open pick) against real shipment USMF-000355.
  // Load manifest status is not exposed via current OData entities.
  exceptions.push({
    id: 'EX-012',
    title: 'Load USMF-000482 not manifested — ship window approaching (WH24)',
    description:
      'Load USMF-000482 tied to shipment USMF-000355 has open pick work (USMF-000717) and has not been manifested. If pick does not complete by EOD, the carrier window will be missed.',
    severity: 'high',
    warehouseId: '24',
    processArea: 'outbound',
    category: 'delayed_shipment',
    agingHours: hoursAgo(new Date('2026-04-17T00:00:00Z')),
    impact:
      'Carrier appointment missed → re-booking cost, customer SLA breach, potential chargeback from customer. Escalation to transport manager required.',
    likelyCause:
      'Upstream pick work USMF-000717 not completed. Load status locked at "Picked" until work closes, blocking manifest generation.',
    suggestedAction:
      'Expedite pick work USMF-000717 (see EX-005). If pick cannot complete in time, contact carrier immediately to reschedule. Notify customer success team.',
    sourceWorkId: 'USMF-000717',
    shipmentId: 'USMF-000355',
    dataSource: 'simulated',
    dataNote:
      'SIMULATED — Load manifest/confirmation status not available via current OData entities. Derived from real open work USMF-000717 against real shipment USMF-000355 and load USMF-000482 (D365FO data).',
    createdAt: new Date('2026-04-17T00:00:00Z'),
    status: 'open',
    tags: ['outbound', 'load', 'carrier', 'manifest', 'SLA'],
  });

  // ── EX-013 ── WH51 Mobile Device Scan Errors ───────────────────────────
  // Simulated: realistic operational issue common in production WMS environments
  exceptions.push({
    id: 'EX-013',
    title: 'Mobile device scan failures — WH51 production floor',
    description:
      'Multiple scan retry attempts reported on the WH51 production floor during ProdPick cycle. Workers logging manual overrides near P000611 staging area, suggesting label or RF connectivity issues.',
    severity: 'low',
    warehouseId: '51',
    processArea: 'production',
    category: 'device_error',
    agingHours: hoursAgo(new Date('2026-04-17T02:00:00Z')),
    impact:
      'Increased cycle time for production component picks (+20-30% per scan failure). Risk of wrong LP scanned if workers override without verification.',
    likelyCause:
      'Damaged barcode labels on containers or intermittent RF device connectivity in the staging zone near production line.',
    suggestedAction:
      'Reprint license plate labels for containers near P000611. Check RF signal strength at production staging. Replace any faulty handheld devices.',
    dataSource: 'simulated',
    dataNote:
      'SIMULATED — Device/scan error data not available via OData. Pattern inferred from open ProdPick work USMF-000344 (real D365 data). Common in high-volume WMS environments.',
    createdAt: new Date('2026-04-17T02:00:00Z'),
    status: 'monitoring',
    tags: ['device', 'RF', 'scan_error', 'production_floor'],
  });

  return exceptions;
}
