import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "注册 | Jack's 主页",
  description: "创建一个新账户，加入Jack's主页社区",
  keywords: ["注册", "创建账户", "用户注册"],
  robots: "noindex, nofollow",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
