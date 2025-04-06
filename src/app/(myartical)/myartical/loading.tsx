"use client";

import { Skeleton } from "@/app/_components/ui/skeleton";

export default function MyArticalLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 加载提示 */}
        <div className="flex items-center justify-center space-x-2 py-4">
          <div className="bg-primary h-4 w-4 animate-bounce rounded-full"></div>
          <div className="bg-primary h-4 w-4 animate-bounce rounded-full delay-100"></div>
          <div className="bg-primary h-4 w-4 animate-bounce rounded-full delay-200"></div>
          <span className="text-primary text-lg font-medium">
            正在加载页面...
          </span>
        </div>

        {/* 文章标题骨架屏 */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* 文章封面图骨架屏 */}
        <Skeleton className="h-64 w-full rounded-lg" />

        {/* 文章内容骨架屏 */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        {/* 代码块骨架屏 */}
        <Skeleton className="h-40 w-full rounded-md" />

        {/* 更多文章内容骨架屏 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* 文章标签和分享骨架屏 */}
        <div className="flex flex-wrap items-center justify-between pt-6">
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
