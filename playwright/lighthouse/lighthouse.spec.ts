import { expect } from '@playwright/test'
import { desktopConfig } from 'lighthouse'

import { SELECTORS } from '~/pw/support/constants/selectors'
import { lighthouseTest as test } from './fixtures'

test('Home page', async ({ page, runAudit }) => {
  await page.goto('/')
  await expect(page.getByTestId(SELECTORS.HEADER.TITLE)).toBeVisible()

  await runAudit({
    name: 'home-desktop',
    lighthouseArgs: { config: desktopConfig },
  })
  await runAudit({ name: 'home-mobile' })
})
