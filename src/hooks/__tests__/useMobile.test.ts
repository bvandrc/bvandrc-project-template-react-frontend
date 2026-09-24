import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { isTouchDevice, useIsMobile } from '../useMobile'

/** Replaces jsdom's missing `matchMedia` with one that answers from `matches`. */
const stubMatchMedia = (matches: (query: string) => boolean) =>
  vi.stubGlobal(
    'matchMedia',
    (query: string) =>
      ({
        matches: matches(query),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) satisfies MediaQueryList
  )

/** Answers `max-width` queries as a viewport `width` pixels wide would. */
const stubViewportWidth = (width: number) =>
  stubMatchMedia((query) => {
    const maxWidth = /\(max-width: (\d+)px\)/.exec(query)?.[1]
    return maxWidth !== undefined && width <= Number(maxWidth)
  })

describe('useIsMobile', () => {
  it('is true below 768px', () => {
    for (const width of [
      320,
      767, // the last width before Tailwind's `md`
    ]) {
      stubViewportWidth(width)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current, String(width)).toBe(true)
    }
  })

  it('is false from 768px up', () => {
    for (const width of [
      768, // Tailwind's `md`, where the layout switches
      1280,
    ]) {
      stubViewportWidth(width)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current, String(width)).toBe(false)
    }
  })
})

describe('isTouchDevice', () => {
  it('is true when the primary pointer is coarse', () => {
    stubMatchMedia((query) => query === '(pointer: coarse)')

    expect(isTouchDevice()).toBe(true)
  })

  it('is false when the primary pointer is fine', () => {
    stubMatchMedia(() => false)

    expect(isTouchDevice()).toBe(false)
  })
})
