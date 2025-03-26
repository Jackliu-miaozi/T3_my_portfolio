// 'use client' 指令表明这是一个客户端组件
"use client";

// 从React中导入必要的hooks
import { useEffect, useRef, useState } from "react";
// 导入工具函数cn用于条件类名拼接
import { cn } from "@/lib/utils";

// 定义组件的属性接口
interface AnimatedSectionProps {
  children: React.ReactNode; // 子组件
  className?: string; // 可选的自定义类名
  delay?: number; // 可选的动画延迟时间
  threshold?: number; // 可选的交叉观察器阈值
}

// 导出AnimatedSection组件
export function AnimatedSection({
  children,
  className,
  delay = 0, // 默认延迟为0
  threshold = 0.1, // 默认阈值为0.1
}: AnimatedSectionProps) {
  // 状态用于控制元素是否可见
  const [isVisible, setIsVisible] = useState(false);
  // 引用用于获取DOM元素
  const ref = useRef<HTMLDivElement>(null);

  // 使用useEffect设置交叉观察器
  useEffect(() => {
    // 创建交叉观察器实例
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // 添加延迟以创建级联效果
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // 一旦可见，停止观察
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold },
    );

    // 如果引用存在，开始观察元素
    if (ref.current) {
      observer.observe(ref.current);
    }

    // 清理函数，组件卸载时停止观察
    return () => {
      const currentRef = ref.current;
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay, threshold]);

  // 渲染带有动画效果的div
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-in-out", // 基础过渡效果
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0", // 根据可见状态设置透明度和位移
        className, // 合并自定义类名
      )}
    >
      {children}
    </div>
  );
}
