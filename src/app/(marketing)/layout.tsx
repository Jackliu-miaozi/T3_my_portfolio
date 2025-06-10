import "@/styles/globals.css";

import { type Metadata } from "next";


// import { HydrateClient } from "@/trpc/server";
// import { BackgroundAnimation } from "../_components/background-animation";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { Toaster } from "sonner";
import { ThemeScript } from "../_components/theme-script";
import { HeaderMobile } from "@/components/header-mobile";



export const metadata: Metadata = {
  title: "Jack's 主页 | 个人网站",
  description: "欢迎来到刘正源的个人网站，这里有我的项目、文章和个人介绍。",
  keywords: ["个人网站", "开发者", "技术博客", "项目展示"],
  metadataBase: new URL(
    "https://t3-my-portfolio-git-test-jackliumiaozis-projects.vercel.app/",
  ),
};


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en" suppressHydrationWarning>

      <ThemeScript />
      {/* 在中等屏幕及以上显示桌面导航栏，小屏幕显示移动导航栏 */}
      <Header />
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
      {children}
      <Footer />
      <Toaster richColors theme="system" position="top-center" />
    </html>
  );
}
