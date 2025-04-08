import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/dashboard/sidebar";
export const metadata: Metadata = {
  title: "管理仪表盘 | Jack's 主页",
  description: "管理您的内容和账户设置",
  keywords: ["仪表盘", "用户中心", "内容管理"],
  robots: "noindex, nofollow",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // 如果用户未登录或不是管理员，重定向到首页
  if (!session || session.user.email !== "lzyujn@gmail.com") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 侧边导航栏 */}
      <Sidebar />

      {/* 主内容区域 */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
