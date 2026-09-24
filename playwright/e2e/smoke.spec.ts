import { expect, test } from '@playwright/test'

import { SELECTORS } from '~/test-support/selectors'

const { HEADER, FEATURE_LIST, FOOTER } = SELECTORS

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('React Frontend Template')
  await expect(page.getByTestId(HEADER.TITLE)).toHaveText(
    'React Frontend Template'
  )
  await expect(page.getByTestId(HEADER.LOGO)).toBeVisible()
  await expect(page.getByTestId(FEATURE_LIST.CARD.SELF)).toHaveCount(8)
  await expect(page.getByTestId(FOOTER)).toBeVisible()
})
