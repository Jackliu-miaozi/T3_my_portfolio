"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";



export function Sidebar() {
  const pathname = usePathname();
  
  // 根据当前路径确定活动标签
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md dark:bg-gray-800">
      <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">管理仪表盘</h1>
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
