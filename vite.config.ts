/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { BASE_PATH } from './site.config'

export default defineConfig(() => ({
  base: BASE_PATH,
  plugins: [tailwindcss(), react()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  } as const,
  build: {
    target: 'esnext',
    modulePreload: false,
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    restoreMocks: true,
    unstubGlobals: true,
    // Vitest serves `BASE_URL` as '/' whatever `base` says; match the deploy.
    env: { BASE_URL: BASE_PATH },
  },
}))
