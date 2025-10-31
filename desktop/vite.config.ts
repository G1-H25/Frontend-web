import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/Login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/Signup': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/Delivery': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
  },
})
