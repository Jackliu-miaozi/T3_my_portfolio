// 声明这是客户端组件 - 告诉Next.js这是一个客户端渲染的组件
"use client";

// 导入必要的React hooks和组件
// useState用于管理组件的状态数据
// useRef用于获取和操作DOM元素
import { useState, useRef } from "react";

// 导入tRPC API客户端，用于进行前后端数据交互
import { api } from "@/trpc/react";

// 导入自定义的UI组件
import { Button } from "@/app/_components/ui/button";

// 导入卡片相关的UI组件，用于展示文章内容
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

// 导入工具函数cn，用于动态组合CSS类名
import { cn } from "@/lib/utils";

// 导入Next.js的图片组件，提供图片优化功能
import Image from "next/image";

// 导入toast通知组件，用于显示操作反馈信息
import { toast } from "sonner";

// 导入文章相关的对话框组件
import { ArticleDialog, DeleteArticleDialog } from "./article-dialogs";

// 定义文章数据结构的TypeScript接口
type Article = {
  id: number; // 文章ID，用于唯一标识
  title: string; // 文章标题
  category: string; // 文章分类
  summary: string; // 文章摘要
  content: string; // 文章正文内容
  image: string | null; // 文章封面图片的base64 格式图片，可以为空
  createdAt: Date; // 文章创建时间
};

// 文章管理组件，实现文章的增删改查功能
export function ArticlesManagement() {
  // 使用useState管理各种UI状态
  const [showAddArticleDialog, setShowAddArticleDialog] = useState(false); // 控制添加文章对话框显示
  const [showEditArticleDialog, setShowEditArticleDialog] = useState(false); // 控制编辑文章对话框显示
  const [showDeleteArticleDialog, setShowDeleteArticleDialog] = useState(false); // 控制删除确认对话框显示
  const [selectedArticleId, setSelectedArticleId] = useState<number>(); // 当前选中的文章ID
  const [selectedArticle, setSelectedArticle] = useState<Article>(); // 当前选中的文章完整信息
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 图片预览数据
  // 文件输入框的引用

  // 获取tRPC工具函数和文章数据
  const utils = api.useUtils();
  const { data: articles, status: isLoading } = api.artical.getAll.useQuery();

  // 创建文章的mutation操作
  const createArticle = api.artical.create.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate(); // 刷新文章列表
      toast.success("文章添加成功！"); // 显示成功提示
      setShowAddArticleDialog(false); // 关闭对话框
    },
  });

  // 更新文章的mutation操作
  const updateArticle = api.artical.update.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate(); // 刷新文章列表
      toast.success("文章更新成功！"); // 显示成功提示
      setShowEditArticleDialog(false); // 关闭对话框
    },
  });

  // 删除文章的mutation操作
  const deleteArticle = api.artical.delete.useMutation({
    onSuccess: async () => {
      toast.success("文章已删除！"); // 显示成功提示
      await utils.artical.invalidate(); // 刷新文章列表
      setShowDeleteArticleDialog(false); // 关闭对话框
    },
  });

  // 处理图片选择的函数
  // const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // 验证图片类型
  //     const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  //     if (!validTypes.includes(file.type)) {
  //       toast.error("请选择 JPG、PNG 或 GIF 格式的图片");
  //       return;
  //     }

  //     // 验证图片大小（2MB限制）
  //     if (file.size > 2 * 1024 * 1024) {
  //       toast.error("图片大小不能超过 2MB");
  //       return;
  //     }

  //     // 将图片转换为base64格式
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       if (base64String.startsWith("data:image/") && base64String.includes(";base64,")) {
  //         setImagePreview(base64String);
  //       } else {
  //         toast.error("图片格式转换失败");
  //       }
  //     };
  //     reader.onerror = () => toast.error("图片读取失败");
  //     reader.readAsDataURL(file);
  //   }
  // };

  // 处理添加文章的表单提交
  // 声明一个处理表单提交的函数，参数e的类型是React的表单提交事件
  const handleAddArticle = (formData: FormData) => {
    // 阻止表单的默认提交行为，防止页面刷新

    // 从当前表单元素创建FormData对象，可以方便地获取表单中的数据
    // e.currentTarget 指向触发事件的表单元素
    try {
      // 调用创建文章的mutation方法
      createArticle.mutate({
        // 从表单数据中获取各个字段的值
        // formData.get() 获取表单中对应name属性的值
        // as string 类型断言确保返回字符串类型
        title: formData.get("title") as string, // 获取文章标题
        category: formData.get("category") as string, // 获取文章分类
        summary: formData.get("summary") as string, // 获取文章摘要
        content: formData.get("content") as string, // 获取文章内容
        image: imagePreview ?? "", // 使用预览图片或空字符串
      });

      // 提交成功后重置表单状态
      setImagePreview(null); // 清空图片预览
      // 如果文件输入框存在，清空其值
    } catch (error) {
      // 如果提交过程中出现错误，显示错误提示
      toast.error("文章添加失败！");
    }
  };

  // 处理删除文章的确认操作
  const handleDeleteArticleConfirm = (id: number) => {
    setSelectedArticleId(id);
    setShowDeleteArticleDialog(true);
  };

  // 执行删除文章操作
  const handleDeleteArticle = () => {
    if (selectedArticleId) {
      deleteArticle.mutate({ id: selectedArticleId });
    }
  };

  // 处理编辑文章操作
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setImagePreview(article.image);
    setShowEditArticleDialog(true);
  };

  // 处理编辑文章的表单提交
  const handleEditArticleSubmit = (formData: FormData) => {
    if (selectedArticle) {
      try {
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

  // 渲染组件UI
  return (
    <div>
      {/* 页面标题和添加按钮 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          文章管理
        </h1>
        <Button onClick={() => setShowAddArticleDialog(true)}>
          添加新文章
        </Button>
      </div>

      {/* 文章列表网格布局 */}
      <div>
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
            // 修改为更简洁的条件判断
            { hidden: !isLoading },
          )}
        >
          {/* 遍历渲染文章卡片 */}
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
              {/* 文章封面图片区域 */}
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

              {/* 文章标题和创建日期 */}
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

              {/* 文章摘要内容 */}
              <CardContent>
                <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                  {article.summary}
                </p>
              </CardContent>

              {/* 文章操作按钮 */}
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

      {/* 添加文章对话框组件 */}
      <ArticleDialog
        // 控制对话框的显示状态
        open={showAddArticleDialog}
        // 当对话框开关状态改变时的回调函数
        onOpenChange={(open) => {
          // 更新对话框的显示状态
          setShowAddArticleDialog(open);
          // 如果对话框关闭，清空图片预览
          if (!open) {
            setImagePreview(null);
          }
        }}
        // 对话框标题
        title="添加新文章"
        // 表单提交处理函数
        onSubmit={handleAddArticle}
        // 提交按钮的文本
        submitButtonText="提交"
        // 当图片改变时的回调函数，用于更新预览图片
        onImageChange={(base64String) => setImagePreview(base64String)}
      />

      {/* 编辑文章对话框组件 */}
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

      {/* 删除确认对话框组件 */}
      <DeleteArticleDialog
        open={showDeleteArticleDialog}
        onOpenChange={setShowDeleteArticleDialog}
        onDelete={handleDeleteArticle}
        isDeleting={deleteArticle.isPending}
      />
    </div>
  );
}
