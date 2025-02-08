'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Typography } from "@/components/Typography";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BOX_STYLE = "border-[1px] border-black rounded-[3px] bg-white";

interface MobileHeaderProps {
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function MobileHeader({ onStatusChange, onTypeChange }: MobileHeaderProps) {
  return (
    <div className="sm:hidden flex flex-col w-full border-black border-[1px]">
      {/* Logo and branding section */}
      <div className={cn("flex-1 flex flex-col", BOX_STYLE)}>
        <div className="flex-1 p-2 flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <Image 
              src="/humans-only.png" 
              alt="Humans Only" 
              width={36}
              height={36}
              className="rounded-full w-9 h-9"
            />
            <Link href="https://itm.studio" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/powered-by.svg" 
                alt="Powered by ITM" 
                width={90} 
                height={90}
              />
            </Link>
          </div>
          <Typography 
            variant="body08" 
            className="text-center italic text-xs"
          >
            Exclusive drops from humans, by humans
          </Typography>
        </div>
      </div>

      {/* Filters section */}
      <div className={cn("flex flex-row justify-center gap-2 p-2", BOX_STYLE, "border-t-0")}>
        <Select 
          defaultValue="all-status" 
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="h-8 min-w-32 border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
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
          onValueChange={onTypeChange}
        >
          <SelectTrigger className="h-8 min-w-32 border-black border-[1px] rounded-[3px] bg-white hover:bg-black/5 focus:ring-0 focus:ring-offset-0">
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
  );
} 