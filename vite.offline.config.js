import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build config that produces ONE self-contained HTML file (no internet needed)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
  ],
  build: {
    outDir: 'offline',
    assetsInlineLimit: Infinity,
  },
})

