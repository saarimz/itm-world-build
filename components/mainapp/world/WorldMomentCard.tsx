'use client';

import { Moment, MomentType, MomentStatus } from "@/types/graphql";
import { Typography } from "@/components/Typography";
import { LocalDate } from "@/components/LocalDate";
import ItmDisplayCard, { ItmDisplayCardBadge, ItmDisplayCardListContent, ItmDisplayCardTitleContent, ItmDisplayCardTitleLeftContent } from "./ItmDisplayCard";

interface WorldMomentCardProps {
  moment: Moment;
}

export default function WorldMomentCard({ moment }: WorldMomentCardProps) {
  const isDigital = moment.type === MomentType.Digital;
  const isLive = moment.status === MomentStatus.Live;
  const isUpcoming = moment.status === MomentStatus.Upcoming;
  const isEnded = moment.status === MomentStatus.Ended;

  const headerLeft = (
    <ItmDisplayCardTitleLeftContent>
      <Typography variant="body04" as="span" className="font-mono uppercase">
        {moment.brand.name}
      </Typography>
    </ItmDisplayCardTitleLeftContent>
  );

  const headerRight = (
    <div className="flex gap-2">
      {isLive && (
        <ItmDisplayCardBadge theme={isEnded ? "black" : "white"}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Live</span>
          </div>
        </ItmDisplayCardBadge>
      )}
      <ItmDisplayCardBadge theme={isEnded ? "black" : "white"}>
        {isDigital ? "Product Drop" : "Event"}
      </ItmDisplayCardBadge>
    </div>
  );

  const content = (
    <ItmDisplayCardTitleContent
      title={moment.name}
      subtitle={isDigital ? "Digital Release" : moment.venue ? `${moment.venue.city}, ${moment.venue.country}` : "-"}
      callout={isLive ? "Live Now" : isEnded ? "Ended" : null}
    />
  );

  const additionalComponents = [
    <ItmDisplayCardListContent
      key="dates"
      list={[
        {
          title: "Date",
          value: <LocalDate date={moment.startDate} timezone={moment.timezone} />,
        },
      ]}
    />,
    <div key="type" className="flex justify-center pb-0">
      <Typography 
        variant="body04" 
        as="span" 
        className={`font-mono uppercase ${isEnded ? 'text-gray-500' : 'text-white'}`}
      >
        {isDigital ? "Product Drop" : "Live Event"}
      </Typography>
    </div>
  ];

  const host = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'itm.studio' : 'itm-staging.studio';

  const url = `https://${moment.brand.slug}.${host}/m/${moment.slug}`;

  return (
    <div className="w-full max-w-[280px] sm:max-w-sm mx-auto">
      <ItmDisplayCard
        image={moment.coverImage.url}
        aspectRatio="poster"
        headerLeft={headerLeft}
        headerRight={headerRight}
        content={content}
        href={url}
        additionalComponents={additionalComponents}
        theme={isEnded ? "white" : "black"}
        blurDataUrl={moment.coverImage.placeholderUrl ?? undefined}
        customWidth="w-full"
        hrefTarget="_blank"
      />
    </div>
  );
} 