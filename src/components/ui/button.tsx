import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap active-scale focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue/50 disabled:pointer-events-none disabled:opacity-50 text-button transition-all duration-150',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary rounded-pill px-[15px] py-[10px]',
        secondary: 'bg-surface-1 text-ink rounded-pill px-[15px] py-[10px] hover:bg-surface-2',
        translucent: 'bg-surface-2 text-ink rounded-xxl px-[14px] py-[8px]',
        'icon-circular': 'bg-surface-1 text-ink rounded-full size-[40px] hover:bg-surface-2',
        ghost: 'hover:bg-surface-1 text-ink rounded-pill px-[15px] py-[10px]',
        link: 'text-accent-blue underline-offset-4 hover:underline px-[15px] py-[10px]',
        outline: 'border border-hairline bg-transparent hover:bg-surface-1 text-ink rounded-pill px-[15px] py-[10px]',
        gold: 'bg-gold text-canvas hover:opacity-90 rounded-pill px-[15px] py-[10px] font-semibold',
      },
      size: {
        default: '',
        sm: 'text-xs px-[12px] py-[6px] h-auto rounded-sm',
        lg: 'text-body-lg px-[20px] py-[12px] h-auto rounded-pill',
        icon: 'size-[40px] p-0 flex items-center justify-center rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
