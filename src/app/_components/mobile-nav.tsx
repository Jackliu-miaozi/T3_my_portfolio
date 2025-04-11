// 'use client' 指令表示这是一个客户端组件
"use client";

// 导入必要的React hooks和组件
import { useState, useEffect, useRef } from "react"; // 导入React hooks
import Link from "next/link"; // 导入Next.js的Link组件用于页面导航
import { Home, Menu, X, User, BookOpen, MessageSquare } from "lucide-react"; // 导入图标组件

// 定义MobileNav组件的props接口
interface MobileNavProps {
  links: Array<{ href: string; label: string }>; // links数组包含href和label属性
}

// 导出MobileNav组件，接收links参数
export function MobileNav({ links }: MobileNavProps) {
  // 使用useState定义菜单开关状态
  const [isOpen, setIsOpen] = useState(false);
  // 使用useState定义当前活动的导航项
  const [activeTab, setActiveTab] = useState("/");
  // 使用useRef创建一个引用，用于滑动手势
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // 设置活动标签的函数
  useEffect(() => {
    // 根据当前路径设置活动标签
    if (typeof window !== "undefined") {
      setActiveTab(window.location.pathname);
    }
  }, []);

  // 切换菜单状态的函数
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // 当菜单打开时，禁止背景滚动
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  // 关闭菜单的函数
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  // 处理触摸开始事件
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]!.clientX;
  };

  // 处理触摸移动事件
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]!.clientX;
  };

  // 处理触摸结束事件
  const handleTouchEnd = () => {
    // 向左滑动关闭菜单
    if (touchStartX.current - touchEndX.current > 50 && isOpen) {
      closeMenu();
    }
    // 向右滑动打开菜单
    else if (touchEndX.current - touchStartX.current > 50 && !isOpen) {
      toggleMenu();
    }
    // 重置触摸位置
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // 获取图标函数
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "首页":
      case "主页":
      case "home":
        return <Home className="h-5 w-5" />;
      case "关于":
      case "about":
      case "关于我":
        return <User className="h-5 w-5" />;
      case "文章":
      case "博客":
      case "blog":
        return <BookOpen className="h-5 w-5" />;
      case "留言":
      case "留言板":
      case "guestbook":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Menu className="h-5 w-5" />;
    }
  };

  return (
    <>
      {/* 移动端底部导航栏 */}
      <div 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 dark:bg-background/90 backdrop-blur-sm border-t border-border shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-around items-center h-16 px-2">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full rounded-lg transition-colors duration-200 ${activeTab === link.href ? 'text-primary dark:text-primary' : 'text-muted-foreground dark:text-white'}`}
              onClick={() => setActiveTab(link.href)}
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                {getIcon(link.label)}
                <span className="text-xs font-medium">{link.label}</span>
              </div>
            </Link>
          ))}
          {links.length > 4 && (
            <button
              className="flex flex-col items-center justify-center w-full h-full rounded-lg transition-colors duration-200 text-muted-foreground dark:text-white hover:text-primary dark:hover:text-primary"
              onClick={toggleMenu}
              aria-label="更多菜单"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">更多</span>
            </button>
          )}
        </div>
      </div>

      {/* 更多菜单弹出层 */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-background/95 dark:bg-background/90 backdrop-blur-sm animate-in slide-in-from-bottom-full duration-300"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="container flex h-full flex-col items-center justify-center">
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 p-3 rounded-full bg-accent/50 dark:bg-accent/30 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 dark:hover:text-accent-foreground transition-colors duration-200"
              aria-label="关闭菜单"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="w-full max-w-md mx-auto flex flex-col items-center gap-4 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full p-4 flex items-center justify-between bg-accent/30 dark:bg-accent/20 hover:bg-accent/50 dark:hover:bg-accent/30 rounded-lg text-xl font-medium transition-all duration-200 active:scale-95 dark:text-white"
                  onClick={closeMenu}
                >
                  <div className="flex items-center gap-3">
                    {getIcon(link.label)}
                    <span>{link.label}</span>
                  </div>
                  <div className="text-primary dark:text-primary/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
