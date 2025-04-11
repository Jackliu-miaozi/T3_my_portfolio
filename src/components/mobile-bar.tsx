"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, User, BookOpen, Menu, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";

export function MobileNav() {
  const { data: session, status: isLoading } = useSession();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  
  // 设置当前活动标签
  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveTab(window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    void signOut();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // 获取图标函数
  const getIcon = (path: string) => {
    switch (path) {
      case "/":
        return <Home className="h-5 w-5" />;
      case "/aboutme":
        return <User className="h-5 w-5" />;
      case "/myartical":
        return <BookOpen className="h-5 w-5" />;
      case "/guestbook":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Menu className="h-5 w-5" />;
    }
  };

  // 获取标签名称
  const getLabel = (path: string) => {
    switch (path) {
      case "/":
        return "首页";
      case "/aboutme":
        return "关于Jack";
      case "/myartical":
        return "文章";
      case "/guestbook":
        return "留言";
      case "/sign-in":
        return "登录";
      default:
        return "菜单";
    }
  };

  return (
    <>
      {/* 底部固定导航栏 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 dark:bg-background/90 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          {/* 主要导航按钮 */}
          <NavButton 
            href="/" 
            isActive={activeTab === "/"}
            onClick={() => setActiveTab("/")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium mt-1">首页</span>
          </NavButton>
          
          <NavButton 
            href="/guestbook" 
            isActive={activeTab === "/guestbook"}
            onClick={() => setActiveTab("/guestbook")}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-medium mt-1">留言</span>
          </NavButton>
          
          <NavButton 
            href="/aboutme" 
            isActive={activeTab === "/aboutme"}
            onClick={() => setActiveTab("/aboutme")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium mt-1">关于</span>
          </NavButton>
          
          <NavButton 
            href="/myartical" 
            isActive={activeTab === "/myartical"}
            onClick={() => setActiveTab("/myartical")}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-medium mt-1">文章</span>
          </NavButton>
          
          {/* 登录/更多按钮 */}
          {session?.user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex flex-col items-center justify-center w-full h-full rounded-lg transition-colors duration-200 text-muted-foreground dark:text-white hover:text-primary dark:hover:text-primary"
                  aria-label="更多选项"
                >
                  <Menu className="h-5 w-5" />
                  <span className="text-xs font-medium mt-1">更多</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end" sideOffset={8}>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <NavButton 
              href="/sign-in" 
              isActive={activeTab === "/sign-in"}
              onClick={() => setActiveTab("/sign-in")}
            >
              <User className="h-5 w-5" />
              <span className="text-xs font-medium mt-1">登录</span>
            </NavButton>
          )}
        </div>
      </div>

      {/* 已移除全屏弹出菜单，改用Popover组件 */}

      {/* 退出登录确认对话框 */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认退出登录</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-sm text-gray-500 dark:text-gray-300">
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
    </>
  );
}

// 导航按钮组件
interface NavButtonProps {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavButton = ({ href, isActive, onClick, children }: NavButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full rounded-lg transition-colors duration-200",
        isActive 
          ? "text-primary dark:text-primary" 
          : "text-muted-foreground dark:text-white hover:text-primary dark:hover:text-primary"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
