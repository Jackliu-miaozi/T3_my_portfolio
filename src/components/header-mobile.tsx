"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, User, BookOpen, Menu, LogOut } from "lucide-react";
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
import { usePathname } from "next/navigation";

export function HeaderMobile() {
  const { data: session, status: isLoading } = useSession();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  // 监听路由变化更新活动标签
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  // 移除原有的手动设置activeTab的逻辑
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 5; // 设置滚动阈值，避免轻微滚动就触发
      const scrollDirection = currentScrollY > scrollY ? 'down' : 'up';

      // 只有滚动超过阈值时才改变状态
      if (Math.abs(currentScrollY - scrollY) > scrollThreshold) {
        if (scrollDirection === 'down' && currentScrollY > 100) {
          // 向下滚动超过100px时隐藏
          setVisible(false);
        } else if (scrollDirection === 'up') {
          // 向上滚动时显示
          setVisible(true);
        }
        setScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <>
      {/* 修改导航栏样式 - 隐藏时移除阴影和边框 */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 dark:bg-background/90 backdrop-blur-sm transition-transform duration-300 ease-in-out",
        visible 
          ? "translate-y-0 border-b border-border shadow-sm"  // 显示时有边框和阴影
          : "-translate-y-full border-b-0 shadow-none"       // 隐藏时无边框和阴影
      )}>
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
                    onClick={() => setShowLogoutConfirm(true)}
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

      {/* 添加补偿高度的占位元素 */}
      <div className="md:hidden h-16" />

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
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              取消
            </Button>
            <Button variant="default" onClick={() => signOut()}>
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