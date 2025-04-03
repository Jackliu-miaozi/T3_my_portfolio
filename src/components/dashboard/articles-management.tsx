// 声明这是客户端组件 - 告诉Next.js这是一个客户端渲染的组件
"use client";

// 导入必要的React hooks和组件
import { useState, useRef } from "react"; // useState用于状态管理，useRef用于获取DOM元素引用
import { api } from "@/trpc/react"; // 导入tRPC API客户端，用于与后端通信
import { Button } from "@/app/_components/ui/button"; // 导入自定义按钮组件
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"; // 导入卡片相关UI组件
import { cn } from "@/lib/utils"; // 导入工具函数，用于条件类名拼接
import Image from "next/image"; // 导入Next.js优化的图片组件
import { toast } from "sonner"; // 导入提示组件，用于显示操作反馈
import { ArticleDialog, DeleteArticleDialog } from "./article-dialogs"; // 导入文章相关对话框组件

// 定义文章类型接口，描述文章数据结构
type Article = {
  id: number; // 文章唯一标识
  title: string; // 文章标题
  category: string; // 文章分类
  summary: string; // 文章摘要
  content: string; // 文章内容
  image: string | null; // 文章封面图片URL
  createdAt: Date; // 创建时间
};

// 文章管理组件 - 处理文章的CRUD操作
export function ArticlesManagement() {
  // 状态管理 - 使用useState hook管理组件状态
  const [showAddArticleDialog, setShowAddArticleDialog] = useState(false); // 控制添加文章对话框的显示状态
  const [showEditArticleDialog, setShowEditArticleDialog] = useState(false); // 控制编辑文章对话框的显示状态
  const [showDeleteArticleDialog, setShowDeleteArticleDialog] = useState(false); // 控制删除文章对话框的显示状态
  const [selectedArticleId, setSelectedArticleId] = useState<number>(); // 存储当前选中的文章ID
  const [selectedArticle, setSelectedArticle] = useState<Article>(); // 存储当前选中的文章完整信息
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 存储图片预览的base64字符串
  const fileInputRef = useRef<HTMLInputElement>(null); // 创建文件输入框的引用

  // API相关操作 - 使用tRPC hooks进行后端通信
  const utils = api.useUtils(); // 获取tRPC工具函数
  const { data: articles, status: isLoading } = api.artical.getAll.useQuery(); // 获取所有文章数据

  // 创建文章mutation - 处理文章创建操作
  const createArticle = api.artical.create.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate(); // 成功后刷新文章列表
      toast.success("文章添加成功！"); // 显示成功提示
      setShowAddArticleDialog(false); // 关闭添加对话框
    },
  });

  // 更新文章mutation - 处理文章更新操作
  const updateArticle = api.artical.update.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate(); // 成功后刷新文章列表
      toast.success("文章更新成功！"); // 显示成功提示
      setShowEditArticleDialog(false); // 关闭编辑对话框
    },
  });

  // 删除文章mutation - 处理文章删除操作
  const deleteArticle = api.artical.delete.useMutation({
    onSuccess: async () => {
      toast.success("文章已删除！"); // 显示成功提示
      await utils.artical.invalidate(); // 刷新文章列表
      setShowDeleteArticleDialog(false); // 关闭删除对话框
    },
  });

  // 处理图片选择 - 验证和预览选择的图片
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("请选择 JPG、PNG 或 GIF 格式的图片");
        return;
      }

      // 验证文件大小
      if (file.size > 2 * 1024 * 1024) {
        toast.error("图片大小不能超过 2MB");
        return;
      }

      // 转换为 base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // 确保 base64 字符串格式正确
        if (
          base64String.startsWith("data:image/") &&
          base64String.includes(";base64,")
        ) {
          setImagePreview(base64String);
        } else {
          toast.error("图片格式转换失败");
        }
      };
      reader.onerror = () => {
        toast.error("图片读取失败");
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理添加文章 - 提交新文章表单
  const handleAddArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      // 调用创建文章mutation
      createArticle.mutate({
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        summary: formData.get("summary") as string,
        content: formData.get("content") as string,
        image: imagePreview ?? "",
      });
      // 重置表单状态
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("文章添加失败！");
    }
  };

  // 处理删除文章确认 - 打开删除确认对话框
  const handleDeleteArticleConfirm = (id: number) => {
    setSelectedArticleId(id);
    setShowDeleteArticleDialog(true);
  };

  // 处理删除文章 - 执行删除操作
  const handleDeleteArticle = () => {
    if (selectedArticleId) {
      deleteArticle.mutate({
        id: selectedArticleId,
      });
    }
  };

  // 处理打开编辑文章对话框 - 设置当前编辑的文章信息
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setImagePreview(article.image);
    setShowEditArticleDialog(true);
  };

  // 处理提交编辑文章 - 更新文章信息
  const handleEditArticleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (selectedArticle) {
      try {
        // 调用更新文章mutation
        updateArticle.mutate({
          id: selectedArticle.id,
          title: formData.get("title") as string,
          category: formData.get("category") as string,
          summary: formData.get("summary") as string,
          content: formData.get("content") as string,
          image: imagePreview ?? "",
        });
        setImagePreview(null);
      } catch (error) {
        toast.error("文章更新失败！");
      }
    }
  };

  // 渲染UI组件
  return (
    <div>
      {/* 头部标题和添加按钮 - 显示页面标题和添加文章按钮 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          文章管理
        </h1>
        <Button onClick={() => setShowAddArticleDialog(true)}>
          添加新文章
        </Button>
      </div>

      {/* 文章列表 - 使用网格布局显示文章卡片 */}
      <div>
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
            isLoading
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              : "hidden",
          )}
        >
          {/* 文章卡片列表 - 遍历显示所有文章 */}
          {articles?.map((article) => (
            <Card
              key={article.id}
              className={cn(
                "overflow-hidden",
                deleteArticle.isPending &&
                  selectedArticleId === article.id &&
                  "pointer-events-none opacity-50",
              )}
            >
              {/* 文章封面图 - 显示文章封面图片或默认占位符 */}
              <div className="relative h-48">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title ?? "文章封面"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                    <div className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400">
                      文章封面图
                    </div>
                  </div>
                )}
              </div>

              {/* 文章标题和日期 - 显示文章基本信息 */}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {new Date(article.createdAt).toLocaleDateString("zh-CN", {
                        timeZone: "Asia/Shanghai",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}{" "}
                      · {article.category}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* 文章摘要 - 显示文章简介 */}
              <CardContent>
                <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                  {article.summary}
                </p>
              </CardContent>

              {/* 操作按钮 - 提供编辑和删除功能 */}
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleEditArticle({
                      id: article.id,
                      title: article.title ?? "",
                      category: article.category ?? "",
                      summary: article.summary ?? "",
                      content: article.content ?? "",
                      image: article.image,
                      createdAt: article.createdAt,
                    })
                  }
                >
                  编辑
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteArticleConfirm(article.id)}
                >
                  删除
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* 添加文章对话框 - 用于创建新文章 */}
      <ArticleDialog
        open={showAddArticleDialog}
        onOpenChange={(open) => {
          setShowAddArticleDialog(open);
          if (!open) {
            setImagePreview(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        }}
        title="添加新文章"
        onSubmit={handleAddArticle}
        submitButtonText="提交"
        onImageChange={(base64String) => setImagePreview(base64String)}
      />

      {/* 编辑文章对话框 - 用于修改现有文章 */}
      <ArticleDialog
        open={showEditArticleDialog}
        onOpenChange={(open) => {
          setShowEditArticleDialog(open);
          if (!open) {
            setImagePreview(null);
          }
        }}
        title="编辑文章"
        onSubmit={handleEditArticleSubmit}
        submitButtonText="保存更改"
        article={selectedArticle}
        onImageChange={(base64String) => setImagePreview(base64String)}
      />

      {/* 删除文章确认对话框 - 用于确认删除操作 */}
      <DeleteArticleDialog
        open={showDeleteArticleDialog}
        onOpenChange={setShowDeleteArticleDialog}
        onDelete={handleDeleteArticle}
        isDeleting={deleteArticle.isPending}
      />
    </div>
  );
}
