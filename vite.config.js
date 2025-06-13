import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['narabaca.raidenxvr.my.id'],
    host: true, // important to listen on all interfaces
    port: 5173, // or whatever port your Vite app is using
  },
})
