import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  Fragment,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-smooth",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    // Every variant shares the same press feedback.
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary/88 hover:shadow-elevated",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90",
        outline:
          "border border-border bg-background/60 backdrop-blur-sm hover:bg-secondary hover:border-foreground/25 hover:shadow-elevated",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-secondary/70",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        xl: "h-12 rounded-md px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}

const addClassNameRecursively = (
  children: ReactNode,
  className: string
): ReactNode => {
  const foo = (child: ReactNode): ReactNode => {
    if (!isValidElement(child)) return child;

    const childProps = child.props as Record<string, unknown>;
    // Fragments accept only key/ref/children — cloning one with a className
    // triggers a React warning and drops the class anyway. Recurse through it.
    if (child.type === Fragment) {
      return addClassNameRecursively(childProps.children as ReactNode, className);
    }
    return cloneElement(child, {
      className: `${(childProps.className as string) || ""} ${className}`.trim(),
      children: addClassNameRecursively(childProps.children as ReactNode, className),
    } as Record<string, unknown>);
  };
  return Children.map(children, foo);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "cursor-can-hover"
        )}
        ref={ref}
        {...props}
      >
        {/* add pointer-events-none to every child recursively */}
        {addClassNameRecursively(children, "pointer-events-none")}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
