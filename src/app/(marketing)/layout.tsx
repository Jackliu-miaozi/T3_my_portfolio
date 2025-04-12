import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
// import { HydrateClient } from "@/trpc/server";
// import { BackgroundAnimation } from "../_components/background-animation";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { Toaster } from "sonner";
import { ThemeScript } from "../_components/theme-script";
import { HeaderMobile } from "@/components/header-mobile";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/server/auth";

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
    images: [
      {
        url: "/avatar.png",
      },
    ],
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
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 630,
        alt: "Jack's Website",
      },
    ],
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
        {/* 其他head内容 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
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
        {/* 在中等屏幕及以上显示桌面导航栏，小屏幕显示移动导航栏 */}

          <Header />

        <div className="block md:hidden">
          <SessionProvider session={session}>
            <HeaderMobile />
          </SessionProvider>
        </div>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
        <Toaster richColors theme="system" position="top-center" />
      </body>
    </html>
  );
}
