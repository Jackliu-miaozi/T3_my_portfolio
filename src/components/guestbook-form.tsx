"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { toast } from "sonner";

type GuestbookFormProps = {
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
};

// 在文件顶部添加工具函数
// 修改 stripHtml 函数
function stripHtml(html: string) {
  if (typeof window === "undefined") return 0; // 服务端返回固定值
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = tmp.textContent ?? tmp.innerText ?? "";
  return Array.from(text).length;
}

export function GuestbookForm({ user }: GuestbookFormProps) {
  const utils = api.useUtils();
  // 创建一个用于提交留言的mutation钩子
  // 使用tRPC的useMutation来处理留言创建
  // onSuccess回调在留言创建成功后执行:
  // 1. 使用utils.post.invalidate()使缓存失效，强制重新获取最新数据
  // 2. 清空输入框的内容
  const createPost = api.post.create.useMutation({
    // 当mutation被触发时执行
    onMutate: () => {
      setIsSubmitting(true);
    },
    // 当mutation发生错误时执行
    onError: () => {
      setIsSubmitting(false);
      alert("提交失败，请稍后再试");
    },
    // 当mutation完成时执行（无论成功或失败）
    onSettled: () => {
      setIsSubmitting(false);
    },

    // 当留言创建成功后，执行以下操作
    onSuccess: async () => {
      await utils.post.invalidate();
      setMessage("");
      // 重置编辑器内容
      editor?.commands.setContent("");
      toast.success("留言成功");
    },
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 如果消息为空（或只包含空格）则直接返回，不执行提交
    if (!message.trim()) return;
    // 获取表单中提交的消息内容
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
    }
  };

  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: message,
    onUpdate: ({ editor }) => {
      setMessage(editor.getHTML());
    },
    editable: !isSubmitting,
    immediatelyRender: false, // 添加这行来解决 SSR 问题
  });

  // 添加纯文本长度状态，使用 useMemo 优化性能
  const textLength = typeof document !== "undefined" ? stripHtml(message) : 0;

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

      <div className="rounded-md border p-4">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert min-h-[100px] max-w-none focus:outline-none [&_.ProseMirror]:min-h-[100px] [&_.ProseMirror]:outline-none"
        />
      </div>
      <p className="mt-1 text-right text-sm text-gray-500 dark:text-gray-400">
        {textLength}/500
      </p>

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
