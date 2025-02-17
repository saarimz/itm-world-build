'use client';

import { Moment, MomentStatus, MomentType } from "@/types/graphql";
import { Typography } from "@/components/Typography";
import { useState, useEffect } from "react";
import WorldMomentCard from "@/components/mainapp/world/WorldMomentCard";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";


interface WorldContentProps {
  initialMoments: Moment[];
}

export default function WorldContent({ initialMoments }: WorldContentProps) {
  const [statusFilter, setStatusFilter] = useState('upcoming');
  const [typeFilter, setTypeFilter] = useState('irl');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  
  const filteredMoments = initialMoments.filter(moment => {
    const matchesStatus = statusFilter === 'all-status' || 
      (statusFilter === 'live' && moment.status === MomentStatus.Live) ||
      (statusFilter === 'upcoming' && moment.status === MomentStatus.Upcoming) ||
      (statusFilter === 'ended' && moment.status === MomentStatus.Ended);

    const matchesType = typeFilter === 'all-type' ||
      (typeFilter === 'digital' && moment.type === MomentType.Digital) ||
      (typeFilter === 'irl' && moment.type === MomentType.Irl);

    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <header className="w-full sticky top-0 z-50 bg-black">
        <MobileHeader 
          onStatusChange={setStatusFilter}
          onTypeChange={setTypeFilter}
        />
        <DesktopHeader 
          onStatusChange={setStatusFilter}
          onTypeChange={setTypeFilter}
        />
      </header>

      <div className="w-full px-2 sm:px-4">
        <div className="relative">
          {filteredMoments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 animate-pulse-slow">
                  <div className="w-full h-full rounded-full bg-black/5" />
                </div>
                <div className="absolute inset-0 animate-spin-slow">
                  <svg
                    className="w-full h-full text-black/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2 max-w-[280px] animate-fade-in">
                <Typography 
                  variant="body03" 
                  className="font-medium"
                >
                  No {statusFilter !== 'all-status' ? statusFilter : ''} moments found
                </Typography>
                <Typography 
                  variant="body04Regular" 
                  className="text-black/60"
                >
                  {statusFilter === 'upcoming' && "Check back later for new upcoming moments"}
                  {statusFilter === 'live' && "There are no live moments right now. Check back soon!"}
                  {statusFilter === 'ended' && "No past moments match your filters"}
                  {statusFilter === 'all-status' && "Try adjusting your filters or check back later for new moments"}
                </Typography>
              </div>
            </div>
          ) : (
            <>
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent className="py-4">
                  {filteredMoments.map((moment) => (
                    <CarouselItem key={moment.uid} className="w-full basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2">
                      <div className={`${moment.status === MomentStatus.Ended ? "opacity-60" : ""}`}>
                        <WorldMomentCard moment={moment} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {count > 1 && (
                <div className="py-2 flex justify-center gap-1">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === current
                          ? "w-4 bg-black"
                          : "w-1.5 bg-black/20"
                      )}
                      onClick={() => api?.scrollTo(index)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 