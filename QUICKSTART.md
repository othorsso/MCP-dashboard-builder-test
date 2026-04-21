# Quick Start

## 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

## 2. Start the dev server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

## 3. Build for production

```bash
npm run build
```

## 4. Deploy to Vercel

See [skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md](./skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md) for the full flow.

## 5. Build your own dashboard

Open [skill-react-dashboard-builder/SKILL.md](./skill-react-dashboard-builder/SKILL.md) and follow the step-by-step guide.

---

## Step 1: Start Development Server (2 min)

```bash
cd "path/to/testing VS code workspace"
npm install
npm run dev
```

Your app is now running at **http://localhost:5173** 🎉

Open this URL in your browser to see the 3D warehouse.

---

## Step 2: Connect to D365 (10 min)

Before locations appear, you need to connect your MCP server.

### Option A: You Have MCP Server Running

1. Open `src/services/d365Service.ts`
2. Update this line:
   ```typescript
   const MCP_SERVER_URL = 'http://your-mcp-server.com';
   ```
3. Make sure `/api/warehouse-locations` endpoint exists
4. App will fetch and display locations automatically

### Option B: Test with Mock Data

1. Replace the `fetchWarehouseLocations()` function with:
   ```typescript
   export async function fetchWarehouseLocations(): Promise<WarehouseLocation[]> {
     return [
       {
         locationId: 'A-01-01-01',
         name: 'Location A-01',
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
2. Restart the dev server: `npm run dev`

---

## Step 3: Share with Your Team (5 min)

### Using Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and get your public URL
# Something like: https://warehouse-24.vercel.app
```

### Share the URL

Send this URL to your team:
```
https://warehouse-24.vercel.app
```

They can click it immediately - no installation needed! 👍

### Auto-Deploy on Updates

Push to GitHub → Vercel auto-deploys. Your team always sees the latest version.

---

## Step 4: Configure Production (Optional)

Create `.env.local` in project root:

```env
VITE_MCP_SERVER_URL=https://your-mcp-server.com
VITE_WAREHOUSE_ID=24
VITE_COMPANY_ID=USMF
```

Or set these in Vercel dashboard:
1. Go to Vercel project settings
2. → Environment Variables
3. Add the above 3 variables

---

## Using the App

### View the 3D Model
- **Rotate**: Click + drag mouse
- **Zoom**: Scroll wheel
- **Pan**: Right-click + drag
- **Select Location**: Click any location box

### Location Details
Click a location to see:
- Aisle/Rack/Shelf/Bin coordinates
- Current inventory level
- Capacity percentage
- Item number (if any)

### Connection Status
Top of screen shows:
- 🟢 Green = Connected & synced
- 🟡 Yellow = Syncing now
- 🔴 Red = Connection error

---

## Expected Behavior

### With Real D365 Data
1. Start app → Loads locations from MCP server
2. Click a location → Details panel appears
3. Update location in D365 → App updates in real-time
4. Add new location in D365 → 3D model updates

### With Mock Data
1. Start app → Shows hardcoded test locations
2. Perfect for testing 3D interaction
3. Switch to real data when ready

---

## Common Issues

| Problem | Solution |
|---------|----------|
| No locations showing | Check MCP server URL is correct in `d365Service.ts` |
| Can't interact with 3D | Try Chrome browser, clear cache |
| Updates not showing | Check browser console for errors, verify MCP endpoint |
| Deploy fails | Run `vercel logs` to see detailed error messages |

---

## File Locations

| What | File |
|------|------|
| Main app | `src/App.tsx` |
| 3D rendering | `src/components/WarehouseViewer.tsx` |
| D365 connection | `src/services/d365Service.ts` |
| Data fetching | `src/hooks/useWarehouseData.ts` |
| State management | `src/store/warehouseStore.ts` |

---

## Next Steps

1. ✅ Get dev server running locally
2. ✅ Connect to D365 or use mock data
3. ✅ Test 3D interactions
4. ✅ Deploy to Vercel
5. ✅ Share URL with team
6. ✅ Monitor and update as needed

---

## Need Help?

Check:
1. [README.md](./README.md) - Full documentation
2. [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
3. Browser console (F12) - Error messages
4. `src/services/d365Service.ts` - MCP integration code

---

**Your app is now ready to share! 🎉**

Get the public URL from Vercel and send it to your team.

They'll see the live 3D warehouse in their browser within seconds.
