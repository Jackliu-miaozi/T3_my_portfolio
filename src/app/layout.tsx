import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeScript } from "./_components/theme-script";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";
// import Script from 'next/script';


export const metadata: Metadata = {
  title: "Jack's 主页 | 个人网站",
  description: "欢迎来到刘正源的个人网站，这里有我的项目、文章和个人介绍。",
  keywords: ["个人网站", "开发者", "技术博客", "项目展示"],
  metadataBase: new URL(
    "https://t3-my-portfolio-git-test-jackliumiaozis-projects.vercel.app/",
  ),
  openGraph: {
    title: "Jack's 主页 | 个人网站",
    description: "欢迎来到刘正源的个人网站，这里有我的项目、文章和个人介绍。",
    url: "https://t3-my-portfolio.vercel.app/",
    siteName: "Jack's 主页",
    locale: "zh_CN",
    type: "website",
  },

  // 这是Twitter卡片的元数据配置
  // card: 定义Twitter卡片的显示样式，summary_large_image表示大图预览
  // title: Twitter分享时显示的标题
  // description: Twitter分享时显示的描述
  // images: Twitter分享时显示的图片路径
  twitter: {
    card: "summary_large_image",
    title: "Jack's 主页 | 个人网站",
    description: "欢迎来到Jack的个人网站，这里有我的项目、文章和个人介绍。",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.svg",
    apple: "/apple-touch-icon.svg",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              font-family: var(--font-geist-sans);
              background: var(--background);
              color: var(--foreground);
            }
            /* 添加更多关键样式 */
            .container { width: 100%; margin-left: auto; margin-right: auto; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            /* 添加暗色模式基础样式，避免闪烁 */
            .dark { background-color: #111; color: #f5f5f5; }
          `
        }} />


        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // 添加no-flash类防止主题切换闪烁
                  document.documentElement.classList.add('no-flash');
                  
                  const storedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // 短暂延迟后移除no-flash类，允许过渡效果
                  setTimeout(() => {
                    document.documentElement.classList.remove('no-flash');
                  }, 100);
                } catch (e) {
                  console.error('主题初始化失败:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geist.variable} mx-auto`} suppressHydrationWarning>
        <ThemeScript />
        <SessionProvider session={session}>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </SessionProvider>
        <SpeedInsights />
        <Analytics />
        {/* 使用next/script加载非关键脚本 */}
        {/* <Script
          src="/analytics.js"
          strategy="afterInteractive"
          id="analytics-script"
        /> */}

        {/* 延迟加载其他非关键脚本 */}
        {/* <Script
          id="other-script"
          strategy="lazyOnload"
          src="/other-script.js"
        /> */}
      </body>
    </html>
  );
}
