import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // server: {
  //   host: '192.168.1.7', // Replace with your IP address
  //   port: 5173, // Or your preferred port
  //   // optional, but recommended
  //   hmr: {
  //       host: '192.168.1.7',
  //   },
  // },
})


