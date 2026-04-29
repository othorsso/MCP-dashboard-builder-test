// ============================================================
// D365FO OData Fetch Service
// ============================================================
//
// Fetches live data from D365FO via OData.
//
// Dev mode:  requests route through the Vite proxy at /d365-api/
//            which forwards to en-tier2.sandbox.operations.dynamics.com,
//            bypassing CORS. Auth is provided by the browser's existing
//            D365 session cookie (credentials: 'include').
//
// Prod mode: same requests; requires either:
//            • A Vercel Edge Function proxy that adds auth headers, or
//            • The user already holds a valid D365 session in the browser.
//
// Entities fetched:
//   • WarehouseWorkHeaders  — open + blocked work for WH24 & WH51
//   • WarehousesOnHandV2    — on-hand inventory by warehouse
// ============================================================

import type { D365WorkHeader, D365OnHand } from '../data/d365LiveData';

const BASE = '/api/d365';
const COMPANY = 'USMF';

// ── Work Headers ─────────────────────────────────────────────────────────────

export async function fetchWorkHeaders(): Promise<D365WorkHeader[]> {
  const params = new URLSearchParams({
    $filter: `dataAreaId eq '${COMPANY}' and (WarehouseId eq '24' or WarehouseId eq '51') and (WarehouseWorkStatus eq 'Open' or IsWarehouseWorkBlocked eq 'Yes')`,
    $select:
      'WarehouseWorkId,WarehouseId,WarehouseWorkStatus,WarehouseWorkOrderType,' +
      'WarehouseWorkPriority,IsWarehouseWorkBlocked,ShipmentId,WaveId,LoadId,' +
      'SourceOrderNumber,WarehouseWorkPoolId,WarehouseWorkProcessingStartDateTime',
  });

  const res = await fetch(`${BASE}/WarehouseWorkHeaders?${params}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`WarehouseWorkHeaders: HTTP ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { value: Record<string, unknown>[] };

  return json.value.map((row): D365WorkHeader => ({
    workId:            String(row['WarehouseWorkId'] ?? ''),
    warehouseId:       String(row['WarehouseId']) as '24' | '51',
    status:            String(row['WarehouseWorkStatus']) as 'Open' | 'Closed' | 'Cancelled',
    type:              String(row['WarehouseWorkOrderType'] ?? ''),
    priority:          Number(row['WarehouseWorkPriority'] ?? 50),
    blocked:           String(row['IsWarehouseWorkBlocked']) === 'Yes',
    shipmentId:        String(row['ShipmentId'] ?? ''),
    waveId:            String(row['WaveId'] ?? ''),
    loadId:            String(row['LoadId'] ?? ''),
    orderNumber:       String(row['SourceOrderNumber'] ?? ''),
    poolId:            row['WarehouseWorkPoolId'] ? String(row['WarehouseWorkPoolId']) : undefined,
    processingStarted: !String(row['WarehouseWorkProcessingStartDateTime'] ?? '').startsWith('1900'),
  }));
}

// ── On-Hand Inventory ─────────────────────────────────────────────────────────

export async function fetchOnHandInventory(): Promise<D365OnHand[]> {
  const params = new URLSearchParams({
    $filter: `dataAreaId eq '${COMPANY}' and (InventoryWarehouseId eq '24' or InventoryWarehouseId eq '51')`,
    $select:
      'InventoryWarehouseId,ItemNumber,ProductName,' +
      'InventoryQuantity,ReservedOnHandQuantity,AvailableOnHandQuantity',
  });

  const res = await fetch(`${BASE}/WarehousesOnHandV2?${params}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`WarehousesOnHandV2: HTTP ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { value: Record<string, unknown>[] };

  return json.value
    .map((row): D365OnHand => ({
      warehouseId:  String(row['InventoryWarehouseId']) as '24' | '51',
      itemNumber:   String(row['ItemNumber'] ?? ''),
      productName:  String(row['ProductName'] ?? ''),
      onHand:       Number(row['InventoryQuantity'] ?? 0),
      reserved:     Number(row['ReservedOnHandQuantity'] ?? 0),
      available:    Number(row['AvailableOnHandQuantity'] ?? 0),
    }))
    .filter((r) => r.warehouseId === '24' || r.warehouseId === '51');
}
