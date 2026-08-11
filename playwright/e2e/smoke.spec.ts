import { expect, test } from '@playwright/test'

import { SELECTORS } from '~/pw/support/constants/selectors'

const { HEADER, FEATURE_LIST, FOOTER } = SELECTORS

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('React Frontend Template')
  await expect(page.locator(HEADER.TITLE)).toHaveText('React Frontend Template')
  await expect(page.locator(HEADER.LOGO)).toBeVisible()
  await expect(page.locator(FEATURE_LIST.CARD.SELF)).toHaveCount(8)
  await expect(page.locator(FOOTER)).toBeVisible()
})
