import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("bg-muted/50 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
