import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      environment: 'happy-dom',
      globals: true,
      include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
      restoreMocks: true,
      unstubGlobals: true,
    },
  })
)
