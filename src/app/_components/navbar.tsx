"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/aboutme", label: "关于我" },
  { href: "/myartical", label: "博客" },
  { href: "/guestbook", label: "留言板" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform gap-6 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "hover:text-primary text-sm font-medium transition-colors",
              pathname === link.href && "text-primary",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
