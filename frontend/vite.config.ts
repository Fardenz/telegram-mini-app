/// <reference types="vitest" />
import { defineConfig } from 'vite'
import {fileURLToPath, URL} from "url"
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/telegram-mini-app/',
  server: {
    port: 4000,
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
  envDir: fileURLToPath(new URL("./env", import.meta.url)),
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTest.ts']
  },
})
