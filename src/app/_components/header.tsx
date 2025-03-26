"use client";

import { ThemeToggle } from "./theme-toggle";
// import { MobileNav } from "./mobile-nav";
import { NavigationMenuDemo } from "@/components/mobile-bar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link"


const navLinks = [
    { href: "/", label: "首页" },
    { href: "/aboutme", label: "关于我" },
    { href: "/myartical", label: "博客" },
    { href: "/guestbook", label: "留言板" },
    { href: "/contact", label: "联系方式" },
];

export function Header() {
    const pathname = usePathname();
    return (
        <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="hover:text-primary text-xl font-bold transition-colors pl-3"
                    >
                        Jack Liu
                    </Link>
                </div>
                <nav className="hidden items-center gap-6 md:flex absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "hover:text-primary text-sm font-medium transition-colors",
                                pathname === link.href && "text-primary"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-1">
                    <ThemeToggle />
                    {/* <MobileNav links={navLinks} /> */}
                    <NavigationMenuDemo />
                </div>
            </div>
        </header>
    );
}
