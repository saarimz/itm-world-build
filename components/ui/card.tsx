import * as React from "react";

import { cn } from "@/lib/utils";
import { Typography } from "../Typography";
import { VariantProps, cva } from "class-variance-authority";

export const colorThemes = {
    none: /* tw */ "", // Don't break legacy code
    transparent: /* tw */ "bg-none text-black",
    white: /* tw */ "bg-white text-black",
    black: /* tw */ "bg-black text-white",
    teal: /* tw */ "bg-teal text-black",
    purple: /* tw */ "bg-purple text-black",
    yellow: /* tw */ "bg-yellow text-black",
};

export type ColorTheme = keyof typeof colorThemes;

const cardVariantsDefinition = {
    variants: {
        theme: colorThemes,
    },
    defaultVariants: {
        theme: "none",
    },
} as const;

export const cardVariants = cva("", cardVariantsDefinition);

export type CardVariantProps = VariantProps<typeof cardVariants>;

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CardVariantProps
>(({ className, theme, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg bg-card text-card-foreground shadow-sm",
            cardVariants({ theme }),
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <Typography variant="body06" asChild>
        <h3
            ref={ref}
            className={cn(
                // "text-2xl font-semibold leading-none tracking-tight",
                className
            )}
            {...props}
        />
    </Typography>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
