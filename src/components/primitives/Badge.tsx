import classNames from 'classnames'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTone = 'positive' | 'caution' | 'neutral'

const TONE_CLASSES = {
  positive: 'text-tone-positive',
  caution: 'text-tone-caution',
  neutral: 'text-tone-neutral',
} satisfies Record<BadgeTone, string>

export const Badge = ({
  tone = 'neutral',
  children,
  ...props
}: {
  tone?: BadgeTone
  children: ReactNode
} & HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={classNames(
      'rounded-full border border-current px-2 py-0.5 text-xs font-medium whitespace-nowrap',
      TONE_CLASSES[tone]
    )}
    {...props}>
    {children}
  </span>
)
