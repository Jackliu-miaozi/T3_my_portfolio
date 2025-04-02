"use client";

import { GithubIcon, MailIcon } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-15 md:py-28 flex items-center justify-center">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/5 absolute -top-[40%] -right-[60%] h-[800px] w-[800px] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-[40%] -left-[60%] h-[800px] w-[800px] rounded-full blur-3xl" />
      </div>

      <div className="container flex flex-col items-center justify-center text-center">
        <AnimatedSection>
          <div className="flex-col text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <p className="flex">
              你好，我是&nbsp;&nbsp;
              <span>刘正源 🤝</span>
            </p>
            <p className="text-primary mt-4 block">欢迎来到我的网站</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-muted-foreground mt-6 max-w-3xl md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            本网站用于分享我的个人博客、项目、工作和开发技术经验。
            如果你对我的工作感兴趣，欢迎联系我。
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <p>给自己打标签：</p>
            <span className="focus:ring-ring bg-primary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              全栈开发
            </span>
            <span className="focus:ring-ring bg-primary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              人工智能
            </span>
            <span className="focus:ring-ring bg-primary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              区块链技术
            </span>
            <span className="focus:ring-ring bg-secondary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              奥地利学派经济学
            </span>
            <span className="focus:ring-ring bg-secondary text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              给排水工程
            </span>
            <span className="focus:ring-ring bg-muted text-primary-foreground hover:bg-primary/80 inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
              解决预期性焦虑
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <p>联系方式：</p>

            <Link
              href="https://github.com/Jackliu-miaozi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-accent hover:text-accent-foreground rounded-full p-2 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:lzyujn@gmail.com"
              className="hover:bg-accent hover:text-accent-foreground rounded-full p-2 transition-colors"
              aria-label="Email"
            >
              <MailIcon className="h-6 w-6" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
