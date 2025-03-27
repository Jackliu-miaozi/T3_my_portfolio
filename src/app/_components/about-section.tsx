"use client";

import { AnimatedSection } from "./animated-section";

export function AboutSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <AnimatedSection>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            关于我
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <AnimatedSection delay={200} className="flex justify-center">
            <div className="border-primary relative h-64 w-64 overflow-hidden rounded-full border-4 md:h-80 md:w-80">
              <div className="bg-muted text-muted-foreground absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-24 w-24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <h3 className="mb-4 text-2xl font-bold">Jack Liu</h3>
            <p className="text-muted-foreground mb-4">
              我是一名充满激情的全栈开发工程师，拥有超过5年的行业经验。我专注于创建用户友好、高性能的web应用程序，并热衷于探索新技术和最佳实践。
            </p>
            <div className="mb-4">
              <h4 className="mb-2 font-semibold">教育背景</h4>
              <p className="text-muted-foreground text-sm">
                计算机科学学士学位 - XXX大学 (2015-2019)
              </p>
            </div>
            <div className="mb-4">
              <h4 className="mb-2 font-semibold">工作经历</h4>
              <p className="text-muted-foreground text-sm">
                高级前端开发工程师 - ABC科技有限公司 (2019-至今)
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">兴趣爱好</h4>
              <p className="text-muted-foreground text-sm">
                摄影、旅行、阅读、篮球
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
