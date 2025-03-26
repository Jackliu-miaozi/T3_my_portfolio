import { HydrateClient } from "@/trpc/server";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
 import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";


// export const runtime = 'edge';
// export const preferredRegion = 'home';
export default async function AboutMe() {
  return (
    <HydrateClient>
      <div className="bg-background text-foreground relative min-h-screen overflow-hidden">
        <Header />
        <div className="container px-4 md:px-6 py-8 md:py-12 max-w-5xl mx-auto">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
        <div className="flex flex-col justify-center ">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">关于我</h1>
            <p className="text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 leading-10 pt-2">
              我是一名<span className="text-blue-600 font-bold">热爱编程的开发者</span>
              ，热衷于使用技术让每个个体能够熠熠生辉。
              <br />
              我是一名<span className="text-purple-600 font-bold">区块链哲学爱好者</span>
              ，热衷于解答您各种区块链有关的问题？
              <br />
              我是一名<span className="text-green-600 font-bold">给排水工程师</span>
              ，热衷于解决城市给排水问题。
              <br />
            </p>
          </div>
          <div className="dark:text-gray-400 leading-loose">
            <p>
              当我不在编程时，你可以看到我在
              <span className="text-green-700 font-bold">山间徒步</span>，
              <span className="text-blue-500 font-bold">听音乐</span>
              或在<span className="text-orange-900 font-bold">厨房尝试新的食谱</span>。
              <br />
              我坚信树立终生学习观念的必要性。
            </p>
            <p className="leading-loose">
              我创建这个网站是为了分享我的项目、想法，并与志同道合的人交流。
              <br />
              欢迎在我的留言板上留言！
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/guestbook">
              <Button>访问留言板</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">返回首页</Button>
            </Link>
          </div>
        </div>
        <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
          <Image
            alt="个人照片"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
            height={450}
            width={450}
            src="/个人头像.jpg"
            priority
          />
        </div>
      </div>
      <div className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold">技能与专长</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">全栈开发</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              React, Next.js, TypeScript, Tailwind CSS, PostgreSQL
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">UI/UX 设计</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Figma, Adobe XD, 响应式设计</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">开发运维</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Git, GitHub Actions, Vercel, AWS
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">给排水设计</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">天正CAD, SWMM暴雨径流模拟</p>
          </div>
        </div>
      </div>
    </div>
        <Footer />
      </div>
    </HydrateClient>
  );
}