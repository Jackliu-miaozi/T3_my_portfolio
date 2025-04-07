"use client";

import { useEffect } from "react";

// 这个组件用于在客户端注入主题初始化脚本
export function ThemeScript() {
  useEffect(() => {
    // 创建并注入脚本到head
    const script = document.createElement("script");
    script.id = "theme-script";
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

    // 检查是否已存在脚本，避免重复添加
    if (!document.getElementById("theme-script")) {
      document.head.prepend(script);
    }

    return () => {
      // 清理
      const existingScript = document.getElementById("theme-script");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // 这个组件不渲染任何内容
  return null;
}
