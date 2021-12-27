import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { crx3 } from 'vite-plugin-vue-crx3'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ['vue'],
    }),
    crx3(),
  ],
  resolve: {
    alias: {
      '@voyage': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/manifest.json'), // Use the manifest.json in the source code as the entry File
    },
  },
})
