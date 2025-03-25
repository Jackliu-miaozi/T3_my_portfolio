// 导入 clsx 库和它的 ClassValue 类型
// clsx 是一个用于构建类名字符串的工具
import { clsx, type ClassValue } from "clsx";

// 导入 tailwind-merge 库
// tailwind-merge 用于合并 Tailwind CSS 类，避免类名冲突
import { twMerge } from "tailwind-merge";

// 导出一个工具函数 cn (className)
// 这个函数接收任意数量的 ClassValue 类型参数
// 使用 clsx 将输入转换为类名字符串，然后用 twMerge 合并它们
// 主要用于组件中动态组合 Tailwind CSS 类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
