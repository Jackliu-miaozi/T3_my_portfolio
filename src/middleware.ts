import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 修改 getToken 配置
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    secureCookie: process.env.VERCEL_URL ? true : false,
    cookieName: process.env.VERCEL_URL ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
  })

  const isAuthenticated = !!session

  // Handle dashboard access requests
  // if (path.startsWith("/dashboard")) {
  //   // Redirect unauthenticated users to login page
  //   // if (!isAuthenticated) {
  //   //   const redirectUrl = new URL("/sign-in", request.url)
  //   //   redirectUrl.searchParams.set("callbackUrl", path)
  //   //   return NextResponse.redirect(redirectUrl)
  //   // }

  //   // Check if user email is admin email
  //   // const userEmail = session?.email
  //   // Redirect non-admin users to homepage
  //   // if (userEmail !== "lzyujn@gmail.com") {
  //   //   return NextResponse.redirect(new URL("/", request.url))
  //   // }
  // }

  // Redirect authenticated users away from sign-up page
  if (path.startsWith("/sign-up") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow request to continue if no special handling is needed
  return NextResponse.next()
}

// 添加 runtime 配置
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-up/:path*",
    "/sign-in/:path*",
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
  runtime: 'experimental-edge',
}

