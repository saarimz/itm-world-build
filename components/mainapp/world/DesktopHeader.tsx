'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Typography } from "@/components/Typography";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BOX_STYLE = "border-[1px] border-black rounded-[3px] bg-white";

interface DesktopHeaderProps {
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function DesktopHeader({ onStatusChange, onTypeChange }: DesktopHeaderProps) {
  return (
    <div className="hidden sm:flex flex-row w-full border-black border-[1px]">
      {/* Logo and branding section */}
      <div className={cn("flex-1 flex flex-col", BOX_STYLE)}>
        <div className="flex-1 p-4 flex flex-row items-center gap-4">
          <Image 
            src="/humans-only.png" 
            alt="Humans Only" 
            width={64}
            height={64}
            className="rounded-full w-16 h-16"
          />
          <div className="flex flex-col items-start gap-2">
            <Link href="https://itm.studio" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/powered-by.svg" 
                alt="Powered by ITM" 
                width={160} 
                height={160}
              />
            </Link>
            <Typography 
              variant="body08" 
              className="text-left italic text-base"
            >
              Exclusive drops from humans, by humans
            </Typography>
          </div>
        </div>
      </div>

      {/* Filters section */}
      <div className={cn("flex flex-row", BOX_STYLE)}>
        <div className="p-4 flex flex-row items-center gap-2">
          <Select 
            defaultValue="all-status" 
            onValueChange={onStatusChange}
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
            onValueChange={onTypeChange}
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
  );
} 