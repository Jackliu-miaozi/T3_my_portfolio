"use client";

import { Skeleton } from "@/app/_components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* 头部导航骨架屏 */}
      <header className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden space-x-4 md:flex">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </header>

      {/* 主要内容骨架屏 */}
      <main className="container mx-auto flex-1 py-8">
        <div className="space-y-8">
          {/* 标题区域 */}
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-12 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
          </div>

          {/* 内容区域 */}
          <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* 卡片区域 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-border rounded-lg border p-6 shadow-sm"
              >
                <Skeleton className="mb-4 h-8 w-1/2" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 底部骨架屏 */}
      <footer className="border-border border-t py-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <Skeleton className="h-6 w-40" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
