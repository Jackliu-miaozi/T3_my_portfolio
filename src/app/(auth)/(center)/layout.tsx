"use client";

import { useEffect, useState } from "react";

export default function CenterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  // 在客户端加载时应用主题设置
  useEffect(() => {
    setMounted(true);
    try {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const theme = storedTheme ?? (prefersDark ? "dark" : "light");

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("主题初始化失败:", e);
    }
  }, []);

  // 添加内联脚本到head中
  useEffect(() => {
    // 创建脚本元素
    const script = document.createElement("script");
    script.innerHTML = `
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
    `;
    // 将脚本添加到head的最前面
    document.head.prepend(script);

    return () => {
      // 清理
      document.head.removeChild(script);
    };
  }, []);

  // 如果尚未挂载，返回一个占位符，避免闪烁
  if (!mounted) {
    return (
      <div
        className="bg-background text-foreground flex min-h-screen w-full items-center justify-center"
        suppressHydrationWarning
      />
    );
  }

  return (
    <div
      className="bg-background text-foreground flex min-h-screen w-full items-center justify-center"
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
