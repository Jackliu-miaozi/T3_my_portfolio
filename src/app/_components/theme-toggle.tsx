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
        const storedTheme = localStorage.getItem("theme") as
          | "light"
          | "dark"
          | null;
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
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

    window.addEventListener(
      THEME_CHANGE_EVENT,
      handleThemeChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        THEME_CHANGE_EVENT,
        handleThemeChange as EventListener,
      );
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
    window.dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }),
    );
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
