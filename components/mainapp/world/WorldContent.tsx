'use client';

import { Moment, MomentStatus, MomentType } from "@/types/graphql";
import { Typography } from "@/components/Typography";
import { useState, useCallback, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorldMomentCard from "@/components/mainapp/world/WorldMomentCard";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const BOX_STYLE = "border-[1px] border-black rounded-[3px] bg-white";

interface WorldContentProps {
  initialMoments: Moment[];
}

export default function WorldContent({ initialMoments }: WorldContentProps) {
  const [statusFilter, setStatusFilter] = useState('all-status');
  const [typeFilter, setTypeFilter] = useState('all-type');
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
      <header className={cn("w-full sticky top-0 z-50 bg-black")}>
        <div className={cn("flex flex-col sm:flex-row w-full border-black border-[1px]")}>
          {/* Logo and branding section */}
          <div className={cn("flex-1 flex flex-col", BOX_STYLE)}>
            <div className={cn(
              "flex-1 p-2 sm:p-4 flex flex-row items-center justify-between sm:justify-start gap-2 sm:gap-4",
              "bg-white"
            )}>
              <div className="flex flex-row items-center gap-2 sm:gap-4">
                <Image 
                  src="/humans-only.png" 
                  alt="Humans Only" 
                  width={36}
                  height={36}
                  className="rounded-full w-9 h-9 sm:w-16 sm:h-16"
                />
                <div className="flex flex-col items-start gap-0.5 sm:gap-2">
                  <Link href="https://itm.studio" target="_blank" rel="noopener noreferrer">
                    <Image 
                      src="/powered-by.svg" 
                      alt="Powered by ITM" 
                      width={100} 
                      height={100}
                      className="sm:w-[160px] sm:h-[160px]" 
                    />
                  </Link>
                  <Typography 
                    variant="body08" 
                    className="hidden sm:block text-center sm:text-left italic text-xs sm:text-base"
                  >
                    Exclusive drops from humans, by humans
                  </Typography>
                </div>
              </div>

              {/* Move filters inline on mobile */}
              <div className="flex sm:hidden flex-row gap-2">
                <Select 
                  defaultValue="all-status" 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="h-8 min-w-24 border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="border-black">
                    <SelectItem value="all-status">Everything</SelectItem>
                    <SelectItem value="live">Live Now</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  defaultValue="all-type"
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="h-8 min-w-24 border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="border-black">
                    <SelectItem value="all-type">All Drops</SelectItem>
                    <SelectItem value="digital">Products</SelectItem>
                    <SelectItem value="irl">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Filters section - desktop only */}
          <div className={cn("hidden sm:flex flex-col sm:flex-row", BOX_STYLE)}>
            <div className={cn("p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2")}>
              <Select 
                defaultValue="all-status" 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="h-10 w-[140px] border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="border-black">
                  <SelectItem value="all-status">Everything</SelectItem>
                  <SelectItem value="live">Live Now</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ended">Ended</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                defaultValue="all-type"
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="h-10 w-[140px] border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="border-black">
                  <SelectItem value="all-type">All Drops</SelectItem>
                  <SelectItem value="digital">Products</SelectItem>
                  <SelectItem value="irl">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-2 sm:px-4">
        <div className="relative">
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
        </div>
      </div>
    </div>
  );
} 