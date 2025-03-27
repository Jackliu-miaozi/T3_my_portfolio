"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { api } from "@/trpc/react";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const registe = api.signup.register.useMutation();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("两次输入的密码不一致");
            setIsLoading(false);
            return;
        }
        try {
            registe.mutate({
                name,
                email,
                password,
            });
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (e) {
            setError("注册过程中发生错误");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl">
                        注册刘正源的网站
                    </CardTitle>
                    <CardDescription className="text-center">
                        创建您的账号
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">昵称</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="输入您的昵称"
                                required
                            />
                        </div>
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
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">确认密码</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="再次输入您的密码"
                                required
                            />
                        </div>
                        {error && <div className="text-sm text-red-500">{error}</div>}
                        <Button
                            className="hover:bg-primary/90 active:bg-primary/70 w-full transition-colors"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "注册中..." : "注册"}
                        </Button>
                        <div className="mt-4 flex items-center justify-center text-sm">
                            <Link href="/sign-in" className="text-primary hover:underline">
                                已有账号？前去登录
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
