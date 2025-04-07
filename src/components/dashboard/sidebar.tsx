"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react"; // 添加 Home 图标

export function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md dark:bg-gray-800">
      {/* 修改标题区域，添加返回主页按钮 */}
      <div className="flex h-20 flex-col items-center justify-center border-b relative">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">管理仪表盘</h1>
        <Link
          href="/"
          className="absolute bottom-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>返回主页</span>
        </Link>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/dashboard/articles"
              className={cn(
                "flex items-center rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200",
                isActive("/dashboard/articles") && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              文章管理
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/users"
              className={cn(
                "flex items-center rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200",
                isActive("/dashboard/users") && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              用户管理
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard/messages"
              className={cn(
                "flex items-center rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200",
                isActive("/dashboard/messages") && "bg-gray-100 dark:bg-gray-700"
              )}
            >
              消息管理
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
