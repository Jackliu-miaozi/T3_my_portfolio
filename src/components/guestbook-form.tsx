"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { toast } from "sonner";
import { Smile, Bold as BoldIcon, Italic as ItalicIcon } from "lucide-react"; // 导入图标组件
import { Toggle } from "@/app/_components/ui/toggle"; // 导入切换按钮组件
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
// 添加导入
import EmojiPicker from "emoji-picker-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

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

/**
 * 留言表单组件
 * 使用优化的mutation配置来提供更好的用户体验和性能
 */
export function GuestbookForm({ user }: GuestbookFormProps) {
  const utils = api.useUtils();
  
  // 优化的mutation配置，提供乐观更新和更好的错误处理
  const createPost = api.post.create.useMutation({
    // 乐观更新：在请求发送前立即更新UI，提供即时反馈
    onMutate: async (newPost) => {
      setIsSubmitting(true);
      
      // 取消正在进行的查询，避免覆盖乐观更新
      await utils.post.getAll.cancel();
      
      // 获取当前缓存数据的快照
      const previousPosts = utils.post.getAll.getData();
      
      // 乐观更新：立即在UI中显示新留言
       // 确保数据结构与API返回的数据结构一致
       const optimisticPost = {
         id: Date.now(), // 临时ID
         context: newPost.context,
         createdAt: new Date(), // 使用Date对象而不是字符串
         createdBy: user.name ?? '匿名用户', // 使用createdBy而不是createdById
         image: user.image ?? null,
       };
      
      utils.post.getAll.setData(undefined, (old) => {
        if (!old) return [optimisticPost];
        return [optimisticPost, ...old];
      });
      
      // 返回上下文对象，用于错误回滚
      return { previousPosts };
    },
    
    // 错误处理：回滚乐观更新并显示错误信息
    onError: (error, newPost, context) => {
      setIsSubmitting(false);
      
      // 回滚到之前的状态
      if (context?.previousPosts) {
        utils.post.getAll.setData(undefined, context.previousPosts);
      }
      
      // 显示具体的错误信息
      const errorMessage = error.message || "留言提交失败";
      toast.error(errorMessage);
    },
    
    // 成功处理：清理表单并显示成功信息
    onSuccess: async (data) => {
      setMessage("");
      editor?.commands.setContent("");
      toast.success("留言成功");
      
      // 在后台重新验证数据，确保数据一致性
      await utils.post.getAll.invalidate();
    },
    
    // 完成处理：无论成功或失败都会执行
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

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
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
    ],
    content: message,
    onUpdate: ({ editor }) => {
      setMessage(editor.getHTML());
    },
    editable: !isSubmitting,
    immediatelyRender: false,
  });

  // 添加纯文本长度状态，使用 useMemo 优化性能
  const textLength = typeof document !== "undefined" ? stripHtml(message) : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border p-4">
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

      <div className="rounded-md border">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert mx-2 my-[-15] h-auto max-w-none focus:outline-none [&_.ProseMirror]:outline-none"
        />
      </div>
      <div className="flex justify-between">
        {/* 新增编辑工具栏 */}
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={editor?.isActive("bold")}
            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.isEditable}
          >
            <BoldIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("italic")}
            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.isEditable}
          >
            <ItalicIcon className="h-4 w-4" />
          </Toggle>
          {/* // 替换原来的 emoji Toggle 组件 */}
          <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <PopoverTrigger asChild>
              <Toggle
                size="sm"
                pressed={isEmojiPickerOpen}
                disabled={!editor?.isEditable}
              >
                <Smile className="h-4 w-4" />
              </Toggle>
            </PopoverTrigger>
            <PopoverContent
              className="w-[352px] p-0"
              align="start"
              side="right"
              sideOffset={5}
            >
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  editor?.chain().focus().insertContent(emojiData.emoji).run();
                  setIsEmojiPickerOpen(false);
                }}
                lazyLoadEmojis={true}
              />
            </PopoverContent>
          </Popover>
        </div>
        <p className="mt-1 text-right text-sm text-gray-500 dark:text-gray-400">
          {textLength}/500
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
