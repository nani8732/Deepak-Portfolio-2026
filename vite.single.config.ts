import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Single-bundle build used to produce one self-contained HTML file.
export default defineConfig({ base: './', plugins: [react(), tailwindcss()],
  build: { outDir: 'dist-single', assetsInlineLimit: 100000000, cssCodeSplit: false, chunkSizeWarningLimit: 4000, rollupOptions: { output: { inlineDynamicImports: true } } } })
