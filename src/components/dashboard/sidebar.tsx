"use client";

import Link from "next/link";

type SidebarProps = {
  activeTab: "articles" | "users" | "messages";
  setActiveTab: (tab: "articles" | "users" | "messages") => void;
};

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
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
        <div
          className={`cursor-pointer px-6 py-3 ${activeTab === "messages" ? "border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-700" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          <span className="font-medium text-gray-800 dark:text-white">
            留言管理
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
  );
}