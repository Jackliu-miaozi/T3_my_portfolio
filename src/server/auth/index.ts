// 从 next-auth 库导入 NextAuth 对象，用于处理身份验证
import NextAuth from "next-auth";
// 从 React 导入 cache 函数，用于缓存身份验证结果
import { cache } from "react";

// 从本地配置文件导入身份验证配置
import { authConfig } from "./config";

// 使用 NextAuth 初始化身份验证，解构出需要的功能
// uncachedAuth: 未缓存的身份验证函数
// handlers: 处理身份验证的路由处理器
// signIn: 登录函数
// signOut: 登出函数
const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// 使用 React 的 cache 函数包装身份验证函数，提高性能
const auth = cache(uncachedAuth);

// 导出所有需要的身份验证相关功能
export { auth, handlers, signIn, signOut };
