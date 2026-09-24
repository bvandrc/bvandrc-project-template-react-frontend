import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../Button'

describe('Button', () => {
  it("defaults to type='button', so it never submits a surrounding form", () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'button'
    )
  })

  it("lets a className override the variant's utilities", () => {
    render(
      <Button variant="outline" className="text-tone-positive">
        Save
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveClass('text-tone-positive')
    expect(button).not.toHaveClass('text-ink')
  })
})
