import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { withArcjet } from "@arcjet/next";

export async function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname;
  
  // 获取用户会话信息
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // 是否已登录
  const isAuthenticated = !!session;
  
  // 1. 保护 dashboard 路由 - 只允许特定邮箱访问
  if (path.startsWith("/dashboard")) {
    // 检查用户是否已登录且是管理员
    if (!isAuthenticated || session.email !== "lzyujn@gmail.com") {
      // 如果未登录，重定向到登录页面
      const redirectUrl = new URL("/sign-in", request.url);
      redirectUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  // 2. 阻止已登录用户访问注册页面
  if (path.startsWith("/sign-up") && isAuthenticated) {
    // 已登录用户尝试访问注册页面，重定向到首页
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // 对于其他路径，继续正常处理
  return NextResponse.next();
}

// 配置中间件应用的路径
export const config = {
  matcher: [
    // 需要保护的路径
    "/dashboard/:path*",
    // 已登录用户不应访问的路径
    "/sign-up/:path*",
  ],
};
