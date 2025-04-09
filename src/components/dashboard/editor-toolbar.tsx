"use client";

import { useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "@/app/_components/ui/toggle";
import { Separator } from "@/app/_components/ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  WrapText,
  Undo,
  Redo,
} from "lucide-react";

type EditorToolbarProps = {
  editor: Editor | null;
};

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = (editor.getAttributes("link").href as string) ?? "";
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="border-input mb-2 flex flex-wrap items-center gap-1 rounded-md border bg-transparent p-1">
      {/* 历史操作按钮组 */}
      <Toggle
        size="sm"
        onPressedChange={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 基本文本格式化按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("bold")}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("italic")}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("strike")}
        onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 标题按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("heading", { level: 3 })}
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
        pressed={editor?.isActive("bulletList")}
        onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("orderedList")}
        onPressedChange={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 块级元素按钮组 */}
      <Toggle
        size="sm"
        pressed={editor?.isActive("blockquote")}
        onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor?.isActive("codeBlock")}
        onPressedChange={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={setLink}
        pressed={editor?.isActive("link")}
      >
        <LinkIcon className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* 换行和分隔线按钮组 */}
      <Toggle
        size="sm"
        onPressedChange={() => editor?.chain().focus().setHardBreak().run()}
      >
        <WrapText className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() =>
          editor?.chain().focus().setHorizontalRule().run()
        }
      >
        — {/* 使用破折号作为分隔线图标 */}
      </Toggle>
    </div>
  );
}