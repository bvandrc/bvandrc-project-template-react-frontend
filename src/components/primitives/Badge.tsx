import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'rounded-full border border-current px-2 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      tone: {
        positive: 'text-tone-positive',
        caution: 'text-tone-caution',
        neutral: 'text-tone-neutral',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
)

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>

export const Badge = ({
  tone,
  children,
  ...props
}: VariantProps<typeof badgeVariants> &
  React.HTMLAttributes<HTMLSpanElement> & {
    children: React.ReactNode
  }) => (
  <span className={badgeVariants({ tone })} {...props}>
    {children}
  </span>
)
