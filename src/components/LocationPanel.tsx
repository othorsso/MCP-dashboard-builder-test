import type { WarehouseLocation } from '../types/warehouse';

interface LocationPanelProps {
  location: WarehouseLocation | null;
  onClose: () => void;
}

export function LocationPanel({ location, onClose }: LocationPanelProps) {

  if (!location) return null;

  const fillPercentage = (location.currentQuantity / location.capacity) * 100;
  const statusColor = fillPercentage > 80 ? 'text-red-500' : fillPercentage > 50 ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-gray-800 text-white shadow-lg border-l border-gray-700 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">{location.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Location Details */}
      <div className="p-6 space-y-4">
        {/* Location ID */}
        <div>
          <label className="text-gray-400 text-sm">Location ID</label>
          <p className="text-lg font-mono text-blue-400">{location.locationId}</p>
        </div>

        {/* Position */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm">Aisle</label>
            <p className="text-xl font-bold">{location.aisle}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Rack</label>
            <p className="text-xl font-bold">{location.rack}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Shelf</label>
            <p className="text-xl font-bold">{location.shelf}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Bin</label>
            <p className="text-xl font-bold">{location.bin}</p>
          </div>
        </div>

        {/* Item Information */}
        {location.itemNumber && (
          <div>
            <label className="text-gray-400 text-sm">Item Number</label>
            <p className="text-lg font-mono">{location.itemNumber}</p>
          </div>
        )}

        {/* Capacity & Inventory */}
        <div className="bg-gray-700 rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-lg mb-2">Inventory</h3>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Quantity</span>
              <span className={`font-bold ${statusColor}`}>
                {location.currentQuantity}/{location.capacity}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  fillPercentage > 80
                    ? 'bg-red-500'
                    : fillPercentage > 50
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(fillPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="text-sm text-gray-400">
            {fillPercentage.toFixed(1)}% Full ({location.capacity - location.currentQuantity} available)
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
          Last updated: {location.lastUpdated.toLocaleTimeString()}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              navigator.clipboard.writeText(location.locationId);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Copy Location ID
          </button>
          <button
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
}
