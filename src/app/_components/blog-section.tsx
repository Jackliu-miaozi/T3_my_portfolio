"use client";

import { AnimatedSection } from "./animated-section";
import Link from "next/link";

interface BlogPost {
  title: string;
  date: string;
  summary: string;
  link?: string;
}

export function BlogSection() {
  const blogPosts: BlogPost[] = [
    {
      title: "如何优化React应用性能",
      date: "2023-06-15",
      summary:
        "探索提高React应用性能的最佳实践，包括代码分割、懒加载和memo优化。",
      link: "/myartical/react-performance",
    },
    {
      title: "Next.js 13新特性详解",
      date: "2023-05-22",
      summary:
        "深入了解Next.js 13带来的App Router、Server Components和Streaming等革命性变化。",
      link: "/myartical/nextjs-13-features",
    },
    {
      title: "现代CSS技巧与最佳实践",
      date: "2023-04-10",
      summary:
        "探讨CSS Grid、Flexbox、CSS变量和媒体查询等现代CSS技术的实际应用。",
      link: "/myartical/modern-css-tips",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <AnimatedSection>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            最新博客
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={index} delay={200 + index * 100}>
              <div className="group bg-card text-card-foreground relative flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-grow flex-col p-6">
                  <div className="text-muted-foreground mb-2 text-sm">
                    {post.date}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {post.summary}
                  </p>
                  {post.link && (
                    <div className="mt-4">
                      <Link
                        href={post.link}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        阅读更多 →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={600}>
          <div className="mt-10 text-center">
            <Link
              href="/myartical"
              className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              查看所有文章
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
