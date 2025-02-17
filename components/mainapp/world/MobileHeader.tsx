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
              src="/wb.png" 
              alt="World Build" 
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
              className="text-left italic text-base flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Buenos Aires, Argentina
            </Typography>
        </div>
      </div>

      {/* Filters section */}
      <div className={cn("flex flex-row justify-center gap-2 p-2", BOX_STYLE, "border-t-0")}>
        <Select 
          defaultValue="upcoming" 
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
          defaultValue="irl"
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