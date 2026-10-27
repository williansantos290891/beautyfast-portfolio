import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...values: ClassValue[]) { return twMerge(clsx(values)); }
const variants = cva('inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none [&_svg]:h-4 [&_svg]:w-4', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-border bg-card hover:bg-muted text-foreground',
      ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted'
    },
    size: { default: 'min-h-11 px-5 py-2', sm: 'min-h-9 px-3 py-2', icon: 'h-11 w-11' }
  },
  defaultVariants: { variant: 'default', size: 'default' }
});
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, Props>(({ asChild, variant, size, className, ...props }, ref) => {
  const Component = asChild ? Slot : 'button';
  return <Component ref={ref} className={cn(variants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';
