"use client";

import { Skeleton } from "@/app/_components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* 标题骨架屏 */}
        <Skeleton className="mx-auto h-10 w-3/4" />

        {/* 表单骨架屏 */}
        <div className="border-border space-y-4 rounded-lg border p-6 shadow-sm">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* 底部链接骨架屏 */}
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
