import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
    '@': path.resolve(__dirname, './src'),
    },
    },

  server: {
    hmr: {
      overlay: false, // Disable the overlay for HMR
    },
    port: 5176, // port 5175 configuration goes here
}})