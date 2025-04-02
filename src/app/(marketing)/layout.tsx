import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
// import { HydrateClient } from "@/trpc/server";
// import { BackgroundAnimation } from "../_components/background-animation";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { MessageHandler } from "@/app/_components/message-handler";

export const metadata: Metadata = {
  title: "Jack's 主页 | 个人网站",
  description: "欢迎来到刘正源的个人网站，这里有我的项目、文章和个人介绍。",
  keywords: ["个人网站", "开发者", "技术博客", "项目展示"],
  openGraph: {
    title: "Jack's 主页 | 个人网站",
    description: "欢迎来到刘正源的个人网站，这里有我的项目、文章和个人介绍。",
    url: "https://t3-my-portfolio.vercel.app/",
    siteName: "Jack's 主页",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: '/avatar.png',
      }
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
        url: '/avatar.png',
        width: 1200,
        height: 630,
        alt: "Jack's Website",
      }
    ],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon-16x16.svg',
    apple: '/apple-touch-icon.svg',
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
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
      <body
        className="mx-auto"
        suppressHydrationWarning
      >
        <MessageHandler />
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
