"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { DeleteMessageDialog, ReplyMessageDialog } from "./message-dialogs";

export function MessagesManagement() {
  const [showDeleteMessageDialog, setShowDeleteMessageDialog] = useState(false);
  const [showReplyMessageDialog, setShowReplyMessageDialog] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<number>();
  const [replyContent, setReplyContent] = useState<string>("");

  const utils = api.useUtils();
  // 获取留言列表
  const { data: messages } = api.post.getAll.useQuery();
  // 删除留言
  const deleteMessage = api.post.delete.useMutation({
    onSuccess: async () => {
      toast.success("留言已删除！");
      await utils.post.invalidate();
      setShowDeleteMessageDialog(false);
    },
  });
  // 回复留言
  const replyMessage = api.post.reply.useMutation({
    onSuccess: async () => {
      toast.success("回复已发送！");
      await utils.post.invalidate();
      setShowReplyMessageDialog(false);
    },
  });

  // 处理删除留言确认
  const handleDeleteMessageConfirm = (id: number) => {
    setSelectedMessageId(id);
    setShowDeleteMessageDialog(true);
  };

  // 处理删除留言
  const handleDeleteMessage = () => {
    if (selectedMessageId) {
      deleteMessage.mutate({
        id: selectedMessageId,
      });
    }
  };

  // 处理回复留言对话框
  const handleReplyMessage = (id: number) => {
    setSelectedMessageId(id);
    setReplyContent("");
    setShowReplyMessageDialog(true);
  };

  // 处理提交回复
  const handleSubmitReply = () => {
    if (selectedMessageId && replyContent.trim()) {
      replyMessage.mutate({
        postId: selectedMessageId,
        replyContent: replyContent,
      });
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        留言管理
      </h1>
      <Card>
        <CardContent className="p-0">
          {messages && messages.length > 0 ? (
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div key={message.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {message.image ? (
                        <Image
                          src={message.image}
                          alt={message.createdBy ?? "用户"}
                          className="h-10 w-10 rounded-full"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                          <span className="text-gray-500 dark:text-gray-400">
                            {message.createdBy?.charAt(0) ?? "?"}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {message.createdBy ?? "匿名用户"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(message.createdAt).toLocaleDateString(
                            "zh-CN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReplyMessage(message.id)}
                      >
                        回复
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteMessageConfirm(message.id)}
                        disabled={
                          deleteMessage.isPending &&
                          selectedMessageId === message.id
                        }
                      >
                        {deleteMessage.isPending &&
                        selectedMessageId === message.id
                          ? "删除中..."
                          : "删除"}
                      </Button>
                    </div>
                  </div>
                  <div
                    className="prose dark:prose-invert mt-3 text-gray-800 dark:text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: message.context ?? "",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              暂无留言
            </div>
          )}
        </CardContent>
      </Card>

      {/* 删除留言确认对话框 */}
      <DeleteMessageDialog
        open={showDeleteMessageDialog}
        onOpenChange={setShowDeleteMessageDialog}
        onDelete={handleDeleteMessage}
        isDeleting={deleteMessage.isPending}
      />

      {/* 回复留言对话框 */}
      <ReplyMessageDialog
        open={showReplyMessageDialog}
        onOpenChange={setShowReplyMessageDialog}
        onSubmit={handleSubmitReply}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
      />
    </div>
  );
}
