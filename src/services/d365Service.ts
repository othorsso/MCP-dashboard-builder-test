import { WAREHOUSE_24_LOCATIONS } from '../data/warehouseData';
import type { WarehouseLocation } from '../types/warehouse';

/**
 * Static D365 USMF Warehouse 24 data (snapshot 2026-04-16).
 * Locations and on-hand quantities fetched directly from D365 via MCP.
 */

export async function fetchWarehouseLocations(): Promise<WarehouseLocation[]> {
  return WAREHOUSE_24_LOCATIONS;
}

export function subscribeToWarehouseUpdates(
  _callback: (update: WarehouseLocation) => void
): () => void {
  // Static snapshot — no live updates
  return () => {};
}


