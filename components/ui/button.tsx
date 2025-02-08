import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
    Typography,
    TypographyVariant,
    typographyVariants,
} from "../Typography";

export const buttonVariantVariantDefinition = {
    default: /* tw */ "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
        /* tw */ "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
        /* tw */ "border-[1.5px] border-[var(--button-primary)] text-[var(--button-primary)] bg-transparent",
    secondary:
        /* tw */ "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: /* tw */ "hover:bg-accent hover:text-accent-foreground",
    link: /* tw */ "text-primary underline-offset-4 hover:underline",
} as const;

export const buttonSizeVariantDefinition = {
    default: /* tw */ "h-10 px-4 py-2",
    custom: /* tw */ "",
    sm: /* tw */ "px-2 py-[0.3125rem] rounded-sm min-h-[1.625rem]",
    lg: /* tw */ " rounded-[0.625rem] p-3 min-h-[3rem]",
    icon: /* tw */ "h-10 w-10",
} as const;

export const buttonThemeVariantDefinition = {
    none: /* tw */ "",
    white: /* tw */ "[--button-secondary:hsl(var(--itm-black))] [--button-primary:hsl(var(--itm-white))]",
    black: /* tw */ "[--button-secondary:hsl(var(--itm-white))] [--button-primary:hsl(var(--itm-black))]",
    gray: /* tw */ "[--button-secondary:hsl(var(--itm-black))] [--button-primary:hsl(var(--itm-gray))]",
} as const;

const buttonVariants = cva(
    /* tw */ "inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: buttonVariantVariantDefinition,
            size: buttonSizeVariantDefinition,
            theme: buttonThemeVariantDefinition,
            expand: {
                true: /* tw */ "w-full",
                false: /* tw */ "",
            },
        },
        defaultVariants: {
            variant: "default",
            expand: false,
            size: "default",
            theme: "black",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    typography?: TypographyVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            expand,
            theme,
            typography = "none",
            asChild = false,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, theme, expand }),
                    typographyVariants({ variant: typography }),
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

const ContactButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <Typography variant="body03" asChild>
                <Button
                    theme="black"
                    size="custom"
                    ref={ref}
                    className={cn(
                        "rounded-[0.5rem] h-[2.875rem] py-1.5 px-3",
                        className
                    )}
                    {...props}
                />
            </Typography>
        );
    }
);
ContactButton.displayName = "ContactButton";

export { ContactButton, Button, buttonVariants };
