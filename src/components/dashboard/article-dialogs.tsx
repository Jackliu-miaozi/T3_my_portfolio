// 声明这是客户端组件，因为需要使用浏览器API和React hooks
"use client";

// 导入React核心库和必要的hooks
import React, { useState, useEffect, useCallback } from "react";

// 导入Tiptap编辑器相关组件和类型
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
// 导入Tiptap扩展包
import StarterKit from "@tiptap/starter-kit"; // 包含常用扩展如粗体、斜体、标题、列表等
import Placeholder from "@tiptap/extension-placeholder"; // 提供占位符功能
import Link from "@tiptap/extension-link"; // 链接功能
import Blockquote from "@tiptap/extension-blockquote"; // 引用块功能
import CodeBlock from "@tiptap/extension-code-block"; // 代码块功能
// import History from "@tiptap/extension-history"; // 提供撤销/重做功能

// 导入UI组件
import { Button } from "@/app/_components/ui/button"; // 按钮组件
import { Input } from "@/app/_components/ui/input"; // 输入框组件
import { Label } from "@/app/_components/ui/label"; // 标签组件
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog"; // 对话框相关组件
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
  Pilcrow, // 段落图标
  WrapText, // 文本换行图标
  Undo, // 撤销图标
  Redo, // 重做图标
} from "lucide-react";
// import Image from "next/image";

// 定义文章类型接口
type Article = {
  id: number; // 文章唯一标识符
  title: string; // 文章标题
  category: string; // 文章分类
  summary: string; // 文章摘要
  content: string; // 文章内容（HTML格式，由Tiptap编辑器生成）
  image: string | null; // 文章封面图片（可选）
  createdAt: Date; // 创建时间
};

// 定义文章对话框组件的属性接口
type ArticleDialogProps = {
  open: boolean; // 控制对话框是否打开
  onOpenChange: (open: boolean) => void; // 处理对话框开关状态变化
  title: string; // 对话框标题
  onSubmit: (formData: FormData) => void; // 表单提交处理函数
  submitButtonText: string; // 提交按钮文本
  article?: Article; // 要编辑的文章（可选，用于编辑模式）
  onImageChange?: (base64String: string) => void; // 图片变化处理函数
  isSubmitting?: boolean; // 提交状态标识
};

// 定义工具栏组件的属性接口
type ToolbarProps = {
  editor: Editor | null; // Tiptap编辑器实例
};

// 工具栏组件实现
const Toolbar = ({ editor }: ToolbarProps) => {
  // 将 useCallback 移到最顶层
  const setLink = useCallback(() => {
    //如果编辑器未实例化或不存在，直接返回
    if (!editor) return;

    //设置超链接的URL
    // 获取当前选中文本的链接属性，并提取href值，如果不存在则返回空字符串
    //更安全地获取链接地址
    // const previousUrl = editor.getAttributes('link')?.href ?? '';

    const previousUrl = (editor.getAttributes("link").href as string) ?? "";
    const url = window.prompt("URL", previousUrl);

    // 用户取消输入
    if (url === null) {
      return;
    }

    // 用户输入空链接，移除链接
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // 更新或添加链接
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]); // 依赖于editor实例

  return (
    // 工具栏容器，使用Tailwind CSS样式设置边框、背景和布局
    <div className="border-input mb-2 flex flex-wrap items-center gap-1 rounded-md border bg-transparent p-1">
      {/* 历史操作按钮组 */}
      <Toggle
        size="sm"
        onPressedChange={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().undo()} // 当无法撤销时禁用
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().redo()} // 当无法重做时禁用
      >
        <Redo className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 基本文本格式化按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("bold")} // 当前文本是否加粗
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("italic")} // 当前文本是否斜体
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("strike")} // 当前文本是否有删除线
        onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 标题按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("heading", { level: 1 })} // 当前是否为一级标题
        onPressedChange={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("heading", { level: 2 })} // 当前是否为二级标题
        onPressedChange={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("heading", { level: 3 })} // 当前是否为三级标题
        onPressedChange={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 列表按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("bulletList")} // 当前是否为无序列表
        onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("orderedList")} // 当前是否为有序列表
        onPressedChange={() =>
          editor?.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 块级元素按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("blockquote")} // 当前是否为引用块
        onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("codeBlock")} // 当前是否为代码块
        onPressedChange={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={setLink} // 使用自定义的链接处理函数
        pressed={editor?.isActive("link")} // 当前是否为链接
      >
        <LinkIcon className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 换行和分隔线按钮组 */}
      <Toggle
        size="sm"
        onPressedChange={() => editor?.chain().focus().setHardBreak().run()} // 插入硬换行
      >
        <WrapText className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() =>
          editor?.chain().focus().setHorizontalRule().run()
        } // 插入水平分隔线
      >
        — {/* 使用破折号作为分隔线图标 */}
      </Toggle>
    </div>
  );
};

