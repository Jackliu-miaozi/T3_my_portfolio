"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { GithubIcon } from "lucide-react";
export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    //
    // 创建一个新的FormData对象，用于收集表单数据
    // event.currentTarget指向触发事件的表单元素
    // FormData会自动收集表单中所有带name属性的输入字段值
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("邮箱或密码错误");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (e) {
      setError("登录过程中发生错误");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            登录刘正源的网站
          </CardTitle>
          <CardDescription className="text-center">
            输入您的账号信息以登录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="输入您的密码"
                required
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <Button
              className="hover:bg-primary/90 active:bg-primary/70 w-full transition-colors"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card text-muted-foreground px-2">或</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn("github")}
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              使用GitHub登录
            </Button>
            <div className="mt-4 flex items-center justify-between text-sm">
              <Link href="/sign-up" className="text-primary hover:underline">
                还没有账号？前去注册
              </Link>
              <Link href="/" className="text-muted-foreground hover:underline">
                返回主页
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
