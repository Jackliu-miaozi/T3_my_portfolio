// 声明这是客户端组件，因为需要使用浏览器API和React hooks
"use client";

// 导入React核心库和必要的hooks
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

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

import { EditorToolbar } from "@/components/dashboard/editor-toolbar";

// // 定义工具栏组件的属性接口
// type ToolbarProps = {
//   editor: Editor | null; // Tiptap编辑器实例
// };

// // 工具栏组件实现
// const Toolbar = ({ editor }: ToolbarProps) => {
//   // 将 useCallback 移到最顶层
//   const setLink = useCallback(() => {
//     //如果编辑器未实例化或不存在，直接返回
//     if (!editor) return;

//     //设置超链接的URL
//     const previousUrl = (editor.getAttributes("link").href as string) ?? "";
//     const url = window.prompt("URL", previousUrl);

//     // 用户取消输入
//     if (url === null) {
//       return;
//     }

//     // 用户输入空链接，移除链接
//     if (url === "") {
//       editor.chain().focus().extendMarkRange("link").unsetLink().run();
//       return;
//     }

//     // 更新或添加链接
//     editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//   }, [editor]); // 依赖于editor实例

//   return (
//     // 工具栏容器，使用Tailwind CSS样式设置边框、背景和布局
//     <div className="border-input mb-2 flex flex-wrap items-center gap-1 rounded-md border bg-transparent p-1">
//       {/* 历史操作按钮组 */}
//       <Toggle
//         size="sm"
//         onPressedChange={() => editor?.chain().focus().undo().run()}
//         disabled={!editor?.can().undo()} // 当无法撤销时禁用
//       >
//         <Undo className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         onPressedChange={() => editor?.chain().focus().redo().run()}
//         disabled={!editor?.can().redo()} // 当无法重做时禁用
//       >
//         <Redo className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="mx-1 h-6" />

//       {/* 基本文本格式化按钮组 */}
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("bold")} // 当前文本是否加粗
//         onPressedChange={() => editor?.chain().focus().toggleBold().run()}
//       >
//         <Bold className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("italic")} // 当前文本是否斜体
//         onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
//       >
//         <Italic className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("strike")} // 当前文本是否有删除线
//         onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
//       >
//         <Strikethrough className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="mx-1 h-6" />

//       {/* 标题按钮组 */}
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("heading", { level: 1 })} // 当前是否为一级标题
//         onPressedChange={() =>
//           editor?.chain().focus().toggleHeading({ level: 1 }).run()
//         }
//       >
//         <Heading1 className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("heading", { level: 2 })} // 当前是否为二级标题
//         onPressedChange={() =>
//           editor?.chain().focus().toggleHeading({ level: 2 }).run()
//         }
//       >
//         <Heading2 className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("heading", { level: 3 })} // 当前是否为三级标题
//         onPressedChange={() =>
//           editor?.chain().focus().toggleHeading({ level: 3 }).run()
//         }
//       >
//         <Heading3 className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="mx-1 h-6" />

//       {/* 列表按钮组 */}
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("bulletList")} // 当前是否为无序列表
//         onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
//       >
//         <List className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("orderedList")} // 当前是否为有序列表
//         onPressedChange={() =>
//           editor?.chain().focus().toggleOrderedList().run()
//         }
//       >
//         <ListOrdered className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="mx-1 h-6" />

//       {/* 块级元素按钮组 */}
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("blockquote")} // 当前是否为引用块
//         onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
//       >
//         <Quote className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         pressed={editor?.isActive("codeBlock")} // 当前是否为代码块
//         onPressedChange={() => editor?.chain().focus().toggleCodeBlock().run()}
//       >
//         <Code className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         onPressedChange={setLink} // 使用自定义的链接处理函数
//         pressed={editor?.isActive("link")} // 当前是否为链接
//       >
//         <LinkIcon className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="mx-1 h-6" />

//       {/* 换行和分隔线按钮组 */}
//       <Toggle
//         size="sm"
//         onPressedChange={() => editor?.chain().focus().setHardBreak().run()} // 插入硬换行
//       >
//         <WrapText className="h-4 w-4" />
//       </Toggle>
//       <Toggle
//         size="sm"
//         onPressedChange={() =>
//           editor?.chain().focus().setHorizontalRule().run()
//         } // 插入水平分隔线
//       >
//         — {/* 使用破折号作为分隔线图标 */}
//       </Toggle>
//     </div>
//   );
// };

// 添加文章页面组件
export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");

  // 获取tRPC工具函数
  const utils = api.useUtils();

  // 创建文章的mutation操作
  const createArticle = api.artical.create.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate(); // 刷新文章列表
      toast.success("文章添加成功！"); // 显示成功提示
      router.push("/dashboard/articles"); // 返回文章列表页面
    },
    onError: (error) => {
      toast.error(`添加失败: ${error.message}`);
      setIsSubmitting(false);
    },
  });

  // 初始化Tiptap编辑器实例
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // 配置可用的标题级别
        },
        // 明确禁用StarterKit中已包含但我们要单独配置的扩展
        blockquote: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "输入文章内容...", // 编辑器占位文本
      }),
      Link.configure({
        openOnClick: false, // 禁止点击链接时打开
        autolink: true, // 自动检测并转换链接
      }),
      Blockquote, // 引用块扩展
      CodeBlock, // 代码块扩展
    ],
    content: editorContent, // 初始内容
    immediatelyRender: false, // 添加这一行解决 SSR 问题
    editable: true, // 可编辑
    // 内容更新时的回调
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML()); // 更新状态中的内容
    },
    // 编辑器样式配置
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[150px] border border-input rounded-md px-3 py-2",
      },
    },
  });

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
      createArticle.mutate({
        title: formData.get("title") as string, // 获取文章标题
        category: formData.get("category") as string, // 获取文章分类
        summary: formData.get("summary") as string, // 获取文章摘要
        content: editorContent, // 获取文章内容
        image: base64Image ?? "", // 使用预览图片或空字符串
      });
    } catch (error) {
      setIsSubmitting(false);
      toast.error("文章添加失败！");
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
          添加新文章
        </h1>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">文章标题</Label>
            <Input
              id="title"
              name="title"
              placeholder="输入文章标题"
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
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="summary">摘要</Label>
            <Input
              id="summary"
              name="summary"
              placeholder="输入文章摘要"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">内容</Label>
            <EditorToolbar editor={editor} />
            <EditorContent id="content" editor={editor} />
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
            disabled={isSubmitting || !editor}
            className="min-w-[100px]"
          >
            {isSubmitting ? "提交中..." : "提交"}
          </Button>
        </div>
      </form>
    </div>
  );
}