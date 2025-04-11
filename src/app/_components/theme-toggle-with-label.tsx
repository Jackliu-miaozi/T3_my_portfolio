"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function ThemeToggleWithLabel() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // 初始化主题状态
  useEffect(() => {
    setMounted(true);

    // 获取初始主题
    const getInitialTheme = (): "light" | "dark" => {
      try {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return storedTheme ?? (prefersDark ? "dark" : "light");
      } catch (e) {
        return "light";
      }
    };

    setTheme(getInitialTheme());

    // 监听主题变化事件
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail as "light" | "dark";
      setTheme(newTheme);
    };

    // 监听系统主题变化
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
      }
    };

    window.addEventListener("theme-change", handleThemeChange as EventListener);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange as EventListener);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // 如果组件尚未挂载，返回占位符
  if (!mounted) {
    return <div className="flex items-center"><span className="text-sm">加载中</span><div className="h-5 w-5 ml-2" /></div>;
  }

  return (
    <div className="flex items-center">
      <span className="text-sm">{theme === "light" ? "太阳：" : "月亮："}</span>
      <ThemeToggle />
    </div>
  );
}