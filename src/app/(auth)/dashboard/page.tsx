"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ArticlesManagement } from "@/components/dashboard/articles-management";
import { UsersManagement } from "@/components/dashboard/users-management";
import { MessagesManagement } from "@/components/dashboard/messages-management";

export default function DashboardPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState<"articles" | "users" | "messages">(
    "articles",
  );
  const { data: session } = useSession();

  // 检查用户是否有权限访问仪表盘
  if (!session || session.user.email !== 'lzyujn@gmail.com') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            无权访问
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            请先登录后再访问管理仪表盘
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 侧边导航栏 */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 主内容区域 */}
      <div className="flex-1 p-8">
        {activeTab === "articles" && <ArticlesManagement />}
        {activeTab === "users" && <UsersManagement />}
        {activeTab === "messages" && <MessagesManagement />}
      </div>
    </div>
  );
}
