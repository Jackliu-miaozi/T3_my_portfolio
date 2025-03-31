import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理仪表盘 | Jack's 主页",
  description: "管理您的内容和账户设置",
  keywords: ["仪表盘", "用户中心", "内容管理"],
  robots: "noindex, nofollow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}