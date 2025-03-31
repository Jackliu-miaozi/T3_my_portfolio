import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "登出 | Jack's 主页",
  description: "安全退出您的账户",
  keywords: ["登出", "退出登录", "注销"],
  robots: "noindex, nofollow",
};

export default function SignOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
