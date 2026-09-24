import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SELECTORS } from '~/pw/support/constants/selectors'
import { FeatureList } from '../FeatureList'

const { CARD } = SELECTORS.FEATURE_LIST

describe('FeatureList', () => {
  it('gives every card a name, a status, and a description', () => {
    render(<FeatureList />)
    const cards = screen.getAllByTestId(CARD.SELF)

    expect(cards.length).toBeGreaterThan(0)
    for (const card of cards) {
      const name = within(card).getByTestId(CARD.NAME).textContent
      for (const testId of [CARD.NAME, CARD.STATUS, CARD.DESCRIPTION]) {
        expect(
          within(card).getByTestId(testId),
          `${name}: ${testId}`
        ).not.toBeEmptyDOMElement()
      }
    }
  })

  it('styles status badges by status, so matching statuses look alike', () => {
    render(<FeatureList />)
    const classNamesByStatus = new Map<string, Set<string>>()

    for (const badge of screen.getAllByTestId(CARD.STATUS)) {
      const status = badge.textContent ?? ''
      const classNames = classNamesByStatus.get(status) ?? new Set()
      classNamesByStatus.set(status, classNames.add(badge.className))
    }

    // several statuses, or this can't tell them apart
    expect(classNamesByStatus.size).toBeGreaterThan(1)
    for (const [status, classNames] of classNamesByStatus) {
      expect(classNames.size, status).toBe(1)
    }
    const distinct = new Set(
      [...classNamesByStatus.values()].flatMap((classNames) => [...classNames])
    )
    expect(distinct.size).toBe(classNamesByStatus.size)
  })
})
