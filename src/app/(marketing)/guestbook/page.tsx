// 在文件顶部添加
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "留言板 | Jack's 主页",
  description: "在Jack的留言板上留下你的消息，分享你的想法，或者只是打个招呼！",
  keywords: ["留言板", "留言", "反馈", "交流"],
  openGraph: {
    title: "留言板 | Jack's 主页",
    description:
      "在Jack的留言板上留下你的消息，分享你的想法，或者只是打个招呼！",
    url: "https://jackliu.com/guestbook",
    locale: "zh_CN",
    type: "website",
  },
};

import { auth } from "@/server/auth";
import { GuestbookForm } from "@/components/guestbook-form";
import { GuestbookEntries } from "@/components/guestbook-entries";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";

import { AnimatedSection } from "@/app/_components/animated-section";
import { SessionProvider } from "next-auth/react";

/**
 * 留言板页面组件
 * 使用服务端预取数据来优化首屏加载性能
 * 通过HydrateClient实现服务端渲染的数据与客户端的无缝衔接
 */
export default async function GuestbookPage() {
  const session = await auth();
  
  // 在服务端预取留言数据，提升首屏加载性能
  // 这样客户端组件可以立即使用缓存的数据，避免额外的网络请求
  void api.post.getAll.prefetch();
  
  return (
    <HydrateClient>
      <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <AnimatedSection>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                留言板
              </h1>
            </AnimatedSection>
            <AnimatedSection>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                留下你的消息，分享你的想法，或者只是打个招呼！
              </p>
            </AnimatedSection>
          </div>
        </div>
        <AnimatedSection>
          <div className="mt-8 space-y-8">
            {session ? (
              // 这行代码将session中的用户信息传递给GuestbookForm组件
              // 展开session.user中的所有属性，并将email作为id
              // 如果email不存在则使用空字符串作为默认值
              <GuestbookForm user={session.user} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border p-8">
                <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
                  请登录后在留言板上留言。
                </p>
                <Link href={`/sign-in?callbackUrl=${encodeURIComponent("/guestbook")}`}>
                  <Button>登录</Button>
                </Link>
              </div>
            )}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">最近留言</h2>
              <SessionProvider session={session}>
                <GuestbookEntries />
              </SessionProvider>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </HydrateClient>
  );
}
