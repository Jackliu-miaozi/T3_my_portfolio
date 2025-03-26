"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link
            href="/"
            className="hover:text-primary text-xl font-bold transition-colors"
          >
            Jack Liu
          </Link>
          <p className="text-muted-foreground text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} Jack Liu. 保留所有权利。
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              首页
            </Link>
            <Link
              href="/aboutme"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              关于我
            </Link>
            <Link
              href="/projects"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              项目展示
            </Link>
            <Link
              href="/myartical"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              博客
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              使用条款
            </Link>
            <Link
              href="/sitemap"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              网站地图
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
