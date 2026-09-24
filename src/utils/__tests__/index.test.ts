import { describe, expect, it } from 'vitest'

import { cn, pluralize } from '../index'

describe('cn', () => {
  it('drops falsy values', () => {
    expect(cn('px-2', false, null, undefined, '', 'text-sm')).toBe(
      'px-2 text-sm'
    )
  })

  it('accepts clsx object and array syntax', () => {
    expect(cn(['px-2', { 'text-sm': true, 'font-bold': false }])).toBe(
      'px-2 text-sm'
    )
  })

  it('lets a later Tailwind utility win a conflict', () => {
    expect(cn('px-2 text-sm', 'px-4')).toBe('text-sm px-4')
  })
})

describe('pluralize', () => {
  it('uses the singular for exactly one', () => {
    expect(pluralize(1, 'feature')).toBe('1 feature')
  })

  it('uses the plural for every other count', () => {
    for (const count of [
      0, // English pluralizes zero
      2,
      1.5, // a fraction isn't "one"
    ]) {
      expect(pluralize(count, 'feature'), String(count)).toBe(
        `${count} features`
      )
    }
  })

  it('takes an irregular plural', () => {
    expect(pluralize(1, 'person', 'people')).toBe('1 person')
    expect(pluralize(2, 'person', 'people')).toBe('2 people')
  })
})
