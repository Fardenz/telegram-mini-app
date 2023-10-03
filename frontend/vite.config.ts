/// <reference types="vitest" />
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "url"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "/telegram-mini-app/",
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
    environment: "happy-dom",
    setupFiles: ["./setupTest.ts"],
  },
  resolve: {
    alias: {
      "@assets": `${process.cwd()}/src/assets`,
      "@components": `${process.cwd()}/src/components`,
      "@contexts": `${process.cwd()}/src/contexts`,
      "@hooks": `${process.cwd()}/src/hooks`,
      "@helpers": `${process.cwd()}/src/helpers`,
      "@i18n": `${process.cwd()}/src/i18n`,
      "@infrastructure": `${process.cwd()}/src/infrastructure`,
      "@layouts": `${process.cwd()}/src/layouts`,
      "@router": `${process.cwd()}/src/router`,
      "@services": `${process.cwd()}/src/services`,
      "@shared": `${process.cwd()}/src/shared`,
      "@styles": `${process.cwd()}/src/styles`,
      "@types": `${process.cwd()}/src/types`,
      "@views": `${process.cwd()}/src/views`,
    },
  },
})
