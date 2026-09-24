import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '../Card'

describe('Card', () => {
  it("lets a className override the card's own utilities", () => {
    render(<Card className="p-2">Content</Card>)
    const card = screen.getByText('Content')

    expect(card).toHaveClass('p-2')
    expect(card).not.toHaveClass('p-5')
  })

  it('passes DOM props through to the div', () => {
    render(<Card role="note">Content</Card>)

    expect(screen.getByRole('note')).toHaveTextContent('Content')
  })
})
