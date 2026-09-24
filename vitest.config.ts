import { defineConfig, mergeConfig } from 'vitest/config'

import { BASE_PATH } from './site.config'
import viteConfig from './vite.config'

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    test: {
      environment: 'happy-dom',
      include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
      setupFiles: ['./vitest.setup.ts'],
      restoreMocks: true,
      unstubGlobals: true,
      // Vitest serves `BASE_URL` as '/' whatever `base` says; match the deploy.
      env: { BASE_URL: BASE_PATH },
    },
  })
)
