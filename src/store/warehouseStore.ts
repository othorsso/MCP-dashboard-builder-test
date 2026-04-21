import { create } from 'zustand';
import type { WarehouseLocation, WarehouseState } from '../types/warehouse';

interface WarehouseStore extends WarehouseState {
  setLocations: (locations: WarehouseLocation[]) => void;
  updateLocation: (locationId: string, updates: Partial<WarehouseLocation>) => void;
  addLocation: (location: WarehouseLocation) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastSync: (date: Date) => void;
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  locations: [],
  isLoading: false,
  error: null,
  lastSync: null,

  setLocations: (locations) =>
    set({ locations, lastSync: new Date() }),

  updateLocation: (locationId, updates) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.locationId === locationId
          ? { ...loc, ...updates, lastUpdated: new Date() }
          : loc
      ),
    })),

  addLocation: (location) =>
    set((state) => ({
      locations: [...state.locations, location],
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setLastSync: (date) => set({ lastSync: date }),
}));
