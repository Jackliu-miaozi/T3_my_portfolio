import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";



// 创建中间件处理函数
const handleAuth = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  // 修改 getToken 配置
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });
  
  const isAuthenticated = !!session;
  
  // 修改这部分代码以安全处理 session
  if (path.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const redirectUrl = new URL("/sign-in", request.url);
      redirectUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(redirectUrl);
    }
    
    // 安全地检查 email
    const userEmail = session?.email;
    if (userEmail !== "lzyujn@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 2. 阻止已登录用户访问注册页面
  if (path.startsWith("/sign-up") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

// 导出中间件
export const middleware = handleAuth;

// 更新 matcher 配置以包含需要保护的路径
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-up/:path*",
    "/sign-in/:path*", // 添加登录路径
    "/api/:path*", // 保护 API 路由
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
