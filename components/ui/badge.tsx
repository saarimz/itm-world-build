import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Typography } from "../Typography";
import { buttonThemeVariantDefinition } from "./button";

const badgeVariants = cva(
    /* tw */ "inline-flex items-center text-center rounded-sm  justify-center min-w-[1.1875rem] md:min-w-[1.875rem] px-1 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    /* tw */ "border border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    /* tw */ "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    /* tw */ "border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline:
                    /* tw */ "border-[1px] border-[var(--button-primary)] text-[var(--button-primary)] bg-transparent",
                filled: /* tw */ "bg-[--button-primary] text-[--button-secondary]",
                rounded: /* tw */ "bg-[#f4f4f4] border rounded-full text-black py-1 px-4 font-normal"
            },
            theme: buttonThemeVariantDefinition,
        },
        defaultVariants: {
            variant: "filled",
            theme: "black",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, theme, ...props }: BadgeProps) {
    return (
        <Typography
            variant="custom"
            className="font-sans text-[0.375rem] md:text-[0.5625rem] tracking-[-0.02em] leading-[1]"
        >
            <div
                className={cn(badgeVariants({ variant, theme }), className)}
                {...props}
            />
        </Typography>
    );
}

export { Badge, badgeVariants };
