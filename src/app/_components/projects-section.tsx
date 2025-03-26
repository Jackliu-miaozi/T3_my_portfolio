"use client";

import { AnimatedSection } from "./animated-section";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "电子商务平台",
      description:
        "基于Next.js和Stripe构建的全功能电子商务平台，支持产品管理、购物车和支付功能。",
      tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "任务管理应用",
      description:
        "一个现代化的任务管理应用，具有拖放界面、标签分类和提醒功能。",
      tags: ["React", "Redux", "Firebase", "Material UI"],
      link: "#",
    },
    {
      title: "社交媒体仪表板",
      description:
        "用于分析和管理多个社交媒体账户的仪表板，提供数据可视化和内容规划工具。",
      tags: ["Vue.js", "D3.js", "Node.js", "Express"],
      link: "#",
    },
    {
      title: "AI驱动的内容生成器",
      description:
        "利用OpenAI API构建的内容生成工具，可以创建文章、社交媒体帖子和营销文案。",
      tags: ["Python", "Flask", "OpenAI API", "React"],
      link: "#",
    },
  ];

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <AnimatedSection>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            项目展示
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={200 + index * 100}>
              <div className="group bg-card text-card-foreground relative flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                <div className="bg-muted aspect-video w-full overflow-hidden">
                  <div className="bg-muted flex h-full items-center justify-center">
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
                      className="text-muted-foreground h-12 w-12"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground mt-2 flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <div className="mt-6">
                      <a
                        href={project.link}
                        className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        查看项目
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
