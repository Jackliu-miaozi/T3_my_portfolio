// 'use client' 指令表示这是一个客户端组件
"use client";

// 导入必要的React hooks和组件
import { useState } from "react"; // 导入useState hook用于管理状态
import Link from "next/link"; // 导入Next.js的Link组件用于页面导航
import { X } from "lucide-react"; // 导入X图标组件用于关闭按钮

// 定义MobileNav组件的props接口
interface MobileNavProps {
  links: Array<{ href: string; label: string }>; // links数组包含href和label属性
}

// 导出MobileNav组件，接收links参数
export function MobileNav({ links }: MobileNavProps) {
  // 使用useState定义菜单开关状态
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {/* 汉堡菜单按钮 */}
      <button
        className="hover:bg-accent hover:text-accent-foreground rounded-full p-2 md:hidden" // 样式类：中等屏幕隐藏，圆形按钮，悬停效果
        aria-label="菜单"
        onClick={toggleMenu}
      >
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
          className="h-5 w-5" // 设置SVG图标大小
        >
          {/* 绘制三条横线形成汉堡菜单图标 */}
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* 移动端导航菜单 */}
      {isOpen && (
        <div className="bg-background/95 fixed inset-0 z-50 backdrop-blur-sm">
          {" "}
          {/* 固定定位，覆盖整个屏幕，半透明背景 */}
          <div className="container flex h-full flex-col items-center justify-center">
            {" "}
            {/* 容器样式，居中显示内容 */}
            <button
              onClick={closeMenu}
              className="hover:bg-accent hover:text-accent-foreground absolute top-4 right-4 rounded-full p-2" // 关闭按钮位置和样式
              aria-label="关闭菜单"
            >
              <X className="h-6 w-6" /> {/* 使用X图标组件 */}
            </button>
            <nav className="bg-accent mt-56 flex w-full flex-col items-center gap-6 p-2 pb-3">
              {" "}
              {/* 导航菜单容器，垂直排列，间距为8 */}
              {links.map(
                (
                  link, // 遍历links数组生成导航链接
                ) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-primary w-full border-b-2 text-xl font-medium" // 链接样式：大字体，中等粗细，悬停时改变颜色
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
