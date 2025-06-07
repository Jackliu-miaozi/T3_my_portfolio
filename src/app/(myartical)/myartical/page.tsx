"use client";

import { Footer } from "@/app/_components/footer";
import { api } from "@/trpc/react";

// 添加导入
import { ArticlesSkeleton } from "../../../components/articles-skeleton";
import { ArticleHeader, ArticleCards } from "@/components/article-list";

/**
 * 文章列表组件 - 使用 useQuery 缓存数据
 * 提供智能缓存、错误处理和加载状态
 */
function ArticleCardsWrapper({
  formatDate,
}: {
  formatDate: (dateString: string) => string;
}) {
  // 使用 useQuery 获取文章数据，配置缓存策略
  const {
    data: articles,
    isLoading,
    error,
    refetch,
  } = api.artical.getAll.useQuery(undefined, {
    // 缓存配置
    staleTime: 5 * 60 * 1000, // 5分钟内数据被认为是新鲜的
    gcTime: 10 * 60 * 1000, // 10分钟后清理缓存
    
    // 重新获取策略
    refetchOnWindowFocus: false, // 窗口聚焦时不重新获取
    refetchOnMount: true, // 组件挂载时重新获取
    refetchOnReconnect: true, // 网络重连时重新获取
    
    // 重试策略
    retry: (failureCount, error) => {
      // 最多重试3次，但对于网络错误多重试几次
      if (failureCount < 3) return true;
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // 加载状态
  if (isLoading) {
    return <ArticlesSkeleton />;
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            加载文章时出现错误
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message || "请检查网络连接后重试"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  // 空状态
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          暂无文章
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          还没有发布任何文章，请稍后再来查看。
        </p>
      </div>
    );
  }

  // 对文章按创建时间排序
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return <ArticleCards articles={sortedArticles} formatDate={formatDate} />;
}

export default function ArticlesPage() {
  // 格式化日期函数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <ArticleHeader />
        <ArticleCardsWrapper formatDate={formatDate} />
      </main>
      <Footer />
    </div>
  );
}
