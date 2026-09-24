import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      environment: 'happy-dom',
      include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
      setupFiles: ['./vitest.setup.ts'],
      restoreMocks: true,
      unstubGlobals: true,
    },
  })
)
