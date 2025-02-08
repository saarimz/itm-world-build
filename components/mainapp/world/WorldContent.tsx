'use client';

import { Moment, MomentStatus, MomentType } from "@/types/graphql";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorldMomentCard from "@/components/mainapp/world/WorldMomentCard";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link';

const BOX_STYLE = "border-[1px] border-black rounded-[3px] bg-white";

interface WorldContentProps {
  initialMoments: Moment[];
}

export default function WorldContent({ initialMoments }: WorldContentProps) {
  const [statusFilter, setStatusFilter] = useState('all-status');
  const [typeFilter, setTypeFilter] = useState('all-type');
  
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
    <div className="space-y-6">
      <header className={cn("w-full sticky top-0 z-50 bg-black")}>
        <div className={cn("flex flex-col sm:flex-row w-full border-black border-[1px]")}>
          {/* Logo and branding section */}
          <div className={cn("flex-1 flex flex-col", BOX_STYLE)}>
            <div className={cn("flex-1 p-4 flex flex-col sm:flex-row items-center gap-4", "bg-white")}>
              <Image 
                src="/humans-only.png" 
                alt="Humans Only" 
                width={64} 
                height={64}
                className="rounded-full"
              />
              <div className="flex flex-col items-center sm:items-start gap-2">
                <Link href="https://itm.studio" target="_blank" rel="noopener noreferrer">
                  <Image src="/powered-by.svg" alt="Powered by ITM" width={160} height={160} />
                </Link>
                <Typography variant="body08" className="text-center sm:text-left italic">
                  Exclusive drops from humans, by humans
                </Typography>
              </div>
            </div>
          </div>

          {/* Filters section */}
          <div className={cn("flex flex-col sm:flex-row", BOX_STYLE)}>
            <div className={cn("p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2")}>
              <Select 
                defaultValue="all-status" 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[140px] border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
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
                <SelectTrigger className="w-full sm:w-[140px] border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
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

      <div className={cn("w-full")}>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMoments.map((moment) => (
              <div 
                key={moment.uid} 
                className={`w-full ${moment.status === MomentStatus.Ended ? "opacity-60" : ""}`}
              >
                <WorldMomentCard moment={moment} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 