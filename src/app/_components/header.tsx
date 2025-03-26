"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/aboutme", label: "关于我" },
  { href: "/myartical", label: "博客" },
  { href: "/guestbook", label: "留言板" },
  { href: "/contact", label: "联系方式" },
];

export function Header() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-primary text-xl font-bold transition-colors"
          >
            Jack Liu
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
