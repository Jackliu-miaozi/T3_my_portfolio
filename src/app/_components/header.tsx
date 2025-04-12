import { ThemeToggle } from "./theme-toggle";
import { HeaderMobile } from "@/components/header-mobile";
import Link from "next/link";
import Navbar from "./navbar";
import { auth } from "@/server/auth";
import { SignIn } from "@/components/signinbutton";
import { SignOut } from "@/components/signoutbutton";
//sessionprovider可以在服务端组件中使用
import { SessionProvider } from "next-auth/react";
import { Button } from "./ui/button";


export async function Header() {
  const session = await auth();

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50  hidden md:flex items-center justify-center border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 ml-1 sm:ml-0">
          <Link
            href="/"
            className="hover:text-primary pl-3 text-xl font-bold transition-colors"
          >
            Jack Liu
          </Link>
        </div>
        <Navbar />
        <div className="flex items-center gap-1">
          {/* 在md及以上屏幕显示ThemeToggle */}
          <div className=" md:block">
            <ThemeToggle />
          </div>
          
          {/* HeaderMobile在所有屏幕尺寸都显示 */}
          {/* session = {session} 是必须的 */}
    
          
          {/* 在md及以上屏幕显示登录/登出按钮 */}
          <div className="md:flex">
            {session?.user ? <SignOut /> : <SignIn />}
          </div>
          
          {/* 在md及以上屏幕显示仪表盘按钮 */}
          <div className=" md:block">
            {session?.user.email === "lzyujn@gmail.com" ? (
              <Link href="/dashboard">
                <Button className="text-sm font-medium text-white hover:underline">
                  仪表盘
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
