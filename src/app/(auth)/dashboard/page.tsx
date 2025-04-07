"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ArticlesManagement } from "@/components/dashboard/articles-management";
import { UsersManagement } from "@/components/dashboard/users-management";
import { MessagesManagement } from "@/components/dashboard/messages-management";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  // 默认重定向到文章管理页面
  redirect("/dashboard/articles");
}
