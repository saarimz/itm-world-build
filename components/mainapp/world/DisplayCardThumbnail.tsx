"use client";
import Image from "next/image";
import React from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAACqADAAQAAAABAAAACgAAAADIQtX2AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAABGElEQVQYGRWQyU4DMRBE33icRAHlCv9/4TP4iFxALAdyiFCYLLOPdyqySy13V3e1q3p53ZeVgVwytTH4nEmmUNUVPkVWxuJSxq5LpMpgVEhVwOhhKGQ1bGtLiJ5r12Ofd2uxyp0J9ysUnVgKLhRu08TTboPdbSpNEcQoIqWUUB3vA0O/YKS2jmAnN0paM5SYXGAJidln/tqBSbGuDN04Y49NR46JYfJaGpEizbVnnANOzb33/KlmP74aFucZlKi0RnO7cTr3ZGv4uXm6kDm2i4jvB4Z5pMQsqZ7T9UyQ3LGo6eihHakb2fO7/6SWRTkKduKxHzlcAs3sWJ1nMk6QdP12oQSPf4jEraO7jIxtkpdXgvlG/5VfkX95x8fM9mlT+wAAAABJRU5ErkJggg==";

export function DisplayCardThumbnail({
  src,
  blurDataUrl,
  aspectRatio,
}: {
  src: string;
  blurDataUrl?: string;
  aspectRatio: "square" | "poster";
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [shouldAnimateReveal, setShouldAnimateReveal] = React.useState(true);

  const aspectRatioClass =
    aspectRatio === "poster" ? "aspect-[4/5]" : "aspect-square";

  useIsomorphicLayoutEffect(() => {
    const newImage = new window.Image();
    newImage.src = src;
    if (newImage.complete) {
      setShouldAnimateReveal(false);
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`relative w-full pointer-events-none select-none ${aspectRatioClass}`}
    >
      {/* We separate this out, rather than use Next/Image built-in placeholder so we can animate it */}
      <div
        className="absolute inset-0 bg-cover bg-gradient-to-t from-black to-transparent"
        style={{
          backgroundImage: `url(${blurDataUrl})`,
        }}
      />
      <Image
        alt=""
        className={`absolute inset-0 object-cover w-full h-full filter duration-200 ${
          shouldAnimateReveal ? "transition-all" : ""
        } ${isLoaded ? "opacity-100 " : "opacity-0 "}`}
        src={src}
        placeholder="blur"
        blurDataURL={blurDataUrl ?? DEFAULT_BLUR_DATA_URL}
        fill
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
