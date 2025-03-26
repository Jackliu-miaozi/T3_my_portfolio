'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";



const navLinks = [
    { href: "/", label: "首页" },
    { href: "/aboutme", label: "关于我" },
    { href: "/myartical", label: "博客" },
    { href: "/guestbook", label: "留言板" },
    { href: "/contact", label: "联系方式" },
];


export default function Navbar() {
    const pathname = usePathname();
    return (
        <div>
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
        </div>
    )
}


