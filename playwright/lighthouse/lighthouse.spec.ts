import { expect } from '@playwright/test'
import { desktopConfig } from 'lighthouse'

import { lighthouseTest as test } from './fixtures'

test('Home page', async ({ page, runAudit }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  await runAudit({
    name: 'home-desktop',
    lighthouseArgs: { config: desktopConfig },
  })
  await runAudit({ name: 'home-mobile' })
})
