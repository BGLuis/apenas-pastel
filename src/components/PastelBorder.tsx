"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PastelBorderProps {
  className?: string;
  inverted?: boolean;
}

export function PastelBorder({ className, inverted = false }: PastelBorderProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none z-10 text-brand-red dark:text-[#2A1612]",
        inverted && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="w-full h-[10px] block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="pastel-crimp"
            x="0"
            y="0"
            width="14"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="7" cy="0" r="7" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="10" fill="url(#pastel-crimp)" />
      </svg>
    </div>
  );
}
