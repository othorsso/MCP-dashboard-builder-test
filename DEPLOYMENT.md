# Warehouse 24 3D Viewer - Deployment & Setup Guide

## Overview
A real-time 3D warehouse management app for Warehouse 24 in USMF company, connected to D365 via MCP server.

## Quick Start (Development)

```bash
npm install
npm run dev
```

Access at: **http://localhost:5173** or **http://172.22.29.75:5173** (network)

## Features

✅ **3D Warehouse Layout** - Interactive 3D visualization of warehouse locations  
✅ **Live D365 Integration** - Real-time updates from Dynamics 365 USMF  
✅ **Warehouse 24 Only** - Filtered to show only Warehouse 24 locations  
✅ **Location Details** - Click locations to see inventory details  
✅ **Color-Coded Capacity** - Visual fill level indicators (Green → Yellow → Red)  
✅ **Shareable URL** - Deploy once, share with team  

## Sharing the App (Vercel Deployment)

### 1. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to:
- Connect your GitHub account or create new project
- Select the framework (Vite)
- Deploy

### 2. Share the Public URL

After deployment, you'll get a URL like:
```
https://warehouse-24.vercel.app
```

Share this URL with your team - they can access the live 3D model without installing anything.

### 3. Auto-Deploy on Changes

Connect your git repository to Vercel for automatic deployments on push.

## MCP Server Configuration

### 1. Set Up MCP Service

Update `src/services/d365Service.ts` with your MCP server details:

```typescript
const MCP_SERVER_URL = 'https://your-mcp-server.com';
const COMPANY_ID = 'USMF';
```

### 2. Required MCP Endpoints

The app expects these endpoints:

**GET/POST `/api/warehouse-locations`**
- Returns array of warehouse locations for Warehouse 24
- Expected response format:
  ```json
  {
    "locations": [
      {
        "LocationId": "A-01-01-01",
        "LocationName": "A-01-01-01",
        "Aisle": 1,
        "Rack": 1,
        "Shelf": 1,
        "Bin": 1,
        "Capacity": 100,
        "CurrentQuantity": 75,
        "ItemNumber": "ITEM-001",
        "LastUpdated": "2026-04-16T10:30:00Z"
      }
    ]
  }
  ```

**EventSource `/api/warehouse-updates`**
- Real-time updates via Server-Sent Events
- Emits location changes as they happen in D365

### 3. Test Without MCP (Mock Data)

If MCP isn't ready, modify `src/services/d365Service.ts` to use mock data:

```typescript
export async function fetchWarehouseLocations(): Promise<WarehouseLocation[]> {
  // Mock data for testing
  return [
    {
      locationId: 'A-01-01-01',
      name: 'A-01-01-01',
      aisle: 1, rack: 1, shelf: 1, bin: 1,
      x: 2, y: 2, z: 1.5,
      capacity: 100,
      currentQuantity: 75,
      itemNumber: 'ITEM-001',
      lastUpdated: new Date(),
    },
    // Add more mock locations...
  ];
}
```

## D365 Integration Details

### Warehouse 24 Location Hierarchy

Locations are automatically positioned in 3D space based on:
- **X-axis**: Aisle position (Aisle * 2 units)
- **Y-axis**: Rack position (Rack * 2 units)
- **Z-axis**: Shelf height (Shelf * 1.5 units)

### Live Updates

The app:
1. **Initial Load**: Fetches all locations on startup
2. **Real-time Sync**: Subscribes to location updates via EventSource
3. **Fallback Polling**: Every 30 seconds if real-time unavailable
4. **Status Bar**: Shows connection status (Green = Connected, Yellow = Syncing, Red = Error)

## Usage

### Navigation
- **Rotate**: Click + Drag mouse
- **Zoom**: Scroll wheel
- **Pan**: Right-click + Drag

### Interaction
- **Click Location**: View details panel on right
- **Close Panel**: Click the ✕ button
- **Refresh**: Click "Sync" button in status bar
- **Copy ID**: Click "Copy Location ID" button

### Color Legend
- 🟢 **Green**: 0-50% capacity (plenty of space)
- 🟡 **Yellow**: 50-80% capacity (moderate fill)
- 🔴 **Red**: 80-100% capacity (nearly full)

## Production Checklist

Before deploying to production:

- [ ] Configure MCP_SERVER_URL in `src/services/d365Service.ts`
- [ ] Test D365 API endpoints are accessible
- [ ] Enable CORS on MCP server for your domain
- [ ] Add environment variables for sensitive data
- [ ] Test with real Warehouse 24 data
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure Vercel environment variables
- [ ] Test on multiple browsers and devices
- [ ] Set up custom domain (optional)

## Environment Variables

Create `.env.local` (dev) and configure in Vercel dashboard (production):

```env
VITE_MCP_SERVER_URL=https://your-mcp-server.com
VITE_WAREHOUSE_ID=24
VITE_COMPANY_ID=USMF
```

## Troubleshooting

### "No locations found"
- Check MCP server is running
- Verify warehouse 24 has locations in D365
- Check network tab for failed API calls

### "Can't rotate/zoom"
- Ensure Three.js is loaded (check console for errors)
- Try different browser
- Clear browser cache

### "Live updates not working"
- EventSource requires EventStream MIME type
- App falls back to 30-second polling
- Check browser console for EventSource errors

## Architecture

```
src/
├── components/
│   ├── WarehouseViewer.tsx    # 3D Canvas with Three.js
│   ├── LocationPanel.tsx       # Details sidebar
│   └── StatusBar.tsx           # Connection status
├── hooks/
│   └── useWarehouseData.ts     # Data fetching & polling
├── services/
│   └── d365Service.ts          # MCP API calls
├── store/
│   └── warehouseStore.ts       # Zustand state management
├── types/
│   ├── warehouse.ts            # TypeScript interfaces
│   └── three-fiber.d.ts        # Three.js type definitions
└── App.tsx                     # Main component
```

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build**: Vite
- **3D Graphics**: Three.js r158
- **3D React Bindings**: @react-three/fiber + Drei
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Support

For issues or questions:
1. Check browser console for errors
2. Verify MCP server connectivity
3. Check D365 has Warehouse 24 locations
4. Review network requests in DevTools

---

**Last Updated**: April 16, 2026  
**Warehouse ID**: 24  
**Company**: USMF
