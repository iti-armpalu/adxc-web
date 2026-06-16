import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary border-transparent text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary border-transparent text-secondary-foreground [a]:hover:bg-secondary/80",
        outline: "bg-transparent border-border text-foreground [a]:hover:bg-muted",
        ghost: "bg-transparent border-transparent text-foreground [a]:hover:bg-muted",
        destructive: "bg-destructive/10 border-transparent text-destructive focus-visible:ring-destructive/20 [a]:hover:bg-destructive/20",
      },
      shape: {
        default: "rounded-xs",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  shape = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }