"use client";

import Image from "next/image";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { toast } from "sonner";

/**
 * 留言板条目组件
 * 使用优化的useQuery配置来提升性能和用户体验
 */
export function GuestbookEntries() {
  // 优化的useQuery配置，提供更好的缓存策略和用户体验
  const { 
    data: entries, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = api.post.getAll.useQuery(undefined, {
    // 数据在10分钟内被视为新鲜，不会重新请求
    staleTime: 10 * 60 * 1000,
    // 缓存时间为30分钟，超过后数据会被垃圾回收
    gcTime: 30 * 60 * 1000,
    // 页面重新获得焦点时重新获取数据，保持数据最新
    refetchOnWindowFocus: true,
    // 组件重新挂载时不重新请求，使用缓存数据
    refetchOnMount: false,
    // 网络重连时重新获取数据
    refetchOnReconnect: true,
    // 启用后台重新验证，在用户不感知的情况下更新数据
    refetchInterval: false,
    // 重试配置：失败时重试3次，每次间隔递增
    retry: (failureCount, error) => {
      // 如果是网络错误或服务器错误，最多重试3次
      if (failureCount < 3) {
        return true;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const { data: session } = useSession();
  const utils = api.useUtils();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 修改删除mutation，更新缓存
  const deletePost = api.post.delete.useMutation({
    onError: () => {
      alert("删除失败，请稍后再试");
    },
    onSuccess: async () => {
      // 立即更新缓存
      utils.post.getAll.setData(undefined, (oldData) => {
        if (!oldData || !selectedPostId) return oldData;
        return oldData.filter((post) => post.id !== selectedPostId);
      });
      // 在后台重新验证数据
      await utils.post.getAll.invalidate();
      toast.success("删除成功");
    },
  });

  // 处理删除留言确认
  const handleDeleteConfirm = (id: number) => {
    setSelectedPostId(id);
    setShowDeleteDialog(true);
  };

  // 执行删除留言
  const handleDelete = () => {
    if (selectedPostId) {
      deletePost.mutate({ id: selectedPostId });
      setShowDeleteDialog(false);
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // 错误状态处理
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="text-red-500 dark:text-red-400">
          加载留言失败: {error?.message || '未知错误'}
        </div>
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          size="sm"
        >
          重试
        </Button>
      </div>
    );
  }

  // 加载状态处理
  if (isLoading || !entries) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          加载留言中...
        </div>
      </div>
    );
  }

  // 空状态处理
  if (entries.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        暂无留言，成为第一个留言的人吧！
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.createdBy ?? "用户"}
                  className="h-10 w-10 rounded-full"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">
                    {entry.createdBy?.charAt(0) ?? "?"}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{entry.createdBy ?? "匿名用户"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(entry.createdAt.toString())}
                </p>
              </div>
            </div>
            {/* 只有留言作者才能看到删除按钮 */}
            {session?.user?.name === entry.createdBy && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                onClick={() => handleDeleteConfirm(entry.id)}
                disabled={deletePost.isPending && selectedPostId === entry.id}
              >
                {deletePost.isPending && selectedPostId === entry.id
                  ? "删除中..."
                  : "删除"}
              </Button>
            )}
          </div>
          <div
            className="prose dark:prose-invert mt-3 text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: entry.context ?? "" }}
          />
        </div>
      ))}
      {/* 删除确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>确定要删除这条留言吗？此操作无法撤销。</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
