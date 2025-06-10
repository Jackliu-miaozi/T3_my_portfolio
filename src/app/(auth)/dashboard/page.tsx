"use client";


import { redirect } from "next/navigation";

export default function DashboardPage() {
  // 默认重定向到文章管理页面
  redirect("/dashboard/articles");
}
