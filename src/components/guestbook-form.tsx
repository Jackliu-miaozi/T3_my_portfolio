"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { api } from "@/trpc/react";

type GuestbookFormProps = {
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
};

export function GuestbookForm({ user }: GuestbookFormProps) {
  const utils = api.useUtils();
// 创建一个用于提交留言的mutation钩子
// 使用tRPC的useMutation来处理留言创建
// onSuccess回调在留言创建成功后执行:
// 1. 使用utils.post.invalidate()使缓存失效，强制重新获取最新数据
// 2. 清空输入框的内容
const createPost = api.post.create.useMutation({
  onSuccess: async () => {
    await utils.post.invalidate();
    setMessage("");
  },
});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 如果消息为空（或只包含空格）则直接返回，不执行提交
    if (!message.trim()) return;
    // 获取表单中提交的消息内容
    setIsSubmitting(true);
    try {
      // 这里使用了trpc来调用API
      createPost.mutate({
        context: message,
        // 不需要显式传递createdById，因为它在服务器端从session中获取
      });
      
      // 不再需要手动清空输入框，因为onSuccess回调会处理
      // 不再使用alert，避免阻塞UI更新
    } catch (error) {
      console.error("提交留言失败", error);
      alert("提交失败，请稍后再试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-6">
      <div className="flex items-center space-x-3">
        {user.image && (
          <Image
            src={user.image}
            alt={user.name ?? "用户头像"}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
        )}
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            正在留言...
          </p>
        </div>
      </div>

      <div>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="写下你想说的话..."
          className="w-full"
          maxLength={500}
          required
        />
        <p className="mt-1 text-right text-sm text-gray-500 dark:text-gray-400">
          {message.length}/500
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !message.trim()}
        className={cn(
          "rounded-md px-4 py-2 font-medium transition-colors",
          "bg-blue-600 text-white hover:bg-blue-700",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isSubmitting ? "提交中..." : "提交留言"}
      </button>
    </form>
  );
}
