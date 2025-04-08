import { Card } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ArticlesSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 md:px-6 md:py-12">
      {/* 添加加载提示 */}
      <div className="my-6 flex justify-center">
        <div
          className={cn(
            "text-muted-foreground text-lg font-medium",
            "flex animate-pulse items-center gap-2",
          )}
        >
          <span>文章正在加载</span>
          <span className="inline-flex">
            <span className="mx-0.5 animate-bounce">.</span>
            <span className="animation-delay-200 mx-0.5 animate-bounce">.</span>
            <span className="animation-delay-400 mx-0.5 animate-bounce">.</span>
          </span>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="flex flex-col overflow-hidden pt-0 pb-6">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="mb-4 h-6 w-full" />
              <Skeleton className="mb-4 h-20 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
