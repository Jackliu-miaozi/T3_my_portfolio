import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeScript } from "./_components/theme-script";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
// import Script from 'next/script';

export const metadata: Metadata = {
  title: "页面丢失",
  description: "页面丢失",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        {children}
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
