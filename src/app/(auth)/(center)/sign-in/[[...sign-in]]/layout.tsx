import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "登录 | Jack's 主页",
  description: "登录到您的账户，访问更多功能",
  keywords: ["登录", "用户登录", "账户登录"],
  robots: "noindex, nofollow",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}