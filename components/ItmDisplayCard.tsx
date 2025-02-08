'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface ItmDisplayCardProps {
  image: string;
  aspectRatio?: "square" | "poster" | "landscape";
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  content?: ReactNode;
  href?: string;
  additionalComponents?: ReactNode[];
  theme?: "black" | "white";
  blurDataUrl?: string;
  customWidth?: string;
  hrefTarget?: string;
}

export function ItmDisplayCard({
  image,
  aspectRatio = "square",
  headerLeft,
  headerRight,
  content,
  href,
  additionalComponents,
  theme = "black",
  blurDataUrl,
  customWidth,
  hrefTarget = "_self"
}: ItmDisplayCardProps) {
  const aspectRatioClass = {
    square: "aspect-square",
    poster: "aspect-[3/4]",
    landscape: "aspect-video"
  }[aspectRatio];

  const Card = (
    <div
      className={cn(
        "group relative w-full border border-black rounded-[3px] overflow-hidden",
        theme === "black" ? "bg-black text-white" : "bg-white text-black",
        customWidth
      )}
    >
      <div className={cn("relative w-full", aspectRatioClass)}>
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          placeholder={blurDataUrl ? "blur" : "empty"}
          blurDataURL={blurDataUrl}
        />
        {(headerLeft || headerRight) && (
          <div className="absolute inset-0 p-4">
            <div className="flex justify-between items-start gap-4">
              {headerLeft}
              {headerRight}
            </div>
          </div>
        )}
      </div>
      {content && <div className="p-4">{content}</div>}
      {additionalComponents?.map((component, index) => (
        <div key={index} className="px-4 pb-4">
          {component}
        </div>
      ))}
    </div>
  );

  if (href) {
    return (
      <Link href={href} target={hrefTarget}>
        {Card}
      </Link>
    );
  }

  return Card;
}

export function ItmDisplayCardTitleLeftContent({ children }: { children: ReactNode }) {
  return (
    <div className="inline-block px-2 py-1 bg-white text-black rounded-[3px]">
      {children}
    </div>
  );
}

interface ItmDisplayCardBadgeProps {
  children: ReactNode;
  theme?: "black" | "white";
}

export function ItmDisplayCardBadge({ children, theme = "black" }: ItmDisplayCardBadgeProps) {
  return (
    <div
      className={cn(
        "inline-block px-2 py-1 rounded-[3px] font-mono text-xs uppercase",
        theme === "black" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {children}
    </div>
  );
}

interface ItmDisplayCardTitleContentProps {
  title: string;
  subtitle?: string;
  callout?: string | null;
}

export function ItmDisplayCardTitleContent({
  title,
  subtitle,
  callout
}: ItmDisplayCardTitleContentProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium text-lg leading-tight">{title}</h3>
        {callout && (
          <span className={cn(
            "font-mono text-xs uppercase whitespace-nowrap",
            callout === "Ended" ? "bg-black text-white rounded-full px-3 py-1" : ""
          )}>
            {callout}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-sm opacity-60">{subtitle}</p>
      )}
    </div>
  );
}

interface ItmDisplayCardListContentProps {
  list: Array<{
    title: string;
    value: ReactNode;
  }>;
}

export function ItmDisplayCardListContent({ list }: ItmDisplayCardListContentProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      {list.map(({ title, value }) => (
        <div key={title} className="contents">
          <dt className="opacity-60">{title}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
} 