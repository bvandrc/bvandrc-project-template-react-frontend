import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../Button'

describe('Button', () => {
  it("defaults to type='button', so it never submits a surrounding form", () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'button'
    )
  })

  it('keeps an explicit type', () => {
    render(<Button type="submit">Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'submit'
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

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it("doesn't call onClick while disabled", async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>
    )

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).not.toHaveBeenCalled()
  })
})
