// 声明这是客户端组件，因为需要使用浏览器API和React hooks
"use client";

// 导入React核心库和必要的hooks
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
// 在组件顶部添加 use 导入
import { use } from 'react';

// 导入Tiptap编辑器相关组件和类型
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
// 导入Tiptap扩展包
import StarterKit from "@tiptap/starter-kit"; // 包含常用扩展如粗体、斜体、标题、列表等
import Placeholder from "@tiptap/extension-placeholder"; // 提供占位符功能
import Link from "@tiptap/extension-link"; // 链接功能
import Blockquote from "@tiptap/extension-blockquote"; // 引用块功能
import CodeBlock from "@tiptap/extension-code-block"; // 代码块功能

// 导入UI组件
import { Button } from "@/app/_components/ui/button"; // 按钮组件
import { Input } from "@/app/_components/ui/input"; // 输入框组件
import { Label } from "@/app/_components/ui/label"; // 标签组件
import { Toggle } from "@/app/_components/ui/toggle"; // 用于工具栏按钮的切换组件
import { Separator } from "@/app/_components/ui/separator"; // 分隔符组件

// 导入工具栏图标 (来自lucide-react库)
import {
  Bold, // 粗体图标
  Italic, // 斜体图标
  Strikethrough, // 删除线图标
  Heading1,
  Heading2,
  Heading3, // 标题图标
  List, // 无序列表图标
  ListOrdered, // 有序列表图标
  Quote, // 引用图标
  Code, // 代码图标
  Link as LinkIcon, // 链接图标
  WrapText, // 文本换行图标
  Undo, // 撤销图标
  Redo, // 重做图标
  ArrowLeft, // 返回图标
} from "lucide-react";

// 导入tRPC API客户端，用于进行前后端数据交互
import { api } from "@/trpc/react";

// 导入toast通知组件，用于显示操作反馈信息
import { toast } from "sonner";

// 修改导入部分
import { RichTextEditor } from "@/components/dashboard/editor-toolbar";

// 删除原有的 Tiptap 相关导入
// 删除 useEditor, EditorContent, StarterKit, Placeholder, Link, Blockquote, CodeBlock 等导入

// 在组件中替换编辑器部分
export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");

  // 获取tRPC工具函数
  const utils = api.useUtils();

  // 删除 Tiptap 编辑器初始化代码
  // const editor = useEditor({ ... });

  // 更新文章的mutation操作
  const updateArticle = api.artical.update.useMutation({
    // 保持不变
    // 当更新成功后执行以下操作
    onSuccess: async () => {
      await utils.artical.invalidate();
      toast.success("文章更新成功");
      router.push("/dashboard/articles");
    },
    // 当更新发生错误时执行
    onError: () => {
      setIsSubmitting(false);
      toast.error("文章更新失败");
    },
    // 当更新完成时执行（无论成功或失败）
    onSettled: () => {
      setIsSubmitting(false);
    },
    // 当更新成功后执行以下操作
    onMutate: async () => {
      setIsSubmitting(true);
    },
  });
  
  // 解包 params
  const { id } = use(params);
  
  // 获取文章数据
  const { data: article, isLoading, error } = api.artical.getById.useQuery({
    id: parseInt(id).toString(),
  });

  // 当文章数据变化时更新状态
  useEffect(() => {
    if (article) {
      setBase64Image(article.image);
      setEditorContent(article.content ?? "");
    }
  }, [article]);

  // 处理加载和错误状态
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-6">
        <div className="flex items-center justify-center py-12">
          <p className="text-lg text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl py-6">
        <div className="flex items-center justify-center py-12">
          <p className="text-lg text-red-500">加载失败: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto max-w-4xl py-6">
        <div className="flex items-center justify-center py-12">
          <p className="text-lg text-gray-500">文章不存在或已被删除</p>
        </div>
      </div>
    );
  }

  // 处理封面图片变化
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证图片类型
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("请选择 JPG、PNG 或 GIF 格式的图片");
        return;
      }

      // 验证图片大小（2MB限制）
      if (file.size > 2 * 1024 * 1024) {
        toast.error("图片大小不能超过 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64Image(result); // 保存图片的Base64字符串
      };
      reader.onerror = () => toast.error("图片读取失败");
      reader.readAsDataURL(file); // 读取文件为Base64
    } else {
      setBase64Image(null); // 清除图片状态
    }
  };

  // 处理表单提交
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认提交行为
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      updateArticle.mutate({
        id: parseInt(id),
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        summary: formData.get("summary") as string,
        content: editorContent,
        image: base64Image ?? "",
      });
    } catch (error) {
      setIsSubmitting(false);
      toast.error("文章更新失败！");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/articles")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          编辑文章
        </h1>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* 其他表单字段保持不变 */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">文章标题</Label>
            <Input
              id="title"
              name="title"
              placeholder="输入文章标题"
              defaultValue={article.title ?? ""}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">分类</Label>
            <Input
              id="category"
              name="category"
              placeholder="输入文章分类"
              defaultValue={article.category ?? ""}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="summary">摘要</Label>
            <Input
              id="summary"
              name="summary"
              placeholder="输入文章摘要"
              defaultValue={article.summary ?? ""}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 替换编辑器部分 */}
          <div className="grid gap-2">
            <Label htmlFor="content">内容</Label>
            <RichTextEditor 
              value={editorContent}
              onChange={setEditorContent}
              placeholder="输入文章内容"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">封面图片</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleCoverImageChange}
              disabled={isSubmitting}
            />
            {base64Image && (
              <img
                src={base64Image}
                alt="封面预览"
                className="mt-2 max-h-40 rounded border"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "更新中..." : "更新"}
          </Button>
        </div>
      </form>
    </div>
  );
}