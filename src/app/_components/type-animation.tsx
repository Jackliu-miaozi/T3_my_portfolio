"use client";

import { TypeAnimation as ReactTypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";

type TypeAnimationProps = {
  sequence: Array<string | number>;
  wrapper?: string;
  cursor?: boolean;
  repeat?: number;
  className?: string;
};

export function TypeAnimation({
  sequence,
  cursor = true,
  repeat = 0,
  className,
}: TypeAnimationProps) {
  return (
    <ReactTypeAnimation
      sequence={sequence}
      cursor={cursor}
      repeat={repeat}
      className={cn("inline-block", className)}
    />
  );
}
