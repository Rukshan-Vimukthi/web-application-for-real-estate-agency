import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8001,
    // host: '192.168.43.133',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        // target: 'http://192.168.43.133:8000',
        changeOrigin: true
      }
    }
  }
})
