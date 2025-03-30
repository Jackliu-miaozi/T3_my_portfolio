"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Dog } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

export function MobileNav() {
  const { data: session, status: isLoading } = useSession();
  console.log(session);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    setIsOpen(false);
  };

  const confirmLogout = () => {
    void signOut();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative px-3 md:hidden">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="hover:bg-accent hover:text-accent-foreground flex items-center space-x-1 rounded p-2 focus:outline-none"
      >
        <Dog />
        <span>开始</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="bg-background absolute top-full left-0 z-50 mt-1 w-48 rounded-md border shadow-lg"
        >
          <ul className="grid-cols-1">
            <ListItem href="/" className="font-bold">
              回首页
            </ListItem>
            <div className="border-b"></div>
            <ListItem href="/guestbook" className="font-bold">
              给Jack留言
            </ListItem>
            <div className="border-b"></div>
            <ListItem href="/aboutme" className="font-bold">
              关于Jack
            </ListItem>
            <div className="border-b"></div>
            <ListItem href="/myartical" className="font-bold">
              文章
            </ListItem>
            <div className="border-b"></div>
            {/* 搞反了不改了，加了个！ */}
            {session?.user ? (
              <ListItem href="#" onClick={handleLogout} className="font-bold">
                退出登录
              </ListItem>
            ) : (
              <ListItem href="/sign-in" className="font-bold">
                登录
              </ListItem>
            )}
          </ul>
        </div>
      )}

      {/* 退出登录确认对话框 */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认退出登录</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-sm text-gray-500">
              您确定要退出登录吗？
            </p>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={cancelLogout}>
              取消
            </Button>
            <Button variant="default" onClick={confirmLogout}>
              确认退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 p-3 leading-none no-underline transition-colors outline-none select-none",
          className,
        )}
        {...props}
      >
        <div className="items-center text-sm leading-none font-medium">
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-black">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
