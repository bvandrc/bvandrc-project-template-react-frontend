import { expect, test } from '@playwright/test'

import { SELECTORS } from '~/pw/support/constants/selectors'
import { checkA11y } from './accessibility'

test.describe('Accessibility', () => {
  test('Home page', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId(SELECTORS.HEADER.TITLE)).toBeVisible()
    await expect(
      page.getByTestId(SELECTORS.FEATURE_LIST.CARD.SELF).first()
    ).toBeVisible()

    await checkA11y(page)
  })
})
