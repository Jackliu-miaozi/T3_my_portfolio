"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { ArticleDialog, DeleteArticleDialog } from "./article-dialogs";

type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string | null;
  createdAt: Date;
};

export function ArticlesManagement() {
  const [showAddArticleDialog, setShowAddArticleDialog] = useState(false);
  const [showEditArticleDialog, setShowEditArticleDialog] = useState(false);
  const [showDeleteArticleDialog, setShowDeleteArticleDialog] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number>();
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  const utils = api.useUtils();
  const { data: articles, status: isLoading } = api.artical.getAll.useQuery();
  const createArticle = api.artical.create.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate();
      toast.success("文章添加成功！");
      setShowAddArticleDialog(false);
    },
  });
  const updateArticle = api.artical.update.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate();
      toast.success("文章更新成功！");
      setShowEditArticleDialog(false);
    },
  });
  const deleteArticle = api.artical.delete.useMutation({
    onSuccess: async () => {
      toast.success("文章已删除！");
      await utils.artical.invalidate();
      setShowDeleteArticleDialog(false);
    },
  });

  // 处理添加文章
  const handleAddArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 创建FormData实例获取表单数据
    const formData = new FormData(e.currentTarget);
    // 提交文章数据
    try {
      createArticle.mutate({
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        summary: formData.get("summary") as string,
        content: formData.get("content") as string,
      });
    } catch (error) {
      toast.error("文章添加失败！");
    }
  };

  // 处理删除文章确认
  const handleDeleteArticleConfirm = (id: number) => {
    setSelectedArticleId(id);
    setShowDeleteArticleDialog(true);
  };

  // 处理删除文章
  const handleDeleteArticle = () => {
    if (selectedArticleId) {
      deleteArticle.mutate({
        id: selectedArticleId,
      });
    }
  };

  // 处理打开编辑文章对话框
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowEditArticleDialog(true);
  };

  // 处理提交编辑文章
  const handleEditArticleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 创建FormData实例获取表单数据
    const formData = new FormData(e.currentTarget);
    // 提交文章数据
    if (selectedArticle) {
      try {
        updateArticle.mutate({
          id: selectedArticle.id,
          title: formData.get("title") as string,
          category: formData.get("category") as string,
          summary: formData.get("summary") as string,
          content: formData.get("content") as string,
        });
      } catch (error) {
        toast.error("文章更新失败！");
      }
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          文章管理
        </h1>
        <Button onClick={() => setShowAddArticleDialog(true)}>
          添加新文章
        </Button>
      </div>
      <div>
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
            isLoading
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              : "hidden",
          )}
        >
          {articles?.map((article) => (
            <Card
              key={article.id}
              className={cn(
                "overflow-hidden",
                // 如果文章正在删除中，添加灰色半透明效果
                deleteArticle.isPending &&
                  selectedArticleId === article.id &&
                  "pointer-events-none opacity-50",
              )}
            >
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
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {new Date(article.createdAt).toLocaleDateString(
                        "zh-CN",
                        {
                          timeZone: "Asia/Shanghai",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        },
                      )}{" "}
                      · {article.category}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                  {article.summary}
                </p>
              </CardContent>
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

      {/* 添加文章对话框 */}
      <ArticleDialog
        open={showAddArticleDialog}
        onOpenChange={setShowAddArticleDialog}
        title="添加新文章"
        onSubmit={handleAddArticle}
        submitButtonText="提交"
      />

      {/* 编辑文章对话框 */}
      <ArticleDialog
        open={showEditArticleDialog}
        onOpenChange={setShowEditArticleDialog}
        title="编辑文章"
        onSubmit={handleEditArticleSubmit}
        submitButtonText="保存更改"
        article={selectedArticle}
      />

      {/* 删除文章确认对话框 */}
      <DeleteArticleDialog
        open={showDeleteArticleDialog}
        onOpenChange={setShowDeleteArticleDialog}
        onDelete={handleDeleteArticle}
        isDeleting={deleteArticle.isPending}
      />
    </div>
  );
}