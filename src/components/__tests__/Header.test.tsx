import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SELECTORS } from '~/pw/support/constants/selectors'
import { Header } from '../Header'

describe('Header', () => {
  it('serves the logo from under the base path', () => {
    render(<Header />)

    // The Vite config sets BASE_URL to the Pages subpath for tests, where a
    // leading-slash `/logo.svg` would 404.
    expect(import.meta.env.BASE_URL).not.toBe('/')
    expect(screen.getByTestId(SELECTORS.HEADER.LOGO)).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}logo.svg`
    )
  })

  it('titles the page with a single top-level heading', () => {
    render(<Header />)

    expect(screen.getByRole('heading', { level: 1 })).toBe(
      screen.getByTestId(SELECTORS.HEADER.TITLE)
    )
  })
})
