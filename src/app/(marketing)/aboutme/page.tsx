"use cache";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { AnimatedSection } from "@/app/_components/animated-section";

// 在文件顶部添加
import { type Metadata } from "next";

// 设置页面缓存时间为1小时
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "关于我 | Jack's 主页",
  description: "了解更多关于Jack的信息，包括技能、经历和兴趣爱好。",
  keywords: ["关于我", "个人介绍", "技能专长", "开发者简介"],
  openGraph: {
    title: "关于我 | Jack's 主页",
    description: "了解更多关于Jack的信息，包括技能、经历和兴趣爱好。",
    url: "https://jackliu.com/aboutme",
    locale: "zh_CN",
    type: "profile",
  },
};

export default async function AboutMe() {
  return (

    <div>
      <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
          <div className="flex flex-col justify-between">
            <div>
              <AnimatedSection>
                <h1 className="mb-7 text-3xl font-bold tracking-tighter sm:text-5xl">
                  关于我
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="gap-1">
                  <p className="pt-2 leading-10 text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    我是一名
                    <span className="font-bold text-blue-600">
                      热爱编程的开发者
                    </span>
                    ，热衷于使用技术让每个个体能够熠熠生辉。
                    <br />
                    我是一名
                    <span className="font-bold text-purple-600">
                      区块链哲学爱好者
                    </span>
                    ，热衷于解答您各种区块链有关的问题？
                    <br />
                    我是一名
                    <span className="font-bold text-green-600">
                      给排水工程师
                    </span>
                    ，热衷于解决城市给排水问题。
                    <br />
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="leading-loose dark:text-gray-400">
                  <p>
                    当我不在编程时，你可以看到我在
                    <span className="font-bold text-green-700">山间徒步</span>
                    ，<span className="font-bold text-blue-500">听音乐</span>
                    或在
                    <span className="font-bold text-orange-900">
                      厨房尝试新的食谱
                    </span>
                    。
                    <br />
                    我坚信树立终生学习观念的必要性。
                  </p>
                  <p className="leading-loose">
                    我创建这个网站是为了分享我的项目、想法，并与志同道合的人交流。
                    <br />
                    欢迎在我的留言板上留言！
                  </p>
                </div>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={300}>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-5 md:mt-0">
                <Link href="/guestbook">
                  <Button>访问留言板</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">返回首页</Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={300}>
            <div>
              <Image
                alt="个人照片"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                height={450}
                width={450}
                src="/avatar.png"
                priority
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02LjY2OjY2Njo2NjY2NjY2NjY2NjY2NjY2NjY2Njb/2wBDARUXFyAeIB4gHh4gIB4lICAgICUmJSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </AnimatedSection>
        </div>
        <div className="mt-8 space-y-6">
          <AnimatedSection delay={400}>
            <h2 className="mb-6 text-2xl font-bold">技能与专长</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">全栈开发</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  React, Next.js, TypeScript, Tailwind CSS, PostgreSQL,
                  Prisma, NextAuth, tRPC, OpenAI, Drizzle
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">开发运维</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Git, GitHub Actions, Vercel, AWS
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">给排水设计</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  天正CAD, SWMM暴雨径流模拟
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">人工智能</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  熟悉各种人工智能工具，能够完成音频音色数字人等产品的制作
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">区块链技术</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  熟悉polkadot区块链项目，了解其技术发展趋势
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">投资理财</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  了解股票、贵金属、数字货币等投资品种，认可奥地利学派经济学
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">咖啡茶饮</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  可以烘焙咖啡豆，给你做一杯热咖啡
                  <br />
                  热爱茶饮，红茶绿茶都爱喝
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>

  );
}
