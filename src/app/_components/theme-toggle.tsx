"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

// 统一应用主题的函数
const applyTheme = (theme: "light" | "dark") => {
  if (typeof document !== "undefined") {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

// 创建一个自定义事件，用于跨组件同步主题状态
const THEME_CHANGE_EVENT = "theme-change";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light"); // 默认为light，避免undefined状态
  const [mounted, setMounted] = useState(false);

  // 初始化主题并设置事件监听器
  useEffect(() => {
    // 设置已挂载标志
    setMounted(true);

    // 初始化主题状态
    const getInitialTheme = (): "light" | "dark" => {
      try {
        // 检查用户是否手动设置了主题
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        // 检测系统主题偏好
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        // 如果用户手动设置了主题，使用用户设置的主题
        // 否则，根据系统主题偏好自动设置
        return storedTheme ?? (prefersDark ? "dark" : "light");
      } catch (e) {
        console.error("获取主题失败:", e);
        return "light";
      }
    };

    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // 监听主题变化事件
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail as "light" | "dark";
      setTheme(newTheme);
    };

    // 监听系统主题变化
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // 只有当用户没有手动设置主题时，才跟随系统变化
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // 保存到localStorage
    localStorage.setItem("theme", newTheme);

    // 应用主题
    applyTheme(newTheme);

    // 触发自定义事件，通知其他组件主题已更改
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }));
  };

  // 如果组件尚未挂载，返回占位符，避免闪烁
  if (!mounted) {
    return <div className="h-5 w-5" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-accent hover:text-accent-foreground rounded-full p-2 transition-colors"
      aria-label="切换主题"
    >
      {theme === "light" ? (
        <SunIcon className="h-5 w-5 scale-100 transition-all dark:scale-0" />
      ) : (
        <MoonIcon className="h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      )}
    </button>
  );
}
