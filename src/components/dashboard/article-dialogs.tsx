// 声明这是客户端组件
"use client";

// 导入必要的UI组件
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

// 定义文章类型接口
type Article = {
  id: number; // 文章ID
  title: string; // 文章标题
  category: string; // 文章分类
  summary: string; // 文章摘要
  content: string; // 文章内容
  image: string | null; // 文章封面图片
  createdAt: Date; // 创建时间
};

// 定义文章对话框属性接口
type ArticleDialogProps = {
  open: boolean; // 对话框是否打开
  onOpenChange: (open: boolean) => void; // 对话框开关状态变化处理函数
  title: string; // 对话框标题
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // 当表单提交时触发的回调函数，接收一个表单事件参数e，用于处理表单数据的提交逻辑
  submitButtonText: string; // 提交按钮文本
  article?: Article; // 可选的文章对象，用于编辑模式
  onImageChange?: (base64String: string) => void; // 图片变更回调函数，用于将base64字符串传递给父组件
};

// 文章对话框组件
export function ArticleDialog({
  open,
  onOpenChange,
  title,
  onSubmit,
  submitButtonText,
  article,
  onImageChange,
}: ArticleDialogProps) {
  // 添加图片处理函数
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // 设置隐藏input的值
        const base64Input = document.getElementById(
          "base64Image",
        ) as HTMLInputElement;
        if (base64Input) {
          base64Input.value = base64String;
        }
        // 调用回调函数将base64字符串传递给父组件
        if (onImageChange) {
          onImageChange(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    // 对话框容器
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {/* 文章表单 */}
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* 文章标题输入框 */}
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
            {/* 文章分类输入框 */}
            <div className="grid gap-2">
              <Label htmlFor="category">分类</Label>
              <Input
                id="category"
                name="category"
                placeholder="输入文章分类"
                defaultValue={article?.category}
              />
            </div>
            {/* 文章摘要输入框 */}
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
            {/* 文章内容文本区域 */}
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
            {/* 仅在新建文章时显示图片上传 */}
            {!article && (
              <div className="grid gap-2">
                <Label htmlFor="image">封面图片</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleImageChange}
                />
                <input type="hidden" id="base64Image" name="base64Image" />
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

// 定义删除文章对话框属性接口
type DeleteArticleDialogProps = {
  open: boolean; // 对话框是否打开
  onOpenChange: (open: boolean) => void; // 对话框开关状态变化处理函数
  onDelete: () => void; // 删除处理函数
  isDeleting: boolean; // 是否正在删除
};

// 删除文章对话框组件
export function DeleteArticleDialog({
  open,
  onOpenChange,
  onDelete,
  isDeleting,
}: DeleteArticleDialogProps) {
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
