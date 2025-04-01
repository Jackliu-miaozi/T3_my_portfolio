// "use client";

// import { AnimatedSection } from "./animated-section";

// interface Skill {
//   name: string;
//   value: number;
// }

// export function SkillsSection() {
//   const techStack = [
//     "React",
//     "Next.js",
//     "TypeScript",
//     "JavaScript",
//     "Node.js",
//     "Tailwind CSS",
//     "HTML/CSS",
//     "GraphQL",
//     "MongoDB",
//     "PostgreSQL",
//     "Docker",
//     "Git",
//   ];

//   const professionalSkills: Skill[] = [
//     { name: "前端开发", value: 95 },
//     { name: "后端开发", value: 85 },
//     { name: "UI/UX设计", value: 80 },
//     { name: "数据库设计", value: 75 },
//     { name: "DevOps", value: 70 },
//   ];

//   return (
//     <section className="py-16 md:py-24">
//       <div className="container">
//         <AnimatedSection>
//           <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
//             技能展示
//           </h2>
//         </AnimatedSection>

//         <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
//           <AnimatedSection delay={200}>
//             <h3 className="mb-6 text-2xl font-bold">技术栈</h3>
//             <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
//               {techStack.map((tech) => (
//                 <div
//                   key={tech}
//                   className="bg-card text-card-foreground hover:border-primary/50 flex flex-col items-center justify-center rounded-lg border p-4 shadow-sm transition-all duration-300 hover:shadow-md"
//                 >
//                   <span className="text-sm font-medium">{tech}</span>
//                 </div>
//               ))}
//             </div>
//           </AnimatedSection>

//           <AnimatedSection delay={400}>
//             <h3 className="mb-6 text-2xl font-bold">专业技能</h3>
//             <div className="space-y-6">
//               {professionalSkills.map((skill) => (
//                 <div key={skill.name} className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm font-medium">{skill.name}</span>
//                     <span className="text-muted-foreground text-sm">
//                       {skill.value}%
//                     </span>
//                   </div>
//                   <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
//                     <div
//                       className="bg-primary h-full rounded-full transition-all duration-1000"
//                       style={{ width: `${skill.value}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </AnimatedSection>
//         </div>
//       </div>
//     </section>
//   );
// }
