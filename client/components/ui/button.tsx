import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 border-b-[3px] border-blue-800 text-primary-foreground shadow hover:bg-blue-500/80 active:border-b",
        destructive:
          "bg-rose-500 border-b-[3px] border-rose-800 text-destructive-foreground shadow-sm hover:bg-destructive/70 active:border-b",
        outline:
          "border border-input border-b-[3px] border-blue-500 bg-background text-blue-500 shadow-sm hover:bg-blue-100 active:border-b",
        secondary:
          "bg-secondary border-b-[3px] text-secondary-foreground shadow-sm hover:bg-secondary/80 active:border-b active:border-b",
        ghost:
          "border-b-[3px] border-gray-100 hover:bg-accent hover:text-accent-foreground active:border-b",
        link: "border-b-[3px] border-blue-50 text-primary   underline-offset-4 hover:underline  hover:border-blue-400 hover:text-blue-500 active:border-b ",
        success:
          "bg-green-400 border-b-[3px] border-green-800 text-white shadow-sm hover:bg-green-500/70 active:border-b",
        warning:
          "bg-yellow-400 border-b-[3px] border-yellow-800 text-white shadow-sm hover:bg-yellow-500/70 active:border-b",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      border: {
        notActive: "border",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      border: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, border, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, border, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
