"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light"); // 默认为light，避免undefined状态
  const [mounted, setMounted] = useState(false);

  // 只在客户端执行
  useEffect(() => {
    // 设置已挂载标志
    setMounted(true);

    // 初始化主题状态
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // 如果组件尚未挂载，返回null或占位符，避免闪烁
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
