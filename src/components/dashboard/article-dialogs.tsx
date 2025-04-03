"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";

type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string | null;
  createdAt: Date;
};

type ArticleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitButtonText: string;
  article?: Article;
};

export function ArticleDialog({
  open,
  onOpenChange,
  title,
  onSubmit,
  submitButtonText,
  article,
}: ArticleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">文章标题</Label>
              <Input
                id="title"
                name="title"
                placeholder="输入文章标题"
                defaultValue={article?.title}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">分类</Label>
              <Input
                id="category"
                name="category"
                placeholder="输入文章分类"
                defaultValue={article?.category}
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">内容</Label>
              <textarea
                id="content"
                name="content"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="输入文章内容"
                defaultValue={article?.content}
                required
              />
            </div>
            {!article && (
              <div className="grid gap-2">
                <Label htmlFor="image">封面图片</Label>
                <Input id="image" name="image" type="file" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">{submitButtonText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
  return (
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
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            取消
          </Button>
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