// 文章对话框组件
export function ArticleDialog({
  open, // 控制对话框显示状态
  onOpenChange, // 处理对话框状态变化
  title, // 对话框标题
  onSubmit, // 表单提交处理函数
  submitButtonText, // 提交按钮文本
  article, // 要编辑的文章（可选）
  onImageChange, // 图片变化回调
  isSubmitting = false, // 提交状态
}: ArticleDialogProps) {
  // 存储Base64格式的图片字符串
  const [base64Image, setBase64Image] = useState<string | null>(null);
  // 存储当前编辑器的内容（HTML格式）
  const [editorContent, setEditorContent] = useState<string>(
    article?.content ?? "",
  );

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
      // History, // 历史记录扩展（撤销/重做）
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

  // 当文章内容变化时更新编辑器
  useEffect(() => {
    const newContent = article?.content ?? "";
    setEditorContent(newContent);
    // 只在编辑器存在且内容不同时更新
    if (editor && editor.isEditable && editor.getHTML() !== newContent) {
      editor.commands.setContent(newContent, false); // 更新内容但不触发更新事件
    }
  }, [article?.content, editor]);

  // 对话框关闭时重置状态
  useEffect(() => {
    if (!open) {
      setBase64Image(null); // 清除图片
      // 注释掉的重置内容逻辑，可根据需要启用
      // setEditorContent(article?.content || "");
      // editor?.commands.setContent(article?.content || "", false);
    }
  }, [open]);

  // 处理封面图片变化
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64Image(result); // 保存图片的Base64字符串
        if (onImageChange) {
          onImageChange(result); // 通知父组件图片变化
        }
      };
      reader.readAsDataURL(file); // 读取文件为Base64
    } else {
      setBase64Image(null); // 清除图片状态
      if (onImageChange) {
        onImageChange(""); // 通知父组件图片已清除
      }
    }
  };

  // 处理表单提交
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认提交行为
    const formData = new FormData(e.currentTarget);

    // 将编辑器内容添加到表单数据
    formData.set("content", editorContent);

    // 处理图片数据
    if (base64Image) {
      formData.set("base64Image", base64Image);
    } else {
      formData.set("base64Image", ""); // 确保base64Image字段存在
    }

    // 移除原始文件输入字段
    formData.delete("image");

    onSubmit(formData); // 提交表单数据到父组件
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 修改 DialogContent 的样式 */}
      <DialogContent className="max-h-[85vh] overflow-y-auto px-7 sm:max-w-[750px] md:max-w-[850px] lg:max-w-[950px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          {/* 添加 py-4 到这个 div */}
          <div className="grid gap-4 overflow-y-auto px-1 py-4">
            {/* --- Other fields remain the same --- */}
            <div className="grid gap-2">
              <Label htmlFor="title">文章标题</Label>
              <Input
                id="title"
                name="title"
                placeholder="输入文章标题"
                defaultValue={article?.title}
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
                defaultValue={article?.category}
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="summary">摘要</Label>
              <Input
                id="summary"
                name="summary"
                placeholder="输入文章摘要"
                defaultValue={article?.summary}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* --- Tiptap Editor for Content --- */}
            <div className="grid gap-2">
              <Label htmlFor="content">内容</Label>
              {/* Toolbar */}
              <Toolbar editor={editor} />
              {/* Editor Content Area */}
              <EditorContent id="content" editor={editor} />
              {/* We use state for content, no hidden input needed in this approach */}
            </div>

            {/* --- Cover Image Upload (Only for new articles) --- */}
            {!article && (
              <div className="grid gap-2">
                <Label htmlFor="image">封面图片</Label>
                <Input
                  id="image"
                  name="image" // Name is less important now as we handle via state
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleCoverImageChange}
                  disabled={isSubmitting}
                />
                {/* Optional: Preview image */}
                {base64Image && (
                  <img
                    src={base64Image}
                    alt="封面预览"
                    className="mt-2 max-h-40 rounded border"
                  />
                )}
              </div>
            )}
          </div>
          {/* 固定在底部的提交按钮 */}
          <DialogFooter className="mt-4 py-4">
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isSubmitting || !editor}
            >
              {isSubmitting ? "提交中..." : submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- DeleteArticleDialog remains the same ---
type DeleteArticleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
};

export function DeleteArticleDialog({
  open,
  onOpenChange,
  onDelete,
  isDeleting,
}: DeleteArticleDialogProps) {
  // ... (Delete dialog code remains unchanged)
  return (
    // 删除确认对话框
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-gray-600 dark:text-gray-400">
            您确定要删除这篇文章吗？此操作无法撤销。
          </p>
        </div>
        <DialogFooter className="flex justify-between">
          {/* 取消按钮 */}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            取消
          </Button>
          {/* 确认删除按钮 */}
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "删除中..." : "确认删除"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Important CSS for Tiptap ---
// Create a globals.css or similar and add Tiptap's basic styling needs
/*
 Example in globals.css (adjust as needed):

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
     list-style: revert; // Make sure lists have bullets/numbers
  }
   ul { list-style-type: disc; }
   ol { list-style-type: decimal; }


  h1, h2, h3, h4, h5, h6 {
     line-height: 1.1;
     margin-top: 1.25rem;
     margin-bottom: 0.5rem;
     font-weight: 600; // Example weight
  }
   h1 { font-size: 1.875rem; } // text-3xl
   h2 { font-size: 1.5rem; } // text-2xl
   h3 { font-size: 1.25rem; } // text-xl


  code {
    background-color: rgba(97, 97, 97, 0.1); // Use theme colors if possible
    color: #616161; // Use theme colors if possible
    padding: 0.25em 0.5em;
     border-radius: 0.25rem;
     box-decoration-break: clone;
  }

  pre {
    background: #0D0D0D; // Use theme colors
    color: #FFF; // Use theme colors
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    white-space: pre-wrap; // Ensure wrapping

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(128, 128, 128, 0.3); // Use theme colors
     margin-left: 0; // Adjust margins if needed
     margin-right: 0;
     font-style: italic;
  }

  img {
    max-width: 100%;
    height: auto;
     display: block; // Prevent extra space below images
     margin-top: 1rem;
     margin-bottom: 1rem;
     border-radius: 0.5rem; // Example style
  }

  hr {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.3); // Use theme colors
    margin: 2rem 0;
  }

   a {
     color: #3b82f6; // Use theme primary color
     text-decoration: underline;
     cursor: pointer;
   }

   // Placeholder styling
   p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd; // Use theme muted-foreground color
    pointer-events: none;
    height: 0;
  }
}

*/
