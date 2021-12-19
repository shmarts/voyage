import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import { chromeExtension } from 'vite-plugin-chrome-extension'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ['vue'],
    }),
    chromeExtension(),
  ],
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
