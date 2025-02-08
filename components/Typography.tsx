// import { cn } from "@/lib/utils"
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const typographyVariantDefinitions = {
    none: /* tw */ "", // In case we need to turn off type styles

    custom: /* tw */ " font-sans not-italic normal-case", // An overridable starting poi leading-[--line-height]nt

    h1: /* tw */ " font-sans not-italic font-medium tracking-[-0.01em] text-[3rem] [--line-height:3.625rem] md:text-[4.375rem] md:[--line-height:5.3125rem] normal-case leading-[--line-height]",

    h2: /* tw */ " font-sans not-italic font-medium tracking-[-0.01em] text-[2.125rem] [--line-height:2.5625rem] md:text-[3.375rem] md:[--line-height:3.875rem] normal-case leading-[--line-height]",

    h3: /* tw */ " font-sans not-italic font-medium tracking-[-0.01em] text-[1.25rem] [--line-height:1.5rem] md:text-[1.75rem] md:[--line-height:2.125rem] normal-case leading-[--line-height]",

    h4: /* tw */ " font-mono not-italic font-medium tracking-[0.02em] text-[0.9375rem] [--line-height:1.25rem] uppercase leading-[--line-height]",

    body01: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[1.25rem] [--line-height:1.5rem] md:text-[1.75rem] md:[--line-height:2.125rem] normal-case leading-[--line-height]",

    body02: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[1.125rem] [--line-height:1.375rem] md:text-[1.375rem] md:[--line-height:1.6875rem] normal-case leading-[--line-height]",

    body03: /* tw */ " font-sans not-italic font-normal tracking-[0em] text-[1rem] [--line-height:1.1875rem] md:text-[1.25rem] md:[--line-height:1.5rem] normal-case leading-[--line-height]",

    body04: /* tw */ " font-sans not-italic font-medium tracking-[-0.01em] text-[0.6875rem] [--line-height:0.8125rem] md:text-[1rem] md:[--line-height:1.1875rem] normal-case leading-[--line-height]",

    body04Regular:
        /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[0.6875rem] [--line-height:0.8125rem] md:text-[1rem] md:[--line-height:1.1875rem] normal-case leading-[--line-height]",

    body05: /* tw */ " font-mono not-italic font-medium tracking-[-0.02em] text-[0.5625rem] [--line-height:0.75rem] md:text-[0.8125rem] md:[--line-height:1.0625rem] uppercase leading-[--line-height]",

    body06: /* tw */ " font-sans not-italic font-medium tracking-[-0.01em] text-[0.5rem] [--line-height:0.625rem] md:text-[0.75rem] md:[--line-height:0.9375rem] uppercase leading-[--line-height]",

    body07: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[0.75rem] [--line-height:0.9375rem] md:text-[0.875rem] md:[--line-height:1.0625rem] normal-case leading-[--line-height]",

    body08: /* tw */ " font-sans not-italic font-medium tracking-[-0.01em] text-[0.6875rem] [--line-height:0.8125rem] normal-case leading-[--line-height]",

    /* marketing web ones */
    heading1: /* tw */ " font-sans not-italic font-semibold text-[2.25rem] md:text-[5rem] tracking-[-0.04em] normal-case leading-[2.5625rem] md:leading-[5.625rem]",
    subheadingSmall: /* tw */ " font-sans not-italic font-medium tracking-[-0.02em] text-[1.125rem] normal-case leading-[1.36125rem] md:text-[1.875rem] md:leading-[2.395625rem]",
    subheading: /* tw */ " font-sans not-italic font-medium md:font-semibold tracking-[-0.02em] text-[1.125rem] normal-case leading-[1.36125rem] md:text-[2.5rem] md:leading-[1.25em]",
    bodySmall: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[0.875rem] normal-case leading-[1.125rem] md:text-[1rem] md:leading-[1.375rem]",
    bodyMedium: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[1.0625rem] normal-case leading-[1.285625rem] md:text-[1.25rem] md:leading-[1.6875rem]",
    bodyLarge: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[1.5rem] normal-case leading-[2rem]",
    bodyMixed: /* tw */ " font-sans not-italic font-normal tracking-[-0.01em] text-[0.875rem] normal-case leading-[1.125rem] md:text-[1.25rem] md:leading-[1.6875rem]", // used on the about page
    nav: /* tw */ " font-sans not-italic font-medium tracking-[-0.03em] text-[0.875rem] normal-case leading-[1.21em]",
} as const;
export type TypographyVariant = keyof typeof typographyVariantDefinitions;

export const typographyVariants = cva(/* tw */ "", {
    variants: {
        variant: typographyVariantDefinitions,
    },
    defaultVariants: {
        variant: /* tw */ "custom",
    },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

type TypographyProps<T extends React.ElementType = React.ElementType> =
    React.HTMLAttributes<T> &
        VariantPropType & {
            as?: T;
            asChild?: boolean;
        };
/**
 * Shadcn may one day have a typography component.  Until then I grabbed a marriage of my favorite solutions from the discussion: https://github.com/shadcn-ui/ui/pull/363
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    (
        { as = "span", className, variant = "custom", asChild, ...props },
        ref
    ) => {
        const Component = asChild ? Slot : as;

        return (
            <Component
                className={cn(typographyVariants({ variant }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Typography.displayName = "Typography";
