"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);

  useEffect(() => {
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
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (theme === undefined) return null;

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
