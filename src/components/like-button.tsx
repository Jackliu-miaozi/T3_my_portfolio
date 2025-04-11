"use client";

import { ThumbsUp } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { api } from "@/trpc/react";
import { useState, useEffect, useCallback, memo } from "react";
import { toast } from "sonner";

// 使用memo包装组件以避免不必要的重渲染
export default memo(function LikeButton({ articleId }: { articleId: string }) {
    const [optimisticState, setOptimisticState] = useState<{
        hasLiked: boolean;
        likeCount: number;
    } | null>(null);

    // 使用suspense: false避免组件挂起，staleTime增加缓存时间减少请求
    const { data, refetch, isLoading } = api.likes.getLikeStatus.useQuery(
        { articleId },
        {
            refetchOnWindowFocus: false,
            suspense: false,
            staleTime: 30000, // 30秒内不重新获取数据
            retry: 1, // 减少重试次数
        }
    );

    const currentHasLiked = data?.hasLiked ?? false;
    const currentLikeCount = data?.totalLikes ?? 0;

    // 使用useEffect更新初始状态，避免不必要的状态重置
    useEffect(() => {
        if (data && !optimisticState) {
            setOptimisticState({
                hasLiked: data.hasLiked,
                likeCount: data.totalLikes
            });
        }
    }, [data, optimisticState]);

    // 显示乐观更新状态或实际状态
    const displayState = optimisticState ?? {
        hasLiked: currentHasLiked,
        likeCount: currentLikeCount
    };

    // 使用useCallback缓存mutation配置
    const toggleLikeMutation = api.likes.toggleLike.useMutation({
        // 避免不必要的重复请求
        onMutate: useCallback(() => {
            // 立即更新乐观状态
            setOptimisticState(prev => {
                const newState = {
                    hasLiked: !(prev?.hasLiked ?? currentHasLiked),
                    likeCount: (prev?.hasLiked ?? currentHasLiked)
                        ? (prev?.likeCount ?? currentLikeCount) - 1
                        : (prev?.likeCount ?? currentLikeCount) + 1
                };
                return newState;
            });
        }, [currentHasLiked, currentLikeCount]),

        onSuccess: useCallback(() => {
            // 成功后静默刷新数据，不重置乐观状态
            void refetch();
        }, [refetch]),

        onError: useCallback(() => {
            // 错误后清除乐观状态
            setOptimisticState(null);
            toast.error("点赞失败", {
                id: `like-error-${articleId}`, // 使用ID防止重复提示
            });
        }, [articleId])
    });

    // 使用useCallback缓存事件处理函数
    const handleLike = useCallback(() => {
        if (isLoading) return;
        toggleLikeMutation.mutate({ articleId });
    }, [articleId, isLoading, toggleLikeMutation]);

    // 防止按钮在加载状态下被多次点击
    const isButtonDisabled = isLoading;

    return (
        <div className="flex flex-col items-center mb-3 ">
            <div className="text-center mb-2">
            </div>
            <Button
                onClick={handleLike}
                disabled={isButtonDisabled}
                size="lg"
                variant={displayState.hasLiked ? "default" : "outline"}
                className={`rounded-full px-8 h-auto transition-all transform hover:scale-105 ${displayState.hasLiked
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    }`}
            >
                <ThumbsUp className={`h-6 w-6 mr-2 ${displayState.hasLiked ? "fill-white" : ""}`} />
                <span className="text-lg font-medium">
                    {displayState.hasLiked ? "已点赞" : "点赞"}
                    <span className={`text-sm pl-2 ${displayState.hasLiked ? 'text-white' : 'text-muted-foreground'}`}>
                        {displayState.likeCount} 👍
                    </span>
                </span>
            </Button>
        </div>
    );
});