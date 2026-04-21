import { WAREHOUSE_ID } from '../types/warehouse';

interface StatusBarProps {
  isLoading: boolean;
  error: string | null;
  locationCount: number;
  lastSync: Date | null;
  onRefresh: () => void;
}

export function StatusBar({ isLoading, error, locationCount, lastSync, onRefresh }: StatusBarProps) {
  const dot = (color: string) => (
    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, marginRight: 6 }} />
  );

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, background: '#111827', borderBottom: '1px solid #374151', color: 'white', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
      {/* Left */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>🏭 Warehouse {WAREHOUSE_ID}</div>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{locationCount} Locations</div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
          {error ? (
            <><span>{dot('#ef4444')}</span><span style={{ color: '#f87171' }}>{error}</span></>
          ) : isLoading ? (
            <><span>{dot('#eab308')}</span><span>Syncing...</span></>
          ) : (
            <><span>{dot('#22c55e')}</span><span>Live</span></>
          )}
        </div>
        {lastSync && (
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            {lastSync.toLocaleTimeString()}
          </span>
        )}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          style={{ padding: '6px 14px', borderRadius: 6, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', background: isLoading ? '#374151' : '#2563eb', color: isLoading ? '#9ca3af' : 'white', fontSize: '0.875rem' }}
        >
          ⟳ {isLoading ? 'Syncing' : 'Sync'}
        </button>
      </div>
    </div>
  );
}

