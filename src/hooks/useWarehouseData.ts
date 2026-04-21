import { useEffect, useRef, useCallback } from 'react';
import { useWarehouseStore } from '../store/warehouseStore';
import {
  fetchWarehouseLocations,
  subscribeToWarehouseUpdates,
} from '../services/d365Service';
import type { WarehouseLocation } from '../types/warehouse';

export function useWarehouseData() {
  const {
    locations,
    isLoading,
    error,
    setLocations,
    updateLocation,
    setLoading,
    setError,
    setLastSync,
  } = useWarehouseStore();

  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Initial load and polling
  const loadWarehouseData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWarehouseLocations();
      setLocations(data);
      setLastSync(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load warehouse data';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, [setLocations, setLoading, setError, setLastSync]);

  // Subscribe to real-time updates
  useEffect(() => {
    // Initial load
    loadWarehouseData();

    // Subscribe to updates
    try {
      unsubscribeRef.current = subscribeToWarehouseUpdates((update: WarehouseLocation) => {
        updateLocation(update.locationId, update);
      });
    } catch (err) {
      console.warn('Real-time updates not available:', err);
    }

    // Poll for updates every 30 seconds as fallback
    const pollInterval = setInterval(() => {
      loadWarehouseData();
    }, 30000);

    return () => {
      clearInterval(pollInterval);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [loadWarehouseData, updateLocation]);

  return {
    locations,
    isLoading,
    error,
    refetch: loadWarehouseData,
  };
}
