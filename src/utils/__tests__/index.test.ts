import { cn, pluralize } from '../index'

describe('cn', () => {
  it('lets a later Tailwind utility win a conflict', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('drops falsy classes', () => {
    expect(cn('flex', false, undefined, 'gap-2')).toBe('flex gap-2')
  })
})

describe('pluralize', () => {
  it('uses the singular for exactly one', () => {
    expect(pluralize(1, 'feature')).toBe('1 feature')
  })

  it('uses the plural for any other count', () => {
    for (const count of [
      0, // zero reads as plural in English
      2,
    ]) {
      expect(pluralize(count, 'feature'), String(count)).toBe(
        `${count} features`
      )
    }
  })

  it('takes an irregular plural', () => {
    expect(pluralize(3, 'entry', 'entries')).toBe('3 entries')
  })
})
