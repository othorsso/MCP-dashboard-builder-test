# Warehouse 24 3D Viewer

🏭 **Real-time 3D visualization of Warehouse 24** with live D365 USMF integration via MCP server.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

Open **http://localhost:5173** and interact with the 3D warehouse model.

### Production (Shared via Vercel)
```bash
npm run build
vercel deploy
```

Share the generated URL with your team - no installation needed!

## ✨ Features

- **3D Interactive Viewer** - Rotate, zoom, and pan the warehouse layout
- **Warehouse 24 Only** - Filtered data for Warehouse 24 in USMF company
- **Live D365 Updates** - Real-time synchronization with Dynamics 365 locations
- **Location Details** - Click any location to view inventory info
- **Capacity Visualization** - Color-coded fill levels (Green → Yellow → Red)
- **Connection Status** - Real-time sync indicator in status bar
- **Shareable URLs** - Single URL works for everyone, no app install needed

## 📊 What You See

```
Status Bar (Top)
├── Warehouse 24 title
├── Location count
├── Connection status (Green/Yellow/Red)
└── Sync button

3D Canvas (Center)
├── Warehouse floor grid
├── Location boxes (color-coded by capacity)
└── Interactive navigation (click to select)

Details Panel (Right - when location selected)
├── Location ID & name
├── Aisle/Rack/Shelf/Bin coordinates
├── Inventory quantity vs capacity
├── Fill percentage bar
└── Action buttons
```

## 🎮 Navigation

| Action | Control |
|--------|---------|
| Rotate | Click + Drag |
| Zoom | Scroll Wheel |
| Pan | Right-Click + Drag |
| Select Location | Click Location Box |

## 🔌 MCP Server Integration

The app connects to your D365 USMF company through an MCP server.

### Configuration

Edit `src/services/d365Service.ts`:
```typescript
const MCP_SERVER_URL = 'https://your-mcp-server.com';
const COMPANY_ID = 'USMF';
```

### Expected API Response

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

### Real-Time Updates

The app subscribes to `/api/warehouse-updates` EventSource for live changes. Falls back to 30-second polling if unavailable.

## 📁 Project Structure

```
src/
├── components/
│   ├── WarehouseViewer.tsx     # 3D Canvas & Three.js scene
│   ├── LocationPanel.tsx        # Location details sidebar
│   └── StatusBar.tsx            # Status & sync controls
├── hooks/
│   └── useWarehouseData.ts      # Data loading & real-time sync
├── services/
│   └── d365Service.ts           # MCP API integration
├── store/
│   └── warehouseStore.ts        # Zustand state management
├── types/
│   ├── warehouse.ts             # TypeScript interfaces
│   └── three-fiber.d.ts         # Three.js JSX types
└── App.tsx                      # Main component
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **3D Rendering**: Three.js r158
- **React 3D**: @react-three/fiber + Drei
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📦 Scripts

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## 🌐 Sharing with Your Team

1. **Deploy**: `vercel deploy` (or commit to GitHub + Vercel auto-deploy)
2. **Share URL**: Copy the generated URL (e.g., `https://warehouse-24.vercel.app`)
3. **Team Access**: Anyone with the link can view the 3D model in their browser

No installation required on the recipient's end!

## 🐛 Troubleshooting

### "No locations found"
- Verify MCP server is running and accessible
- Check D365 has warehouse 24 locations
- Inspect browser console for errors

### "Can't interact with 3D model"
- Try a different browser (Chrome recommended)
- Clear browser cache
- Check Three.js loaded in browser DevTools

### "Updates not showing"
- EventSource/polling might be disabled - check console
- Verify MCP endpoint is accessible
- Check CORS settings on MCP server

## 📋 Deployment Checklist

- [ ] Update `MCP_SERVER_URL` in `src/services/d365Service.ts`
- [ ] Test MCP endpoints are accessible from Vercel
- [ ] Enable CORS on MCP server for your domain
- [ ] Add environment variables in Vercel dashboard
- [ ] Test with real Warehouse 24 data
- [ ] Verify 3D performance on target devices
- [ ] Set custom domain (optional)
- [ ] Configure error monitoring

## 📚 More Information

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Detailed Vercel deployment steps
- MCP server configuration
- Environment variable setup
- Production checklist
- Architecture details

## 👥 License

Internal use - Engage

---

**Warehouse**: 24  
**Company**: USMF  
**Last Updated**: April 16, 2026

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
