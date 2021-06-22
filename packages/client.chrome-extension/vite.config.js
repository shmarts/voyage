import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chromeExtension } from 'vite-plugin-chrome-extension'
import path from 'path'

export default defineConfig({
  plugins: [vue(), chromeExtension()],
  resolve: {
    alias: {
      '@voyage': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: 'src/manifest.json',
    },
  },
})
