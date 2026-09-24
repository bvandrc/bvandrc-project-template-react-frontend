import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders the neutral tone when none is given', () => {
    render(
      <>
        <Badge>Default</Badge>
        <Badge tone="neutral">Neutral</Badge>
      </>
    )

    expect(screen.getByText('Default')).toHaveClass(
      screen.getByText('Neutral').className,
      { exact: true }
    )
  })

  it('renders each tone differently', () => {
    render(
      <>
        <Badge tone="positive">Positive</Badge>
        <Badge tone="caution">Caution</Badge>
        <Badge tone="neutral">Neutral</Badge>
      </>
    )
    const classNames = ['Positive', 'Caution', 'Neutral'].map(
      (text) => screen.getByText(text).className
    )

    expect(new Set(classNames).size).toBe(classNames.length)
  })

  it('passes DOM props through to the span', () => {
    render(<Badge title="Ready to use">Stable</Badge>)

    expect(screen.getByText('Stable')).toHaveAttribute('title', 'Ready to use')
  })
})
