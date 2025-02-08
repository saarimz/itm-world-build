// StandaloneCard Component
import {
    Card,
    CardContent,
    CardHeader,
    CardVariantProps,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Typography } from "@/components/Typography";
import { DisplayCardThumbnail } from "./DisplayCardThumbnail";
import { Badge } from "@/components/ui/badge";

type ItmDisplayCardProps = {
    headerLeft: React.ReactNode;
    headerRight: React.ReactNode;
    image: string;
    content: React.ReactNode;
    additionalComponents: React.ReactNode[];
    href?: string;
    customWidth?: string;
    blurDataUrl?: string;
    aspectRatio: "poster" | "square";
    hrefTarget?: "_blank" | "_self" | "_parent" | "_top";
} & CardVariantProps;

export default function ItmDisplayCard({
    headerLeft,
    headerRight,
    image,
    content,
    additionalComponents,
    href,
    customWidth,
    theme,
    blurDataUrl,
    aspectRatio,
    hrefTarget
}: ItmDisplayCardProps) {
    const displayImage = image;
    const baseWidth = customWidth || "w-[14rem] md:w-[16.25rem]";

    // This needs to be a psuedo element manually stacked behind via z-indx if you want the shadows behind all the cards.
    // You might be thinking we could use a filter.  You could but the performance hit is noticeable.
    const shadow =
        /* tw */ "relative before:absolute before:inset-0 before:shadow-[0px_0px_3.06px_0px_#00000033,_0px_3px_10px_0px_#00000080] before:-z-10 before:rounded-lg";

    return (
        <RootComponent href={href}>
            <Card
                className={cn("select-none", baseWidth, shadow)}
                theme={theme}
            >
                {/* Header Section */}
                <CardHeader className="flex flex-row items-center px-[0.375rem] md:px-2 py-[0.3125rem] justify-between leading-none border-b-0">
                    {headerLeft}
                    {headerRight}
                </CardHeader>

                {/* Image Section */}
                <DisplayCardThumbnail src={displayImage} blurDataUrl={blurDataUrl} aspectRatio={aspectRatio} />

                {/* Content Section */}
                <CardContent className="select-none relative px-[0.375rem] md:px-2 pt-1.5 pb-[0.5625rem] md:pt-2.5 md:pb-3.5 border-t-0">
                    {content}
                </CardContent>
            </Card>

            {/* Additional Components Section */}
            {additionalComponents.map((Component, index) => (
                <Card
                    className={cn("select-none", baseWidth, shadow)}
                    // biome-ignore lint/suspicious/noArrayIndexKey: index is probably fine for now
                    key={index}
                    theme={theme}
                >
                    <CardContent className="p-[0.375rem] md:p-[0.5rem] ">
                        {Component}
                    </CardContent>
                </Card>
            ))}
        </RootComponent>
    );
}

function RootComponent({
    href,
    children,
    hrefTarget
}: {
    href?: string;
    children: React.ReactNode;
    hrefTarget?: "_blank" | "_self" | "_parent" | "_top";
}) {
    if (href) {
        return <Link href={href} prefetch={true} target={hrefTarget}>{children}</Link>;
    }

    return <div>{children}</div>;
}

export function ItmDisplayCardBadge(props: React.ComponentProps<typeof Badge>) {
    return (
        <Badge
            variant="filled"
            className="text-[0.375rem] md:text-[0.625rem] h-[0.625rem] md:h-[0.9375rem]"
            {...props}
        />
    );
}

export function ItmDisplayCardTitleContent({
    title,
    subtitle,
    callout,
}: {
    title: string;
    subtitle?: string | React.ReactNode;
    callout?: string | null;
}) {
    const hasCallout = Boolean(callout);
    const hasSubtitle = Boolean(subtitle);

    return (
        <Typography variant="body04">
            <div
                className={
                    hasCallout
                        ? "max-w-[calc(100%-3.75rem)] md:max-w-[calc(100%-5.625rem)]"
                        : ""
                }
            >
                <h3 className="truncate whitespace-nowrap">{title}</h3>
                {hasSubtitle && (
                    <p className="truncate opacity-50 whitespace-nowrap">
                        {subtitle}
                    </p>
                )}
            </div>
            {hasCallout && (
                <Typography variant="body04" className="uppercase" asChild>
                    <div className="absolute right-[0.375rem] md:right-2 flex items-center justify-center w-[3.75rem] h-[3.75rem] md:w-[5.625rem] md:h-[5.625rem] rounded-full top-0 -translate-y-1/2 bg-[#90EE90]">
                        <p className="font-semibold text-center truncate text-black text-[0.9em]">
                            {callout}
                        </p>
                    </div>
                </Typography>
            )}
        </Typography>
    );
}

export function ItmDisplayCardTitleLeftContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Typography as="p" variant="body06">
            {children}
        </Typography>
    );
}

export function ItmDisplayCardListContent({
    list,
}: {
    list: {
        title: string;
        value: string | React.ReactNode;
        key?: string;
    }[];
}) {
    return (
        <Typography variant="body05" asChild>
            <dl>
                {list.map(({ title, value, key }) => (
                    <div
                        className="flex justify-between"
                        key={key ?? `${title}-${value}`}
                    >
                        <dt>{title}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>
        </Typography>
    );
}
