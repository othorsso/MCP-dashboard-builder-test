import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    proxy: {
      // Dev proxy: /api/d365/* → D365FO directly.
      // ⚠ In dev, requests are unauthenticated — use `vercel dev` with D365 env vars
      //   for a fully authenticated local test. The proxy here keeps the URL shape
      //   consistent with production (where the Vercel Edge Function handles auth).
      '/api/d365': {
        target: 'https://en-tier2.sandbox.operations.dynamics.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/d365/, '/data'),
        secure: true,
      },
    },
  },
})
