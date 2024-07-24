import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), nodePolyfills()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    host: '0.0.0.0',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis',
      },
      supported: { bigint: true },
    },
  },
  build: {
    target: 'esnext',
  },
})
