export const WAREHOUSE_ID = '24';

export interface WarehouseLocation {
  locationId: string;
  name: string;
  aisle: number;
  rack: number;
  shelf: number;
  bin: number;
  x: number;
  y: number;
  z: number;
  capacity: number;
  currentQuantity: number;
  itemNumber?: string;
  lastUpdated: Date;
}

export interface WarehouseState {
  locations: WarehouseLocation[];
  isLoading: boolean;
  error: string | null;
  lastSync: Date | null;
}

export interface LocationUpdate {
  locationId: string;
  name?: string;
  currentQuantity?: number;
  itemNumber?: string;
}
