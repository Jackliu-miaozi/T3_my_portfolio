import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { AnimatedSection } from "@/app/_components/animated-section";
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 md:px-6 md:py-24">
      <AnimatedSection>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="text-primary text-6xl font-bold md:text-8xl">404</div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            页面未找到
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            抱歉，您访问的页面不存在或已被移除。
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild>
              <Link href="/">返回首页</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/myartical">浏览文章</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
