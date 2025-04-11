"use client";

import { api } from "@/trpc/react";

interface ArticleViewCountProps {
  articleId: number;
}

export function ArticleViewCount({ articleId }: ArticleViewCountProps) {
  // 获取文章阅读量
  const { data, isLoading } = api.views.getViewCount.useQuery(
    { articleId: articleId.toString() },
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1分钟内不重新获取数据
    }
  );

  const viewCount = data?.totalViews ?? 0;

  return (
    <div className="flex items-center gap-1 text-muted-foreground text-xs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{isLoading ? "--" : viewCount}</span>
    </div>
  );
}