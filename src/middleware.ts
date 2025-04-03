import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the current request path
  const path = request.nextUrl.pathname;

  // Get user session token using environment variables
  // const session = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  // });
  // Check if user is authenticated
  // const isAuthenticated = !!session;

  if (path.startsWith("/dashboard")) {
    // Redirect unauthenticated users to login page
    // if (!isAuthenticated) {
    //   const redirectUrl = new URL("/sign-in", request.url);
    //   redirectUrl.searchParams.set("callbackUrl", path);
    //   return NextResponse.redirect(redirectUrl);
    // }

    // Check if user email is admin email
    // const userEmail = session?.email;
    // // Redirect non-admin users to homepage
    // if (userEmail !== "lzyujn@gmail.com") {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }
  }

  // Redirect authenticated users away from sign-up page
  // if (path.startsWith("/sign-up") && isAuthenticated) {
  //   const redirectUrl = new URL("/", request.url);
  //   redirectUrl.searchParams.set("message", "您已经登录，不能注册新账号");
  //   return NextResponse.redirect(redirectUrl);
  // }

  // Allow request to continue if no special handling is needed
  return NextResponse.next();
}

// Configure middleware matching rules
export const config = {
  matcher: [
    "/dashboard/:path*", // Match all dashboard paths
    "/sign-up/:path*", // Match all registration paths
    "/sign-in/:path*", // Match all login paths
    "/api/:path*", // Match all API paths
    "/((?!_next/static|_next/image|favicon.ico).*)", // Match all paths except static resources
  ],
};
