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

export function GuestbookEntries() {
  const { data: entries, isLoading } = api.post.getAll.useQuery();
  const { data: session } = useSession();
  const utils = api.useUtils();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 删除留言的mutation
  const deletePost = api.post.delete.useMutation({
    onError: () => {
      alert("删除失败，请稍后再试");
    },
    onSuccess: async () => {
      await utils.post.invalidate();
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

  if (isLoading || !entries) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          加载留言中...
        </div>
      </div>
    );
  }

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
