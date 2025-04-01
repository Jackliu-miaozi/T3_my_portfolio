"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

// 定义用户类型
type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt?: string;
};

export default function DashboardPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState<"articles" | "users">("articles");
  const [showAddArticleDialog, setShowAddArticleDialog] = useState(false);
  const [showEditArticleDialog, setShowEditArticleDialog] = useState(false);
  const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);
  const [showDeleteArticleDialog, setShowDeleteArticleDialog] = useState(false);
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<number>();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  // 定义文章类型
  type Article = {
    id: number;
    title: string;
    category: string;
    summary: string;
    content: string;
    image: string | null;
    createdAt: Date;
  };

  const utils = api.useUtils();
  const { data: articles, status: isLoading } = api.artical.getAll.useQuery();
  const createArticle = api.artical.create.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate();
    },
  });
  const updateArticle = api.artical.update.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate();
    },
  });
  const deleteArticle = api.artical.delete.useMutation({
    onSuccess: async () => {
      await utils.artical.invalidate();
    },
  });

  const { data: users } = api.user.getAll.useQuery();

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
      return;
    }
    toast.success("文章添加成功！");
    setShowAddArticleDialog(false);
  };

  // 处理查看用户详情
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetailsDialog(true);
  };

  // 处理删除文章确认
  const handleDeleteArticleConfirm = (id: number) => {
    setSelectedArticleId(id);
    setShowDeleteArticleDialog(true);
  };

  // 处理删除文章
  const handleDeleteArticle = () => {
    const articleId = selectedArticleId;
    // 这里添加删除文章逻辑
    deleteArticle.mutate({
      id: articleId!,
    });
    toast.success("文章已删除！");
    setShowDeleteArticleDialog(false);
  };

  // 处理删除用户确认
  const handleDeleteUserConfirm = (id: string) => {
    setSelectedUserId(id);
    setShowDeleteUserDialog(true);
  };

  // 处理删除用户
  const handleDeleteUser = () => {
    // 这里添加删除用户逻辑
    toast.success("用户已删除！");
    setShowDeleteUserDialog(false);
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
    try {
      updateArticle.mutate({
        id: selectedArticle!.id,
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        summary: formData.get("summary") as string,
        content: formData.get("content") as string,
      });
    } catch (error) {
      toast.error("文章更新失败！");
      return;
    }
    toast.success("文章更新成功！");
    setShowEditArticleDialog(false);
  };

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 侧边导航栏 */}
      <div className="w-64 bg-white shadow-md dark:bg-gray-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            管理仪表盘
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            欢迎回来，管理员
          </p>
        </div>
        <nav className="mt-6">
          <div
            className={`cursor-pointer px-6 py-3 ${activeTab === "articles" ? "border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-700" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            <span className="font-medium text-gray-800 dark:text-white">
              文章管理
            </span>
          </div>
          <div
            className={`cursor-pointer px-6 py-3 ${activeTab === "users" ? "border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-700" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <span className="font-medium text-gray-800 dark:text-white">
              用户管理
            </span>
          </div>
          <div className="cursor-pointer px-6 py-3">
            <Link
              href="/"
              className="font-medium text-gray-800 dark:text-white"
            >
              返回首页
            </Link>
          </div>
        </nav>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 p-8">
        {/* 文章管理 */}

        {activeTab === "articles" && (
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
                  <Card key={article.id} className="overflow-hidden">
                    <div className="relative h-48">
                      {article.image ? (
                        // 使用 Next.js Image 组件显示图片
                        <Image
                          src={article.image}
                          alt={article.title ?? "文章封面"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        // 如果没有图片，显示占位符
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
          </div>
        )}

        {/* 用户管理 */}
        {activeTab === "users" && (
          <div>
            <div></div>
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
              用户管理
            </h1>
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">用户</th>
                      <th className="p-4 text-left">邮箱</th>
                      <th className="p-4 text-left">注册时间</th>
                      <th className="p-4 text-left">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                              {user.name?.[0] ?? "U"}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewUserDetails(user)}
                            >
                              详情
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteUserConfirm(user.id)}
                            >
                              删除
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 添加文章对话框 */}
      <Dialog
        open={showAddArticleDialog}
        onOpenChange={setShowAddArticleDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>添加新文章</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddArticle}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">文章标题</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="输入文章标题"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">分类</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="输入文章分类"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="summary">摘要</Label>
                <Input
                  id="summary"
                  name="summary"
                  placeholder="输入文章摘要"
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">封面图片</Label>
                <Input id="image" name="image" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">提交</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 用户详情对话框 */}
      <Dialog
        open={showUserDetailsDialog}
        onOpenChange={setShowUserDetailsDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>用户详情</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="mb-4 flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl dark:bg-gray-700">
                  {selectedUser.name?.[0] ?? "U"}
                </div>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    邮箱:
                  </span>
                  <span>{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    注册时间:
                  </span>
                  <span>{selectedUser.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    账户状态:
                  </span>
                  <span className="text-green-500">正常</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUserDetailsDialog(false)}
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除文章确认对话框 */}
      <Dialog
        open={showDeleteArticleDialog}
        onOpenChange={setShowDeleteArticleDialog}
      >
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
              onClick={() => setShowDeleteArticleDialog(false)}
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteArticle}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除用户确认对话框 */}
      <Dialog
        open={showDeleteUserDialog}
        onOpenChange={setShowDeleteUserDialog}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-600 dark:text-gray-400">
              您确定要删除这个用户吗？此操作无法撤销。
            </p>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowDeleteUserDialog(false)}
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑文章对话框 */}
      <Dialog
        open={showEditArticleDialog}
        onOpenChange={setShowEditArticleDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>编辑文章</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <form onSubmit={handleEditArticleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">文章标题</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="输入文章标题"
                    defaultValue={selectedArticle.title}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">分类</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="输入文章分类"
                    defaultValue={selectedArticle.category}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="summary">摘要</Label>
                  <Input
                    id="summary"
                    name="summary"
                    placeholder="输入文章摘要"
                    defaultValue={selectedArticle.summary}
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
                    defaultValue={selectedArticle.content}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">保存修改</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
