"use client";

import { useEffect } from "react";
import { api } from "@/trpc/react";

interface ViewCounterProps {
  articleId: string;
}

export default function ViewCounter({ articleId }: ViewCounterProps) {
  // 获取文章阅读量
  const { data, isLoading } = api.views.getViewCount.useQuery(
    { articleId },
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1分钟内不重新获取数据
    }
  );

  // 记录阅读量（仅在组件首次加载时执行一次）
  const recordViewMutation = api.views.recordView.useMutation();

  useEffect(() => {
    // 组件挂载时记录阅读量
    recordViewMutation.mutate({ articleId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]); // 仅依赖articleId变化

  const viewCount = data?.totalViews ?? 0;

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>
        {isLoading ? "--" : viewCount} {viewCount === 1 ? "阅读" : "阅读"}
      </span>
    </div>
  );
}