import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'

const buttonVariants = cva(
  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-accent text-accent-ink hover:bg-accent-hover',
        outline:
          'border border-border text-ink hover:border-accent hover:text-accent',
      },
    },
    defaultVariants: { variant: 'solid' },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = ({
  variant,
  className,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(buttonVariants({ variant }), className)}
    {...props}
  />
)
