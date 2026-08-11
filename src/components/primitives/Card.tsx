import classNames from 'classnames'
import type { HTMLAttributes } from 'react'

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames(
      'rounded-xl border border-border bg-surface p-5',
      className
    )}
    {...props}
  />
)
