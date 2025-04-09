"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // 创建并注入脚本到head
    const script = document.createElement("script");
    script.id = "theme-script";
    script.innerHTML = `
      (function() {
        try {
          // 检查用户是否手动设置了主题
          const storedTheme = localStorage.getItem('theme');
          // 检测系统主题偏好
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          
          // 如果用户手动设置了主题，使用用户设置的主题
          // 否则，根据系统主题偏好自动设置
          const theme = storedTheme || (prefersDark ? 'dark' : 'light');
          
          // 应用主题
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          // 如果没有存储过主题，则存储系统偏好的主题
          if (!storedTheme) {
            localStorage.setItem('theme', theme);
          }
        } catch (e) {
          console.error('主题初始化失败:', e);
        }
      })();
    `;

    // 添加系统主题变化监听器
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // 只有当用户没有手动设置主题时，才跟随系统变化
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        // 更新存储的主题
        localStorage.setItem('theme', newTheme);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // 检查是否已存在脚本，避免重复添加
    if (!document.getElementById("theme-script")) {
      document.head.prepend(script);
    }

    return () => {
      // 清理
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      const existingScript = document.getElementById("theme-script");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // 这个组件不渲染任何内容
  return null;
}
